import { defineStore } from "pinia";
import {ref} from "vue";
import { checkString, checkDefined, checkNumber, checkBoolean } from '@/data/validators'
import {
    sendMicrophoneLevel,
    sendAudioConfigQuery,
    sendAudioOutputLevel,
    sendAudioOutputMute,
    sendMicrophoneMute,
    sendMicrophoneZoneEnable,
    sendMatrixAudioRoute
} from '@/plugins/crestronCom/commands/audioCommands'
import {useErrorStore} from "@/stores/errorStore.js";

export const emptyChannel = {
    Id: 'emptyChannel',
    Label: 'Empty Channel',
    Icon: '',
    Zones: [],
    HasSync: false,
    MuteState: false,
    Level: 75,
    Tags: ['pgm'],
    RoutedInput: ''
}

export const useAudioStore = defineStore('audioStore', () => {
    const errorStore = useErrorStore()
    
    const inputs = ref([])
    const outputs = ref([])
    const audioDevices = ref([])
    const mics = ref([])
    const programAudio = ref()
    
    function requestConfigUpdate() {
        sendAudioConfigQuery()
    }

    /**
     * Update the input and microphone channels. this will separate the newInputs collection based on
     * if an individual channel has the 'mic' tag.  This will replace all objects in the existing collection
     * @param {Array<object>} newInputs Collection of audio channel objects for all inputs ands mics.
     */
    function updateAudioInputs(newInputs) {
        if (!checkDefined(newInputs, 'newInputs', 'audioStore.updateAudioInputs')) return
        let audioIns = []
        let newMics = []
        newInputs.forEach((item) => {
            if (item.Tags.includes('microphone')) {
                newMics.push(item)
            } else {
                audioIns.push(item)
            }
        })

        inputs.value = audioIns
        mics.value = newMics
    }

    /**
     * Update the stored output channels. This will replace all objects in the existing collection.
     * @param {Array<object>} newOutputs Collection of audio channel objects for all outputs.
     */
    function updateAudioOutputs(newOutputs) {
        if (!checkDefined(newOutputs, 'newOutputs', 'audioStore.updateAudioOutputs')) return

        outputs.value = newOutputs
        let pgmIdx = outputs.value.findIndex((x) => x.Tags.includes('pgm'))
        if (pgmIdx > -1) {
            programAudio.value = outputs.value[pgmIdx]
        }
    }

    /**
     * Update the stored collection of audio control devices.
     * @param {array<object>} dataObject The new  collection of audio devices.
     */
    function updateDspInfo(dataObject) {
        if (!checkDefined(dataObject, 'dataObject', 'audioStore.updateDspInfo')) return
        audioDevices.value = dataObject
    }

    /**
     * update the information on a specific audio control device.
     * @param {object} newDevice The data object that will replace one in the current collection if found.
     */
    function updateAudioDevice(newDevice) {
        let idx = audioDevices.value.findIndex((x) => x.Id === newDevice.Id)
        if (idx > -1) {
            console.error`audioStore.updateAudioDevice() - no device found with ID ${newDevice.Id}`
            return
        }

        audioDevices.value[idx] = newDevice
        if(newDevice.IsOnline) {
            errorStore.removeError(newDevice.Id)
        } else {
            errorStore.addError(newDevice.Id, `${newDevice.Label} is offline.`)
        }
    }

    /**
     * Update the store with the current state of an existing output channel. This will do nothing if the id of the passed object
     * does not match any outputs in the current collection.
     * @param {object} channelObject The channel data object representing the new state of an existing output.
     */
    function updateAudioOutput(channelObject) {
        if (!checkDefined(channelObject, 'channelObject', 'audioStore.updateAudioOutput')) return
        let idx = outputs.value.findIndex((x) => x.id === channelObject.id)
        if (idx > -1) {
            Object.assign(outputs.value[idx], channelObject)
        }
    }

    /**
     * Update an existing output channel with a new 0-100 level value.
     * @param {string} channelId the id of the output channel to update.
     * @param {number} level the 0-100 value representing the new level of the channel.
     */
    function updateAudioOutputLevel(channelId, level) {
        let index = outputs.value.findIndex((x) => x.Id === channelId, level)
        if (index > -1) {
            outputs.value[index].Level = level
        }
    }

    /**
     * Update the current audio mute state of an existing output channel
     * @param channelId the id of the channel being updated.
     * @param muteState true = mute active (no audio), false = mute inactive (passing audio).
     */
    function updateAudioOutputMute(channelId, muteState) {
        let index = outputs.value.findIndex((x) => x.Id === channelId)
        if (index > -1) {
            outputs.value[index].MuteState = muteState
        }
    }

    /**
     * Update the current audio input that is routed to an existing output zone.
     * @param destId the id of the output channel/zone being updated.
     * @param srcId the id of the input that was routed.
     */
    function updateAudioRoute(destId, srcId) {
        let index = outputs.value.findIndex((x) => x.Id === destId)
        if (index > -1) {
            outputs.value[index].RoutedInput = srcId
        } else {
            console.error(
                `audioStore.updateAudioRoute() - no output found with ID ${destId}`
            )
        }
    }

    /**
     * Update an input chanel with a new 0-100 level. If the channel is a microphone then 
     * updateMicrophoneLevel() is called from this function.
     * @param channelId the id of an existing input channel being updated.
     * @param level the new 0-100 value representing the audio level.
     */
    function updateAudioInputLevel(channelId, level) {
        let index = inputs.value.findIndex((x) => x.Id === channelId)
        if (index > -1) {
            inputs.value[index].Level = level
        } else {
            // maybe it's a microphone
            updateMicrophoneLevel(channelId, level)
        }
    }

    /**
     * Update an existing input channel with the new mute state. if the channel is a microphone then
     * updateMicrophoneMute() is called from this function.
     * @param channelId the id of the input channel being updated.
     * @param muteState true = mute active (no audio), false = mute inactive (passing audio).
     */
    function updateAudioInputMute(channelId, muteState) {
        let index = inputs.value.findIndex((x) => x.id === channelId)
        if (index > -1) {
            inputs.value[index].MuteState = muteState
        } else {
            // maybe it's a microphone
            updateMicrophoneMute(channelId, muteState)
        }
    }

    /**
     * Update an existing microphone input channel with a new level.
     * @param channelId the id of the channel being updated.
     * @param level a 0-100 value representing the new audio level.
     */
    function updateMicrophoneLevel(channelId, level) {
        let index = mics.value.findIndex((x) => x.Id === channelId)
        if (index > -1) {
            mics.value[index].Level = level
        }
    }

    /**
     * update an existing microphone channel with a new mute state.
     * @param channelId the id of the microphone channel to update.
     * @param muteState true = muted (no audio), false = not muted (passing audio).
     */
    function updateMicrophoneMute(channelId, muteState) {
        let index = mics.value.findIndex((x) => x.Id === channelId)
        if (index > -1) {
            mics.value[index].MuteState = muteState
        }
    }

    /**
     * Update an existing microphone channel with the new enabled state for each output zone that mic 
     * can be routed to.
     * @param { string } micId the id of the microphone channel being updated.
     * @param { {Id, Enabled} } zoneInfo a collection with the new state of all zone enable data.
     */
    function updateMicrophoneZones(micId, zoneInfo) {
        let index = mics.value.findIndex((x) => x.Id === micId)
        if (index < 0) {
            console.error(`audioStore.updateMicrophoneZones() - no microphone found with ID ${micId}`)
            return
        }

        zoneInfo.forEach((zone) => {
            mics.value[index].Zones.forEach((storeZone) => {
                if (storeZone.Id === zone.Id) {
                    storeZone.Enabled = zone.Enabled
                }
            })
        })
    }

    /**
     * Send a command to the control system to mute or unmute an output channel.
     * @param {string} outputId The unique ID of the channel to change.
     * @param {boolean} newState true = send mute active, false = send mute off
     */
    function sendMuteOutput(outputId, newState) {
        if (
            !checkString(outputId, 'outputId', 'audioStore.sendMuteOutput') ||
            !checkBoolean(newState, 'newState', 'audioStore.sendMuteOutput')
        ) {
            return
        }

        sendAudioOutputMute(outputId, newState)
    }

    /**
     * Send a command to the control system to mute or unmute a microphone channel.
     * @param {string} micId The unique ID of the channel to change.
     * @param {boolean} newState true = send mute active, false = send mute off
     */
    function sendMuteMic(micId, newState) {
        if (
            !checkString(micId, 'micId', 'audioStore.sendMuteMic') ||
            !checkBoolean(newState, 'newState', 'audioStore.sendMuteMic')
        ) {
            return
        }

        sendMicrophoneMute(micId, newState)
    }

    /**
     * Send a request to the control system to set the audio level of the target microphone channel.
     * @param {string} micId The unique ID of the channel to change
     * @param {number} newLevel 0-100 value representing the level percentage to set
     */
    function sendMicLevel(micId, newLevel) {
        if (
            !checkString(micId, 'micId', 'audioStore.sendMicLevel') ||
            !checkNumber(newLevel, 'newLevel', 'audioStore.sendMicLevel')
        ) {
            return
        }

        sendMicrophoneLevel(micId, newLevel)
    }

    /**
     * Send a request to the control system to set the audio level of the target output channel.
     * @param {string} outputId The unique ID of the channel to change
     * @param {number} newLevel 0-100 value representing the level percentage to set
     */
    function sendOutputLevel(outputId, newLevel) {
        if (
            !checkString(outputId, 'outputId', 'audioStore.sendOutputLevel') ||
            !checkNumber(newLevel, 'newLevel', 'audioStore.sendOutputLevel')
        ) {
            return
        }

        sendAudioOutputLevel(outputId, newLevel)
    }

    /**
     * Send a command to the control that will rout the target audio input to the target output.
     * @param {string} inputId The unique ID of the input to route
     * @param {string} outputId The unique ID of the output that will be changed
     */
    function sendAudioRoute(inputId, outputId) {
        if (
            !checkString(inputId, 'inputId', 'audioStore.sendAudioRoute') ||
            !checkString(outputId, 'outputId', 'audioStore.sendAudioRoute')
        ) {
            return
        }

        sendMatrixAudioRoute(outputId, inputId)
    }

    /**
     * Send a command to the control to disable or enable the target mic in the target output zone.
     * @param {string} micId The unique ID of the mic to change
     * @param {string} outputId The unique ID of the output that will have the mic enabled or disabled
     * @param {boolean} newState true = enable mic in that zone, false = disable mic for the zone
     */
    function sendMicOutputEnable(micId, outputId, newState) {
        if (
            !checkString(micId, 'micId', 'audioStore.sendMicOutputEnable') ||
            !checkString(outputId, 'outputId', 'audioStore.sendMicOutputEnable') ||
            !checkBoolean(newState, 'newState', 'audioStore.sendMicOutputEnable')
        ) {
            return
        }
        sendMicrophoneZoneEnable(micId, outputId, newState)
    }
    
    return {
        inputs,
        outputs,
        audioDevices,
        mics,
        programAudio,
        requestConfigUpdate,
        updateAudioInputs,
        updateAudioOutputs,
        updateDspInfo,
        updateAudioDevice,
        updateAudioOutput,
        updateAudioOutputLevel,
        updateAudioOutputMute,
        updateAudioRoute,
        updateAudioInputLevel,
        updateAudioInputMute,
        updateMicrophoneLevel,
        updateMicrophoneMute,
        updateMicrophoneZones,
        sendMuteOutput,
        sendMuteMic,
        sendMicLevel,
        sendOutputLevel,
        sendAudioRoute,
        sendMicOutputEnable
    }
})