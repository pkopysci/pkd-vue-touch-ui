<script setup>
import CardWrapper from './CardWrapper.vue'

defineProps(['id', 'label', 'powerState', 'hasScreen'])
defineEmits(['onPower', 'onScreen'])

const wrapperStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '30px',
  width: '250px',
  minHeight: '60%',
  gap: '3rem'
}
</script>

<template>
  <CardWrapper :style="wrapperStyle">
    <h2>{{ label }}</h2>
    <div class="control-row">
      <h3>Power</h3>
      <span>
        <button :class="{ active: powerState }" @click="$emit('onPower', id, true)">On</button>
        <button :class="{ active: !powerState }" @click="$emit('onPower', id, false)">Off</button>
      </span>
    </div>
    <div v-show="hasScreen" class="control-row">
      <h3>Screen</h3>
      <span>
        <button @click="$emit('onScreen', id, true)"><i class="fa-solid fa-chevron-up" /></button>
        <button @click="$emit('onScreen', id, false)"><i class="fa-solid fa-chevron-down" /></button>
      </span>
    </div>
  </CardWrapper>
</template>

<style scoped>
h2 {
  font-weight: 700;
  font-size: 2rem;
}

h3 {
  font-size: 1.8rem;
}
i {
  font-size: 2rem;
}
.control-row {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
}
.control-row span {
  display: flex;
  gap: 15px;
}
.control-row button {
  padding: 30px;
  width: 125px;
  font-size: 1.5rem;
}
</style>
