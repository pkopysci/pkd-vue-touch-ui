<script setup>
defineProps(['level', 'style'])
</script>
<template>
  <div
    class="modal-backdrop fade-in"
    :class="level"
    @click="
      ($event) => {
        $event.stopPropagation()
      }
    "
  >
    <div class="modal-wrapper" :style="style ? style : ''">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.modal-wrapper {
  width: 100%;
  border-top: solid 1px var(--modal-border-color);
  border-bottom: solid 1px var(--modal-border-color);
  background: var(--app-background);
  width: 100vw;
  padding: 20px;
}
</style>
