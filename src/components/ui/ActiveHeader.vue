<script setup>
import { ref, onBeforeMount, watch } from 'vue'
import { useErrorStore } from '@/stores/errorStore'
import { useModalStore } from '@/stores/modalStore'
import { useCustomEventStore } from '@/stores/customEventStore'
import { useAudioStore } from '@/stores/audioStore'
import router from "@/router/index.js";

const errorStore = useErrorStore()
const modalStore = useModalStore()
const customEventStore = useCustomEventStore()
const audioStore = useAudioStore()
const micIsMuted = ref(false)

const onSelectHelp = () => {
  modalStore.setHelpVisibility(true)
}
const onSelectErrors = () => {
  modalStore.setErrorListVisibility(true)
}
const onSelectPower = () => {
  modalStore.setShutdownConfirmationVisibility(true)
}
const onSelectMics = () => {
  router.push({ name: 'mics' })
}
const checkMics = () => {
  let newMute = false
  audioStore.mics.forEach((mic) => {
    if (mic.MuteState) {
      newMute = true
    }
  })
  micIsMuted.value = newMute
}
watch(audioStore, () => {
  checkMics()
})
onBeforeMount(() => {
  checkMics()
})
</script>

<template>
  <div class="active-header">
    <i v-if="customEventStore.activeEvents.length > 0" class="fa-solid fa-eye"></i>
    <button v-show="micIsMuted" @click="onSelectMics()">
      <i class="fa-solid fa-microphone-slash alert"></i>
    </button>
    <div class="header-controls">
      <button @click="onSelectErrors()" v-show="errorStore.errorsList.length > 0">
        <i class="fa-solid fa-circle-exclamation alert"></i>
      </button>
      <button
        v-if="audioStore.programAudio"
        :class="{ 'pgm-mute-active': audioStore.programAudio.MuteState }"
        @click="modalStore.setProgramAudioVisibility(true)"
      >
        <i
          class="fa-solid"
          :class="audioStore.programAudio.MuteState ? 'fa-volume-mute' : 'fa-volume-high'"
        ></i>
      </button>
      <button @click="onSelectHelp()">
        <i class="fa-solid fa-circle-question"></i>
      </button>
      <button @click="onSelectPower()">
        <i class="fa-solid fa-power-off"></i>
      </button>
    </div>
  </div>
</template>

<style scoped>
.active-header {
  display: flex;
  align-items: center;
  justify-content: end;
  padding: 10px;
  gap: 40px;
  font-size: 2.8rem;
}
.header-controls {
  display: flex;
  gap: 60px;
  padding: 20px;
  border-radius: 10px;
  background: var(--card-background);
}
.active-header button {
  background: none;
  border: none;
  padding: 0;
  font-size: 2.8rem;
  margin: 0;
}

.pgm-mute-active {
  color: var(--alert-color);
  animation: fade 1000ms infinite;
  -webkit-animation: fade 2000ms infinite;
}

@keyframes fade {
  from {
    opacity: 1;
  }
  50% {
    opacity: 0.25;
  }
  to {
    opacity: 1;
  }
}

@-webkit-keyframes fade {
  from {
    opacity: 1;
  }
  50% {
    opacity: 0.25;
  }
  to {
    opacity: 1;
  }
}
</style>
