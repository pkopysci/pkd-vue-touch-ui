import { cameraControlHook } from '../api/apiHooks'
import { parseResponse } from './dataParser'
import { useCameraStore } from '@/stores/cameraStore'

const rxHandlers = {
  CONFIG: (store, cmd) => {
    store.updateCameras(cmd.Data.Cameras)
  },
  STATE: (store, cmd) => {
    console.log('cameraFeedback - STATE', cmd)
  }
}

export default function createCameraControlPlugin() {
  const cameraStore = useCameraStore()
  
  let dataBuffer = ''
  window.CrComLib.subscribeState(cameraControlHook.type, cameraControlHook.join, (data) => {
    if (!data || data.length <= 0) {
      return
    }

    dataBuffer += data
    const parsed = parseResponse(dataBuffer)
    dataBuffer = parsed.remainingData

    if (parsed.firstCommand) {
      try {
        let cmd = JSON.parse(parsed.firstCommand)
        if (cmd.Command === 'ERROR') {
          console.error(`cameraFeedback - error RX received: ${cmd.Data.Message}`)
        } else {
          rxHandlers[cmd.Command](cameraStore, cmd)
        }
      } catch (error) {
        console.error(`createCameraControlPlugin() - failed to parse response: ${error}`)
      }
    }
  })
}
