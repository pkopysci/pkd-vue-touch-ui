import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import {
  sendGetCustomEventConfig,
  sendChangeCustomEventState
} from '@/plugins/crestronCom/commands/customEventCommands'

export const useCustomEventStore = defineStore('customEventStore', () => {
  const customEvents = ref([])

  const activeEvents = computed(() => customEvents.value.filter((x) => x.State))
  const inactiveEvents = computed(() => customEvents.value.filter((x) => !x.State))

  /**
   * Replaces the current list of custom events with the provided list of custom events
   * @param {CustomEvent[]} newEvents - The new list of custom events
   */
  function setCustomEvents(newEvents) {
    customEvents.value = newEvents
  }

  /**
   * Updates the state of a custom event with the provided ID
   * @param {string} id - The ID of the custom event to update
   * @param {boolean} state - The new state of the custom event
   */
  function updateCustomEvent(id, state) {
    let found = customEvents.value.find((x) => x.Id == id)
    if (found) {
      found.State = state
    } else {
      console.error(`customEventStore.updateCustomEvent(${id}, ${state}) - no matching ID found.`)
    }
  }

  /**
   * Returns the custom event with the provided ID if it exists, or a default event object with id and state set to empty string and false respectively.
   * @param {string} id - The ID of the custom event to retrieve
   * @returns {CustomEvent} The custom event with the provided ID, or a default event object if no matching ID is found.
   */
  function getCustomEvent(id) {
    let found = customEvents.value.find((x) => x.Id == id)
    return found ? found : { id: '', state: false }
  }

  /**
   * Sends a custom event state change to the control system.
   * @param {string} id - The ID of the custom event to update
   * @param {boolean} state - The new state of the custom event
   */
  function sendEventChange(id, state) {
    let found = customEvents.value.find((x) => x.Id == id)
    if (found) {
      sendChangeCustomEventState(found.Id, state)
    } else {
      console.error(`customEventStore.sendEventChange(${id}, ${state}) - no matching ID found.`)
    }
  }

  /**
   * Sends a request to the control system to retrieve the current custom event
   * configuration..
   */
  function sendGetConfig() {
    sendGetCustomEventConfig()
  }

  return {
    customEvents,
    activeEvents,
    inactiveEvents,
    getCustomEvent,
    setCustomEvents,
    updateCustomEvent,
    sendEventChange,
    sendGetConfig
  }
})
