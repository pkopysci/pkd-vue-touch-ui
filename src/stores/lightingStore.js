import { defineStore } from 'pinia'
import { checkString, checkDefined, checkNumber } from '@/data/validators'
import {
  sendLightingCongifQuery,
  sendSceneSelectCommand,
  sendLoadLevelCommand,
  sendSelectedSceneQuery
} from '@/plugins/crestronCom/commands/lightingCommands'
import {ref} from "vue";
import {useErrorStore} from "@/stores/errorStore.js";

export const useLightingStore = defineStore('lightingStore', () => {
  const errorStore = useErrorStore()
  
  const zones = ref([])
  const scenes = ref([])
  const controllerIds = ref([])
  
  function updateConfig(config) {
    if (!checkDefined(config, 'controlCollection', 'lightingStore.updateConfig')) {
      return
    }

    try {
      let newZones = []
      let newScenes = []
      let newControllerIds = []

      config.forEach((controller) => {
        newControllerIds.push(controller.Id)
        controller.Scenes.forEach((scene) => {
          newScenes.push({ ...scene, ControlId: controller.Id })
        })
        controller.Zones.forEach((zone) => {
          newZones.push({ ...zone, ControlId: controller.Id })
        })
      })

      scenes.value = newScenes
      zones.value = newZones
      controllerIds.value = newControllerIds
    } catch (err) {
      console.error(`lightingStore.updateLightingControllers() - ${err}`)
    }
  }

  /**
   * Searches through the existing scene collection and updates the first scene with a matching
   * controlId and sceneId provided in the argument object.
   * @param {string} sceneId Data object containing updated information on a single scene.
   */
  function updateSelectedScene(sceneId) {
    if (!checkString(sceneId, 'sceneId', 'lightingStore.updateSelectedScene')) {
      return
    }
    scenes.value.forEach((x) => (x.Set = x.Id === sceneId))
  }
  
  /**
   * @param {string} controlId The id of the controller to update
   * @param {boolean} isOnline true = online, false = offline
   */
  function updateLightingControlConnectionStatus(controlId, isOnline) {
    if (isOnline) {
      errorStore.removeError(controlId)
    } else {
      errorStore.addError(controlId, "Lighting controller is offline.")
    }
  }
  
  /**
   * Query the control for the current lighting configuration.
   */
  function requestConfigUpdate() {
    sendLightingCongifQuery()
  }

    
    /**
     * Search and update the existing zone collection and update the zone that matches the argument
     * object id with the argument object load.
     * @param {string} zoneId The unique ID of the zone being updated.
     * @param {number} newLevel the 0-100 value representing the new load level.
     */
    function updateLightingZoneLoad(zoneId, newLevel) {
      if (!checkString(zoneId, 'zoneData', 'lightingStore.updateSingleLightingZone()')) {
        return
      }

      try {
        zones.value.forEach((x) => {
          if (x.Id === zoneId) {
            x.Load = newLevel
          }
        })
      } catch (error) {
        console.err(`lightingStore.updateSingleLightingZone() - ${error}`)
      }
    }
    
    /**
     * Query the target controller for the currently selected zone ID.
     * @param {string} controlId The unique ID of the controller to query.
     */
    function querySelectedLightingScene(controlId) {
      if (!checkString(controlId, 'controlId', 'lightingStore.querySelectedLightingScene')) {
        return
      }

      sendSelectedSceneQuery(controlId)
    }
    
    /**
     * Send a command to recall the target lighting scene.
     * @param {string} controlId The unique ID of the lighting controller to change
     * @param {string} sceneId The unique ID of the lighting scene to recall
     */
    function setSelectedScene(controlId, sceneId) {
      if (
        !checkString(controlId, 'controlId', 'lightingStore.setSelectedScene') ||
        !checkString(sceneId, 'sceneId', 'lightingStore.setSelectedScene')
      ) {
        return
      }
      sendSceneSelectCommand(controlId, sceneId)
    }
    
    /**
     * Send a command to change the target lighting load level.
     * @param {string} controlId The unique ID of the lighting controller to change
     * @param {string} zoneId The unique ID of the lighting zone to change
     * @param {number} level 0-100 value representing the percentage of load to set.
     */
    function setLoadLevel(controlId, zoneId, level) {
      if (
        !checkString(controlId, 'controlId', 'lightingStore.setLoadLevel') ||
        !checkString(zoneId, 'sceneId', 'lightingStore.setLoadLevel') ||
        !checkNumber(level, 'level', 'lightingStore.setLoadLevel') ||
        level < 0 ||
        level > 100
      ) {
        console.error(
          `lightingStore.setLoadLevel - level ${level} must be greater than zero and less than/equal to 100.`
        )
        return
      }

      sendLoadLevelCommand(controlId, zoneId, level)
    }
  
  return {
    zones,
    scenes,
    controllerIds,
    requestConfigUpdate,
    updateConfig,
    updateLightingZoneLoad,
    updateSelectedScene,
    updateLightingControlConnectionStatus,
    querySelectedLightingScene,
    setSelectedScene,
    setLoadLevel,
  }
})
