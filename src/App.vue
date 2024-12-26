<script setup>
import { useRootStore } from './stores/rootStore'
import { useSecurityStore } from './stores/securityStore'
import { useVideoStore } from './stores/videoStore'
import { useAudioStore } from './stores/audioStore'
import ActiveView from './views/ActiveView.vue'
import StandbyView from './views/StandbyView.vue'
import SystemNoticeModal from './components/modals/SystemNoticeModal.vue'
import PasscodeModal from '@/components/modals/PasscodeModal.vue'
import { watch } from 'vue'
import { storeToRefs } from 'pinia'

const rootStore = useRootStore()
const rootStoreRefs = storeToRefs(rootStore)

const securityStore = useSecurityStore()
const videoStore = useVideoStore()
const audioStore = useAudioStore()


const getData = () => {
  rootStore.requestConfigUpdate()
  videoStore.requestConfigUpdate()
  audioStore.requestConfigUpdate()
}

watch(rootStoreRefs.isOnline, () => {
  if (rootStoreRefs.isOnline.value) {
    getData()
  }
})
</script>

<template>
  <ActiveView></ActiveView>
  <!-- 
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

  <PasscodeModal v-if="securityStore.isSecure" v-show="securityStore.systemLocked"></PasscodeModal>

  <ActiveView v-if="rootStore.isInUse" />
  <StandbyView v-else />
  -->
</template>
