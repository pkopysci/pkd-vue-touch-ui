import { useLightingStore } from '@/stores/lightingStore'
import { lightingControlHook } from '../api/apiHooks'
import { parseResponse } from './dataParser'

const rxHandlers = {
  CONFIG: (store, cmd) => {
    store.updateConfig(cmd.Data.Lights)
  },
  SCENE: (store, cmd) => {
    store.updateSelectedScene(cmd.Data.SceneId)
  },
  LOAD: (store, cmd) => {
    store.updateLightingZoneLoad(cmd.Data.ZoneId, cmd.Data.Load)
  }
}

export default function createLightingControlPlugin() {
  const lightingStore = useLightingStore()
  
  let dataBuffer = ''
  window.CrComLib.subscribeState(lightingControlHook.type, lightingControlHook.join, (data) => {
    
    if (!data || data.length <= 0) {
      return
    }
    
    dataBuffer += data
    const parsed = parseResponse(dataBuffer)
    dataBuffer = parsed.remainingData

    if (parsed.firstCommand) {
      try {
        let cmd = JSON.parse(parsed.firstCommand)
        rxHandlers[cmd.Command](lightingStore, cmd)
      } catch (error) {
        console.error(`createLightingControlPlugin() - failed to parse response: ${error}`)
      }
    }
  })
}
