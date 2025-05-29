<script setup>
import { onMounted, ref, watch } from 'vue'
import { useVideoWallStore, EmptyLayout, EmptyVideoWall, EmptyCanvas } from '@/stores/videoWallStore'
import { useModalStore } from '@/stores/modalStore'
import WallLayoutModal from '@/components/modals/WallLayoutModal.vue'
import SourceListModal from '@/components/modals/SourceListModal.vue'

const videoWallStore = useVideoWallStore()
const modalStore = useModalStore()
const windowSelected = ref(undefined)
const controller = ref(EmptyVideoWall)
const canvas = ref(EmptyCanvas)
const layout = ref(EmptyLayout)

onMounted(() => {
  if (videoWallStore.controllers.length > 0 && 
  videoWallStore.controllers[0].Canvases.length > 0) {
    controller.value = videoWallStore.controllers[0]
    canvas.value = videoWallStore.controllers[0].Canvases[0]  
  }
})

const findLayout = (layoutId) => {
  var layout = canvas.value.Layouts.find(layout => layout.Id === layoutId)
  if (layout)
  {
    return layout
  } else {
    return EmptyLayout
  }
}

watch(videoWallStore.controllers, () => {
  controller.value = videoWallStore.controllers[0]
  canvas.value = controller.value.Canvases[0]
  layout.value = findLayout(canvas.value.ActiveLayoutId)
})

const showLayoutsModal = () => {
  modalStore.setVideoWallLayoutVisibility(true)
}

const onWindowSelected = (cell) => {
  windowSelected.value = cell
  modalStore.setSourceListVisibility(true)
}

const onRouteRequested = (sourceId, destinationId) => {
  videoWallStore.sendCellRoute(videoWallStore.controllers[0].Id, videoWallStore.controllers[0].Canvases[0].Id, destinationId, sourceId)
}

const findSource = (sourceId) => {
  return controller.value.Sources.find(source => source.Id === sourceId)
}

</script>

<template>
  <SourceListModal
    v-show="modalStore.sourceListVisible"
    :sourceList="controller.Sources"
    :destinationId="windowSelected?.Id"
    :selectedId="windowSelected ? windowSelected.selectedId : ''"
    @onSourceSelect="onRouteRequested"
  />
  <WallLayoutModal :controller="controller" :canvas="canvas" v-show="modalStore.videoWallLayoutsVisible" />
  <div class="video-wall fade-in">
    <div
      class="cells"
      :style="{
        gridTemplateRows: 'repeat(' + layout.Height + ', 1fr)',
        gridTemplateColumns: 'repeat(' + layout.Width + ', 1fr)'
      }"
    >
      <button
        v-for="cell in layout.Cells"
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
        {{ findSource(cell.SourceId)?.Label }}
      </button>
    </div>
    <button
      v-if="canvas.Layouts.length > 1"
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
