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
        <li v-for="item in rootStore.menu" :key="item.Id">
          <router-link active-class="nav-active" :to="{ name: item.Control }">
            <i :class="translateIconTag(item.Icon)"></i>
            {{ item.Label }}
          </router-link>
        </li>
      </ul>
    </nav>
    <SystemControls />
  </section>
</template>

<style scoped>

.sidebar {
  height: 100vh;
}
nav {
  display: flex;
  flex-direction: column;
  background-color: var(--card-background);
  max-height: 553px;
  flex-grow: 1;
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
