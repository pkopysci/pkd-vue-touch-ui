import { CrComLib } from '@crestron/ch5-crcomlib/build_bundles/cjs/cr-com-lib'
import { useRootStore } from '@/stores/rootStore'
import { onlineHook, roomConfigHook } from '../api/apiHooks'
import { parseResponse } from './dataParser'

function initCrestronHooks() {
  // Create global access to base connection
  window.CrComLib = CrComLib

  // These functions handle native bridge communication between the touchscreen and the control system
  window.bridgeReceiveIntegerFromNative = CrComLib.bridgeReceiveIntegerFromNative
  window.bridgeReceiveBooleanFromNative = CrComLib.bridgeReceiveBooleanFromNative
  window.bridgeReceiveStringFromNative = CrComLib.bridgeReceiveStringFromNative
  window.bridgeReceiveObjectFromNative = CrComLib.bridgeReceiveObjectFromNative
}

const roomCommands = {
  CONFIG: (store, cmd) => {
    store.updateStateData(cmd.Data)
  },
  USESTATE: (store, cmd) => {
    store.updateUseStatusFeedback(cmd.Data)
  }
}

/**
 * Initializes global access to CrComLib (window.CrComLib) as well as the associated
 * bridge hooks.
 * Initializes subscriptions for all feedback plugins.
 * Creates the stores for all Pinia-monitored states associated with control system communication.
 */
export default function createCrestronPlugin() {
  const rootStore = useRootStore()
  initCrestronHooks()

  // Begin monitoring online/offline status
  window.CrComLib.subscribeState(onlineHook.type, onlineHook.join, (state) => {
    rootStore.updateOnlineStatusFeedback(state)
  })

  let dataBuffer = ''
  window.CrComLib.subscribeState(roomConfigHook.type, roomConfigHook.join, (data) => {
    if (!data || data.length <= 0) return

    dataBuffer += data
    let separated = parseResponse(dataBuffer)
    dataBuffer = separated.remainingData

    if (separated.firstCommand) {
      try {
        let cmd = JSON.parse(separated.firstCommand)
        if (cmd.Command == 'ERROR') {
          console.error(`roomInfoFeedback - error RX received: ${cmd.Data}`)
        } else {
          roomCommands[cmd.Command](rootStore, cmd)
        }
      } catch (err) {
        console.error(err.message)
      }
    }
  })
}
