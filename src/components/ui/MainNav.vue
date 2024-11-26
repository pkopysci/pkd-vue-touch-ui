<script setup>
import { translateIconTag } from '@/data/translators'
import { useRootStore } from '@/stores/rootStore'
import SystemControls from '../SystemControls.vue'

const rootStore = useRootStore()
</script>
<template>
  <section class="sidebar">
    <nav>
      <ul>
        <li v-for="item in rootStore.menu" :key="item.id">
          <router-link active-class="nav-active" :to="{ name: item.control }">
            <i :class="translateIconTag(item.icon)"></i>
            {{ item.label }}
          </router-link>
        </li>
      </ul>
    </nav>
    <SystemControls />
  </section>
</template>

<style scoped>

.sidebar {
  max-height: 100vh;
}
nav {
  display: flex;
  flex-direction: column;
  background-color: var(--card-background);
  max-height: 553px;
}

nav a {
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 15px;
  min-height: 95px;
  font-size: 1.8em;
  padding-left: 20px;
  text-wrap: wrap;
}
nav i {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20%;
}
nav ul {
  display: flex;
  flex-direction: column;
  max-width: 100%;
  overflow-y: scroll;
}

.nav-active {
  color: var(--active-color);
  background-color: var(--card-background);
}
</style>
