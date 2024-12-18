<script setup>
import { onBeforeUnmount, ref } from 'vue'
import LevelGauge from '../ui/LevelGauge.vue'
import CardWrapper from './CardWrapper.vue'

const props = defineProps(['channelObject', 'isMic'])
const emit = defineEmits(['setLevel', 'setMute'])

const volUpActive = ref(false)
const volDownActive = ref(false)

let intervalId = undefined
let tempLevel = 0

onBeforeUnmount(() => clearInterval(intervalId))

const onVolUpStart = (event) => {
  event.preventDefault()
  volUpActive.value = true
  tempLevel = props.channelObject.Level
  intervalId = setInterval(() => {
    tempLevel += 3
    emit('setLevel', props.channelObject.Id, tempLevel)
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
  tempLevel = props.channelObject.Level
  intervalId = setInterval(() => {
    tempLevel -= 3
    emit('setLevel', props.channelObject.Id, tempLevel)
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
  <CardWrapper class="audio-channel-card">
    <h2>{{ channelObject.Label }}</h2>
    <div class="audio-controls">
      <div class="audio-col">
        <LevelGauge :level="channelObject?.Level" :is-horizontal="false" />
      </div>
      <div class="audio-col">
        <button
          :class="[volUpActive ? 'active' : '']"
          @click="$emit('volUp', channelObject.Id)"
          @mousedown="onVolUpStart($event)"
          @mouseleave="onVolUpStop($event)"
          @mouseup="onVolDownStop($event)"
          @touchstart="onVolUpStart($event)"
          @touchend="onVolUpStop($event)"
        >
          <i class="fa-solid fa-volume-high" />
        </button>

        <button
          :class="[volDownActive ? 'active' : '']"
          @mousedown="onVolDownStart($event)"
          @mouseleave="onVolDownStop($event)"
          @mouseup="onVolDownStop($event)"
          @touchstart="onVolDownStart($event)"
          @touchend="onVolDownStop($event)"
        >
          <i class="fa-solid fa-volume-low" />
        </button>

        <button
          :class="channelObject?.MuteState ? 'active' : ''"
          @click="$emit('setMute', channelObject.Id, !channelObject.MuteState)"
        >
          <i class="fa-solid" :class="isMic ? 'fa-microphone-slash' : 'fa-volume-mute'" />
        </button>
      </div>
    </div>
  </CardWrapper>
</template>

<style scoped>
.audio-channel-card {
  display: flex;
  min-width: 250px;
  min-height: 60%;
  max-height: 80%;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 20px;
}

h2 {
  font-weight: 700;
  font-size: 2rem;
  width: 100%;
  text-align: center;
  padding-bottom: 20px;
  border-bottom: var(--card-border);
}

.audio-controls {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  flex-grow: 1;
}

.audio-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.audio-col button {
  width: 8rem;
  height: 8rem;
}
</style>
