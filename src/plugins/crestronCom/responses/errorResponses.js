import { useErrorStore } from '@/stores/errorStore'
import { errorReportingHook } from '../api/apiHooks'
import { parseResponse } from './dataParser'


const handlers = {
  ERRLIST: (store, data) => {
    if (!data.Errors) return
    data.Errors.forEach((error) => store.addError(error.Id, error.Message))
  },
  ADDERROR: (store, data) => {
    store.addError(data.Id, data.Message)
  },
  REMOVEERROR: (store, data) => {
    store.removeError(data.Id)
  },
};

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
            handlers[cmd.Command](errorStore, cmd)
        }
      } catch (err) {
        console.error(
          `errorResponses.CreateErrorPlugin() - failed to parse response: ${err.message}`
        )
      }
    }
  })
}
