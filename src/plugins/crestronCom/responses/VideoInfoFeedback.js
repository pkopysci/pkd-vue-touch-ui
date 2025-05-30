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
  ROUTE: (videoStore, cmd) => {
    try {
      videoStore.updateVideoRoute(cmd.Data.DestId, cmd.Data.SrcId)
    } catch (e) {
      console.error("Video route" + e)
    }
    
  },
  GLOBALFREEZE: (videoStore, cmd) => {
    try {
      videoStore.updateGlobalVideoFreeze(cmd.Data.State)
    } catch (e) {
      console.error("Global freeze" + e)
    }
  },
  GLOBALBLANK: (videoStore, cmd) => {
    try {
      videoStore.updateGlobalVideoBlank(cmd.Data.State)
    } catch (e) {
      console.error("Global blank" + e)
    }
    
  },
  STATUS: (store, cmd) => {
    try {
      store.updateAvrDevice(cmd.Data.Avr)
    } catch (e) {
      console.error("STATUS" + e)
    }
    
  }
}

const displayCommands = {
  CONFIG: (store, cmd) => store.updateDisplays(cmd.Data.Displays),
  STATUS: (store, cmd) => store.updateDisplay(cmd.Data)
}

/**
 * Initializes subscriptions for video and display control feedback plugins.
 * Updates associated states in the video store when commands are received.
 */
export default function createVideoControlPlugin() {
  const videoStore = useVideoStore()

  // video hooks
  let dataBuffer = ''
  window.CrComLib.subscribeState(videoControlHook.type, videoControlHook.join, (data) => {
    if (!data || data.length <= 0) return

    dataBuffer += data
    const parsed = parseResponse(dataBuffer)
    dataBuffer = parsed.remainingData

    if (parsed.firstCommand && parsed.firstCommand.length > 0) {
      try {
        let cmd = JSON.parse(parsed.firstCommand)
        if (cmd.Command === 'ERROR') {
          console.error(`videoInfoFeedback - error RX received: ${cmd.Data.Message}`)
        } else {
          videoCommands[cmd.Command](videoStore, cmd)
        }
      } catch (err) {
        console.error(`createVideoControlPlugin - failed to parse response: ${parsed.firstCommand}\n${err.message}`)
      }
    }
  })

  // display hooks
  let displayDataBuffer = ''
  window.CrComLib.subscribeState(displaysChangeHook.type, displaysChangeHook.join, (data) => {
    displayDataBuffer += data
    let parsed = parseResponse(displayDataBuffer)
    displayDataBuffer = parsed.remainingData

    if (parsed.firstCommand && parsed.firstCommand.length > 0) {
      try {
        const cmd = JSON.parse(parsed.firstCommand)
        if (cmd.Command === 'ERROR') {
          console.error(`displayInfoFeedback - error RX received: ${cmd.Data.Message}`)
        } else {
          displayCommands[cmd.Command](videoStore, cmd)
        }
      } catch (err) {
        console.error(`createVideoControlPlugin - failed to parse display response: ${parsed.firstCommand}\n${err.message}`)
      }
    }
  })
}
