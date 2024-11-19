<script setup>
import ModalWrapper from './ModalWrapper.vue'

defineProps(['icon', 'title', 'message'])
</script>

<template>
  <ModalWrapper level="error">
    <div class="system-notice-modal-content">
      <i :class="icon"></i>
      <h1>{{ title }}</h1>
      <p>{{ message }}</p>
    </div>
  </ModalWrapper>
</template>

<style scoped>
.system-notice-modal-content {
  height: 75vh;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  justify-content: center;
}
.system-notice-modal-content i {
  font-size: 3rem;
}
.system-notice-modal-content h1 {
  font-size: 2.5rem;
}
.system-notice-modal-content p {
  font-size: 2rem;
}
</style>
