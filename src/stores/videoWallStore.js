import { ref } from 'vue'
import { defineStore } from 'pinia'
import { testVideoWallLayouts } from '@/data/TestData'

/**
 * A default/empty layout object used when a specific layout cannot be found.
 */
export const EmptyLayout = {
  Id: 'emptylayout',
  Label: 'Empty Layout',
  Width: 0,
  Height: 0,
  Cells: []
}

/**
 * A default/empty cell object used when a specific cell cannot be found.
 */
export const EmptyCell = {
  Id: 'emptycell',
  XStart: 0,
  XEnd: 0,
  YStart: 0,
  YEnd: 0,
  SourceId: ''
}

export const useVideoWallStore = defineStore('videoWallStore', () => {
  /**
   * The list of available layouts that can be selected.
   */
  const layouts = ref(testVideoWallLayouts) //ref([EmptyLayout])

  /**
   * The currently selected layout on the wall controller.
   */
  const selectedLayout = ref(testVideoWallLayouts[0])

  /**
   * Updates the list of available layouts in the store.
   *
   * @param  newLayouts - The new list of available layouts.
   */
  function updateLayouts(newLayouts) {
    layouts.value = newLayouts
  }

  /**
   * Updates the currently selected layout in the store.
   * If the layout specified by the given id does not exist, the currently selected layout is
   * set to the EmptyLayout.
   *
   * @param  layoutId - The id of the layout that should be selected.
   */
  function updateSelectedLayout(layoutId) {
    let found = layouts.value.find((x) => x.Id == layoutId)
    selectedLayout.value = found ? found : EmptyLayout
  }

  /**
   * Send a request to the control system to select the layout with the given id.
   * This will cause the video wall to display the selected layout.
   *
   * @param {string} layoutId - The id of the layout to select. If the layout does not exist, nothing is done.
   */
  function sendLayoutSelect(layoutId) {
    console.warn('TODO: VideoWallStore.sendLayoutSelect(' + layoutId + ')')
  }

  /**
   * Send a request to the control system to route the source with the given id to
   * the video wall cell with the given id. If the cell or source does not exist, nothing is done.
   *
   * @param {string} cellId - The id of the cell to route the source to.
   * @param {string} sourceId - The id of the source to route to the cell.
   */
  function sendCellRoute(sourceId, cellId) {
    console.warn('TODO: VideoWallStore.sendCellRoute(' + sourceId + ', ' + cellId + ')')
  }

  return {
    layouts,
    selectedLayout,
    updateLayouts,
    updateSelectedLayout,
    sendLayoutSelect,
    sendCellRoute
  }
})
