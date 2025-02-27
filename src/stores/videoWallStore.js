import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
  sendVideoWallConfigQuery,
  sendVideoWallLayoutSelect,
  sendVideoWallCellRouteRequest
} from '@/plugins/crestronCom/commands/videoWallCommands'


/**
 * A default/empty layout object used when a specific layout cannot be found.
 */
export const EmptyLayout = {
  Id: 'emptyLayout',
  Label: 'Empty Layout',
  Width: 0,
  Height: 0,
  Cells: []
}

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
 * A store for all video wall related data. This only supports one video wall controller at a time.
 */
export const useVideoWallStore = defineStore('videoWallStore', () => {

  /**
   * The list of available layouts that can be selected.
   */
  const layouts = ref([EmptyLayout])

  /**
   * The list of routable video wall sources.
   */
  const sources = ref([])

  /**
   * The currently selected layout on the wall controller.
   */
  const selectedLayout = ref(EmptyLayout)

  /**
   * The ID of the first wall controller in the collection as of the last config update.
   */
  const controllerId = ref('')

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
    if (deviceId !== controllerId.value) return
    
    console.log(`TODO: videoWallStore.updateDeviceConnectionStatus`)
  }

  /**
   * Updates the list of available layouts in the store.
   *
   * @param {array<Object>}newLayouts The new list of available layouts.
   * @param {array<Object>} newSources The new list of routable sources objects.
   * @param {string} wallControlId The id of the primary wall controller that hosts the layouts.
   */
  function updateConfig(newLayouts, newSources, wallControlId) {

    layouts.value = newLayouts
    sources.value = newSources
    controllerId.value = wallControlId
  }

  /**
   * Updates the currently selected layout in the store.
   * If the layout specified by the given id does not exist, the currently selected layout is
   * set to the EmptyLayout.
   *
   * @param {string} controlId the id of the video wall control object being updated.
   * @param {string} layoutId - The id of the layout that should be selected.
   */
  function updateSelectedLayout(controlId, layoutId) {
    if (controlId !== controllerId.value) return
    let found = layouts.value.find((x) => x.Id === layoutId)
    selectedLayout.value = found ? found : EmptyLayout
  }

  /**
   * Updates the currently routed source of the cell with the given id in the active layout.
   * If the layout or cell does not exist, the method does nothing and logs an error to the console.
   *
   * @param {string} cellId - The id of the cell to update.
   * @param {string} sourceId - The id of the source currently routed to the cell.
   */
  function updateCellRoute(cellId, sourceId) {
   if (!selectedLayout.value) {
    console.error("VideoWallStore.updateCellRoute() - no layout selected")
    return
   }

    let cell = selectedLayout.value.Cells.find((x) => x.Id === cellId)
    if (!cell) {
      console.error(`VideoWallStore.updateCellRoute() - no cell found with id ${cellId}`)
      return
    }

    cell.SourceId = sourceId
  }

  /**
   * Send a request to the control system to select the layout with the given id.
   * This will cause the video wall to display the selected layout.
   *
   * @param {string} layoutId - The id of the layout to select. If the layout does not exist, nothing is done.
   */
  function sendLayoutSelect(layoutId) {
    sendVideoWallLayoutSelect(controllerId.value, layoutId)
  }

  /**
   * Send a request to the control system to route the source with the given id to
   * the video wall cell with the given id. If the cell or source does not exist, nothing is done.
   *
   * @param {string} cellId - The id of the cell to route the source to.
   * @param {string} sourceId - The id of the source to route to the cell.
   */
  function sendCellRoute(sourceId, cellId) {
   sendVideoWallCellRouteRequest(controllerId.value, cellId, sourceId)
  }

  return {
    layouts,
    sources,
    selectedLayout,
    controllerId,
    requestConfigUpdate,
    updateConfig,
    updateSelectedLayout,
    updateCellRoute,
    sendLayoutSelect,
    sendCellRoute,
    updateDeviceConnectionStatus
  }
})
