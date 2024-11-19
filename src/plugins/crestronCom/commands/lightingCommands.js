import { lightingControlHook, sendGet, sendPost } from '../api/apiHooks'

/**
 * Send a request to the control system for the full lighting system configuration.
 */
export function sendLightingCongifQuery() {
  sendGet('CONFIG', '', lightingControlHook)
}

/**
 * Send a request to the control system for the currently selected scene on the target controller.
 * @param {string} controlId The unique ID of the lighting control to query.
 */
export function sendSelectedSceneQuery(controlId) {
  sendGet('SCENE', { Id: controlId }, lightingControlHook)
}

/**
 * Send a request to the control system for the current load level of the target zones.
 * @param {string} controlId The unique ID the of lighting control to query
 * @param {string} zoneId The unique lighting zone ID to query for current load level.
 */
export function sendZoneLoadQuery(controlId, zoneId) {
  sendGet('LOAD', { Id: controlId, ZoneId: zoneId, Load: 0 }, lightingControlHook)
}

/**
 * Send a request to the control system to recall the target lighting scene.
 * @param {string} controlId The unique ID of the lighting controller to change
 * @param {string} sceneId The unique ID of the scene that will be selected
 */
export function sendSceneSelectCommand(controlId, sceneId) {
  sendPost('SCENE', { Id: controlId, SceneId: sceneId, Set: true }, lightingControlHook)
}

/**
 * Send a request to the control system to change the lighting load level of the target zone.
 * @param {string} controlId The unique ID of the lighting controller to change.
 * @param {string} zoneId The unique ID of the lighting zone to change.
 * @param {number} newLevel 0-100 value representing the load percentage.
 */
export function sendLoadLevelCommand(controlId, zoneId, newLevel) {
  sendPost('lOAD', { Id: controlId, Zone: zoneId, Load: newLevel }, lightingControlHook)
}
