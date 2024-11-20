<script setup>
import { useRootStore } from '@/stores/rootStore'
import { useErrorStore } from '@/stores/errorStore'
import { useModalStore } from '@/stores/modalStore'
import ModalWrapper from './ModalWrapper.vue'

const rootStore = useRootStore()
const errorStore = useErrorStore()
const modalStore = useModalStore()

const onDone = () => {
  modalStore.setErrorListVisibility(false)
}
</script>

<template>
  <ModalWrapper level="notice">
    <div class="system-errors-modal">
      <div class="header">
        <h1>System Errors</h1>
        <span>Support Contact: {{ rootStore.helpNumber }}</span>
      </div>
      <ul>
        <li v-for="error in errorStore.errorsList" :key="error">{{ error }}</li>
      </ul>
      <button @click="onDone()">Done</button>
    </div>
  </ModalWrapper>
</template>

<style scoped>
.system-errors-modal {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 75vh;
}

.system-errors-modal .header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 20px;
  border-bottom: solid 1px var(--modal-border-color);
  width: 100%;
}
.system-errors-modal .header span {
  color: var(--alert-color);
  font-size: 1.5rem;
}

.system-errors-modal ul {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  font-size: 1.8rem;
  max-height: 75%;
  overflow-y: scroll;
  padding: 10px;
}

.system-errors-modal button {
  width: 10rem;
  height: 5rem;
}
</style>
