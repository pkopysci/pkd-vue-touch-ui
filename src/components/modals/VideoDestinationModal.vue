<script setup>
import { ref, watch } from 'vue'
import { emptyDestination, useVideoStore } from '@/stores/videoStore'
import { translateIconTag } from '@/data/translators'
import { useModalStore } from '@/stores/modalStore'
import ItemListModalWrapper from './ItemListModalWrapper.vue'

const videoStore = useVideoStore()
const modalStore = useModalStore()
const destination = ref(emptyDestination)

const onModalClose = () => {
  console.log('onModalClose')
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
  <ItemListModalWrapper @closeModal="onModalClose" :title="destination.Label">
    <button
      v-for="source in videoStore.sources"
      :key="source.Id"
      :id="source.Id"
      class="source-button"
      :class="{ active: source.Id == destination.CurrentSourceId }"
      @click="
        () => {
          onSourceSelect(source.Id)
        }
      "
    >
      <i :class="translateIconTag(source.Icon)"></i>
      {{ source.Label }}
    </button>
  </ItemListModalWrapper>
</template>

<style scoped>
.source-button {
  display: flex;
  gap: 30px;
  border-radius: 0;
  padding: 30px;
  width: 100%;
  border-bottom: var(--card-border);
}
</style>
