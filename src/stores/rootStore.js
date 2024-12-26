import { defineStore } from 'pinia'
import { getConfig } from '../plugins/crestronCom/commands/systemStateCommands'
import { checkString, checkBoolean, checkDefined } from '@/data/validators'
import { useSecurityStore } from './securityStore'
import { setSytemUseState } from '../plugins/crestronCom/commands/systemStateCommands'

import { testMenu } from '@/data/TestData'

/**
 * Base state management for general room information. State object:
 * { isOnline, isInUse, roomName, helpNumber, roomType, isSecure, isTech, mainMenu[{id, label, icon, control, source}]}
 */
export const useRootStore = defineStore('rootStore', {
  state: () => ({
    /** true = connected with control system, false = not connected */
    isOnline: false,
    /** true = system is in an active state, false = in standby */
    isInUse: false,
    /** The friendly name of the room to display on the UI */
    roomName: 'Default Room Name',
    /** The tehc support contact info displayed on the help UI */
    helpNumber: '555-555-5555',
    /** room type tag used to determine what elements are shown */
    roomType: 'baseline',
    /** true = UI should allow advanced tech elements, false = normal options only */
    isTech: false,
    /** The tag of the activity that will be shown during startup. */
    defaultActivity: 'av-routing',
    /** The model of the touchscreen or other interface running the display project. */
    uiModel: 'Default UI Device',
    /**Collection of config objects that define what activities are shown on the main navigation.
     * Data object is {id: string, label: string, control: string, source: string}
     */
    mainMenu: testMenu //[]
  }),
  getters: {
    menu: (state) => {
      if (state.isTech) {
        return state.mainMenu
      } else {
        return state.mainMenu.filter((x) => !x.Tags.includes('tech'))
      }
    }
  },
  actions: {
    /**
     * Update all state information in the store. An error is loged if any value is invalid and
     * the store is not updated. See parameter documentation for data object properties.
     * @param {boolean} isOnline true = UI is connected to control, false = disconnected.
     * @param {boolean} isInUse true = system is in 'active' state, false = in standby state.
     * @param {string} roomName the room name/label that will be displayed on the UI.
     * @param {string} helpNumber The tech support contact info to display on the UI.
     * @param {string} roomType Room tag that will dictate what actions are available.
     * @param {boolean} isSecure true = enable passcode protection, false = unsecure.
     * @param {boolean} isTech True = allow tech controls, false = hide tech controls
     * @param {Array<object>} mainMenu collection of activivities that will be available to the user.
     */
    updateStateData({
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

      console.log('updating rootStore state data. Menu:')
      console.log(MainMenu)

      this.isInUse = IsInUse
      this.roomName = RoomName
      this.helpNumber = HelpNumber
      this.roomType = RoomType.toLowerCase()
      this.isTech = IsTech
      this.defaultActivity = DefaultActivity
      Object.assign(this.mainMenu, MainMenu)

      let securityStore = useSecurityStore()
      securityStore.updateIsSecure(IsSecure)
    },
    /** Change the root store state to show whether or not the Control System is connected.
     * @param {boolean} newState - true = is connected, false = not connected.
     */
    updateOnlineStatusFeedback(newState) {
      if (!checkBoolean(newState, 'newState', 'rootStore.updateOnlineStatusFeedback')) return
      this.isOnline = newState
    },
    /** change the stored state for system use
     * @param {boolean} newState - true = system in use, false = system in standby.
     */
    updateUseStatusFeedback(newState) {
      if (!checkBoolean(newState, 'newState', 'rootStore.updateUseStatusFeedback')) return
      if (newState != this.isInUse) {
        this.isInUse = newState
      }

      let securityStore = useSecurityStore()
      if (securityStore.isSecure && !newState) {
        securityStore.lockSystem()
      }
    },
    /**
     *Change the stored value for the room name/label
     * @param {string} newName - the name and/or location to display on the UI.
     */
    updateRoomName(newName) {
      if (!checkString(newName, 'newName', 'rootStore.updateRoomName')) return
      this.roomName = newName
    },
    /**
     * Updated the stored contact info for technical support.
     * @param {string} contactInfo - the phone number or other contact method for helpdesk support.
     */
    updateHelpContact(contactInfo) {
      if (!checkString(contactInfo, 'contactInfo', 'rootStore.updateHelpContact')) return
      this.helpNumber = contactInfo
    },
    /**
     * Updated the stored room type tag that will determine what UI elements to display.
     * @param {string} newType - the room type tag/keyword to store.
     */
    updateRoomType(newType) {
      if (!checkString(newType, 'newType', 'rootStore.updateRoomType')) return
      this.roomType = newType
    },
    /**
     * Set whether or not the UI is a secure interface and requires passcode access.
     * @param {boolean} isSecure true = enable security passcode lockout, false = normal operation
     */
    updateSecurity(isSecure) {
      if (!checkBoolean(isSecure, 'isSecure', 'rootStore.updateSecurity')) return
      this.isSecure = isSecure
    },
    /**
     * Set whether or not the UI is at a tech station and should allow access to event and advanced controls.
     * @param {boolean} isTechStation true = allow tech controls, false = hide tech controls
     */
    updateTechStationStatus(isTechStation) {
      if (!checkBoolean(isTechStation, 'isTechStation', 'rootStore.updateTechStationStatus')) return
      this.isTech = isTechStation
    },
    /**
     * Update the stored collection of activities available for selection
     * @param menuItems - array of objects representing the configuration of each selectable activity.
     */
    updateMainMenu(menuItems) {
      if (!checkDefined(menuItems, 'menuItems', 'rootStore.updateMainMenu')) return

      this.mainMenu = menuItems
    },
    /**
     * Send a request to the control system to trigger a re-send of the base room info and main menu items.
     */
    requestConfigUpdate() {
      getConfig()
    },
    /**
     * Sends a request to the control system to change the current 'in use' status via digital join pulse.
     * @param {boolean} newState true = set system to 'in use', false = set system to 'standby'.
     * */
    requestUseStateChange(newState) {
      if (!checkBoolean(newState, 'newState', 'rootStore.requestUseStateChange')) return
      setSytemUseState(newState)
    }
  }
})
