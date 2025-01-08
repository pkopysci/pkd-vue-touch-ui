<script setup>
import Vue3Slider from 'vue3-slider'
import CardWrapper from './CardWrapper.vue'
import ToggleSwitch from '../ui/ToggleSwitch.vue'
import { onBeforeMount, onBeforeUnmount, ref, watch } from 'vue'

const props = defineProps(['lightingItem', 'isZone'])
const emit = defineEmits(['setLoad', 'setActive'])
const tempLevel = ref(0)
const dragging = ref(false)
let intervalId = undefined

onBeforeMount(() => {
  if (props.isZone) {
    tempLevel.value = props.lightingItem.Load
  }
})

onBeforeUnmount(() => clearInterval(intervalId))
watch(props.lightingItem, () => {
  if (!dragging.value) {
    tempLevel.value = props.lightingItem.Load
  }
})

const onDragStart = () => {
  dragging.value = true
  intervalId = setInterval(() => {
    emit('setLoad', props.lightingItem.ControlId, props.lightingItem.Id, tempLevel.value)
  }, 100)
}

const onDragEnd = () => {
  clearInterval(intervalId)
  tempLevel.value = props.lightingItem.Load
}

const onZoneStateToggle = () => {
  let load = tempLevel.value > 0 ? 0 : 100
  emit('setLoad', props.lightingItem.ControlId, props.lightingItem.Id, load)
}

const onSceneselect = () => {
  emit('setActive', props.lightingItem.ControlId, props.lightingItem.Id)
}
</script>

<template>
  <CardWrapper class="horizontal-control-card">
    <h2>{{ lightingItem.Label }}</h2>
    <Vue3Slider
      v-if="isZone"
      v-model="tempLevel"
      alwaysShowHandle
      color="var(--text-color)"
      width="50%"
      :min="0"
      :max="100"
      :step="1"
      :height="7"
      :handleScale="2.5"
      @drag-start="onDragStart"
      @drag-end="onDragEnd"
    />

    <ToggleSwitch v-if="isZone" @on-toggle="onZoneStateToggle" :isOn="tempLevel > 0" />
    <ToggleSwitch v-else @on-toggle="onSceneselect" :isOn="lightingItem.Set" />
  </CardWrapper>
</template>

<style scoped>
.horizontal-control-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 75%;
  padding: 20px;
  gap: 20px;
}

.horizontal-control-card h2 {
  font-size: 1.8rem;
}
</style>
