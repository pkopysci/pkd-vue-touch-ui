import { defineStore } from 'pinia'
import { getErrors } from '@/plugins/crestronCom/commands/errorCommands'

export const useErrorStore = defineStore('errorStore', {
  state: () => ({
    errorsList: ['some device offline', 'another device offline', 'yet another device offline']
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
    }
  }
})
