import { roomConfigHook, sendGet, sendPost } from '../api/apiHooks'

/**
 * Sends a request to the control system to change the current 'in use' status via digital
 * join pulse.
 * @param {boolean} newState true = set system to 'in use', false = set system to 'standby'.
*/
export function setSytemUseState(newState) {
  sendPost('USESTATE', newState, roomConfigHook)
}

/**
 * Send a request to the control system to trigger a re-send of the base room info and main
 * menu items.
 */
export function getConfig() {
  sendGet('CONFIG', '', roomConfigHook)
}
