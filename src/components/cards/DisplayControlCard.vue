<script setup>
import ToggleSwitch from '../ui/ToggleSwitch.vue';
import CardWrapper from './CardWrapper.vue'

defineProps(['id', 'label', 'powerState', 'hasScreen', 'columnCard'])
defineEmits(['onPower', 'onScreen'])
</script>

<template>
  <CardWrapper :class="columnCard ? 'column-card' : 'row-card'">
    <h2>{{ label }}</h2>
    <div class="control-row">
      <h3>Power</h3>
      <span v-if="columnCard">
        <button :class="{ active: powerState }" @click="$emit('onPower', id, true)">On</button>
        <button :class="{ active: !powerState }" @click="$emit('onPower', id, false)">Off</button>
      </span>
      <ToggleSwitch v-else :is-on="powerState" @on-toggle="$emit('onPower', id, $event)"/>
    </div>
    <div v-show="hasScreen" class="control-row">
      <h3>Screen</h3>
      <span>
        <button @click="$emit('onScreen', id, true)"><i class="fa-solid fa-chevron-up" /></button>
        <button @click="$emit('onScreen', id, false)">
          <i class="fa-solid fa-chevron-down" />
        </button>
      </span>
    </div>
  </CardWrapper>
</template>

<style scoped>
h2 {
  font-weight: 700;
  font-size: 2rem;
  width: 100%;
  text-align: center;
  padding-bottom: 20px;
  border-bottom: var(--card-border);
}

h3 {
  font-size: 1.8rem;
}

i {
  font-size: 2rem;
}
/* when the column prop is set to true */
.column-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  width: 250px;
  min-height: 80%;
  gap: 30px;
}
button {
  padding: 30px;
}
.column-card .control-row {
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
}
.column-card h3 {
  width: 100%;
  text-align: center;
}
.column-card span {
  display: flex;
  gap: 20px;
  width: 100%;
}

/* horizontally expanding card, used for vertical scrolling */
.row-card {
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 25px;
  width: 75%;
}
.row-card .control-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.row-card span {
  display: flex;
  gap: 20px;
}
</style>
