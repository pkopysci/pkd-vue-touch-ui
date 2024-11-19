import { sendGet, sendPost, deviceControlHook } from '../api/apiHooks'

/**
 * Send a query command the control system for all controllable inputs in the configuration.
 */
export function sendGetConfig() {
    sendGet("CONFIG",'',deviceControlHook)
}

/**
 * Send a dial command to the control system for the target device.
 * @param {string} deviceId The unique ID of the device to control.
 * @param {string} channel The channel/ number to dial in the send request.
 */
export function sendChannelCommand(deviceId, channel) {
    sendPost('CHANNEL', { Id: deviceId, Chan: channel }, deviceControlHook)
}

/**
 * Send a command to the control that will request a recall of a pre-defined channel favorite/preset.
 * @param {string} deviceId The unique ID of the device to control.
 * @param {string} favoriteId The unique ID of the preset to recall
 */
export function sendFavoriteCommand(deviceId, favoriteId) {
    sendPost('FAVORITE', { Id: deviceId, FavId: favoriteId }, deviceControlHook)
}

/**
 * Send a transport control command to the control system for the target device.
 * @param {string} deviceId The unique ID of the device to control.
 * @param {string} transport the transport keyword representing the desired transport.
 */
export function sendTransportCommand(deviceId, transport) {
    sendPost('TRANSPORT', { Id: deviceId, Tag: transport }, deviceControlHook)
}
