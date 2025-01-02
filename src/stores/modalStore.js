import { defineStore } from 'pinia'
import { checkString, checkBoolean } from '@/data/validators'

/**
 * state management for modal visibility.
 */
export const useModalStore = defineStore('useModalStore', {
  state: () => ({
    errorListVisible: false,
    shutownConfirmationVisible: false,
    helpVisible: false,
    pgmAudiovisible: false,
    sourceControlState: { id: '', isVisible: false },
    audioChannelControlState: { id: '', isVisible: false },
    videoDestinationControlState: { id: '', isVisible: false },
    audioDestinationControlState: { id: '', isVisible: false }
  }),
  actions: {
    /**
     * @param {boolean} isVisible True = show modal, false = hide modal
     */
    setErrorListVisibility(isVisible) {
      if (!checkBoolean(isVisible, 'isVisible', 'modalStore.setErrorListVisibility')) return
      this.errorListVisible = isVisible
    },
    /**
     * @param {boolean} isVisible True = show modal, false = hide modal
     */
    setShutdownConfirmationVisibility(isVisible) {
      if (!checkBoolean(isVisible, 'isVisible', 'modalStore.setShutdownConfirmationVisibility'))
        return
      this.shutownConfirmationVisible = isVisible
    },
    /**
     * @param {boolean} isVisible True = show modal, false = hide modal
     */
    setHelpVisibility(isVisible) {
      if (!checkBoolean(isVisible, 'isVisible', 'modalStore.setHelpVisibility')) return
      this.helpVisible = isVisible
    },
    /**
     * show or hide a device control modal on the UI.
     * @param {string} id the unique ID of the device to control
     * @param {boolean} isVisible true = show modal, false = hide modal.
     */
    setSourceControlState(id, isVisible) {
      if (
        !checkString(id, 'id', 'modalStore.setSourceControlState') ||
        !checkBoolean(isVisible, 'isVisible', 'modalStore.setSourceControlState')
      ) {
        return
      }

      console.log('modalStore.setSourceControlState(' + id + ', ' + isVisible + ')')
      this.sourceControlState.id = id
      this.sourceControlState.isVisible = isVisible
    },
    /**
     * Update the stored status of the audio channel control modal.
     * @param {string} id the unique ID of the device to control
     * @param {boolean} isVisible true = show modal, false = hide modal.
     */
    setAudioChannelControlState(id, isVisible) {
      if (
        !checkString(id, 'id', 'modalStore.setAudioChannelControlState') ||
        !checkBoolean(isVisible, 'isVisible', 'modalStore.setAudioChannelControlState')
      ) {
        return
      }

      this.audioChannelControlState.id = id
      this.audioChannelControlState.isVisible = isVisible
    },
    /**
     * Set the visibility of the program audio modal.
     * @param {boolean} isVisible true = show modal, false = hide modal
     */
    setProgramAudioVisibility(isVisible) {
      if (!checkBoolean(isVisible, 'isVisible', 'modalStore.setProgramAudioVisibility')) return
      this.pgmAudiovisible = isVisible
    },
    setVideoDestinationControlState(id, isVisible) {
      if (
        !checkString(id, 'id', 'modalStore.setVideoDestinationControlState') ||
        !checkBoolean(isVisible, 'isVisible', 'modalStore.setVideoDestinationControlState')
      ) {
        return
      }

      this.videoDestinationControlState.id = id
      this.videoDestinationControlState.isVisible = isVisible
    },
    setAudioDestinationControlState(id, isVisible) {
      if (
        !checkString(id, 'id', 'modalStore.setAudioDestinationControlState') ||
        !checkBoolean(isVisible, 'isVisible', 'modalStore.setAudioDestinationControlState')
      ) {
        return
      }

      this.audioDestinationControlState.id = id
      this.audioDestinationControlState.isVisible = isVisible
    }
  }
})
