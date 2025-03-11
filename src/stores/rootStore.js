import { defineStore } from 'pinia'
import {computed, ref} from "vue";
import { getConfig } from '../plugins/crestronCom/commands/systemStateCommands'
import { checkString, checkBoolean, checkDefined } from '@/data/validators'
import { useSecurityStore } from './securityStore'
import { setSytemUseState } from '../plugins/crestronCom/commands/systemStateCommands'


/**
 * Base state management for general room information. State object:
 * { isOnline, isInUse, roomName, helpNumber, roomType, isSecure, isTech, mainMenu[{id, label, icon, control, source}]}
 */
export const useRootStore = defineStore('rootStore', () => {

  const securityStore = useSecurityStore()
  
  /** true = connected to control system, false = not connected. */
  const isOnline = ref(false)
  
  /** true = system is in an active state, false = in standby */
  const isInUse = ref(false)
  
  /** The friendly name of the room to display on the UI */
  const roomName = ref('Default Room Name')
  
  /** The tech support contact info displayed on the help UI */
  const helpNumber = ref('555-555-5555')
  
  /** room type tag used to determine what elements are shown */
  const roomType =  ref('baseline')
  
  /** true = UI should allow advanced tech elements, false = normal options only */
  const isTech = ref(false)

  /** The tag of the activity that will be shown during startup. */
  const defaultActivity = ref('av-routing')
  
  /** The model of the touchscreen or other interface running the display project. */
  const uiModel =  ref('Default UI Device')
  
  /**Collection of config objects that define what activities are shown on the main navigation.
   * Data object is {id: string, label: string, control: string, source: string}
   */
  const mainMenu =  ref([])

  const menu = computed((state) => {
    if (isTech.value) {
      return mainMenu.value
    } else {
      return mainMenu.value.filter((x) => !x.Tags.includes('tech'))
    }
  })

  /**
   * Update all state information in the store. An error is logged if any value is invalid and
   * the store is not updated. See parameter documentation for data object properties.
   * @param {boolean} isOnline true = UI is connected to control, false = disconnected.
   * @param {boolean} IsInUse true = system is in 'active' state, false = in standby state.
   * @param {string} RoomName the room name/label that will be displayed on the UI.
   * @param {string} HelpNumber The tech support contact info to display on the UI.
   * @param {string} RoomType Room tag that will dictate what actions are available.
   * @param {boolean} IsSecure true = enable passcode protection, false = unsecure.
   * @param {boolean} IsTech True = allow tech controls, false = hide tech controls
   * @param {Array<object>} MainMenu collection of activities that will be available to the user.
   */
  function updateStateData({
    IsInUse,
    RoomName,
    HelpNumber,
    RoomType,
    IsSecure,
    IsTech,
    DefaultActivity,
    MainMenu
  }) {
    let result =
      checkBoolean(IsInUse, 'IsInUse', 'rootStore.updateStateData') &&
      checkBoolean(IsSecure, 'IsSecure', 'rootStore.updateStateData') &&
      checkBoolean(IsTech, 'IsTech', 'rootStore.updateStateData') &&
      checkString(RoomName, 'RoomName', 'rootStore.updateStateData', 1) &&
      checkString(HelpNumber, 'HelpNumber', 'rootStore.updateStateData', 1) &&
      checkString(RoomType, 'RoomType', 'rootStore.updateStateData', 1) &&
      checkString(DefaultActivity, 'DefaultActivity', 'rootStore.updateStateData', 1) &&
      checkDefined(MainMenu, 'MainMenu', 'rootStore.updateStateData')

    if (!result) {
      return
    }
    
    isInUse.value = IsInUse
    roomName.value = RoomName
    helpNumber.value = HelpNumber
    roomType.value = RoomType.toLowerCase()
    isTech.value = IsTech
    defaultActivity.value = DefaultActivity
    Object.assign(mainMenu.value, MainMenu)
    securityStore.updateIsSecure(IsSecure)
  }
  
  /** Change the root store state to show whether the Control System is connected.
   * @param {boolean} newState - true = is connected, false = not connected.
   */
  function updateOnlineStatusFeedback(newState) {
    if (!checkBoolean(newState, 'newState', 'rootStore.updateOnlineStatusFeedback')) return
    isOnline.value = newState
  }
  
  /** change the stored state for system use
   * @param {boolean} newState - true = system in use, false = system in standby.
   */
  function updateUseStatusFeedback(newState) {
    if (!checkBoolean(newState, 'newState', 'rootStore.updateUseStatusFeedback')) return
    if (newState !== isInUse.value) {
      isInUse.value = newState
    }
    
    if (securityStore.isSecure && !newState) {
      securityStore.lockSystem()
    }
  }
  
  /**
   *Change the stored value for the room name/label
   * @param {string} newName - the name and/or location to display on the UI.
   */
  function updateRoomName(newName) {
    if (!checkString(newName, 'newName', 'rootStore.updateRoomName')) return
    roomName.value = newName
  }
  
  /**
   * Updated the stored contact info for technical support.
   * @param {string} contactInfo - the phone number or other contact method for helpdesk support.
   */
  function updateHelpContact(contactInfo) {
    if (!checkString(contactInfo, 'contactInfo', 'rootStore.updateHelpContact')) return
    helpNumber.value = contactInfo
  }
  
  /**
   * Updated the stored room type tag that will determine what UI elements to display.
   * @param {string} newType - the room type tag/keyword to store.
   */
  function updateRoomType(newType) {
    if (!checkString(newType, 'newType', 'rootStore.updateRoomType')) return
    roomType.value = newType
  }
  
  /**
   * Set whether the UI is a secure interface and requires passcode access.
   * @param {boolean} isSecure true = enable security passcode lockout, false = normal operation
   */
  function updateSecurity(isSecure) {
    if (!checkBoolean(isSecure, 'isSecure', 'rootStore.updateSecurity')) return
    securityStore.updateIsSecure(isSecure)
  }
  
  /**
   * Set whether the UI is at a tech station and should allow access to event and advanced controls.
   * @param {boolean} isTechStation true = allow tech controls, false = hide tech controls
   */
  function updateTechStationStatus(isTechStation) {
    if (!checkBoolean(isTechStation, 'isTechStation', 'rootStore.updateTechStationStatus')) return
    isTech.value = isTechStation
  }
  
  /**
   * Update the stored collection of activities available for selection
   * @param menuItems - array of objects representing the configuration of each selectable activity.
   */
  function updateMainMenu(menuItems) {
    if (!checkDefined(menuItems, 'menuItems', 'rootStore.updateMainMenu')) return

    mainMenu.value = menuItems
  }
  
  /**
   * Send a request to the control system to trigger a re-send of the base room info and main menu items.
   */
  function requestConfigUpdate() {
    getConfig()
  }
  
  /**
   * Sends a request to the control system to change the current 'in use' status via digital join pulse.
   * @param {boolean} newState true = set system to 'in use', false = set system to 'standby'.
   * */
  function requestUseStateChange(newState) {
    if (!checkBoolean(newState, 'newState', 'rootStore.requestUseStateChange')) return
    setSytemUseState(newState)
  }
  
  return {
    isOnline,
    isInUse,
    roomName,
    helpNumber,
    roomType,
    isTech,
    defaultActivity,
    uiModel,
    mainMenu,
    menu,
    updateStateData,
    updateOnlineStatusFeedback,
    updateUseStatusFeedback,
    updateRoomName,
    updateHelpContact,
    updateRoomType,
    updateSecurity,
    updateTechStationStatus,
    updateMainMenu,
    requestConfigUpdate,
    requestUseStateChange,
  }
})
