<script setup>
import { ref } from 'vue'

defineProps(['centerLabel'])
const emit = defineEmits([
  'upPressed',
  'upReleased',
  'downPressed',
  'downReleased',
  'leftPressed',
  'leftReleased',
  'rightPressed',
  'rightReleased',
  'centerPressed',
  'centerReleased'
])

const downActive = ref(false)
const upActive = ref(false)
const leftActive = ref(false)
const rightActive = ref(false)
const centerActive = ref(false)

const onUpPress = () => {
  upActive.value = true
  emit('upPressed')
}
const onUpRelease = () => {
  upActive.value = false
  emit('upReleased')
}
const onDownPress = () => {
  downActive.value = true
  emit('downPressed')
}
const onDownRelease = () => {
  downActive.value = false
  emit('downReleased')
}
const onLeftPress = () => {
  leftActive.value = true
  emit('leftPressed')
}
const onLeftRelease = () => {
  leftActive.value = false
  emit('leftReleased')
}
const onRightPress = () => {
  rightActive.value = true
  emit('rightPressed')
}
const onRightRelease = () => {
  rightActive.value = false
  emit('rightReleased')
}
const onCenterPress = () => {
  centerActive.value = true
  emit('centerPressed')
}
const onCenterRelease = () => {
  centerActive.value = false
  emit('centerReleased')
}
</script>

<template>
  <div class="nav-pad">
    <div class="cell"></div>
    <button
      class="cell"
      :class="upActive ? 'active' : ''"
      @touchstart="onUpPress"
      @touchend="onUpRelease"
      @mousedown="onUpPress"
      @mouseup="onUpRelease"
      @mouseleave="onUpRelease"
    >
      <i class="fa-solid fa-chevron-up"></i>
    </button>
    <div class="cell"></div>
    <button
      class="cell"
      :class="leftActive ? 'active' : ''"
      @touchstart="onLeftPress"
      @touchend="onLeftRelease"
      @mousedown="onLeftRelease"
      @mouseup="onLeftRelease"
      @mouseleave="onLeftRelease"
    >
      <i class="fa-solid fa-chevron-left"></i>
    </button>
    <button
      class="cell"
      :class="centerActive ? 'active' : ''"
      @touchstart="onCenterPress"
      @touchend="onCenterRelease"
      @mousedown="onCenterRelease"
      @mouseup="onCenterRelease"
      @mouseleave="onCenterRelease"
    >
      <p>{{ centerLabel }}</p>
    </button>
    <button
      class="cell"
      :class="rightActive ? 'active' : ''"
      @touchstart="onRightPress"
      @touchend="onRightRelease"
      @mousedown="onRightRelease"
      @mouseup="onRightRelease"
      @mouseleave="onRightRelease"
    >
      <i class="fa-solid fa-chevron-right"></i>
    </button>
    <div class="cell"></div>
    <button
      class="cell"
      :class="downActive ? 'active' : ''"
      @touchstart="onDownPress"
      @touchend="onDownRelease"
      @mousedown="onDownRelease"
      @mouseup="onDownRelease"
      @mouseleave="onDownRelease"
    >
      <i class="fa-solid fa-chevron-down"></i>
    </button>
    <div class="cell"></div>
  </div>
</template>

<style scoped>
.nav-pad {
  display: grid;
  width: 91%;
  height: 91%;
  max-width: 500px;
  max-height: 500px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  background: var(--card-background);
  border: var(--card-border);
  border-radius: 10px;
  padding: 20px;
}

.nav-pad p {
  font-size: 2rem;
}

i {
    font-size: 3rem;
}
.nav-pad button {
    background-color: var(--card-button-background);
}

.nav-pad button:active {
  background-color: var(--active-color);
}

.nav-pad .cell {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
}
</style>
