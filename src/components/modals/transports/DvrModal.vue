<script setup>
import { useControlledDeviceStore } from '@/stores/controlledDeviceStore'
import { irCommands } from '@/data/irCommands'
import ModalWrapper from '@/components/modals/ModalWrapper.vue'

const props = defineProps(['deviceId', 'isDvr'])
defineEmits(['onClose'])

const deviceStore = useControlledDeviceStore()

const wrapperStyle = {
  height: '80vh',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '50px'
}

const onTransportSelect = (command) => {
  deviceStore.sendTransportCommand(props.deviceId, irCommands.get(command))
}
</script>

<template>
  <ModalWrapper :style="wrapperStyle" level="warning">
    <div v-if="isDvr">
      <button @click="onTransportSelect('record')">Record</button>
      <button @click="onTransportSelect('replay')">Replay</button>
      <button @click="onTransportSelect('dishNet')">DishNET</button>
    </div>
    <div>
      <button @click="onTransportSelect('play')"><i class="fa-solid fa-play" /></button>
      <button @click="onTransportSelect('pause')"><i class="fa-solid fa-pause" /></button>
      <button @click="onTransportSelect('stop')"><i class="fa-solid fa-stop" /></button>
    </div>
    <div>
      <button @click="onTransportSelect('skipBack')">
        <i class="fa-solid fa-step-backward" />
      </button>
      <button @click="onTransportSelect('scanBack')"><i class="fa-solid fa-backward" /></button>
      <button @click="onTransportSelect('scanFwd')"><i class="fa-solid fa-forward" /></button>
      <button @click="onTransportSelect('skipFwd')"><i class="fa-solid fa-step-forward" /></button>
    </div>
    <button @click="$emit('onClose')">Done</button>
  </ModalWrapper>
</template>

<style scoped>
div {
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
}

button {
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  width: 150px;
  height: 95px;
}
</style>
