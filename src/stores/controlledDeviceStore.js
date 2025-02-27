import { defineStore } from 'pinia'
import { checkString, checkDefined } from '@/data/validators'
import {
  sendGetConfig,
  sendChannelCommand,
  sendFavoriteCommand,
  sendTransportCommand
} from '@/plugins/crestronCom/commands/deviceControlCommands'
import {ref} from "vue";

export const emptyDevice = {
  Id: 'emptyDevice',
  Label: 'Empty Device',
  Icon: 'alert',
  Type: 'cable-tv',
  SupportsDiscretePower: true,
  SupportsColorButtons: true,
  SupportsVideoTransports: true,
  SupportsDvrTransports: true,
  Favorites: [
    { Id: 'favorite1', Label: 'Favorite 1'},
    { Id: 'favorite2', Label: 'Favorite 2'},
    { Id: 'favorite3', Label: 'Favorite 3'}
  ],
  Tags: []
}


export const useControlledDeviceStore = defineStore('controlledDeviceStore', () => {
  
  const devices = ref([])
  
  function requestConfigUpdate() {
    sendGetConfig()
  }

  /**
   * Update the stored collection of controllable transport devices. If argument 'newDevices' is undefined then an error is logged
   * and nothing is updated.
   * @param {Array<object>} newDevices A collection of all controllable inputs/transport devices accessible via the UI.
   */
  function updateDevices(newDevices) {
    if (!checkDefined(newDevices, 'newDevices', 'controlledDeviceStore.updateDevices')) return
    devices.value = newDevices
  }

  /**
   * Send a transport command to the control for the target device.
   * Writes an error to the log and does not send a command if any argument is invalid.
   * @param {string} deviceId the unique ID of the device to control.
   * @param {string} command The irCommand keyword representing the transport command to send.
   */
  function sendDeviceTransportCommand(deviceId, command) {
    if (
        !checkString(deviceId, 'deviceId', 'controlledDeviceStore.sendTransportCommand') ||
        !checkString(command, 'command', 'controlledDeviceStore.sendTransportCommand')
    ) {
      return
    }

    sendTransportCommand(deviceId, command)
  }
  
  /**
   * Send a dial command to the control for the target device. Does nothing and writes an error to the log if any
   * argument is invalid.
   * @param {string} deviceId The unique ID of th device to control.
   * @param {string} channel The channel/ number to dial in the send request.
   */
  function sendDeviceChannelCommand(deviceId, channel) {
    if (
        !checkString(deviceId, 'deviceId', 'controlledDeviceStore.sendChannelCommand') ||
        !checkString(channel, 'channel', 'controlledDeviceStore.sendChannelCommand')
    ) {
      return
    }

    sendChannelCommand(deviceId, channel)
  }

  /**
   * Send a command to the control that will request a recall of a pre-defined channel favorite/preset.
   * Does nothing and writes an error to the log if any argument is invalid.
   * @param {string} deviceId The unique ID of the device to control
   * @param {string} favoriteId The unique ID of the preset to recall
   */
  function sendDeviceFavoriteCommand(deviceId, favoriteId) {
    if (
        !checkString(deviceId, 'deviceId', 'controlledDeviceStore.sendFavoriteCommand') ||
        !checkString(favoriteId, 'favoriteId', 'controlledDeviceStore.sendFavoriteCommand')
    ) {
      return
    }

    sendFavoriteCommand(deviceId, favoriteId)
  }
  
  return {
    devices,
    requestConfigUpdate,
    updateDevices,
    sendDeviceTransportCommand,
    sendDeviceChannelCommand,
    sendDeviceFavoriteCommand,
  }
})