import {
  videoControlHook,
  displaysChangeHook,
  sendGet,
  sendPost
} from '@/plugins/crestronCom/api/apiHooks'

/**
 * Send a request to the control system to change the video blank state of all video outputs.
 * @param {boolean} newState the video blank status for all outputs
 */
export function sendGlobalBlank(newState) {
  sendPost('GLOBALBLANK', newState, videoControlHook)
}

/**
 * Send a request to the control system to change the video freeze state of all video outputs.
 * @param {boolean} newState the video freeze status for all outputs
 */
export function sendGlobalFreeze(newState) {
  sendPost('GLOBALFREEZE', newState, videoControlHook)
}

/**
 * Send a power on/off command to the target display.
 * @param {string} displayId The unique ID of the display to control.
 * @param {boolean} newState The power state to send to the device.
 */
export function sendDisplayPower(displayId, newState) {
  sendPost('POWER', { Id: displayId, State: newState }, displaysChangeHook)
}

/**
 * @param {string} displayId The unique ID of the display to control.
 * @param {boolean} upDown true = screen up, false = screen down
 */
export function sendScreenControl(displayId, upDown) {
  sendPost('SCREEN', { Id: displayId, State: upDown }, displaysChangeHook)
}

/**
 * @param {string} displayId The unique ID of the display to control.
 * @param {string} inputId The unique ID of the input to select on the display.
 */
export function sendDisplayInputSelect(displayIds, inputId) {
  sendPost('INPUT', { Id: displayIds, InputId: inputId }, displaysChangeHook)
}

/**
 * @param {string} destId The unique ID of the destination being affected.
 * @param {string} srcId The unique ID of the source being sent to the destinations
 */
export function sendMatrixVideoRoute(destId, srcId) {
  console.log('videoCommands.sendMatrixVideoRoute(' + destId + ', ' + srcId + ')')

  sendPost('ROUTE', { DestId: destId, SrcId: srcId }, videoControlHook)
}

/**
 * Send a request to the control system for the full video system configuration. This will
 * query for display and routing configuration.
 */
export function sendVideoConfigQuery() {
  sendGet('CONFIG', '', videoControlHook)
}

/**
 * Send a request to the control system to return all displays in the configuration.
 */
export function sendDisplaysConfigQuery() {
  sendGet('CONFIG', '', displaysChangeHook)
}
