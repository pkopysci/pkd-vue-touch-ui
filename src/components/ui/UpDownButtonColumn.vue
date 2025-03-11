<script setup>
defineProps(['topButtonText', 'buttonsLabel', 'hideTopButton'])
const emit = defineEmits([
  'upPressed',
  'upReleased',
  'downPressed',
  'downReleased',
  'topButtonPresssed'
])

const onUpPress = () => {
  emit('upPressed')
}

const onUpRelease = () => {
  emit('upReleased')
}

const onDownPress = () => {
  emit('downPressed')
}

const onDownRelease = () => {
  emit('downReleased')
}
</script>

<template>
  <div class="updown-column">
    <button v-if="!hideTopButton" @click="$emit('topButtonPresssed')">{{ topButtonText }}</button>
    <button
      @touchstart="onUpPress"
      @touchend="onUpRelease"
      @mousedown="onUpPress"
      @mouseup="onUpRelease"
      @mouseleave="onUpRelease"
    >
      <i class="fa-solid fa-chevron-up" />
    </button>
    <h3>{{ buttonsLabel }}</h3>
    <button
      @touchstart="onDownPress"
      @touchend="onDownRelease"
      @mousedown="onDownPress"
      @mouseup="onDownRelease"
      @mouseleave="onDownRelease"
    >
      <i class="fa-solid fa-chevron-down" />
    </button>
  </div>
</template>

<style scoped>
.updown-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}
.updown-column button {
  width: 100px;
  height: 100px;
}
.updown-column h3 {
  font-size: 1.6rem;
}
</style>
