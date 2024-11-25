<script setup>
import { translateIconTag } from '@/data/translators'
import { useRootStore } from '@/stores/rootStore'
import SystemControls from '../SystemControls.vue'

const rootStore = useRootStore()
</script>
<template>
  <section>
    <nav>
      <ul>
        <li v-for="item in rootStore.menu" :key="item.id">
          <router-link active-class="nav-active" :to="{ name: item.control }">
            <i :class="translateIconTag(item.icon)"></i>
            <span> {{ item.label }} </span>
          </router-link>
        </li>
      </ul>
    </nav>
    <SystemControls />
  </section>
</template>

<style scoped>
nav {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--card-background);
}

nav a {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  min-height: 95px;
  font-size: 1.8em;
}

nav ul {
  display: flex;
  flex-direction: column;
  max-width: 100%;
  max-height: 100%;
  overflow-y: scroll;
}

.nav-active {
  color: var(--active-color);
  background-color: var(--card-background);
}
</style>
