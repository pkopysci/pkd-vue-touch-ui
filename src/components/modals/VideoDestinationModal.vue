<script setup>
import { ref, watch } from 'vue'
import { emptyDestination, useVideoStore } from '@/stores/videoStore'
import { translateIconTag } from '@/data/translators'
import { useModalStore } from '@/stores/modalStore'
import CardWrapper from '../cards/CardWrapper.vue'

const videoStore = useVideoStore()
const modalStore = useModalStore()
const destination = ref(emptyDestination)

const onModalClose = () => {
  modalStore.setVideoDestinationControlState(' ', false)
}

const onSourceSelect = (srcId) => {
    videoStore.sendVideoRoute(srcId, destination.value.Id)
}

watch(modalStore.videoDestinationControlState, () => {
  let found = videoStore.destinations.find(
    (x) => x.Id == modalStore.videoDestinationControlState.id
  )
  destination.value = found ? found : emptyDestination
})
</script>

<template>
  <div class="modal-backdrop fade-in notice" @click="onModalClose">
    <CardWrapper class="video-destination-modal" @click.stop>
      <div class="card-title">
        <h2>{{ destination.Label }}</h2>
      </div>
      <div class="card-content">
        <button
          v-for="source in videoStore.sources"
          :key="source.Id"
          :id="source.Id"
          class="source-button"
          :class="{ active: source.Id == destination.CurrentSourceId }"
          @click="() => { onSourceSelect(source.Id)}"
        >
          <i :class="translateIconTag(source.Icon)"></i>
          {{ source.Label }}
        </button>
      </div>
      <button @click="onModalClose" class="close-button">X</button>
    </CardWrapper>
  </div>
</template>

<style scoped>
.video-destination-modal {
  width: 50vw;
  height: 90vh;
  background: var(--app-background);
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.card-title {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0 0 20px 10px;
}
.card-title h2 {
  font-size: 1.8rem;
  font-weight: 700;
}

.card-content {
  flex-grow: 1;
  max-height: 90%;
  width: 100%;
  overflow-y: scroll;
}

.source-button {
  display: flex;
  gap: 30px;
  border-radius: 0;
  padding: 30px;
  width: 100%;
  border-bottom: var(--card-border);
}
</style>
