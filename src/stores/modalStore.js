import { ref } from 'vue'
import { defineStore } from 'pinia'
import { checkString, checkBoolean } from '@/data/validators'

/**
 * state management for modal visibility.
 */
export const useModalStore = defineStore('useModalStore', () => {
  
  const errorListVisible = ref(false)
  const shutdownConfirmationVisible = ref(false)
  const helpVisible = ref(false)
  const pgmAudioVisible = ref(false)
  const videoWallLayoutsVisible = ref(false)
  const sourceListVisible = ref(false)
  const sourceControlState = ref({id: '', isVisible: false})
  const audioChannelControlState = ref( {id: '', isVisible: false })
  const videoDestinationControlState = ref({ id: '', isVisible: false })
  const audioDestinationControlState = ref({ id: '', isVisible: false })


    /**
     * @param {boolean} isVisible True = show modal, false = hide modal
     */
    function setErrorListVisibility(isVisible) {
      if (!checkBoolean(isVisible, 'isVisible', 'modalStore.setErrorListVisibility')) return
      errorListVisible.value = isVisible
    }

    /**
     * @param {boolean} isVisible True = show modal, false = hide modal
     */
    function setShutdownConfirmationVisibility(isVisible) {
      if (!checkBoolean(isVisible, 'isVisible', 'modalStore.setShutdownConfirmationVisibility'))
        return
      shutdownConfirmationVisible.value = isVisible
    }

    /**
     * @param {boolean} isVisible True = show modal, false = hide modal
     */
    function setHelpVisibility(isVisible) {
      if (!checkBoolean(isVisible, 'isVisible', 'modalStore.setHelpVisibility')) return
      helpVisible.value = isVisible
    }

    /**
     * Set the visibility of the video wall layout modal.
     * @param {boolean} isVisible - True to show the modal, false to hide it.
     */
    function setVideoWallLayoutVisibility(isVisible) {
      if (!checkBoolean(isVisible, 'isVisible', 'modalStore.setVideoWallLayoutVisibility')) return
      videoWallLayoutsVisible.value = isVisible
    }

    /**
     * show or hide a device control modal on the UI.
     * @param {string} id the unique ID of the device to control
     * @param {boolean} isVisible true = show modal, false = hide modal.
     */
    function setSourceControlState(id, isVisible) {
      if (
        !checkString(id, 'id', 'modalStore.setSourceControlState') ||
        !checkBoolean(isVisible, 'isVisible', 'modalStore.setSourceControlState')
      ) {
        return
      }
      sourceControlState.value.id = id
      sourceControlState.value.isVisible = isVisible
    }

    /**
     * Update the stored status of the audio channel control modal.
     * @param {string} id the unique ID of the device to control
     * @param {boolean} isVisible true = show modal, false = hide modal.
     */
    function setAudioChannelControlState(id, isVisible) {
      if (
        !checkString(id, 'id', 'modalStore.setAudioChannelControlState') ||
        !checkBoolean(isVisible, 'isVisible', 'modalStore.setAudioChannelControlState')
      ) {
        return
      }

      audioChannelControlState.value.id = id
      audioChannelControlState.value.isVisible = isVisible
    }

    /**
     * Set the visibility of the program audio modal.
     * @param {boolean} isVisible true = show modal, false = hide modal
     */
    function setProgramAudioVisibility(isVisible) {
      if (!checkBoolean(isVisible, 'isVisible', 'modalStore.setProgramAudioVisibility')) return
      pgmAudioVisible.value = isVisible
    }

    /**
     * Set the visibility of a video destination control modal.
     * @param {string} id The unique ID of the video destination to control.
     * @param {boolean} isVisible true = show modal, false = hide modal.
     */
    function setVideoDestinationControlState(id, isVisible) {
      if (
        !checkString(id, 'id', 'modalStore.setVideoDestinationControlState') ||
        !checkBoolean(isVisible, 'isVisible', 'modalStore.setVideoDestinationControlState')
      ) {
        return
      }

      videoDestinationControlState.value.id = id
      videoDestinationControlState.value.isVisible = isVisible
    }

    /**
     * Set the visibility of an audio destination control modal.
     * @param {string} id The unique ID of the audio destination to control.
     * @param {boolean} isVisible true = show modal, false = hide modal.
     */
    function setAudioDestinationControlState(id, isVisible) {
      if (
        !checkString(id, 'id', 'modalStore.setAudioDestinationControlState') ||
        !checkBoolean(isVisible, 'isVisible', 'modalStore.setAudioDestinationControlState')
      ) {
        return
      }

      audioDestinationControlState.value.id = id
      audioDestinationControlState.value.isVisible = isVisible
    }

    function setSourceListVisibility(isVisible) {
      if (!checkBoolean(isVisible, 'isVisible', 'modalStore.setSourceListVisibility')) return
      sourceListVisible.value = isVisible
    }

    return {
      errorListVisible,
      shutdownConfirmationVisible,
      helpVisible,
      pgmAudioVisible,
      videoWallLayoutsVisible,
      sourceListVisible,
      sourceControlState,
      audioChannelControlState,
      videoDestinationControlState,
      audioDestinationControlState,
      setErrorListVisibility,
      setShutdownConfirmationVisibility,
      setHelpVisibility,
      setVideoWallLayoutVisibility,
      setSourceControlState,
      setAudioChannelControlState,
      setProgramAudioVisibility,
      setVideoDestinationControlState,
      setAudioDestinationControlState,
      setSourceListVisibility
    }
})
