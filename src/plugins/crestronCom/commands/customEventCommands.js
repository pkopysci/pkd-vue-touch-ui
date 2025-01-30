import { eventHook, sendGet, sendPost } from '@/plugins/crestronCom/api/apiHooks'

/**
 * Sends a request to the control system to retrieve the current custom event
 * configuration. The response will be handled by the custom event feedback plugin.
 */
export function sendGetCustomEventConfig() {
  sendGet('CONFIG', {}, eventHook)
}

/**
 * Sends a request to the control system to change the state of the custom event
 * with the given ID. The response will be handled by the custom event feedback plugin.
 * @param {string} id The ID of the custom event to update.
 * @param {boolean} state The new state of the custom event.
 */
export function sendChangeCustomEventState(id, state) {
    let data = { Id: id, State: state }
  sendPost('STATE', data, eventHook)
}
