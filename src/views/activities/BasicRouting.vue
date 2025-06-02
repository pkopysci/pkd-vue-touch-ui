<script setup>
import { onBeforeMount, ref, watch } from 'vue'
import { emptyDestination, useVideoStore } from '@/stores/videoStore'
import { useModalStore } from '@/stores/modalStore'
import { useCustomEventStore } from '@/stores/customEventStore'
import SourceButton from '@/components/ui/SourceButton.vue'
import TouchButton from '@/components/ui/TouchButton.vue'

const videoStore = useVideoStore()
const modalStore = useModalStore()
const eventStore = useCustomEventStore()
const selectedId = ref('')
const showDeviceControlButton = ref(false)

let sources = []

const checkSourceControl = () => {
  let src = videoStore.sources.find((x) => x.Id === selectedId.value)
  if (src) {
    showDeviceControlButton.value = src.Control.length > 0
  }
}

const onInputSelected = (id) => {
  videoStore.sendRouteToAll(id)
}
const onVideoBlankToggle = () => {
  videoStore.sendGlobalVideoBlank(!videoStore.globalBlankActive)
}

const onVideoFreezeToggle = () => {
  videoStore.sendGlobalVideoFreeze(!videoStore.globalFreezeActive)
}

const onDeviceControlSelect = (devId) => {
  let device = videoStore.sources.find((x) => x.Id === devId)
  if (device) {
    modalStore.setSourceControlState(device.Control, true)
  }
}

const populateSources = () => {
  let newSources = []
  videoStore.selectableSources.forEach((source) => {
    let match = eventStore.inactiveEvents.find((evt) => source.Tags.some((tag) => evt.Id === tag))
    if (!match) {
      newSources.push(source)
    }
  })
  sources = newSources
}

onBeforeMount(() => {
  populateSources()
  if (!videoStore.destinations || videoStore.destinations.length < 1) {
    selectedId.value = emptyDestination.CurrentSourceId
  } else {
    selectedId.value = videoStore.destinations[0].CurrentSourceId
  }
  checkSourceControl()
})

watch(eventStore.customEvents, () => {
  populateSources()
})

watch(videoStore.destinations, () => {
  if (videoStore.destinations.length > 0)
    selectedId.value = videoStore.destinations[0].CurrentSourceId
  checkSourceControl()
})
</script>

<template>
  <div class="basic-routing fade-in">
    <div class="video-controls">
      <div
        class="source-list"
        :style="[videoStore.sources.length <= 4 ? { justifyContent: 'center' } : {}]"
      >
        <SourceButton
          v-for="source in sources"
          :key="source.Id"
          :id="source.Id"
          :label="source.Label"
          :icon="source.Icon"
          :isActive="source.Id === selectedId"
          @on-select="onInputSelected"
        ></SourceButton>
      </div>
    </div>
    <div class="video-buttons">
      <TouchButton @touched="onVideoBlankToggle()" :class="{ active: videoStore.globalBlankActive }">
        <i class="fa-solid fa-eye-slash"></i>Blank
      </TouchButton>

      <TouchButton @touched="onVideoFreezeToggle()" :class="{ active: videoStore.globalFreezeActive }">
        <i class="fa-solid fa-icicles"></i>Freeze
      </TouchButton>

      <TouchButton v-show="showDeviceControlButton" @touched="onDeviceControlSelect(selectedId)">
        <i class="fa-solid fa-grip"></i>Controls
      </TouchButton>
    </div>
  </div>
</template>

<style scoped>
.basic-routing {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex-grow: 1;
  padding: 20px;
}

.source-list {
  display: flex;
  overflow-x: auto;
  max-width: 80vw;
  gap: 20px;
  flex-grow: 1;
}

.video-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
}
.video-buttons button {
  padding: 30px;
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  gap: 20px;
}
</style>
