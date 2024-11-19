<script setup>
import ActiveView from './views/ActiveView.vue';
import { useRootStore } from './stores/rootStore';
import StandbyView from './views/StandbyView.vue';

const rootStore = useRootStore()
</script>

<template>
  <ActiveView v-if="rootStore.isInUse" />
  <StandbyView v-else />
</template>