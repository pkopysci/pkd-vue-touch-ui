<script setup>
import { ref } from 'vue'

const pressed = ref(false)
const emit = defineEmits(['click', 'touchstart', 'touchend'])

const onPressed = () => {
  pressed.value = true
  emit('touchstart')
}

const onReleased = () => {
  pressed.value = false
  emit('touchend')
}

const onClick = (event) => {
  if (event.pointerType !== 'mouse') return
  emit('click')
}
</script>

<template>
  <button
    class="{{pressed ? '' : 'active'}}"
    @click="onClick"
    @touchstart.prevent="onPressed"
    @touchend="onReleased"
    @mousedown.prevent="onPressed"
    @mouseup="onReleased"
  >
    <slot></slot>
  </button>
</template>
