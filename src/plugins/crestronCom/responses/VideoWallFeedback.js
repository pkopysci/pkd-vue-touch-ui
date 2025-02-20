import { useVideoWallStore } from '@/stores/videoWallStore'
import { videoWallHook } from '../api/apiHooks'
import { parseResponse } from './dataParser'

const commands = {
    CONFIG: (store, cmd) => {
        if (cmd.Data.Controllers.length <= 0) {
            console.error('VideoWallFeedback - no controllers found')
            return
        }
        store.updateConfig(cmd.Data.Controllers[0].Layouts, cmd.Data.Controllers[0].Sources, cmd.Data.Controllers[0].Id)
    },
    ROUTE: (store, cmd) => store.updateCellRoute(cmd.Data.CellId, cmd.Data.SourceId),
    LAYOUT: (store, cmd) => store.updateSelectedLayout(cmd.Data.ControlId, cmd.Data.LayoutId),
    CONNECTION: (store, cmd) => console.log("TODO: VideoWallFeedback - CONNECTION"),
}

/**
 * Initializes the video wall plugin, which monitors the video wall join
 * for RX messages from the control system. When a message is received, it is
 * parsed and the appropriate action is taken based on the command received.
 */
export default function createVideoWallPlugin() {
    const videoWallStore = useVideoWallStore()
    
    let dataBuffer = ''
    window.CrComLib.subscribeState(videoWallHook.type, videoWallHook.join, (data) => {
        
        if (!data || data.length <= 0) {
            return
        }
        
        dataBuffer += data
        const parsed = parseResponse(dataBuffer)
        dataBuffer = parsed.remainingData

        if (parsed.firstCommand) {
            try {
                let cmd = JSON.parse(parsed.firstCommand)
                if (cmd.Command == 'ERROR') {
                    console.error(`videoWallFeedback - error RX received for ${cmd.Command}: ${cmd.Data.Message}`)
                } else {
                    commands[cmd.Command](videoWallStore, cmd)
                }
            } catch (error) {
                console.error(`createVideoWallPlugin() - failed to parse response: ${error}`)
            }
        }
    })
}