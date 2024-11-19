import { ref } from 'vue'
import { defineStore } from 'pinia'
import { sendPasscodeCheck } from '@/plugins/crestronCom/commands/securityCommands'
import { useToast } from 'vue-toastification'

const TIMEOUT_LEN = 60000

export const useSecurityStore = defineStore('securityStore', () => {
  const timerId = ref(undefined)
  const systemLocked = ref(false)
  const isSecure = ref(false)
  const uiLockoutActive = ref(false)
  const toast = useToast();

  function updateIsSecure(newState) {
    isSecure.value = newState
    systemLocked.value = newState
  }

  function updatePasscodeResult(result) {
    if (result) {
      systemLocked.value = false
      startTimer()
    } else {
      toast.error('Passcode Incorrect')
    }
  }

  /**
   * Completely lock the UI and prevent any controls. This is different than displaying the passcode modal and will
   * completely block any user interaction.
   * @param {boolean} isLocked true = UI lockout modal is displayed, false = allow use.
   */
  function updateUiLockout(isLocked) {
    uiLockoutActive.value = isLocked
  }

  /**
   * Start the system lockout timer. If the timer is already running, cancel it and start again.
   * This will set the system to a locked state after TIMEOUT_LEN milliseconds if the user does not
   * dismiss the lockout.
   */
  function startTimer() {
    if (timerId.value) {
      clearTimeout(timerId.value)
    }
    timerId.value = setTimeout(() => {
      systemLocked.value = true
    }, TIMEOUT_LEN)
  }

  /**
   * Stop the system lockout timer and prevent it from running again. If the timer is not running, this does nothing.
   */
  function stopTimer() {
    if (timerId.value) {
      clearTimeout(timerId.value)
      timerId.value = undefined
    }
  }

  /**
   * Reset the system lockout timer. If the timer is already running, cancel it and start again.
   * This will set the system to a locked state after TIMEOUT_LEN milliseconds if the user does not
   * dismiss the lockout.
   */
  function resetTimer() {
    if (timerId.value) {
      clearTimeout(timerId.value)
      timerId.value = setTimeout(() => {
        systemLocked.value = true
      }, TIMEOUT_LEN)
    }
  }

  /**
   * Send a passcode check to the Crestron system. This will
   * either allow or deny access to the system based on the
   * correctness of the passcode entered by the user.
   * @param {string} userEntry The passcode entered by the user.
   */
  function validatePasscode(userEntry) {
    sendPasscodeCheck(userEntry)
  }

  /**
   * Lock the UI and prevent any controls.
   */
  function lockSystem() {
    stopTimer()
    systemLocked.value = true
  }

  return {
    systemLocked,
    isSecure,
    uiLockoutActive,
    updateIsSecure,
    updatePasscodeResult,
    updateUiLockout,
    startTimer,
    stopTimer,
    resetTimer,
    validatePasscode,
    lockSystem
  }
})
