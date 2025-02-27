<script setup>
import { ref } from 'vue'
import { useVideoWallStore } from '@/stores/videoWallStore'
import { useModalStore } from '@/stores/modalStore'
import { emptySource } from '@/stores/videoStore'
import WallLayoutModal from '@/components/modals/WallLayoutModal.vue'
import SourceListModal from '@/components/modals/SourceListModal.vue'

const videoWallStore = useVideoWallStore()
const modalStore = useModalStore()
const windowSelected = ref(undefined)

const showLayoutsModal = () => {
  modalStore.setVideoWallLayoutVisibility(true)
}

const findSource = (id) => {
  let source = videoWallStore.sources.find((x) => x.Id === id)
  return source ? source : emptySource
}

const onWindowSelected = (cell) => {
  windowSelected.value = cell
  modalStore.setSourceListVisibility(true)
}

const onRouteRequested = (sourceId, destinationId) => {
  videoWallStore.sendCellRoute(sourceId, destinationId)
}
</script>

<template>
  <SourceListModal
    v-show="modalStore.sourceListVisible"
    :sourceList="videoWallStore.sources"
    :destinationId="windowSelected?.Id"
    :selectedId="windowSelected ? windowSelected.selectedId : ''"
    @onSourceSelect="onRouteRequested"
  />
  <WallLayoutModal v-show="modalStore.videoWallLayoutsVisible" />
  <div class="video-wall fade-in">
    <div
      class="cells"
      :style="{
        gridTemplateRows: 'repeat(' + videoWallStore.selectedLayout.Height + ', 1fr)',
        gridTemplateColumns: 'repeat(' + videoWallStore.selectedLayout.Width + ', 1fr)'
      }"
    >
      <button
        v-for="cell in videoWallStore.selectedLayout.Cells"
        class="cell"
        :key="cell.Id"
        :style="{
          gridRowStart: cell.YPosition,
          gridRowEnd: cell.YPosition,
          gridColumnStart: cell.XPosition,
          gridColumnEnd: cell.XPosition
        }"
        @click="onWindowSelected(cell)"
      >
        {{ findSource(cell.SourceId).Label }}
      </button>
    </div>
    <button
      v-if="videoWallStore.layouts.length > 1"
      @click="showLayoutsModal"
      class="layouts-button"
    >
      <i class="fa-solid fa-grip"></i>
      Layouts
    </button>
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
