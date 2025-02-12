<script setup>
import { ref, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useModalStore } from '@/stores/modalStore'
import { useRootStore } from '@/stores/rootStore'
import { useSecurityStore } from '@/stores/securityStore'
import MainNav from '@/components/ui/MainNav.vue'
import SystemInfoModal from '@/components/modals/SystemInfoModal.vue'
import SystemErrorsModal from '@/components/modals/SystemErrorsModal.vue'
import ConfirmationModal from '@/components/modals/ConfirmationModal.vue'
import TransportsModal from '@/components/modals/transports/TransportsModal.vue'
import ActiveHeader from '@/components/ui/ActiveHeader.vue'
import LoadingModal from '@/components/modals/LoadingModal.vue'
import AudioChannelModal from '@/components/modals/AudioChannelModal.vue'
import { emptyChannel, useAudioStore } from '@/stores/audioStore'

const modalStore = useModalStore()
const rootStore = useRootStore()
const audioStore = useAudioStore()
const securityStore = useSecurityStore()
const loading = ref(true)

onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 10000)
})

const onShutdownConfirm = () => {
  modalStore.setShutdownConfirmationVisibility(false)
  rootStore.requestUseStateChange(false)
}

const onShutdownCancel = () => {
  modalStore.setShutdownConfirmationVisibility(false)
}
</script>

<template>
  <Transition>
    <LoadingModal :text="'Starting up...'" v-show="loading" />
  </Transition>
  <ConfirmationModal
    v-show="modalStore.shutownConfirmationVisible"
    title="End this session?"
    message="This will turn off the system and enter standby mode."
    confirmText="End Session"
    cancelText="Cancel"
    @confirm="onShutdownConfirm"
    @cancel="onShutdownCancel"
  />
  <SystemInfoModal v-show="modalStore.helpVisible" />
  <SystemErrorsModal v-show="modalStore.errorListVisible" />
  <TransportsModal v-if="modalStore.sourceControlState.isVisible" />
  <AudioChannelModal
    v-show="modalStore.pgmAudiovisible"
    width="40vw"
    :showCloseButton="true"
    :audioChannel="audioStore.programAudio ? audioStore.programAudio : emptyChannel"
    @closeModal="modalStore.setProgramAudioVisibility(false)"
  />
  <div class="active-view" @click="securityStore.resetTimer">
    <MainNav />
    <section class="main-content">
      <ActiveHeader />
      <RouterView></RouterView>
    </section>
  </div>
</template>

<style scoped>
.active-view {
  display: grid;
  grid-template-columns: 16% auto;
  height: 100vh;
  width: 100vw;
}

.active-view .main-content {
  display: flex;
  flex-direction: column;
  max-height: 100vh;
}
</style>
