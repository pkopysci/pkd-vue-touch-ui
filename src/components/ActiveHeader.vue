<script setup>
import { ref, onBeforeMount, watch } from 'vue'
import { useErrorStore } from '@/stores/errorStore'
import { useModalStore } from '@/stores/modalStore'
import { useCustomEventStore } from '@/stores/customEventStore'
import { useAudioStore } from '@/stores/audioStore'

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
    <i v-show="micIsMuted" class="fa-solid fa-microphone-slash alert"></i>
    <i
      v-show="audioStore.programAudio && audioStore.programAudio.MuteState"
      class="fa-solid fa-volume-mute alert"
    ></i>
    <div class="header-controls">
      <button @click="onSelectErrors()" v-show="errorStore.errorsList.length > 0">
        <i class="fa-solid fa-circle-exclamation alert"></i>
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
  gap: 20px;
  font-size: 2.8rem;
}

.header-controls {
  display: flex;
  gap: 30px;
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
</style>
