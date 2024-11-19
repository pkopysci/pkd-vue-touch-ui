<script setup>
import SystemNoticeModal from './components/modals/SystemNoticeModal.vue'
import { useRootStore } from './stores/rootStore'
import { useSecurityStore } from './stores/securityStore'
import ActiveView from './views/ActiveView.vue'
import StandbyView from './views/StandbyView.vue'

const rootStore = useRootStore()
const securityStore = useSecurityStore()
</script>

<template>
  <SystemNoticeModal
    v-if="securityStore.uiLockoutActive"
    icon="fa-solid fa-lock"
    title="System Locked"
    message="Please use the primary interface to adjust room settings."
  />

  <SystemNoticeModal
    v-if="!rootStore.isOnline"
    icon="fa-solid fa-link-slash"
    title="Control System Offline"
    :message="'Contact support at ' + rootStore.helpNumber + ' to resolve this issue.'"
  />
  
  <ActiveView v-if="rootStore.isInUse" />
  <StandbyView v-else />
</template>
