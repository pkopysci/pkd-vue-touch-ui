<script setup>
import { ref } from 'vue'

const props = defineProps(['showEnter', 'showDash', 'showEntryField', 'isPasscode'])
const emit = defineEmits([
  'numberSelected',
  'zeroSelected',
  'enterSelected',
  'enterWithEntrySelected',
  'dashSelected',
  'clearSelected'
])

const buttons = ref([1, 2, 3, 4, 5, 6, 7, 8, 9])
const input = ref('')
const rawInput = ref('')

const onNumberSelect = (num) => {
  if (props.isPasscode) {
    input.value = input.value + '*'
  } else {
    input.value = input.value + (num )
  }

  rawInput.value += num

  emit('numberSelected', num)
}

const onZeroSelect = () => {
  if (props.isPasscode) {
    input.value = input.value + '*'
  } else {
    input.value += '0'
  }

  rawInput.value += '0'

  emit('zeroSelected')
}

const onDashSelect = () => {
  if (props.isPasscode) {
    input.value = input.value + '*'
  } else {
    input.value = input.value + '-'
  }

  rawInput.value += '-'
  emit('dashSelected')
}

const onEnterSelect = () => {
  emit('enterSelected')
  if (props.showEntryField) {
    emit('enterWithEntrySelected', rawInput.value)
  }

  input.value = ''
  rawInput.value = ''
}

const clearEntry = () => {
  input.value = ''
  rawInput.value = ''
  emit('clearSelected')
}
</script>

<template>
      <div class="numpad-card" :class="showEntryField ? 'numpad' : 'numpad-no-entry'">
    <div v-if="showEntryField" class="entry-field">
      <span class="entered-feedback">{{ input }}</span>
      <button @click="clearEntry()">
        <i :class="translateIconTag('delete')" class="crf-3x"></i>
      </button>
    </div>
    <button v-for="(item, index) in buttons" @click="onNumberSelect(index + 1)" :key="index">
      {{ index + 1 }}
    </button>
    <button @click="onDashSelect()" v-if="showDash">-</button>
    <div v-if="!showDash"></div>
    <button @click="onZeroSelect()">0</button>
    <button @click="onEnterSelect()" v-if="showEnter">Enter</button>
    <div v-if="!showEnter"></div>
  </div>

</template>

<style scoped>
.numpad-card {
  @apply border border-slate-50 rounded-xl bg-black/25;
  display: grid;
  width: 100%;
  height: 100%;
  padding: 10px;
  max-width: 500px;
  max-height: 600px;
}

.numpad {
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(5, 1fr);
}

.numpad-no-entry {
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 1fr);
}

button {
  font-size: 1.5em;
  margin: 3px;
  @apply border border-slate-50;
}

.entry-field {
  width: 100%;
  height: 100%;
  grid-column-start: 1;
  grid-column-end: 4;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
.entry-field button {
  min-width: 75px;
  min-height: 75px;
  width: 115px;
  height: 95px;
  padding: 0;
}
.entry-field .entered-feedback {
  @apply border border-slate-50 bg-black/25;
  height: 80%;
  width: 85%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2em;
}
</style>