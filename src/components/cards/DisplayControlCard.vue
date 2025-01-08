<script setup>
import ToggleSwitch from '../ui/ToggleSwitch.vue'
import CardWrapper from './CardWrapper.vue'

const props = defineProps(['id', 'label', 'powerState', 'hasScreen', 'gridCard'])
const emit = defineEmits(['onPower', 'onScreen'])

const onPowerToggle = () => {
  emit('onPower', props.id, !props.powerState)
}
</script>

<template>
  <CardWrapper :class="gridCard ? 'grid-card' : 'column-card'">
    <div class="title-row">
      <h2>{{ label }}</h2>
      <ToggleSwitch :is-on="powerState" @on-toggle="onPowerToggle" />
    </div>
    <div v-if="hasScreen && !gridCard" class="control-row">
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
  font-weight: bold;
  font-size: 1.8rem;
}

h3 {
  font-size: 1.8rem;
}

i {
  font-size: 2rem;
}
button {
  padding: 20px;
}

/* when the gridCard prop is set to false */
.column-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  width: 65%;
  gap: 30px;
}

.column-card .title-row {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}

.column-card .control-row {
  width: 100%;
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: space-between;
}
.column-card .control-row span {
  display: flex;
  gap: 20px;
}

/* when the gridCard prop is set to true */
.grid-card {
  display: flex;
  width: 250px;
  height: 200px;
  padding: 20px;
  align-items: center;
  justify-content: center;
}

.grid-card .title-row {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  flex-grow: 1;
  justify-content: space-between;
}
</style>
