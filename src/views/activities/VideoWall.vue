<script setup>
import { ref } from 'vue'
import { EmptyLayout, useVideoWallStore } from '@/stores/videoWallStore'
import { useModalStore } from '@/stores/modalStore'
import WallLayoutModal from '@/components/modals/WallLayoutModal.vue'
import SourceListModal from '@/components/modals/SourceListModal.vue'
import TouchButton from '@/components/ui/TouchButton.vue'

const videoWallStore = useVideoWallStore()
const modalStore = useModalStore()
const windowSelected = ref(undefined)

const showLayoutsModal = () => {
  modalStore.setVideoWallLayoutVisibility(true)
}

const onWindowSelected = (cell) => {
  windowSelected.value = cell
  modalStore.setSourceListVisibility(true)
}

const onRouteRequested = (sourceId, destinationId) => {
  videoWallStore.sendCellRoute(
    videoWallStore.controllers[0].Id,
    videoWallStore.controllers[0].Canvases[0].Id,
    destinationId,
    sourceId
  )
}

const findSource = (sourceId) => {
  return videoWallStore.controllers[0].Sources.find((source) => source.Id === sourceId)
}

const getActiveLayout = () => {
  let layout =  videoWallStore.controllers[0].Canvases[0].Layouts.find(
    (layout) => layout.Id === videoWallStore.controllers[0].Canvases[0].ActiveLayoutId
  )
  return layout ? layout : EmptyLayout
}
</script>

<template>
  <SourceListModal
    v-show="modalStore.sourceListVisible"
    :sourceList="videoWallStore.controllers[0].Sources"
    :destinationId="windowSelected?.Id"
    :selectedId="windowSelected ? windowSelected.selectedId : ''"
    @onSourceSelect="onRouteRequested"
  />

  <WallLayoutModal
    :controller="videoWallStore.controllers[0]"
    :canvas="videoWallStore.controllers[0].Canvases[0]"
    v-show="modalStore.videoWallLayoutsVisible"
  />

  <div class="video-wall fade-in">
    <div
      class="cells"
      :style="{
        gridTemplateRows: 'repeat(' + getActiveLayout().Height + ', 1fr)',
        gridTemplateColumns: 'repeat(' + getActiveLayout().Width + ', 1fr)'
      }"
    >
      <TouchButton
        v-for="cell in getActiveLayout().Cells"
        class="cell"
        :key="cell.Id"
        :style="{
          gridRowStart: cell.YPosition,
          gridRowEnd: cell.YPosition,
          gridColumnStart: cell.XPosition,
          gridColumnEnd: cell.XPosition
        }"
        @touchstart="onWindowSelected(cell)"
      >
        {{ findSource(cell.SourceId)?.Label }}
      </TouchButton>
    </div>
    <TouchButton
      v-if="videoWallStore.controllers[0].Canvases[0].Layouts.length > 1"
      @touchstart="showLayoutsModal"
      class="layouts-button"
    >
      <i class="fa-solid fa-grip"></i>
      Layouts
    </TouchButton>
  </div>
</template>

<style scoped>
.video-wall {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  padding: 10px;
  gap: 40px;
}

.cells {
  display: grid;
  flex-grow: 1;
  width: 90%;
}

.cell {
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.layouts-button {
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}
</style>
