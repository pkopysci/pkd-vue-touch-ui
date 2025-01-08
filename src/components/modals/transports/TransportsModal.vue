<script setup>
import { ref, onBeforeMount, onBeforeUnmount } from 'vue'
import { useModalStore } from '@/stores/modalStore'
import { useControlledDeviceStore, emptyDevice } from '@/stores/controlledDeviceStore'
import { irCommands } from '@/data/irCommands'
import ItemListCard from '@/components/cards/ItemListCard.vue'
import ModalWrapper from '../ModalWrapper.vue'
import CardWrapper from '@/components/cards/CardWrapper.vue'
import NavPad from '@/components/ui/NavPad.vue'
import UpDownButtonColumn from '@/components/ui/UpDownButtonColumn.vue'
import KeypadModal from '@/components/modals/transports/KeypadModal.vue'
import DvrModal from './DvrModal.vue'

const modalStore = useModalStore()
const devControlStore = useControlledDeviceStore()
const device = ref(emptyDevice)
const showKeypad = ref(false)
const showDvrModal = ref(false)

onBeforeMount(() => {
  let found = devControlStore.devices.find((x) => x.Id == modalStore.sourceControlState.id)
  device.value = found ? found : emptyDevice
})

onBeforeUnmount(() => {
  showKeypad.value = false
  showDvrModal.value = false
})

const onSendTransport = (transport) => {
  devControlStore.sendTransportCommand(device.value.Id, transport)
}

const onSendFavorite = (favId) => {
  devControlStore.sendFavoriteCommand(device.value.Id, favId)
}

const setKeypadState = (state) => {
  showKeypad.value = state
}

const setDvrState = (state) => {
  showDvrModal.value = state
}
</script>

<template>
  <KeypadModal
    :device-id="device.Id"
    v-show="showKeypad"
    @on-close="() => setKeypadState(false)"
  ></KeypadModal>
  <DvrModal
    :device-id="device.Id"
    :is-dvr="device.SupportsDvrTransports"
    v-if="showDvrModal"
    @on-close="() => setDvrState(false)"
  ></DvrModal>
  <ModalWrapper
    level="notice"
    :style="{ padding: '20px', display: 'flex', flexDirection: 'column', height: '90vh' }"
  >
    <div class="transport-header">
      <h1>{{ device.Label }}</h1>
      <button @click="modalStore.setSourceControlState(device.Id, false)">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
    <div class="transports-content">
      <ItemListCard
        @onSelect="onSendFavorite"
        style="max-width: 200px"
        :items="device.Favorites"
      />
      <section class="remote-controls">
        <div class="remote-main">
          <CardWrapper style="padding: 20px; display: flex; gap: 20px">
            <UpDownButtonColumn
              @topButtonPresssed="() => setKeypadState(true)"
              @upPressed="onSendTransport(irCommands.get('chanUp'))"
              @downPressed="onSendTransport(irCommands.get('chanDown'))"
              @upReleased="onSendTransport(irCommands.get('chanStop'))"
              @downReleased="onSendTransport(irCommands.get('chanStop'))"
              topButtonText="Keypad"
              buttonsLabel="Channel"
            />
            <UpDownButtonColumn
              @topButtonPresssed="onSendTransport(irCommands.get('info'))"
              @upPressed="onSendTransport(irCommands.get('pageUp'))"
              @downPressed="onSendTransport(irCommands.get('pageDown'))"
              @upReleased="onSendTransport(irCommands.get('pageStop'))"
              @downReleased="onSendTransport(irCommands.get('pageStop'))"
              topButtonText="Info"
              buttonsLabel="Page"
            />
          </CardWrapper>
          <NavPad
            @upPressed="onSendTransport(irCommands.get('up'))"
            @upReleased="onSendTransport(irCommands.get('navStop'))"
            @downPressed="onSendTransport(irCommands.get('down'))"
            @downReleased="onSendTransport(irCommands.get('navStop'))"
            @leftPressed="onSendTransport(irCommands.get('left'))"
            @leftReleased="onSendTransport(irCommands.get('navStop'))"
            @rightPressed="onSendTransport(irCommands.get('right'))"
            @rightReleased="onSendTransport(irCommands.get('navStop'))"
            @centerPressed="onSendTransport(irCommands.get('select'))"
            center-label="Select"
          />
          <CardWrapper class="button-column" style="padding: 20px">
            <button @click="onSendTransport(irCommands.get('exit'))">Exit</button>
            <button @click="onSendTransport(irCommands.get('guide'))">Guide</button>
            <button @click="onSendTransport(irCommands.get('menu'))">Menu</button>
            <button @click="onSendTransport(irCommands.get('previous'))">Prev.</button>
          </CardWrapper>
        </div>
        <CardWrapper
          class="footer-buttons"
          style="display: flex; padding: 20px; align-items: center; justify-content: space-between"
        >
          <div style="display: flex; gap: 20px">
            <button
              v-if="device.SupportsDiscretePower"
              @click="onSendTransport(irCommands.get('powerOn'))"
            >
              Power On
            </button>
            <button
              v-if="device.SupportsDiscretePower"
              @click="onSendTransport(irCommands.get('powerOff'))"
            >
              Power Off
            </button>
            <button v-else @click="onSendTransport(irCommands.get('powerToggle'))">Power</button>
          </div>

          <button
            v-if="device.SupportsDvrTransports || device.SupportsVideoTransports"
            @click="() => setDvrState(true)"
          >
            DVR
          </button>

          <div v-if="device.SupportsColorButtons" class="color-buttons">
            <button
              @click="onSendTransport(irCommands.get('red'))"
              style="background-color: red"
            ></button>
            <button
              @click="onSendTransport(irCommands.get('green'))"
              style="background-color: green"
            ></button>
            <button
              @click="onSendTransport(irCommands.get('blue'))"
              style="background-color: blue"
            ></button>
            <button
              @click="onSendTransport(irCommands.get('yellow'))"
              style="background-color: yellow"
            ></button>
          </div>
        </CardWrapper>
      </section>
    </div>
  </ModalWrapper>
</template>

<style scoped>
.transport-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}
.transport-header button {
  padding: 20px;
}

.transports-content {
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
}

.remote-controls {
  display: flex;
  flex-direction: column;
  align-items: space-between;
  height: 100%;
  padding-left: 20px;
  flex-grow: 1;
  gap: 20px;
}

.remote-main {
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
}

.button-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}
.button-column button,
.footer-buttons button {
  width: 100px;
  height: 100px;
}
.button-column h3 {
  font-size: 1.6rem;
}

.color-buttons {
  display: flex;
  gap: 20px;
}
.color-buttons button {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: none;
}
</style>
