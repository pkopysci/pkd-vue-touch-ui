<script setup>
import { ref } from 'vue'
import { useVideoStore } from '@/stores/videoStore'
import { useModalStore } from '@/stores/modalStore'
import VideoDestinationCard from '@/components/cards/VideoDestinationCard.vue'
import SourceListModal from '@/components/modals/SourceListModal.vue'

const videoStore = useVideoStore()
const modalStore = useModalStore()

const selectedDestination = ref(undefined)

const onDestinationSelect = (dest) => {
  selectedDestination.value = dest
  modalStore.setSourceListVisibility(true)
}

const onControlSelected = (id) => {
  modalStore.setSourceControlState(id, true)
}

const onRouteRequested = (sourceId, destinationId) => {
  videoStore.sendVideoRoute(sourceId, destinationId)
}
</script>

<template>
  <SourceListModal
    v-show="modalStore.sourceListVisible"
    :sourceList="videoStore.sources"
    :destinationId="selectedDestination?.Id"
    :selectedId="selectedDestination?.CurrentSourceId"
    :title="selectedDestination?.Label"
    @onSourceSelect="onRouteRequested"
  />
  <div class="video-matrix fade-in vertical-activity">
    <VideoDestinationCard
      v-for="dest in videoStore.destinations"
      :key="dest.Id"
      :dataObject="dest"
      @routeSelected="() => { onDestinationSelect(dest) }"
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
