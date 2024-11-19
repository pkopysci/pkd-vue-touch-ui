import { useSecurityStore } from '@/stores/securityStore'
import { parseResponse } from './dataParser'
import { securityHook } from '../api/apiHooks'

const rxHandlers = {
  CODE: (store, cmd) => {
    store.updatePasscodeResult(cmd.Data.Result)
  },
  TECHLOCK: (store, cmd) => {
    store.updateUiLockout(cmd.Data.Result)
  }
}

/**
 * Initializes the security control plugin, which listens for responses from the control
 * system that are related to security events and commands, and updates the security store
 * accordingly.
 */
export default function createSecurityControlPlugin() {
  const securityStore = useSecurityStore()

  let dataBuffer = ''
  window.CrComLib.subscribeState(securityHook.type, securityHook.join, (data) => {
    if (!data || data.length <= 0) {
      return
    }

    const parsed = parseResponse(dataBuffer + data)
    dataBuffer = parsed.remainingData
    if (parsed.firstCommand) {
      try {
        const cmd = JSON.parse(parsed.firstCommand)
        if (cmd.Command == 'ERROR') {
          console.error(`securityFeedback - error RX received: ${cmd.Data}`)
        } else {
          rxHandlers[cmd.Command](securityStore, cmd)
        }
      } catch (err) {
        console.error(
          `securityFeedback.createSecurityControlPlugin() - failed to parse response: ${err.message}`
        )
      }
    }
  })
}
