<script setup>
import CardWrapper from '../cards/CardWrapper.vue'

defineProps(['title', 'cardStyle'])
defineEmits(['closeModal'])

</script>

<template>
  <div class="modal-backdrop fade-in notice" @click="$emit('closeModal')">
    <CardWrapper class="item-list-modal" :style="cardStyle ? cardStyle : ''" @click.stop>
      <div class="card-title" v-if="title">
        <h2>{{ title }}</h2>
      </div>
      <div class="card-content">
        <slot></slot>
      </div>
      <button @click="$emit('closeModal')" class="close-button">X</button>
    </CardWrapper>
  </div>
</template>

<style scoped>
.item-list-modal {
  width: 50vw;
  height: 90vh;
  background: var(--app-background);
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.card-title {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0 0 20px 10px;
}
.card-title h2 {
  font-size: 1.8rem;
  font-weight: 700;
}

.card-content {
  flex-grow: 1;
  max-height: 90%;
  width: 100%;
  overflow-y: scroll;
}
</style>
