<script setup>
import WallLayoutModal from '@/components/modals/WallLayoutModal.vue'
import { useVideoWallStore } from '@/stores/videoWallStore'
import { useModalStore } from '@/stores/modalStore'
import { emptySource, useVideoStore } from '@/stores/videoStore'

const videoStore = useVideoStore()
const videoWallStore = useVideoWallStore()
const modalStore = useModalStore()

const showLayoutsModal = () => {
  modalStore.setVideoWallLayoutVisibility(true)
}

const findSource = (id) => {
  let source = videoStore.sources.find((x) => x.Id == id)
  return source ? source : emptySource
}
</script>

<template>
  <WallLayoutModal v-show="modalStore.videoWallLayoutsVisible" />
  <div class="video-wall fade-in">
    <div
      class="cells"
      :style="{
        gridTemplateRows: videoWallStore.selectedLayout.Height,
        gridTemplateColumns: videoWallStore.selectedLayout.Width
      }"
    >
      <button
        v-for="cell in videoWallStore.selectedLayout.Cells"
        :key="cell.Id"
        class="cell"
        :style="{
          gridRowStart: cell.Yposition,
          gridRowEnd: cell.Yposition,
          gridColumnStart: cell.Xposition,
          gridColumnEnd: cell.Xposition
        }"
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
