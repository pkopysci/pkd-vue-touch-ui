<script setup>
import { RouterView } from 'vue-router'
import { useModalStore } from '@/stores/modalStore'
import { useRootStore } from '@/stores/rootStore'
import MainNav from '@/components/ui/MainNav.vue'
import SystemInfoModal from '@/components/modals/SystemInfoModal.vue'
import SystemErrorsModal from '@/components/modals/SystemErrorsModal.vue'
import ConfirmationModal from '@/components/modals/ConfirmationModal.vue'
import ActiveFooter from '@/components/ActiveFooter.vue'

const modalStore = useModalStore()
const rootStore = useRootStore()

const onShutdownConfirm = () => {
  modalStore.setShutdownConfirmationVisibility(false)
  rootStore.requestUseStateChange(false)
}

const onShutdownCancel = () => {
  modalStore.setShutdownConfirmationVisibility(false)
}
</script>

<template>
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

  <div class="active-view">
    <MainNav />
    <section>
      <RouterView></RouterView>
      <ActiveFooter v-if="rootStore.roomType === 'baseline'" />
    </section>
  </div>
</template>

<style scoped>
.active-view {
  display: grid;
  grid-template-columns: 16% auto;
  min-height: 100vh;
  min-width: 100vw;
}

.active-view section {
  display: flex;
  flex-direction: column;
}
</style>
