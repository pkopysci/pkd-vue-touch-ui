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
  <div class="fade-in" :class="videoStore.displays.length > 3 ? 'vertical-scroll' : 'basic-displays'">
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
<style scoped>
.basic-displays {
  max-width: 80vw;
  overflow-x: scroll;
  display: flex;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 20px;
}

.vertical-scroll {
  max-height: 75vh;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
}
</style>
