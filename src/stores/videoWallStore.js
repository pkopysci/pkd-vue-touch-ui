import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
  sendVideoWallConfigQuery,
  sendVideoWallLayoutSelect,
  sendVideoWallCellRouteRequest
} from '@/plugins/crestronCom/commands/videoWallCommands'
import {useErrorStore} from "@/stores/errorStore.js";
import { emptySource } from './videoStore';

/**
 * A default/empty cell object used when a specific cell cannot be found.
 */
export const EmptyCell = {
  Id: 'emptyCell',
  XStart: 0,
  XEnd: 0,
  YStart: 0,
  YEnd: 0,
  SourceId: ''
}

/**
 * A default/empty layout object used when a specific layout cannot be found.
 */
export const EmptyLayout = {
  Id: 'emptyLayout',
  Label: 'Empty Layout',
  Width: 0,
  Height: 0,
  Cells: [EmptyCell]
}

export const EmptyCanvas = {
  Id: 'emptyCanvas',
  Label: 'Empty Canvas',
  ActiveLayoutId: '',
  StartupLayoutId: '',
  MaxWidth: 0,
  MaxHeight: 0,
  Layouts: [EmptyLayout]
}


export const EmptyVideoWall = {
  Id: 'emptywall',
  Label: 'Empty Wall',
  Icon: 'tv',
  Tags: [],
  Manufacturer: 'empty Manufacturer',
  Model: 'empty Model',
  IsOnline: true,
  Canvases: [EmptyCanvas],
  Sources: [emptySource]
}

/**
 * A store for all video wall related data. This only supports one video wall controller at a time.
 */
export const useVideoWallStore = defineStore('videoWallStore', () => {

  const errorStore = useErrorStore()

  const controllers = ref([EmptyVideoWall])

  /**
   * Requests the current video wall configuration from the control system.
   * This method should be called when the application is started or when the user
   * requests an update of the video wall configuration.
   */
  function requestConfigUpdate() {
    sendVideoWallConfigQuery()
  }

  /**
   * 
   * @param {string} deviceId The id of the video wall controller that is being updated.
   * @param {boolean} isOnline true = the device is online, false = device is offline.
   */
  function updateDeviceConnectionStatus(deviceId, isOnline) {
    let index = controllers.value.findIndex(controller => controller.Id === deviceId)
    if (index < 0) return

    let controller = controllers.value[index]
    controller.IsOnline = isOnline

    if (isOnline) {
      errorStore.removeError(deviceId)
    } else {
      errorStore.addError(deviceId, `${controller.Model} ${controller.Id} is offline.`)
    }
  }

  /**
   * Updates the list of available layouts in the store.
   *
   * @param {array<Object>}newLayouts The new list of available layouts.
   * @param {array<Object>} newSources The new list of routable sources objects.
   * @param {string} wallControlId The id of the primary wall controller that hosts the layouts.
   */
  function updateConfig(newControllers) {
    controllers.value = newControllers
  }

  /**
   * Updates the currently selected layout in the store.
   * If the layout specified by the given id does not exist, the currently selected layout is
   * set to the EmptyLayout.
   *
   * @param {string} controlId the id of the video wall control object being updated.
   * @param {string} layoutId - The id of the layout that should be selected.
   */
  function updateSelectedLayout(controlId, canvasId, layoutId) {
    let controller = controllers.value.find(controller => controller.Id === controlId)
    if (!controller) {
      console.error(`videoWallStore.updateSelectedLayout - controller ${controlId} not found`)
      return
    }

    let canvas = controller.Canvases.find(canvas => canvas.Id === canvasId)
    if (!canvas) {
      console.error(`videoWallStore.updateSelectedLayout - canvas ${canvasId} not found on controller ${controlId}`)
      return
    }

    canvas.ActiveLayoutId = layoutId
  }

  /**
   * Updates the currently routed source of the cell with the given id in the active layout.
   * If the layout or cell does not exist, the method does nothing and logs an error to the console.
   *
   * @param {string} cellId - The id of the cell to update.
   * @param {string} sourceId - The id of the source currently routed to the cell.
   */
  function updateCellRoute(controlId, canvasId, cellId, sourceId) {
    let controller = controllers.value.find(controller => controller.Id === controlId)
    if (!controller) return

    let canvas = controller.Canvases.find(canvas => canvas.Id === canvasId)
    if (!canvas) return

    var layout = canvas.Layouts.find(layout => layout.Id === canvas.ActiveLayoutId)
    if (!layout) return

    let cell = layout.Cells.find(cell => cell.Id === cellId)
    if (!cell) return

    cell.SourceId = sourceId
  }

  /**
   * Send a request to the control system to select the layout with the given id.
   * This will cause the video wall to display the selected layout.
   *
   * @param {string} layoutId - The id of the layout to select. If the layout does not exist, nothing is done.
   */
  function sendLayoutSelect(controlId, canvasId, layoutId) {
    sendVideoWallLayoutSelect(controlId, canvasId, layoutId)
  }

  /**
   * Send a request to the control system to route the source with the given id to
   * the video wall cell with the given id. If the cell or source does not exist, nothing is done.
   *
   * @param {string} cellId - The id of the cell to route the source to.
   * @param {string} sourceId - The id of the source to route to the cell.
   */
  function sendCellRoute(controlId, canvasId, cellId, sourceId) {
   sendVideoWallCellRouteRequest(controlId, canvasId, cellId, sourceId)
  }

  return {
    controllers,
    requestConfigUpdate,
    updateConfig,
    updateSelectedLayout,
    updateCellRoute,
    sendLayoutSelect,
    sendCellRoute,
    updateDeviceConnectionStatus
  }
})
