<script setup>
const onStatusToggle = () => {
}
</script>

<template>
  <header>
    <h1>Online: {{ rootStore.isOnline }}</h1>
    <h2>System Use Status: {{ rootStore.isInUse }}</h2>
    <button @click="onStatusToggle">Change State</button>
    <RouterLink id="homeNav" to="/">Home</RouterLink>
    <RouterLink id="aboutNav" to="/about">About</RouterLink>
  </header>
  <Suspense>
    <RouterView>
    </RouterView>
  </Suspense>
</template>

<style scoped>
</style>