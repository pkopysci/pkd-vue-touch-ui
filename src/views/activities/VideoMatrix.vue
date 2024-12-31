<script setup>
import { useVideoStore } from '@/stores/videoStore'
import { useModalStore } from '@/stores/modalStore'
import VideoDestinationCard from '@/components/cards/VideoDestinationCard.vue'
import VideoDestinationModal from '@/components/modals/VideoDestinationModal.vue'

const videoStore = useVideoStore()
const modalStore = useModalStore()

const onRouteSelected = (id) => {
    modalStore.setVideoDestinationControlState(id, true)
}

const onControlSelected = (id) => {
    modalStore.setSourceControlState(id, true)
}
</script>

<template>
    <VideoDestinationModal v-show="modalStore.videoDestinationControlState.isVisible" />
  <div class="video-matrix fade-in vertical-activity">
    <VideoDestinationCard
      v-for="dest in videoStore.destinations"
      :key="dest.Id"
      :dataObject="dest"
      @routeSelected="onRouteSelected"
      @controlSelected="onControlSelected"
    />
  </div>
</template>

<style scoped>
.video-matrix {
  flex-grow: 1;
  padding: 20px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
