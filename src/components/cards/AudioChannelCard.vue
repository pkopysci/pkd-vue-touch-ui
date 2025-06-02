<script setup>
import { onBeforeMount, onBeforeUnmount, ref } from 'vue'
import CardWrapper from './CardWrapper.vue'
import LevelGauge from '../ui/LevelGauge.vue'
import TouchButton from '../ui/TouchButton.vue'

const props = defineProps(['channelObject', 'isMic'])
const emit = defineEmits(['setLevel', 'setMute'])

let intervalId = undefined
const tempLevel = ref(0)

onBeforeMount(() => {
  tempLevel.value = props.channelObject.Level
})

onBeforeUnmount(() => clearInterval(intervalId))

const onVolUpStart = () => {
  tempLevel.value = props.channelObject.Level + 3
  emit('setLevel', props.channelObject.Id, tempLevel.value)

  intervalId = setInterval(() => {
    tempLevel.value += 3
    emit('setLevel', props.channelObject.Id, tempLevel.value)
  }, 100)
}

const onVolUpEnd = () => {
  clearInterval(intervalId)
  tempLevel.value = props.channelObject.Level
  intervalId = undefined
}

const onVolDownStart = () => {
  tempLevel.value = props.channelObject.Level - 3
  emit('setLevel', props.channelObject.Id, tempLevel.value)
  intervalId = setInterval(() => {
    tempLevel.value -= 3
    emit('setLevel', props.channelObject.Id, tempLevel.value)
  }, 100)
}

const onVolDownEnd = () => {
  clearInterval(intervalId)
  tempLevel.value = props.channelObject.Level
  intervalId = undefined
}
</script>

<template>
  <CardWrapper class="audio-channel-card">
    <div class="controls">
      <h2>{{ props.channelObject.Label }}</h2>
      <LevelGauge
        :level="props.channelObject?.Level"
        :isHorizontal="true"
        style="height: 20px; width: 60%"
      />
      <span class="buttons">
        <button
          class="audio-channel-button"
          @mousedown="onVolDownStart"
          @mouseleave="onVolDownEnd"
          @mouseup="onVolDownEnd"
          @touchstart="onVolDownStart"
          @touchend="onVolDownEnd"
        >
          <i class="fa-solid fa-volume-low" />
        </button>
        <button
          class="audio-channel-button"
          @mousedown="onVolUpStart"
          @mouseleave="onVolUpEnd"
          @mouseup="onVolUpEnd"
          @touchstart="onVolUpStart"
          @touchend="onVolUpEnd"
        >
          <i class="fa-solid fa-volume-high" />
        </button>
        <TouchButton
          class="audio-channel-button"
          :class="{ active: props.channelObject.MuteState }"
          @touched="emit('setMute', props.channelObject.Id, !channelObject.MuteState)"
        >
          <i class="fa-solid fa-microphone-slash" />
        </TouchButton>
      </span>
    </div>
  </CardWrapper>
</template>

<style scoped>
.audio-channel-card {
  display: flex;
  flex-direction: column;
  width: 90%;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
}

.controls {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  width: 100%;
  align-items: center;
}

h2 {
  font-weight: 300;
  font-size: 1.8rem;
  width: 25%;
}

.buttons {
  display: flex;
  gap: 25px;
  margin-left: 30px;
}

.audio-channel-button {
  width: 75px;
  padding: 20px;
}
</style>
