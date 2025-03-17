import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  sendGetConfigQuery,
  sendPantTilt,
  sendPresetRecall,
  sendPresetSave,
  sendZooom
} from '@/plugins/crestronCom/commands/cameraCommands'
import { useErrorStore } from './errorStore'

export const emptyCamera = {
  Id: 'cam01',
  Label: 'Empty Camera',
  Icon: 'camera',
  Control: '',
  Manufacturer: 'Fake Camera',
  Model: 'Fakery',
  IsOnline: true,
  SupportsZoom: true,
  SupportsPanTilt: true,
  SupportsSavingPresets: true,
  Presets: [],
  Tags: []
}

export const useCameraStore = defineStore('cameraStore', () => {
  const errorStore = useErrorStore()

  const cameras = ref([])

  function requestConfigUpdate() {
    sendGetConfigQuery()
  }

  function updateCameras(newCameras) {
    cameras.value.forEach((cam) => {
      if (!cam.IsOnline) {
        // removing existing errors before replacing collection
        errorStore.removeError(cam.Id)
      }
    })

    cameras.value = newCameras
    newCameras.forEach((camera) => {
      if (!camera.IsOnline) {
        errorStore.addError(camera.Id, `${camera.Label} is offline.`)
      }
    })
  }

  function UpdateCameraState(camera) {
    let idx = cameras.value.findIndex((x) => x.Id === camera.Id)
    if (idx < 0) {
      console.error('cameraStore.UpdateCameraState() - no camera found with ID ' + camera.Id)
      return
    }

    cameras.value[idx] = camera
    if (camera.IsOnline) {
      errorStore.removeError(camera.Id)
    } else {
      errorStore.addError(camera.Id, `${camera.Label} is offline.`)
    }
  }

  function sendCameraPanTilt(cameraId, vector) {
    sendPantTilt(cameraId, vector)
  }

  function sendCameraZoom(cameraId, speed) {
    sendZooom(cameraId, speed)
  }

  function sendPresetSelect(cameraId, presetId) {
    sendPresetRecall(cameraId, presetId)
  }

  function sendPresetSaved(cameraId, presetId) {
    sendPresetSave(cameraId, presetId)
  }

  return {
    cameras,
    updateCameras,
    requestConfigUpdate,
    UpdateCameraState,
    sendCameraPanTilt,
    sendCameraZoom,
    sendPresetSelect,
    sendPresetSaved
  }
})
