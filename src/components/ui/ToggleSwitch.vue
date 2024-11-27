<script setup>
defineProps(['isOn', 'disable'])
defineEmits(['onToggle'])
</script>

<template>
<label class="switch">
  <input :disabled="disable" type="checkbox" @click="$emit('onToggle')" :checked="isOn">
  <span class="slider round"></span>
</label>
</template>

<style scoped>
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: flex;
  width: 125px;
  height: 50px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 42px;
  width: 42px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: var(--active-color);
}

input:focus + .slider {
  box-shadow: 0 0 1px var(--active-color);
}

input:checked + .slider:before {
  -webkit-transform: translateX(74px);
  -ms-transform: translateX(74px);
  transform: translateX(74px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}</style>
