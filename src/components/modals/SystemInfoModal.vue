<script setup>
import { useRootStore } from '@/stores/rootStore'
import { useVideoStore } from '@/stores/videoStore'
import { useAudioStore } from '@/stores/audioStore'
import { useModalStore } from '@/stores/modalStore'
import ModalWrapper from './ModalWrapper.vue'

const modalStore = useModalStore()
const videoStore = useVideoStore()
const audioStore = useAudioStore()
const rootStore = useRootStore()

const onDone = () => {
  modalStore.setHelpVisibility(false)
}
</script>

<template>
  <ModalWrapper @click="onDone" level="notice">
    <div class="system-info-modal" @click.stop>
      <div class="info-content">
        <div class="room-contact">
          <h1>{{ rootStore.roomName }}</h1>
          <p>Support Contact: {{ rootStore.helpNumber }}</p>
        </div>
        <div class="device-info">
          <p><span>Interface:</span> {{ rootStore.uiModel }}</p>
          <p v-if="videoStore.avrRouters.length > 0">
            <span>AV Router:</span> {{ videoStore.avrRouters[0].Label }}
          </p>
          <p v-if="audioStore.audioDevices.length > 0">
            <span>Audio DSP:</span> {{ audioStore.audioDevices[0].Model }}
          </p>
          <h2 v-if="videoStore.displays.length > 0">Displays:</h2>
          <div class="table-header" v-if="videoStore.displays.length > 0">
              <h3>Name</h3>
              <h3>Model</h3>
            </div>
            <div class="display-section" v-if="videoStore.displays.length > 0">
            <div class="table-row" v-for="display in videoStore.displays" :key="display.Id">
                <p>{{ display.Label }}</p>
                <p>{{ display.Model }}</p>
            </div>
          </div>
        </div>
      </div>
      <button class="close-button" @click="onDone()">X</button>
    </div>
  </ModalWrapper>
</template>

<style scoped>
.system-info-modal {
  width: 100%;
  height: 75vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
}

.info-content {
  width: 100%;
  height: 80%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.room-contact {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-right: solid 1px var(--modal-border-color);
}
.room-contact h1 {
  font-size: 2.5rem;
}
.room-contact p {
  font-size: 1.8rem;
  color: var(--alert-color);
}

.display-section {
  width: 100%;
  max-height: 230px;
  overflow-y: scroll;
}

.table-header {
  width: 100%;
  background-color: var(--card-background);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
}
.table-header h3 {
  width: 50%;
}
.table-row {
  width: 100%;
  display: flex;
  padding: 0 0 10px 0;
}
.table-row p {
    width: 50%;
}

.device-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  gap: 15px;
  font-size: 1.6rem;
}
.device-info span,
h2,
h3 {
  font-weight: bold;
  font-size: 1.6rem;
}
</style>
