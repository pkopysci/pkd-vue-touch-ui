<script setup>
import { onBeforeUnmount, ref } from 'vue'
import { useAudioStore } from '@/stores/audioStore'
import CardWrapper from '../cards/CardWrapper.vue'
import LevelGauge from '../ui/LevelGauge.vue'

const props = defineProps(['audioChannel', 'isMic', 'showCloseButton', 'width'])
const emit = defineEmits(['closeModal'])
const audioStore = useAudioStore()
const volDownActive = ref(false)
const volUpActive = ref(false)
let intervalId = undefined
let tempLevel = 0

onBeforeUnmount(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})

const onModalClose = () => {
  console.log('close modal')
  emit('closeModal')
}

const onVolUpStart = (event) => {
  event.preventDefault()
  volUpActive.value = true
  tempLevel = props.audioChannel.Level
  intervalId = setInterval(() => {
    tempLevel += 3
    audioStore.sendOutputLevel(props.audioChannel.Id, tempLevel)
  }, 100)
}
const onVolUpStop = (event) => {
  event.preventDefault()
  volUpActive.value = false
  clearInterval(intervalId)
  intervalId = undefined
}

const onVolDownStart = (event) => {
  event.preventDefault()
  volDownActive.value = true
  tempLevel = props.audioChannel.Level
  intervalId = setInterval(() => {
    tempLevel -= 3
    audioStore.sendOutputLevel(props.audioChannel.Id, tempLevel)
  }, 100)
}
const onVolDownStop = (event) => {
  event.preventDefault()
  volDownActive.value = false
  clearInterval(intervalId)
  intervalId = undefined
}
</script>

<template>
  <div class="modal-backdrop fade-in" @click="onModalClose">
    <CardWrapper :style="{ width: width ? width : '100%' }" class="room-volume-modal" @click.stop>
      <h2 style="margin-bottom: 15px">{{ audioChannel.Label }}</h2>
      <div class="audio-modal-controls">
        <div class="gauge-col">
          <LevelGauge :level="audioChannel.Level" :isHorizontal="false" />
        </div>
        <div class="button-col">
          <button
            :class="{ active: volUpActive }"
            @mousedown="onVolUpStart($event)"
            @mouseleave="onVolUpStop($event)"
            @mouseup="onVolDownStop($event)"
            @touchstart="onVolUpStart($event)"
            @touchend="onVolUpStop($event)"
          >
            <i class="fa-solid fa-volume-high" />
          </button>
          <button
            :class="{ active: volDownActive }"
            @mousedown="onVolDownStart($event)"
            @mouseleave="onVolDownStop($event)"
            @mouseup="onVolDownStop($event)"
            @touchstart="onVolDownStart($event)"
            @touchend="onVolDownStop($event)"
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
      <button v-if="showCloseButton" @click="onModalClose" class="close-button">X</button>
    </CardWrapper>
  </div>
</template>

<style scoped>
.room-volume-modal {
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}
.room-volume-modal h2 {
  font-size: 2rem;
  font-weight: 700;
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

.close-button {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: none;
  margin-top: 30px;
  font-size: 2rem;
}
</style>
0
