<script setup>
import { useErrorStore } from '@/stores/errorStore'
import { useModalStore } from '@/stores/modalStore'

const errorStore = useErrorStore()
const modalStore = useModalStore()

const onSelectHelp = () => {
  modalStore.setHelpVisibility(true)
}

const onSelectErrors = () => {
  modalStore.setErrorListVisibility(true)
}

const onSelectPower = () => {
  modalStore.setShutdownConfirmationVisibility(true)
}
</script>
<template>
  <div class="system-controls">
    <button @click="onSelectErrors()" v-show="errorStore.errorsList.length > 0">
      <i class="fa-solid fa-circle-exclamation alert"></i>
      <span class="alert">Errors</span>
    </button>
    <button @click="onSelectHelp()">
      <i class="fa-solid fa-circle-question"></i>
      Info
    </button>
    <button @click="onSelectPower()">
      <i class="fa-solid fa-power-off"></i>
      Power
    </button>
  </div>
</template>

<style scoped>
.system-controls {
  display: flex;
  flex-direction: column;
  background: var(--card-background);
  border-top: solid 1px var(--button-border-color);
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.25);
}

.system-controls button {
  padding: 25px 20px;
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  gap: 20px;
  border-radius: 0;
  border:none;
}

.system-controls button i {
  font-size: 2rem;
}
</style>
