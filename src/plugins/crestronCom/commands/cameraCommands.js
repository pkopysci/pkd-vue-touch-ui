import { cameraControlHook, sendGet, sendPost } from '@/plugins/crestronCom/api/apiHooks.js'

/**
 * Send a query command to the control system for all cameras and their associated control data.
 */
export function sendGetConfigQuery() {
  sendGet('CONFIG', {}, cameraControlHook)
}

/**
 * Send a pan/tilt command for the target camera to the control system.
 * @param {string} cameraId the unique id of the camera to control.
 * @param {Vector2D} vector the direction & magnitude to adjust the camera by.
 */
export function sendPantTilt(cameraId, vector) {

  console.log('cameraCommands.sendPantTilt(', cameraId, vector, ')')

  sendPost(
    'PTZ',
    { DeviceId: cameraId, X: vector.x, Y: vector.y },
    cameraControlHook
  )
}


/**
 * Send a zoom command for the target camera to the control system.
 * @param {string} cameraId the unique id of the camera to control.
 * @param {number} speed the speed of the zoom operation. Positive values are zoom in, negative values are zoom out. 0 is stop.
 */
export function sendZooom(cameraId, speed) {

  console.log('cameraCommands.sendZoom(', cameraId, speed, ')')

  sendPost(
    'ZOOM',
    { DeviceId: cameraId, Speed: speed },
    cameraControlHook
  )
}

/**
 * Send a preset recall command for the target camera to the control system.
 * @param {string} cameraId the unique id of the camera to control.
 * @param {string} presetId the unique id of the preset to recall.
 */
export function sendPresetRecall(cameraId, presetId) {

  console.log('cameraCommands.sendPresetRecall(', cameraId, presetId, ')')

  sendPost(
    'RECALL',
    { DeviceId: cameraId, PresetId: presetId },
    cameraControlHook
  )
}

/**
 * Send a command to the control system to save the current camera position and state
 * as a new preset.
 * @param {string} cameraId the unique id of the camera to control.
 * @param {string} presetId the unique id of the preset to save.
 */
export function sendPresetSave(cameraId, presetId) {

  console.log('cameraCommands.sendPresetSave(', cameraId, presetId, ')')

  sendPost(
    'SAVE',
    { DeviceId: cameraId, PresetId: presetId },
    cameraControlHook
  )
}