import { defineStore } from 'pinia'
import { checkString, checkDefined, checkNumber } from '@/data/validators'
import {
  sendLightingCongifQuery,
  sendSceneSelectCommand,
  sendLoadLevelCommand,
  sendSelectedSceneQuery
} from '@/plugins/crestronCom/commands/lightingCommands'
import { testLightingScenes, testLightingZones } from '@/data/TestData'

export const useLightingStore = defineStore('lightingStore', {
  state: () => ({
    /**
     * A collection of all lighting zones in the system.
     */
    zones: testLightingZones, //[],
    /**
     * A collection of all lighting scenes that can be recalled.
     */
    scenes: testLightingScenes,
    controllerIds: []
  }),
  getters: {},
  actions: {
    updateConfig(config) {
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

        this.scenes = newScenes
        this.zones = newZones
        this.controllerIds = newControllerIds
      } catch (err) {
        console.error(`lightingStore.updateLightingControllers() - ${err}`)
      }
    },
    /**
     * Search and update the existing zone collection and update the zone that matches the argument
     * object id with the argument object load.
     * @param {string} zoneId The unique ID of the zone being updated.
     * @param {number} newLevel the 0-100 value representing the new load level.
     */
    updateLightingZoneLoad(zoneId, newLevel) {
      if (!checkString(zoneId, 'zoneData', 'lightingStore.updateSingleLightingZone()')) {
        return
      }

      try {
        this.zones.forEach((x) => {
          if (x.Id == zoneId) {
            x.Load = newLevel
          }
        })
      } catch (error) {
        console.err(`lightingStore.updateSingleLightingZone() - ${error}`)
      }
    },
    /**
     * Searches through the existing scene collection and updates the first scene with a matching
     * controlId and sceneId provided in the argument object.
     * @param {string} sceneData Data object containing updated information on a single scene.
     */
    updateSelectedScene(sceneId) {
      if (!checkDefined(sceneId, 'sceneData', 'lightingStore.updateSelectedScene')) {
        return
      }
      this.scenes.forEach((x) => (x.Set = x.Id == sceneId))
    },
    /**
     * Query the control for the current lighting configuration.
     */
    requestConfigUpdate() {
      sendLightingCongifQuery()
    },
    /**
     * Query the target controller for the currently selected zone ID.
     * @param {string} controlId The unique ID of the controller to query.
     */
    querySelectedLightingScene(controlId) {
      if (!checkString(controlId, 'controlId', 'lightingStore.querySelectedLightingScene')) {
        return
      }

      sendSelectedSceneQuery(controlId)
    },
    /**
     * Send a command to recall the target lighting scene.
     * @param {string} controlId The unique ID of the lighting controller to change
     * @param {string} sceneId The unique ID of the lighting scene to recall
     */
    setSelectedScene(controlId, sceneId) {
      if (
        !checkString(controlId, 'controlId', 'lightingStore.setSelectedScene') ||
        !checkString(sceneId, 'sceneId', 'lightingStore.setSelectedScene')
      ) {
        return
      }

      console.log("setting scene: " + sceneId)
      sendSceneSelectCommand(controlId, sceneId)
    },
    /**
     * Send a command to change the target lighting load level.
     * @param {string} controlId The unique ID of the lighting controller to change
     * @param {string} sceneId The unique ID of the lighting zone to change
     * @param {number} level 0-100 value representing the percentage of load to set.
     */
    setLoadLevel(controlId, zoneId, level) {
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
  }
})
