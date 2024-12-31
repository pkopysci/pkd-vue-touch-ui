<script setup>
import { ref } from 'vue'

defineProps({selected: {type: Boolean, default: false}})

const isActive = ref(false)

const onDown = () => {
    isActive.value = true
}

const onUp = () => {
    isActive.value = false
}
</script>

<template>
  <button
    @mousedown="onDown()"
    @mouseleave="onUp()"
    @mouseup="onUp()"
    @touchstart="onDown()"
    @touchend="onUp()"
    :style="[isActive || selected ? { background: 'var(--active-color)' } : {}]"
  >
    <slot></slot>
  </button>
</template>

<style scoped>
button {
    background: none;
    border: none;
    border-radius: 0;
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 20px;
    padding: 20px;
    height: 95px;
}
</style>
