<script setup>
import { onBeforeMount, onBeforeUnmount, ref, watch } from 'vue'
import CardWrapper from './CardWrapper.vue'
import Vue3Slider from 'vue3-slider'

const props = defineProps(['channelObject', 'isMic'])
const emit = defineEmits(['setLevel', 'setMute'])

let intervalId = undefined
const tempLevel = ref(0)
const dragging = ref(false)

onBeforeMount(() => {
  tempLevel.value = props.channelObject.Level
})

onBeforeUnmount(() => clearInterval(intervalId))
watch(props.channelObject, () => {
  if (!dragging.value) {
    tempLevel.value = props.channelObject.Level
  }
})

const onDragStart = () => {
  dragging.value = true
  intervalId = setInterval(() => {
    emit('setLevel', props.channelObject.Id, tempLevel.value)
  }, 100)
}

const onDragEnd = () => {
  tempLevel.value = props.channelObject.Level
  clearInterval(intervalId)
}
</script>

<template>
  <CardWrapper class="audio-channel-card">
    <div class="controls">
      <h2>{{ props.channelObject.Label }}</h2>
      <Vue3Slider
        v-model="tempLevel"
        v-bind="tempLevel"
        color="var(--text-color)"
        width="50%"
        alwaysShowHandle
        :min="0"
        :max="100"
        :step="1"
        :height="10"
        :handleScale="2.5"
        @drag-start="onDragStart"
        @drag-end="onDragEnd"
      />
      <button
        :class="{ active: props.channelObject.MuteState }"
        @click="emit('setMute', props.channelObject.Id, !channelObject.MuteState)"
      >
        <i class="fa-solid fa-microphone-slash" />
      </button>
    </div>
  </CardWrapper>
</template>

<style scoped>
.audio-channel-card {
  display: flex;
  flex-direction: column;
  width: 65%;
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
  font-weight: 700;
  font-size: 2rem;
  width: 25%;
}

button {
  padding: 20px;
}
</style>
