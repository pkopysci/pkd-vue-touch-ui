<script setup>
import { useSecurityStore } from '@/stores/securityStore'
import NumberPad from '../ui/NumberPad.vue'
import ModalWrapper from './ModalWrapper.vue'

const securityStore = useSecurityStore()

const onKeypadyEnter = (code) => {
  securityStore.validatePasscode(code)
}
</script>

<template>
  <ModalWrapper level="notice">
    <div class="passcode-modal">
      <h1>Enter Passcode to Unlock</h1>
      <NumberPad
        :show-enter="true"
        :show-entry-field="true"
        :is-passcode="true"
        @enterWithEntrySelected="onKeypadyEnter"
      ></NumberPad>
    </div>
  </ModalWrapper>
</template>

<style scoped>
.passcode-modal {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  height: 75vh;
  padding: 20px;
}
</style>
