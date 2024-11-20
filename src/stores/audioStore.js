import { defineStore } from 'pinia'
import { checkString, checkDefined, checkNumber, checkBoolean } from '@/data/validators'
import {
  sendMicrophoneLevel,
  sendAudioConfigQuery,
  sendAudioInputLevel,
  sendAudioInputMute,
  sendAudioOutputLevel,
  sendAudioOutputMute,
  sendMicrophoneMute,
  sendMicrophoneZoneEnable,
  sendMatrixAudioRoute
} from '@/plugins/crestronCom/commands/audioCommands'

export const emptyChannel = {
  id: '',
  label: '',
  icon: '',
  zones: [],
  hasSync: false,
  muteState: false,
  level: 0,
  tags: '',
  routedInput: ''
}

export const useAudioStore = defineStore('audioStore', {
  state: () => ({
    /** A collection of objects representing all audio inputs that are not tagged as microphones. */
    inputs: [],
    /** A collection of audio channel objects representing all outputs in the system. */
    outputs: [],
    /** A data object that provides the id, model, online status of the DSP in the system. */
    dspInfo: [{Model: 'Default DSP'}],
    /** A collection of all audio input channels that contain the tag 'mic'.*/
    mics: []
  }),
  getters: {},
  actions: {
    requestConfigUpdate() {
      sendAudioConfigQuery()
    },
    /**
     * Update the input and microphone channels. this will separate the newInputs collection based on
     * whether or not an individual channel has the 'mic' tag.  This will replace all objects in the existing collection
     * @param {Array<object>} newInputs Collection of audio channel objects for all inputs ands mics.
     */
    updateAudioInputs(newInputs) {
      if (!checkDefined(newInputs, 'newInputs', 'audioStore.updateAudioInputs')) return
      let audioIns = []
      let mics = []
      newInputs.forEach((item) => {
        if (item.Tags.includes('microphone')) {
          mics.push(item)
        } else {
          audioIns.push(item)
        }
      })

      this.inputs = audioIns
      this.mics = mics
    },
    /**
     * Update the stored output channels. This will replace all objects in the existing collection.
     * @param {Array<object>} newOutputs Collection of audio channel objects for all outputs.
     */
    updateAudioOutputs(newOutputs) {
      if (!checkDefined(newOutputs, 'newOutputs', 'audioStore.updateAudioOutputs')) return

      this.outputs = newOutputs
      let pgmIdx = this.outputs.findIndex((x) => x.Tags.includes('pgm'))
      if (pgmIdx > -1) {
        this.programAudio = this.outputs[pgmIdx]
      }
    },
    /**
     * Update the stored data object containing DSP details.
     * @param {object} dataObject The new DSP details object.
     */
    updateDspInfo(dataObject) {
      if (!checkDefined(dataObject, 'dataObject', 'audioStore.updateDspInfo')) return
      this.dspInfo = dataObject
    },
    /**
     * Update the store with the current state of an existing output channel. This will do nothing if the id of the passed object
     * does not match any outputs in the current collection.
     * @param {object} channelObject The channel data object representing the new state of an existing output.
     */
    updateAudioOutput(channelObject) {
      if (!checkDefined(channelObject, 'channelObject', 'audioStore.updateAudioOutput')) return
      let idx = this.outputs.findIndex((x) => x.id == channelObject.id)
      if (idx > -1) {
        Object.assign(this.outputs[idx], channelObject)
      }
    },
    updateAudioOutputLevel(channelId, level) {
      let index = this.outputs.findIndex((x) => x.Id == channelId, level)
      if (index > -1) {
        this.outputs[index].Level = level
      }
    },
    updateAudioOutputMute(channelId, muteState) {
      let index = this.outputs.findIndex((x) => x.Id == channelId)
      if (index > -1) {
        this.outputs[index].MuteState = muteState
      }
    },
    updateAudioOutputSync(id, hasSync) {
      if (!checkString(id, 'id', 'audioStore.updateAudioOutputSync')) return
      if (!checkBoolean(hasSync, 'hasSync', 'audioStore.updateAudioOutputSync')) return
      let found = this.outputs.find((x) => x.id == id)
      if (found) {
        found.hasSync = hasSync
      } else {
        console.error(`audioStore.updateAudioOutputSync(${id}, ${hasSync}) - no matching ID found.`)
      }
    },
    updateAudioRoute(destId, srcId) {
      let index = this.outputs.findIndex((x) => x.Id == destId)
      if (index > -1) {
        this.outputs[index].RoutedInput = srcId
      } else {
        console.error(
          `audioStore.updateAudioRoute() - no output found with ID ${destId}`
        )
      }
    },
    /**
     * Update the store with the current state of an existing input channel. This will do nothing if the id of the passed object
     * does not match any inputs in the current collection.
     * @param {object} channelObject The channel data object representing the new state of an existing input.
     */
    updateAudioInput(channelObject) {
      if (!checkDefined(channelObject, 'channelObject', 'audioStore.updateAudioInput')) return
      let found = this.inputs.find((x) => x.id == channelObject.id)
      if (found) {
        found = { id: found.id, ...channelObject }
      }
    },
    updateAudioInputLevel(channelId, level) {
      let index = this.inputs.findIndex((x) => x.Id == channelId)
      if (index > -1) {
        this.inputs[index].Level = level
      } else {
        // maybe it's a microphone
        this.updateMicrophoneLevel(channelId, level)
      }
    },
    updateAudioInputMute(channelId, muteState) {
      let index = this.inputs.findIndex((x) => x.id == channelId)
      if (index > -1) {
        this.inputs[index].MuteState = muteState
      } else {
        // maybe it's a microphone
        this.updateMicrophoneMute(channelId, muteState)
      }
    },
    updateAudioInputSync(id, hasSync) {
      if (!checkString(id, 'id', 'audioStore.updateAudioInputSync')) return
      if (!checkBoolean(hasSync, 'hasSync', 'audioStore.updateAudioInputSync')) return

      let found = this.inputs.find((x) => x.id == id)
      if (found) {
        found.hasSync = hasSync
      } else {
        console.error(`audioStore.updateAudioInputSync(${id}, ${hasSync}) - no matching ID found.`)
      }
    },
    /**
     * Update the store with the current state of an existing microphone channel. This will do nothing if the id of the passed object
     * does not match any microphone in the current collection.
     * @param {object} channelObject The channel data object representing the new state of an existing microphone.
     */
    updateMicrophone(channelObject) {
      if (!checkDefined(channelObject, 'channelObject', 'audioStore.updateMicrophone')) return
      let idx = this.mics.findIndex((x) => x.id == channelObject.id)
      if (idx > -1) {
        this.mics[idx] = Object.assign(this.mics[idx], channelObject)
      }
    },
    updateMicrophoneLevel(channelId, level) {
      let index = this.mics.findIndex((x) => x.Id == channelId, level)
      if (index > -1) {
        this.mics[index].Level = level
      }
    },
    updateMicrophoneMute(channelId, muteState) {
      let index = this.mics.findIndex((x) => x.Id == channelId)
      if (index > -1) {
        this.mics[index].MuteState = muteState
      }
    },
    updateMicrophoneZones(micId, zoneInfo) {
      let index = this.mics.findIndex((x) => x.Id == micId)
      if (index < 0) {
        console.error(`audioStore.updateMicrophoneZones() - no microphone found with ID ${micId}`)
        return
      }

      zoneInfo.forEach((zone) => {
        this.mics[index].Zones.forEach((storeZone) => {
          if (storeZone.Id == zone.Id) {
            storeZone.Enabled = zone.Enabled
          }
        })
      })
    },
    /**
     * Send a command to the control system to mute or unmute an input channel.
     * @param {string} inputId The unique ID of the channel to change.
     * @param {boolean} muteState true = send mute active, false = send mute off
     */
    sendMuteInput(inputId, muteState) {
      if (
        !checkString(inputId, 'inputId', 'audioStore.sendMuteInput') ||
        !checkBoolean(muteState, 'muteState', 'audioStore.sendMuteInput')
      ) {
        return
      }

      sendAudioInputMute(inputId, muteState)
    },
    /**
     * Send a command to the control system to mute or unmute an output channel.
     * @param {string} outputId The unique ID of the channel to change.
     * @param {boolean} muteState true = send mute active, false = send mute off
     */
    sendMuteOutput(outputId, newState) {
      if (
        !checkString(outputId, 'outputId', 'audioStore.sendMuteOutput') ||
        !checkBoolean(newState, 'newState', 'audioStore.sendMuteOutput')
      ) {
        return
      }

      sendAudioOutputMute(outputId, newState)
    },
    /**
     * Send a command to the control system to mute or unmute a microphone channel.
     * @param {string} micId The unique ID of the channel to change.
     * @param {boolean} muteState true = send mute active, false = send mute off
     */
    sendMuteMic(micId, newState) {
      if (
        !checkString(micId, 'micId', 'audioStore.sendMuteMic') ||
        !checkBoolean(newState, 'newState', 'audioStore.sendMuteMic')
      ) {
        return
      }

      sendMicrophoneMute(micId, newState)
    },
    /**
     * Send a request to the control system to set the audio level of the target input channel.
     * @param {string} inputId The unique ID of the channel to change
     * @param {number} newLevel 0-100 value representing the level percentage to set
     */
    sendInputLevel(inputId, newLevel) {
      if (
        !checkString(inputId, 'inputId', 'audioStore.sendInputLevel') ||
        !checkNumber(newLevel, 'newLevel', 'audioStore.sendInputLevel')
      ) {
        return
      }

      sendAudioInputLevel(inputId, newLevel)
    },
    /**
     * Send a request to the control system to set the audio level of the target microphone channel.
     * @param {string} micId The unique ID of the channel to change
     * @param {number} newLevel 0-100 value representing the level percentage to set
     */
    sendMicLevel(micId, newLevel) {
      if (
        !checkString(micId, 'micId', 'audioStore.sendMicLevel') ||
        !checkNumber(newLevel, 'newLevel', 'audioStore.sendMicLevel')
      ) {
        return
      }

      sendMicrophoneLevel(micId, newLevel)
    },
    /**
     * Send a request to the control system to set the audio level of the target output channel.
     * @param {string} outputId The unique ID of the channel to change
     * @param {number} newLevel 0-100 value representing the level percentage to set
     */
    sendOutputLevel(outputId, newLevel) {
      if (
        !checkString(outputId, 'outputId', 'audioStore.sendOutputLevel') ||
        !checkNumber(newLevel, 'newLevel', 'audioStore.sendOutputLevel')
      ) {
        return
      }

      sendAudioOutputLevel(outputId, newLevel)
    },
    /**
     * Send a command to the control that will rout the target audio input to the target output.
     * @param {string} inputId The unique ID of the input to route
     * @param {string} outputId The unique ID of the output that will be changed
     */
    sendAudioRoute(inputId, outputId) {
      if (
        !checkString(inputId, 'inputId', 'audioStore.sendAudioRoute') ||
        !checkString(outputId, 'outputId', 'audioStore.sendAudioRoute')
      ) {
        return
      }

      sendMatrixAudioRoute(outputId, inputId)
    },
    /**
     * Send an audio input to all audio output zones. Does nothing and logs an error if argument 'inputId' is undefined or not a string.
     * @param {string} inputId The unique ID of the audio input to route to all output zones.
     */
    sendAudioRouteToAll(inputId) {
      if (!checkString(inputId, 'inputId', 'audioStore.sendAudioRouteToAll')) return
      this.outputs.forEach(output => sendMatrixAudioRoute(output.Id, inputId))
    },
    /**
     * Send a command to the control to disable or enable the target mic in the target output zone.
     * @param {string} micId The unique ID of the mic to change
     * @param {string} outputId The unique ID of the output that will have the mic enabled or disabled
     * @param {boolean} newState true = enable mic in that zone, false = disable mic for the zone
     */
    sendMicOutputEnable(micId, outputId, newState) {
      if (
        !checkString(micId, 'micId', 'audioStore.sendMicOutputEnable') ||
        !checkString(outputId, 'outputId', 'audioStore.sendMicOutputEnable') ||
        !checkBoolean(newState, 'newState', 'audioStore.sendMicOutputEnable')
      ) {
        return
      }
      sendMicrophoneZoneEnable(micId, outputId, newState)
    }
  }
})
