import { defineStore } from 'pinia'
import { getErrors } from '@/plugins/crestronCom/commands/errorCommands'
import {ref} from "vue";

export const useErrorStore = defineStore('errorStore', () => {
  
  const errorsList = ref([])

  /**
   * Send a request to the control system for all existing errors.
   */
  function queryAllErrors() {
    getErrors()
  }

  /**
   * Replace the current collection of errors with a new collection.
   * @param {Array.<string>} newErrors the new collection of errors.
   */
  function updateErrors(newErrors)
  {
    errorsList.value = newErrors
  }

  /**
   * @param {string} errId the id of the error. This will be used when referencing errors and removing them.
   * @param errMsg the error message to display on the UI.
   */
  function addError(errId, errMsg) {
    errorsList.value.push({Errorid: errId, Error: errMsg})
  }

  /**
   * @param errId the id of the error to remove, if it exists.
   */
  function removeError(errId) {
    this.errorsList = this.errorsList.filter(x => x.Errorid !== errId)
  }
  
  return {
    errorsList,
    updateErrors,
    queryAllErrors,
    removeError,
  }
})
