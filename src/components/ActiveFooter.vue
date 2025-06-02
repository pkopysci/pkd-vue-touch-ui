<script setup>
import { ref, onBeforeUnmount } from 'vue'
import { useAudioStore } from '@/stores/audioStore'
import LevelGauge from './ui/LevelGauge.vue'
import TouchButton from './ui/TouchButton.vue'

const audioStore = useAudioStore()
const volDownActive = ref(false)
const volUpActive = ref(false)
let tempLevel = 0
let intervalId = undefined

onBeforeUnmount(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})

const onMuteToggle = () => {
  if (!audioStore.programAudio) return
  audioStore.sendMuteOutput(audioStore.programAudio.Id, !audioStore.programAudio.MuteState)
}

const onVolUpStart = () => {
  volUpActive.value = true

  if (!audioStore.programAudio) return

  tempLevel = audioStore.programAudio.Level + 3
  audioStore.sendOutputLevel(audioStore.programAudio.Id, tempLevel)

  intervalId = setInterval(() => {
    tempLevel += 3
    audioStore.sendOutputLevel(audioStore.programAudio.Id, tempLevel)
  }, 100)
}

const onVolUpStop = () => {
  volUpActive.value = false
  clearInterval(intervalId)
  intervalId = undefined
}

const onVolDownStart = () => {
  volDownActive.value = true

  if (!audioStore.programAudio) return

  tempLevel = audioStore.programAudio.Level - 3
  audioStore.sendOutputLevel(audioStore.programAudio.Id, tempLevel)

  intervalId = setInterval(() => {
    tempLevel -= 3
    audioStore.sendOutputLevel(audioStore.programAudio.Id, tempLevel)
  }, 100)
}
const onVolDownStop = () => {
  volDownActive.value = false
  clearInterval(intervalId)
  intervalId = undefined
}
</script>

<template>
  <div class="active-footer">
    <TouchButton
      :style="{
        background:
          audioStore.programAudio && audioStore.programAudio.MuteState
            ? 'var(--active-color)'
            : 'none'
      }"
      :class="{ active: audioStore.programAudio && audioStore.programAudio.MuteState }"
      @touched="onMuteToggle"
    >
      <i class="fa-solid fa-volume-mute"></i>
    </TouchButton>
    <button
      @mousedown="onVolDownStart()"
      @mouseleave="onVolDownStop()"
      @mouseup="onVolDownStop()"
      @touchstart="onVolDownStart()"
      @touchend="onVolDownStop()"
    >
      <i class="fa-solid fa-volume-low"></i>
    </button>
    <LevelGauge
      is-horizontal="true"
      :level="audioStore.programAudio ? audioStore.programAudio.Level : 0"
      style="width: 50%; height: 20px"
    />
    <button
      @mousedown="onVolUpStart()"
      @mouseleave="onVolUpStop()"
      @mouseup="onVolDownStop()"
      @touchstart="onVolUpStart()"
      @touchend="onVolUpStop()"
    >
      <i class="fa-solid fa-volume-high"></i>
    </button>
  </div>
</template>

<style scoped>
.active-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  padding: 10px 30px;
  background-color: var(--card-background);
  border-radius: 20px;
  width: 90%;
  margin: auto;
  margin-bottom: 20px;
}

.active-footer button {
  background: none;
  border: none;
  cursor: pointer;
  width: 95px;
  height: 95px;
}
.active-footer button:active {
  background-color: var(--active-color);
}
.active-footer button i {
  font-size: 2.5rem;
}
</style>
