import { defineStore } from 'pinia'
import { checkString, checkBoolean, checkDefined } from '@/data/validators'
import { useRootStore } from './rootStore'
import { useToast } from "vue-toastification";
import {
  sendVideoConfigQuery,
  sendDisplaysConfigQuery,
  sendGlobalBlank,
  sendGlobalFreeze,
  sendMatrixVideoRoute,
  sendDisplayPower,
  sendScreenControl,
  sendDisplayInputSelect
} from '@/plugins/crestronCom/commands/videoCommands'
import {computed, ref} from "vue";
import {useErrorStore} from "@/stores/errorStore.js";

export const emptySource = {
  Id: 'evs01',
  Label: 'Empty Source',
  Icon: 'laptop',
  Control: '',
  HasSync: false,
  Tags: ''
}

export const emptyDestination = {
  Id: 'evd01',
  Label: 'Empty Destination',
  Icon: '',
  CurrentSourceId: '',
  Tags: ''
}

export const emptyDisplay = {
  Manufacturer: '',
  Model: '',
  Id: '',
  Label: '',
  Icon: '',
  IsOnline: false,
  HasScreen: true,
  PowerState: false,
  Tags: '',
  Inputs: []
}

/**
 * State management for display control and video routing.
 * Update actions are intended to be called by the communication service with the control system and not by the vue application itself.
 */
