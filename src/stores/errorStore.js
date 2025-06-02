import { defineStore } from 'pinia'
import { getErrors } from '@/plugins/crestronCom/commands/errorCommands'
import { ref } from 'vue'

export const useErrorStore = defineStore('errorStore', () => {
  const errorsList = ref([])

  /**
   * Send a request to the control system for all existing errors.
   */
  function queryAllErrors() {
    getErrors()
  }

  /**
   * @param {string} errId the id of the error. This will be used when referencing errors and removing them.
   * @param errMsg the error message to display on the UI.
   */
  function addError(errId, errMsg) {
    let existingIdx = errorsList.value.findIndex(x => x.errorId === errId)
    if (existingIdx === -1) {


      errorsList.value.push({ errorId: errId, errorMessage: errMsg })
    }
  }

  /**
   * @param errId the id of the error to remove, if it exists.
   */
  function removeError(errId) {
    if (!errorsList.value || errorsList.value.length === 0) return
    errorsList.value = errorsList.value.filter((x) => x.errorId !== errId)
  }

  return {
    errorsList,
    queryAllErrors,
    removeError,
    addError
  }
})
