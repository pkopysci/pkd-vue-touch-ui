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
    class="fade-in vertical-activity"
    :class="{ center: videoStore.displays.length < 4}"
  >
    <DisplayControlCard
      v-for="display in videoStore.displays"
      :key="display.Id"
      :id="display.Id"
      :label="display.Label"
      :powerState="display.PowerState"
      :hasScreen="display.HasScreen"
      :gridCard="videoStore.displays.length > 5"
      @onPower="onPowerChange"
      @onScreen="onScreenChange"
    />
  </div>
</template>

<style scoped>
.center {
  flex-grow: 1;
  justify-content: center;
}
</style>

