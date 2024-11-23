<script setup>
defineProps(['level', 'isHorizontal', 'style'])
</script>

<template>
  <div
    class="level-gauge"
    :class="[isHorizontal ? 'gauge-horizontal' : 'gauge-vertical']"
    :style="style ? style : ''"
  >
    <div
      class="indicator"
      :style="isHorizontal ? { width: `${level}%` } : { height: `${level}%` }"
    ></div>
  </div>
</template>

<style scoped>
.level-gauge {
  border-radius: 5px;
  overflow: hidden;
  background-color: var(--button-idle-color);
  position: relative;
  display: flex;
  align-items: flex-end;
  mix-blend-mode: screen;
}

.gauge-horizontal {
  width: 100%;
  height: 2rem;
}
.gauge-horizontal .indicator {
  width: 30%;
  height: 100%;
}

.gauge-vertical {
  width: 2rem;
  height: 100%;
}
.gauge-vertical .indicator {
  width: 100%;
  height: 30%;
}
.level-gauge .indicator {
  align-items: flex-end;
  display: flex;
  background: var(--text-color);
  transition: height 0.2s ease-in-out;
}
</style>