export const useVideoStore = defineStore('videoStore', () => {

  const errorStore = useErrorStore()
  const rootStore = useRootStore()
  const toast = useToast()
  
  /**
   * A collection of objects representing all controllable displays/projectors in the system.
   */
  const displays = ref([])
  /**
   * A collection of objects representing selectable AV sources in the system.
   */
  const sources = ref([])
  /**
   * A collection of objects representing selectable AV destinations in the system.
   */
  const destinations = ref([])
  
  /**
   * true = all video outputs are in the "freeze" state, false = normal video motion.
   */
  const globalFreezeActive = ref(false)
  
  /**
   * true = all video outputs are blanked (not showing video), false = all outputs showing video.
   */
  const globalBlankActive =  ref(false)
  
  /**
   * A collection of objects representing video routing devices in the system. This will contain
   * make/model and online status.
   */
  const avrRouters = ref([])
  
  const selectableSources = computed((state) => {
    if (rootStore.isTech) {
      return sources.value
    }
    
    return sources.value.length > 0 ? 
        sources.value.filter((x) => !x.Tags.includes('tech')) :
        []
  })
  
  function requestConfigUpdate() {
    sendVideoConfigQuery()
    sendDisplaysConfigQuery()
  }
  
  /**
   * Update the store with all possible AV sources that can be selected for routing.
   * @param newSources A collection of source objects that will be displayed on the UI.
   */
  function updateSources(newSources) {
    if (!checkDefined(newSources, 'newSources', 'videoStore.updateSources')) return false
    sources.value = newSources
  }
  
  /**
   * Update the store with all possible AV destinations that can be selected for routing.
   * @param newDestinations A collection of destination objects that will be displayed on the UI.
   */
  function updateDestinations(newDestinations) {
    if (!checkDefined(newDestinations, 'newDestinations', 'videoStore.updateDestinations'))
      return false
    destinations.value = newDestinations
  }
  
  /**
   * Updates an existing destination state based on the supplied object if there is a matching id. This will replace the
   * existing object in the collection.
   * @param destinationObject The destination data object with the id and new state data to update.
   */
  function updateDestinationStatus(destinationObject) {
    if (
      !checkDefined(destinationObject, 'destinationObject', 'videoStore.updateDestinationStatus')
    ) {
      return false
    }

    let index = destinations.value.findIndex((x) => x.Id === destinationObject.Id)
    if (index >= 0) {
      destinations.value[index] = destinationObject
    }
  }
  
  /**
   * Updates an existing source state based on the supplied object if there is a matching id. This will replace the
   * existing object in the collection.
   * @param sourceObject The source data object with the id and new state data to update.
   */
  function updateSourceStatus(sourceObject) {
    if (!checkDefined(sourceObject, 'sourceObject', 'videoStore.updateSourceStatus')) return false

    let index = this.sources.findIndex((x) => x.Id === sourceObject.Id)
    if (index >= 0) {
      sources.value[index] = sourceObject
    }
  }
  
  /**
   * Updates existing routing state of the video destination.
   * @param {string} destId the id of the destination that changed.
   * @param {string} srcId the id of the source that was routed.
   */
  function updateVideoRoute(destId, srcId) {
    if (destinations.value.length === 0) return
    
    let index = destinations.value.findIndex((x) => x.Id === destId)
    if (index > -1) {
      destinations.value[index].CurrentSourceId = srcId
    } else {
      console.error(`videoStore.updateVideoRoute() - no destination with id ${destId}`)
    }
  }
  
  /**
   * Update the store with all possible AV destinations that can be selected for routing.
   * @param newDisplays A collection of display objects that will be displayed on the UI.
   */
  function updateDisplays(newDisplays) {
    if (!checkDefined(newDisplays, 'newDisplays', 'videoStore.updateDisplays')) return false
    
    displays.value.forEach((x) => {errorStore.removeError(x.Id)})
    displays.value = newDisplays
    displays.value.forEach(item => {
      if (!item.IsOnline) {
        errorStore.addError(item.Id, `${item.Label} is offline.`)
      }
    })
  }
  
  function updateDisplay(display) {
    if (!checkDefined(display, 'display', 'videoStore.updateDisplay')) return false
    if (displays.value.length === 0) return

    let idx = displays.value.findIndex((x) => x.Id === display.Id)
    if (idx < 0) {
      console.error('videoStore.UpdateDisplay() - no display found with ID ' + display.Id)
      return
    }

    displays.value[idx] = display
    if (display.IsOnline) {
      errorStore.removeError(display.Id)
    } else {
      errorStore.addError(display.Id, `Display ${display.Label} is offline.`)
    }
  }
  
  /**
   * update the store with whether all video outputs are blanked
   * @param {boolean} newState true - blank is active, false = normal video output
   */
  function updateGlobalVideoBlank(newState) {
    if (!checkBoolean(newState, 'newState', 'videoStore.updateGlobalVideoBlank')) return false
    globalBlankActive.value = newState
  }
  
  /**
   * update the store with whether all video outputs are frozen.
   * @param {boolean} newState  true - freeze is active, false = normal video output
   */
  function updateGlobalVideoFreeze(newState) {
    if (!checkBoolean(newState, 'newState', 'videoStore.updateGlobalVideoFreeze')) return false
    globalFreezeActive.value = newState
  }
  
  /**
   * Updated the stored AVR information. This will replace the existing data object.
   * @param {Array<object>} dataObject The AVR information object containing make, model, online status, and id
   */
  function updateAvrInfo(dataObject) {
    if (!checkDefined(dataObject, 'dataObject', 'videoStore.updateAvrInfo')) return false

    if (!dataObject) return
    avrRouters.value = dataObject
    avrRouters.value.forEach(item => {
      if (!item.IsOnline) { errorStore.addError(item.Id, `${item.Label} is offline.`) }
    })
  }
  
  function updateAvrDevice(avr) {
    let idx = avrRouters.value.findIndex((x) => x.Id === avr.Id)
    if (idx < 0) {
      console.error('videoStore.updateAvrConnectionStats() - no AVR found with ID ' + avr.Id)
      return
    }
    
    avrRouters.value[idx] = avr
    if (avr.IsOnline) {
      errorStore.removeError(avr.Id)
    } else {
      errorStore.addError(avr.Id, `AVR ${avr.Label} is offline.`)
    }
  }
  
  /**
   * Send a request to the control system to change the current video blank status of all outputs.
   * @param {boolean} newState true = set blank active, false = set normal output.
   */
  function sendGlobalVideoBlank(newState) {
    if (!checkBoolean(newState, 'newState', 'videoStore.sendGlobalVideoBlank')) return false
    sendGlobalBlank(newState)
  }
  
  /**
   * Send a request to the control system to change the current video freeze status of all outputs.
   * @param {boolean} newState true = set freeze active, false = set normal output.
   */
  function sendGlobalVideoFreeze(newState) {
    if (!checkBoolean(newState, 'newState', 'videoStore.sendGlobalVideoFreeze')) return false
    sendGlobalFreeze(newState)
  }
  
  /**
   * Send a request to the control to change the power state of the target display.
   * @param {string} displayId the unique ID of the display to control.
   * @param {boolean} newState true = turn display on, false = turn display off.
   */
  function sendSingleDisplayPower(displayId, newState) {
    if (
      !checkString(displayId, 'displayId', 'videoStore.sendDisplayPower') ||
      !checkBoolean(newState, 'newState', 'videoStore.sendDisplayPower')
    ) {
      return
    }
    
    let index = displays.value.findIndex((x) => x.Id === displayId)
    if (index > -1) {
      toast.info(`${displays.value[index].Label} is turning ${newState ? 'on' : 'off'}`, {timeout: 10000})
    }
    
    sendDisplayPower(displayId, newState)
  }
  
  /**
   * send a command to the control to raise or lower a projector screen.
   * @param {string} displayId The unique ID of the display associated with the target screen
   * @param {boolean} raiseLower true = raise screen, false = lower screen.
   */
  function sendDisplayScreenControl(displayId, raiseLower) {
    if (
      !checkString(displayId, 'displayId', 'videoStore.sendScreenControl') ||
      !checkBoolean(raiseLower, 'raiseLower', 'videoStore.sendScreenControl')
    ) {
      return
    }

    sendScreenControl(displayId, raiseLower)
  }
  
  /**
   * Send a command to the control system to change the selected input on the display.
   * @param {string} displayId The unique ID of the display being updated
   * @param {string} inputId the unique ID of the input being selected on the display.
   */
  function sendDisplayInputChange(displayId, inputId) {
    sendDisplayInputSelect(displayId, inputId)
  }
  
  /**
   * Send a video request to the control system for the given source/destination pair.
   * @param {string} sourceId The unique ID of the source that will be routed
   * @param {string} destinationId The unique ID of the destination that will receive the new source.
   */
  function sendVideoRoute(sourceId, destinationId) {
    if (
      !checkString(sourceId, 'sourceId', 'videoStore.sendVideoRoute') ||
      !checkString(destinationId, 'destinationId', 'videoStore.sendVideoRoute')
    ) {
      return
    }

    sendMatrixVideoRoute(destinationId, sourceId)
  }
  
  /**
   * send a route request to the control to send the target source to all routable destinations.
   * @param {string} sourceId the unique ID of the source to route.
   */
  function sendRouteToAll(sourceId) {
    if (!checkString(sourceId, 'sourceId', 'videoStore.sendRouteToAll')) return
    destinations.value.forEach((item) => {
      sendMatrixVideoRoute(item.Id, sourceId)
    })
  }
  
  return {
    displays,
    sources,
    destinations,
    globalFreezeActive,
    globalBlankActive,
    avrRouters,
    selectableSources,
    requestConfigUpdate,
    updateSources,
    updateDestinations,
    updateDestinationStatus,
    updateSourceStatus,
    updateVideoRoute,
    updateDisplays,
    updateDisplay,
    updateGlobalVideoBlank,
    updateGlobalVideoFreeze,
    updateAvrInfo,
    updateAvrDevice,
    sendGlobalVideoBlank,
    sendSingleDisplayPower,
    sendDisplayScreenControl,
    sendDisplayInputChange,
    sendVideoRoute,
    sendGlobalVideoFreeze,
    sendRouteToAll,
  }
})
