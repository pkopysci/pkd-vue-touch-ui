<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRootStore } from '@/stores/rootStore'
import LoadingModal from '@/components/modals/LoadingModal.vue'

const rootStore = useRootStore()
const datetime = ref(new Date())
const loading = ref(true)
const pressed = ref(false)

let intervalId = undefined

onMounted(() => {
  intervalId = setInterval(() => {
    datetime.value = new Date()
  }, 60000)

  setTimeout(() => {
    loading.value = false
  }, 10000)
})

onUnmounted(() => {
  clearInterval(intervalId)
})

function onStartSession() {
  pressed.value = true
  rootStore.requestUseStateChange(true)
}
</script>

<template>
  <Transition>
    <LoadingModal :text="'Shutting Down...'" v-show="loading" />
  </Transition>
  <div class="standby-view" @click="onStartSession">
    <div v-show="pressed" class="ripple-effect"></div>
    <div class="info-row">
      <h1>{{ rootStore.roomName }}</h1>
      <h2>
        {{ datetime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) }}
      </h2>
      <h3>{{ datetime.toDateString() }}</h3>
    </div>
    <div class="call-to-action">
      <i class="fa-solid fa-power-off"></i>
      <p>Touch to Start</p>
    </div>
  </div>
</template>

<style scoped>
.standby-view {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100vh;
}

.standby-view h1 {
  font-size: 3rem;
}
.standby-view h2 {
  font-size: 2rem;
}
.standby-view h3 {
  font-size: 1.5rem;
}

.info-row {
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 15px;
}

.call-to-action {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  flex-grow: 1;
  flex: 1;
  flex-basis: 1;
}
.call-to-action i {
  font-size: 7rem;
  color: var(--active-color);
}
.call-to-action p {
  font-size: 2.5rem;
}

.ripple-effect {
  position: absolute;
  border-radius: 50%;
  left: 25vw;
  top: 10vh;
  height: 50vw;
  width: 50vw;
  margin: auto;
  background: var(--active-color-highlight);
  animation-name: ripple;
  animation-duration: 1s;
  animation-iteration-count: 1;
  opacity: 0;
}
@keyframes ripple {
  0% {
    opacity: 1;
    transform: scale(0);
  }
  50% {
    opacity: 0;
    transform: scale(1);
  }
  100% {
    opacity: 0;
  }
}
</style>
