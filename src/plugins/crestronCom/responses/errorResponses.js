import { useErrorStore } from '@/stores/errorStore'
import { errorReportingHook } from '../api/apiHooks'
import { parseResponse } from './dataParser'

export default function createErrorPlugin() {
  const errorStore = useErrorStore()

  let dataBuffer = ''
  window.CrComLib.subscribeState(errorReportingHook.type, errorReportingHook.join, (data) => {
    if (!data || data.length <= 0) {
      return
    }

    const parsed = parseResponse(dataBuffer + data)
    if (parsed.firstCommand) {
      try {
        const cmd = JSON.parse(parsed.firstCommand)
        if (cmd.Command === 'ERROR') {
            console.error('errorResponses - Received ERROR RX from control: ')
            console.error(cmd)
        } else {
            errorStore.updateErrors(cmd.Data)
        }
      } catch (err) {
        console.error(
          `errorResponses.CreateErrorPlugin() - failed to parse response: ${err.message}`
        )
      }
    }
  })
}
