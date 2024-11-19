import { audioControlHook, sendGet, sendPost } from '@/plugins/crestronCom/api/apiHooks'

/**
 * Send a query command to the control system to return the full input, output, and DSP
 * configuration of the Av system.
 */
export function sendAudioConfigQuery() {
  sendGet('CONFIG', '', audioControlHook)
}

/**
 * @param {string} channelId The unique ID of channel to adjust
 * @param {number} level 0-100 level representing the audio volume.
 */
export function sendAudioOutputLevel(channelId, level) {
  sendPost('LEVEL', { Io: 'OUTPUT', Id: channelId, Level: level }, audioControlHook)
}

/**
 * @param {string} channelId The unique ID of channel to adjust
 * @param {number} level 0-100 level representing the audio volume.
 */
export function sendAudioInputLevel(channelId, level) {
  sendPost('LEVEL', { Io: 'INPUT', Id: channelId, Level: level }, audioControlHook)
}

/**
 * @param {string} channelIds The unique ID of channel to adjust
 * @param {number} level 0-100 level representing the audio volume.
 */
export function sendMicrophoneLevel(channelId, level) {
  sendAudioInputLevel(channelId, level)
}

/**
 * @param {string} channelId The unique ID of the channel to adjust.
 * @param {boolean} newState true = set mute on, false = set mute off.
 */
export function sendAudioOutputMute(channelId, newState) {
  sendPost('MUTE', { Io: 'OUTPUT', Id: channelId, Mute: newState }, audioControlHook)
}

/**
 * @param {string} channelId The unique ID of the channel to adjust.
 * @param {boolean} newState true = set mute on, false = set mute off.
 */
export function sendAudioInputMute(channelId, newState) {
  sendPost('MUTE', { Io: 'INPUT', Id: channelId, Mute: newState }, audioControlHook)
}

/**
 * @param {string} channelId The unique ID of the channel to adjust.
 * @param {boolean} newState true = set mute on, false = set mute off.
 */
export function sendMicrophoneMute(channelId, newState) {
  sendAudioInputMute(channelId, newState)
}

/**
 * @param {string} outputId The unique ID of the audio destination to route to.
 * @param {string} inputId  The unique ID of the audio input being routed.
 */
export function sendMatrixAudioRoute(outputId, inputId) {
  sendPost('ROUTE', { OutId: outputId, InId: inputId }, audioControlHook)
}

/**
 * @param {string} inputId The unique ID of the audio input to enable or disable.
 * @param {string} zoneId The unique ID of the audio zone that will be changed to allow the target input
 * @param {string} enable True = enable the input in the output zone, false = disable the audio input for that zone.
 */
export function sendMicrophoneZoneEnable(inputId, zoneId, enable) {
  sendPost('ZONE', { InId: inputId, ZoneId: zoneId, Enabled: enable }, audioControlHook)
}
