<script setup>
import { ref, watch } from 'vue'
import { emptyChannel } from '@/stores/audioStore'
import { useAudioStore } from '@/stores/audioStore'
import { useModalStore } from '@/stores/modalStore'
import { translateIconTag } from '@/data/translators'
import CardWrapper from '../cards/CardWrapper.vue'
import Vue3Slider from 'vue3-slider'

const audioStore = useAudioStore()
const modalStore = useModalStore()
const tempLevel = ref(0)
const dragging = ref(false)
const audioChannel = ref(emptyChannel)
let intervalId = undefined

watch(modalStore.audioDestinationControlState, () => {
  let found = audioStore.outputs.find((x) => x.Id == modalStore.audioDestinationControlState.id)
  audioChannel.value = found ? found : emptyChannel
  tempLevel.value = audioChannel.value.Level
})

const onModalClose = () => {
  modalStore.setAudioDestinationControlState(' ', false)
}

const onMuteToggle = () => {
  audioStore.sendMuteOutput(audioChannel.value.Id, !audioChannel.value.MuteState)
}

const onDragStart = () => {
  dragging.value = true
  intervalId = setInterval(() => {
    audioStore.sendOutputLevel(audioChannel.value.Id, tempLevel.value)
  }, 100)
}

const onDragEnd = () => {
  clearInterval(intervalId)
  tempLevel.value = audioChannel.value.Level
}

</script>

<template>
  <div class="modal-backdrop fade-in notice">
    <CardWrapper class="audio-destination-modal">
      <div class="card-title">
        <h2>{{ audioChannel.Label }}</h2>
      </div>
      <div class="card-content">
        <div class="source-list">
          <button v-for="source in audioStore.inputs" :key="source.Id" class="source-button"
            :class="{ active: source.Id == audioChannel.RoutedInput }">
            <i :class="translateIconTag(source.Icon)"></i>
            {{ source.Label }}
          </button>
        </div>
        <div class="level-control">
          <Vue3Slider v-model="tempLevel" orientation="vertical" :height="10" width="100%" v-bind="tempLevel"
            color="var(--text-color)" alwaysShowHandle :min="0" :max="100" :step="1" :handleScale="2.5"
            @drag-start="onDragStart" @drag-end="onDragEnd" />
          <button :class="{ active: audioChannel.MuteState }" @click="onMuteToggle">
            <i class="fa-solid fa-microphone-slash" />
          </button>
        </div>
      </div>
      <button @click="onModalClose" class="close-button">X</button>
    </CardWrapper>
  </div>
</template>

<style scoped>
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

.audio-destination-modal {
  width: 60vw;
  height: 90vh;
  background: var(--app-background);
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.card-content {
  width: 100%;
  display: flex;
  flex-grow: 1;
  align-items: space-between;
  gap: 30px;
}

.source-list {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  max-height: 100%;
  overflow-y: scroll;
}

.source-list button {
  display: flex;
  gap: 30px;
  border-radius: 0;
  padding: 30px;
  width: 95%;
  border: none;
  border-bottom: var(--card-border);
}

.level-control {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-right: 50px;
  align-items: center;
  justify-content: space-between;
}

.level-control button {
  padding: 30px;
}
</style>
