import { defineStore } from 'pinia'
import { checkString, checkBoolean, checkDefined } from '@/data/validators'
import { useRootStore } from './rootStore'
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
export const useVideoStore = defineStore('videoStore', {
  state: () => ({
    /**
     * A collection of objects representing all controllable displays/projectors in the system.
     */
    displays: [],
    /**
     * A collection of objects representing selectable AV sources in the system.
     */
    sources: [],
    /**
     * A collection of objects representing selectable AV destinations in the system.
     */
    destinations: [],
    /**
     * true = all video outputs are in the "freeze" state, false = normal video motion.
     */
    globalFreezeActive: false,
    /**
     * true = all video outputs are blanked (not showing video), false = all outputs showing video.
     */
    globalBlankActive: false,
    /**
     * A collection of objects representing video routing devices in the system. This will contain
     * make/model and online status.
     */
    avrRouters: [{ Label: 'Default AVR' }]
  }),
  getters: {
    selectableSources: (state) => {
      let rootStore = useRootStore()
      if (rootStore.isTech) {
        return state.sources
      } else {
        return state.sources.filter((x) => !x.Tags.includes('tech'))
      }
    }
  },
  actions: {
    requestConfigUpdate() {
      sendVideoConfigQuery()
      sendDisplaysConfigQuery()
    },
    /**
     * Update the store with all possible AV sources that can be selected for routing.
     * @param newSources A collection of source objects that will be displayed on the UI.
     */
    updateSources(newSources) {
      if (!checkDefined(newSources, 'newSources', 'videoStore.updateSources')) return false
      this.sources = newSources
    },
    /**
     * Update the store with all possible AV destinations that can be selected for routing.
     * @param newSources A collection of destination objects that will be displayed on the UI.
     */
    updateDestinations(newDestinations) {
      if (!checkDefined(newDestinations, 'newDestinations', 'videoStore.updateDestinations'))
        return false
      this.destinations = newDestinations
    },
    /**
     * Updates an existing destination state based on the supplied object if there is a matching id. This will replace the
     * existing object in the collection.
     * @param destinationObject The destination data object with the id and new state data to update.
     */
    updateDestinationStatus(destinationObject) {
      if (
        !checkDefined(destinationObject, 'destinationObject', 'videoStore.updateDestinationStatus')
      ) {
        return false
      }

      let index = this.destinations.findIndex((x) => x.Id == destinationObject.Id)
      if (index >= 0) {
        this.destinations[index] = destinationObject
      }
    },
    /**
     * Updates an existing source state based on the supplied object if there is a matching id. This will replace the
     * existing object in the collection.
     * @param sourceObject The source data object with the id and new state data to update.
     */
    updateSourceStatus(sourceObject) {
      if (!checkDefined(sourceObject, 'sourceObject', 'videoStore.updateSourceStatus')) return false

      let index = this.sources.findIndex((x) => x.Id == sourceObject.Id)
      if (index >= 0) {
        this.sources[index] = sourceObject
      }
    },
    /**
     * Updates existing routing state of the destinations in the passed object.
     * @param routeData The routing object that includes the collection of destination ids and the source routed to them.
     */
    updateVideoRoute(destId, srcId) {
      let index = this.destinations.findIndex((x) => x.Id == destId)
      if (this.destinations.length == 0) return
      
      if (index > -1) {
        this.destinations[index].CurrentSourceId = srcId
      } else {
        console.error(`videoStore.updateVideoRoute() - no destination with id ${destId}`)
      }
    },
    /**
     * Update the store with all possible AV destinations that can be selected for routing.
     * @param newDisplays A collection of display objects that will be displayed on the UI.
     */
    updateDisplays(newDisplays) {
      if (!checkDefined(newDisplays, 'newDisplays', 'videoStore.updateDisplays')) return false
      this.displays = newDisplays
    },
    updateDisplay(display) {
      if (!checkDefined(display, 'display', 'videoStore.updateDisplay')) return false
      if (this.displays.length == 0) return

      let idx = this.displays.findIndex((x) => x.Id == display.Id)
      if (idx < 0) {
        console.error('videoStore.UpdateDisplay() - no display found with ID ' + display.Id)
        return
      }

      this.displays[idx] = display
    },
    /**
     * update the store with whether or not all video outputs are blanked
     * @param {boolean} newState true - blank is active, false = normal video output
     */
    updateGlobalVideoBlank(newState) {
      if (!checkBoolean(newState, 'newState', 'videoStore.updateGlobalVideoBlank')) return false
      this.globalBlankActive = newState
    },
    /**
     * update the store with whether or not ll video outputs are frozen.
     * @param {boolean} newState  true - freeze is active, false = normal video output
     */
    updateGlobalVideoFreeze(newState) {
      if (!checkBoolean(newState, 'newState', 'videoStore.updateGlobalVideoFreeze')) return false
      this.globalFreezeActive = newState
    },
    /**
     * Updated the stored AVR information. This will replace the existing data object.
     * @param {Array<object>} dataObject The AVR information object containing make, model, online status, and id
     */
    updateAvrInfo(dataObject) {
      if (!checkDefined(dataObject, 'dataObject', 'videoStore.updateAvrInfo')) return false

      if (dataObject) {
        this.avrInfo = dataObject
      }
    },
    /**
     * Send a request to the control system to change the current video blank status of all outputs.
     * @param {boolean} newState true = set blank active, false = set normal output.
     */
    sendGlobalVideoBlank(newState) {
      if (!checkBoolean(newState, 'newState', 'videoStore.sendGlobalVideoBlank')) return false
      sendGlobalBlank(newState)
    },
    /**
     * Send a request to the control system to change the current video freeze status of all outputs.
     * @param {boolean} newState true = set freeze active, false = set normal output.
     */
    sendGlobalVideoFreeze(newState) {
      if (!checkBoolean(newState, 'newState', 'videoStore.sendGlobalVideoFreeze')) return false
      sendGlobalFreeze(newState)
    },
    /**
     * Send a request to the control to change the power state of the target display.
     * @param {string} displayId the unique ID of the display to control.
     * @param {boolean} newState true = turn display on, false = turn display off.
     */
    sendDisplayPower(displayId, newState) {
      if (
        !checkString(displayId, 'displayId', 'videoStore.sendDisplayPower') ||
        !checkBoolean(newState, 'newState', 'videoStore.sendDisplayPower')
      ) {
        return
      }

      sendDisplayPower(displayId, newState)
    },
    /**
     * send a command to the control to raise or lower a projector screen.
     * @param {string} displayId The unique ID of the display associated with the target screen
     * @param {boolean} raseLower true = raise screen, false = lower screen.
     */
    sendScreenControl(displayId, raiseLower) {
      if (
        !checkString(displayId, 'displayId', 'videoStore.sendScreenControl') ||
        !checkBoolean(raiseLower, 'raiseLower', 'videoStore.sendScreenControl')
      ) {
        return
      }

      sendScreenControl(displayId, raiseLower)
    },
    /**
     * Send a command to the control system to change the selected input on the display.
     * @param {string} displayId The unique ID of the display being updated
     * @param {string} inputId the unique ID of the input being selected on the display.
     */
    sendDisplayInputChange(displayId, inputId) {
      sendDisplayInputSelect(displayId, inputId)
    },
    /**
     * Send a video request to the control system for the given source/destination pair.
     * @param {string} sourceId The unique ID of the source that will be routed
     * @param {string} destinationId The unique ID of the destination that will recieve the new source.
     */
    sendVideoRoute(sourceId, destinationId) {
      if (
        !checkString(sourceId, 'sourceId', 'videoStore.sendVideoRoute') ||
        !checkString(destinationId, 'destinationId', 'videoStore.sendVideoRoute')
      ) {
        return
      }

      sendMatrixVideoRoute(destinationId, sourceId)
    },
    /**
     * send a route request to the control to send the target source to all routable destinations.
     * @param {string} sourceId the unique ID of the source to route.
     */
    sendRouteToAll(sourceId) {
      if (!checkString(sourceId, 'sourceId', 'videoStore.sendRouteToAll')) return
      this.destinations.forEach((item) => {
        sendMatrixVideoRoute(item.Id, sourceId)
      })
    }
  }
})
