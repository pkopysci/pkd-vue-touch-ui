<script setup>
import { useVideoStore } from '@/stores/videoStore'
import DisplayControlCard from '@/components/cards/DisplayControlCard.vue'

const videoStore = useVideoStore()

const onPowerChange = (id, state) => {
  videoStore.sendDisplayPower(id, state)
}

const onScreenChange = (id, state) => {
  videoStore.sendScreenControl(id, state)
}
</script>

<template>
  <div
    class="fade-in"
    :class="videoStore.displays.length > 3 ? 'vertical-activity' : 'horizontal-activity'"
  >
    <DisplayControlCard
      v-for="display in videoStore.displays"
      :key="display.Id"
      :id="display.Id"
      :label="display.Label"
      :powerState="display.PowerState"
      :hasScreen="display.HasScreen"
      :columnCard="videoStore.displays.length <= 3"
      @onPower="onPowerChange"
      @onScreen="onScreenChange"
    />
  </div>
</template>

