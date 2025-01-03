import { useVideoStore } from '@/stores/videoStore'
import { displaysChangeHook, videoControlHook } from '../api/apiHooks'
import { parseResponse } from './dataParser'

const updateFullConfig = (videoStore, cmd) => {
  videoStore.updateSources(cmd.Data.Sources)
  videoStore.updateDestinations(cmd.Data.Destinations)
  videoStore.updateAvrInfo(cmd.Data.AvRouters)
}

const videoCommands = {
  CONFIG: updateFullConfig,
  ROUTE: (videoStore, cmd) => videoStore.updateVideoRoute(cmd.Data.DestId, cmd.Data.SrcId),
  GLOBALFREEZE: (videoStore, cmd) => videoStore.updateGlobalVideoFreeze(cmd.Data),
  GLOBALBLANK: (videoStore, cmd) => videoStore.updateGlobalVideoBlank(cmd.Data)
}

const displayCommands = {
  CONFIG: (store, cmd) => store.updateDisplays(cmd.Data),
  STATUS: (store, cmd) => store.updateDisplay(cmd.Data)
}

export default function createVideoControlPlugin() {
  const videoStore = useVideoStore()

  // video hooks
  let dataBuffer = ''
  window.CrComLib.subscribeState(videoControlHook.type, videoControlHook.join, (data) => {
    if (!data || data.length <= 0) return

    dataBuffer += data
    const parsed = parseResponse(dataBuffer)
    dataBuffer = parsed.remainingData

    if (parsed.firstCommand) {
      try {
        let cmd = JSON.parse(parsed.firstCommand)
        if (cmd.Command == 'ERROR') {
          console.error(`videoInfoFeedback - error RX received: ${cmd.Data}`)
        } else {
          videoCommands[cmd.Command](videoStore, cmd)
        }
      } catch (err) {
        console.error(`createVideoControlPlugin - failed to parse response: ${err}`)
      }
    }
  })

  // display hooks
  let displayDataBuffer = ''
  window.CrComLib.subscribeState(displaysChangeHook.type, displaysChangeHook.join, (data) => {
    displayDataBuffer += data
    let parsed = parseResponse(displayDataBuffer)
    displayDataBuffer = parsed.remainingData

    if (parsed.firstCommand) {
      try {
        const cmd = JSON.parse(parsed.firstCommand)
        if (cmd.Command == 'ERROR') {
          console.error(`displayInfoFeedback - error RX received: ${cmd.Data}`)
        } else {
          displayCommands[cmd.Command](videoStore, cmd)
        }
      } catch (err) {
        console.error(`createVideoControlPlugin - failed to parse display response: ${err.message}`)
      }
    }
  })
}
