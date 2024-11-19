import { useCustomEventStore } from '@/stores/customEventStore'
import { parseResponse } from './dataParser'
import { eventHook } from '../api/apiHooks'

const rxHandlers = {
  CONFIG: (store, cmd) => store.setCustomEvents(cmd.Data),
  STATE: (store, cmd) => store.updateCustomEvent(cmd.Data.Id, cmd.Data.State)
}

/**
 * Initializes the custom event plugin, which monitors the custom event join
 * for RX messages from the control system. When a message is received, it is
 * parsed and the appropriate action is taken based on the command received.
 * The commands currently supported are:
 *
 * - CONFIG: Update the custom event config in the store with the provided
 *   data.
 * - STATE: Update the custom event state in the store with the provided data.
 */
export default function createCustomEventPlugin() {
  const customEventStore = useCustomEventStore()

  let dataBuffer = ''
  window.CrComLib.subscribeState(eventHook.type, eventHook.join, (data) => {
    if (!data || data.length <= 0) {
      return
    }

    dataBuffer += data
    const parsed = parseResponse(dataBuffer)
    dataBuffer = parsed.remainingData
    if (parsed.firstCommand) {
      try {
        const cmd = JSON.parse(parsed.firstCommand)
        if (cmd.Command == 'ERROR') {
          console.error(`customEventFeedback - error RX received: ${cmd.Data}`)
        } else {
          rxHandlers[cmd.Command](customEventStore, cmd)
        }
      } catch (err) {
        console.error(
          `customEventFeedback.createCustomEventPlugin() - failed to parse response: ${err.message}`
        )
      }
    }
  })
}
