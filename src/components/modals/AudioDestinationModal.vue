<script setup>
import { ref, watch } from 'vue'
import { emptyChannel } from '@/stores/audioStore'
import { useAudioStore } from '@/stores/audioStore'
import { useModalStore } from '@/stores/modalStore'
import { translateIconTag } from '@/data/translators'
import CardWrapper from '../cards/CardWrapper.vue'
import LevelGauge from '../ui/LevelGauge.vue'

const audioStore = useAudioStore()
const modalStore = useModalStore()
const audioChannel = ref(emptyChannel)
const tempLevel = ref(0)
let intervalId = undefined

watch(modalStore.audioDestinationControlState, () => {
  let found = audioStore.outputs.find((x) => x.Id == modalStore.audioDestinationControlState.id)
  audioChannel.value = found ? found : emptyChannel
  tempLevel.value = audioChannel.value.Level
})

const onModalClose = () => {
  modalStore.setAudioDestinationControlState(' ', false)
  clearInterval(intervalId)
}

const onSourceSelected = (id) => {
  audioStore.sendAudioRoute(id, audioChannel.value.Id)
}

const onVolUpStart = () => {
  tempLevel.value = audioChannel.value.Level + 3
  audioStore.sendOutputLevel(audioChannel.value.Id, tempLevel.value)

  intervalId = setInterval(() => {
    tempLevel.value += 3
    audioStore.sendOutputLevel(audioChannel.value.Id, tempLevel.value)
  }, 100)
}
const onVolUpStop = () => {
  clearInterval(intervalId)
  intervalId = undefined
}

const onVolDownStart = () => {
  tempLevel.value = audioChannel.value.Level - 3
  audioStore.sendOutputLevel(audioChannel.value.Id, tempLevel.value)

  intervalId = setInterval(() => {
    tempLevel.value -= 3
    audioStore.sendOutputLevel(audioChannel.value.Id, tempLevel.value)
  }, 100)
}
const onVolDownStop = () => {
  clearInterval(intervalId)
  intervalId = undefined
}

</script>

<template>
  <div class="modal-backdrop fade-in notice" @click="onModalClose">
    <CardWrapper class="audio-destination-modal" @click.stop>
      <div class="card-title">
        <h2>{{ audioChannel.Label }}</h2>
      </div>
      <div class="card-content">
        <div class="source-list">
          <button
            v-for="source in audioStore.inputs"
            :key="source.Id"
            class="source-button"
            :class="{ active: source.Id == audioChannel.RoutedInput }"
            @click="onSourceSelected(source.Id)"
          >
            <i :class="translateIconTag(source.Icon)"></i>
            {{ source.Label }}
          </button>
        </div>
        <div class="audio-modal-controls">
          <div class="gauge-col">
            <LevelGauge :level="audioChannel.Level" :isHorizontal="false" />
          </div>
          <div class="button-col">
            <button
              :class="{ active: volUpActive }"
              @mousedown="onVolUpStart"
              @mouseleave="onVolUpStop"
              @mouseup="onVolDownStop"
              @touchstart="onVolUpStart"
              @touchend="onVolUpStop"
            >
              <i class="fa-solid fa-volume-high" />
            </button>
            <button
              :class="{ active: volDownActive }"
              @mousedown="onVolDownStart"
              @mouseleave="onVolDownStop"
              @mouseup="onVolDownStop"
              @touchstart="onVolDownStart"
              @touchend="onVolDownStop"
            >
              <i class="fa-solid fa-volume-low" />
            </button>
            <button
              :class="{ active: audioChannel.MuteState }"
              @click="audioStore.sendMuteOutput(audioChannel.Id, !audioChannel.MuteState)"
            >
              <i class="fa-solid fa-volume-mute" />
            </button>
          </div>
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

.audio-modal-controls {
  display: flex;
  justify-content: center;
  gap: 50px;
  flex-grow: 1;
  padding: 20px;
}

.guage-col {
  height: 100%;
}

.button-col {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.button-col button {
  padding: 50px;
  font-size: 2rem;
}
</style>
