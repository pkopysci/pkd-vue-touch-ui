import { useControlledDeviceStore } from '@/stores/controlledDeviceStore'
import { parseResponse } from './dataParser'
import { deviceControlHook } from '../api/apiHooks'

export default function createDeviceControlPlugin() {
  const deviceStore = useControlledDeviceStore()

  const actions = {
    CONFIG: (store, cmd) => {
      store.updateDevices(cmd.Data)
    }
  }
  let dataBuffer = ''
  window.CrComLib.subscribeState(deviceControlHook.type, deviceControlHook.join, (data) => {
    if (!data || data.length < 1) {
      return
    }

    const parsed = parseResponse(dataBuffer + data)
    dataBuffer = parsed.remainingData
    if (parsed.firstCommand) {
      try {
        const cmd = JSON.parse(parsed.firstCommand)
        if (cmd.Command == 'ERROR') {
          console.error(`deviceControlFeedback - error RX received: ${cmd.Data}`)
        }
        else {
          actions[cmd.Command](deviceStore, cmd)
        }
      } catch (err) {
        console.error(
          `deviceControlFeedback.createDeviceControlPlugin() - failed to parse response: ${err.message}`
        )
      }
    }
  })
}
