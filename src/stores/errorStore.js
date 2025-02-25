import { defineStore } from 'pinia'
import { getErrors } from '@/plugins/crestronCom/commands/errorCommands'

export const useErrorStore = defineStore('errorStore', {
  state: () => ({
    errorsList: []
  }),
  getters: {},
  actions: {
    /**
     * Send a request to the control system for all existing errors.
     */
    queryAllErrors()
    {
      getErrors()
    },
    /**
     * Replace the current collection of errors with a new collection.
     * @param {Array.<string>} newErrors the new collection of errors.
     */
    updateErrors(newErrors)
    {
      this.errorsList = newErrors
    },
    addError(errId, errMsg) {
      this.errorsList.push({Errorid: errId, Error: errMsg})
    },
    removeError(errId) {
      this.errorsList = this.errorsList.filter(x => x.Errorid != errId)
    }
  }
})
