<script setup>
import { RouterView } from 'vue-router'
import { useModalStore } from '@/stores/modalStore'
import { useRootStore } from '@/stores/rootStore'
import ActiveHeader from '@/components/ActiveHeader.vue'
import MainNav from '@/components/ui/MainNav.vue'
import SystemInfoModal from '@/components/modals/SystemInfoModal.vue'
import SystemErrorsModal from '@/components/modals/SystemErrorsModal.vue'
import ConfirmationModal from '@/components/modals/ConfirmationModal.vue'
import LevelGauge from '@/components/ui/LevelGauge.vue'

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
      <ActiveHeader />
      <RouterView></RouterView>
      <div class="active-footer">
        <LevelGauge :isHorizontal="true"/>
      </div>
    </section>
  </div>
</template>

<style scoped>
.active-view {
  display: grid;
  grid-template-columns: 15% auto;
  min-height: 100vh;
  min-width: 100vw;
}

.active-view section {
  display: flex;
  flex-direction: column;
}
</style>
