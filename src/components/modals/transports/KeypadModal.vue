<script setup>
import { useControlledDeviceStore } from '@/stores/controlledDeviceStore'
import { useToast } from 'vue-toastification'
import NumberPad from '@/components/ui/NumberPad.vue'
import ModalWrapper from '../ModalWrapper.vue'

const props = defineProps(['deviceId'])
defineEmits(['onClose'])

const deviceStore = useControlledDeviceStore()
const toast = useToast()

const wrapperStyle = {
  height: '80vh',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '20px'
}

const onKeypadyEnter = (entry) => {
  deviceStore.sendChannelCommand(props.deviceId, entry)
  toast.success('Dialing ' + entry + '...')
}
</script>

<template>
  <ModalWrapper level="warning" :style="wrapperStyle">
    <NumberPad
      :show-enter="true"
      :show-entry-field="true"
      :show-dash="true"
      @enterWithEntrySelected="onKeypadyEnter"
    ></NumberPad>
    <button class="done-button" @click="$emit('onClose')">close</button>
  </ModalWrapper>
</template>

<style scoped>
.done-button {
  width: 10rem;
  height: 5rem;
}
</style>
