<script setup>
import ModalWrapper from './ModalWrapper.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'

defineProps(['text'])
</script>

<template>
  <ModalWrapper :level="'warning'">
    <div class="modal-content">
      <h1>{{ text }}</h1>
      <LoadingSpinner />
    </div>
  </ModalWrapper>
</template>

<style scoped>
.modal-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4rem;
  height: 75vh;
}
.modal-content h1 {
  font-size: 2.5rem;
}
</style>
