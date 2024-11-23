<script setup>
import ModalWrapper from './ModalWrapper.vue'
defineProps(['title', 'message', 'confirmText', 'cancelText'])
defineEmits(['confirm', 'cancel'])
</script>

<template>
  <ModalWrapper level="notice">
    <div class="confirmation-modal">
      <h1>{{ title }}</h1>
      <p>{{ message }}</p>
      <div class="buttons-row">
        <button @click="$emit('confirm')" class="button-danger">{{confirmText}}</button>
        <button @click="$emit('cancel')">{{cancelText}}</button>
      </div>
    </div>
  </ModalWrapper>
</template>

<style scoped>
.confirmation-modal {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  height: 75vh;
}

.confirmation-modal h1 {
  font-size: 2.8rem;
}

.confirmation-modal p {
  font-size: 1.8rem;
}

.confirmation-modal button {
  padding: 30px;
  min-width: 200px;
  margin: 0 20px;
}

.confirmation-modal .buttons-row {
  margin-top: 30px;
}
</style>
