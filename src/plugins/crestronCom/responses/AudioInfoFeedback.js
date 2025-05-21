import { useAudioStore } from '@/stores/audioStore'
import { audioControlHook } from '../api/apiHooks'
import { parseResponse } from './dataParser'

const commands = {
  CONFIG: (store, cmd) => {
    store.updateAudioInputs(cmd.Data.Inputs)
    store.updateAudioOutputs(cmd.Data.Outputs)
    store.updateDspInfo(cmd.Data.Dsp)
  },
  LEVEL: (store, cmd) => {
    if (cmd.Data.Io === 'INPUT') {
      store.updateAudioInputLevel(cmd.Data.Id, cmd.Data.Level)
    } else if (cmd.Data.Io === 'OUTPUT') {
      store.updateAudioOutputLevel(cmd.Data.Id, cmd.Data.Level)
    } else {
      console.error('AudioInfoFeedback - unknown level IO received: ' + cmd.Data.Io)
    }
  },
  MUTE: (store, cmd) => {
    if (cmd.Data.Io === 'INPUT') {
      store.updateAudioInputMute(cmd.Data.Id, cmd.Data.Mute)
    } else if (cmd.Data.Io === 'OUTPUT') {
      store.updateAudioOutputMute(cmd.Data.Id, cmd.Data.Mute)
    } else {
      console.error('AudioInfoFeedback - unknown mute IO received: ' + cmd.Data.Io)
    }
  },
  ZONE: (store, cmd) => {
    store.updateMicrophoneZones(cmd.Data.InId, cmd.Data.Zones)
  },
  ROUTE: (store, cmd) => {
    store.updateAudioRoute(cmd.Data.OutId, cmd.Data.InId)
  },
  STATUS: (store, cmd) => {
    store.updateAudioDevice(cmd.Data.AudioDevice)
  }
}

export default function createAudioControlPlugin() {
  const audioStore = useAudioStore()

  let dataBuffer = ''
  window.CrComLib.subscribeState(audioControlHook.type, audioControlHook.join, (data) => {
    if (!data || data.length <= 0) return

    dataBuffer += data
    const parsed = parseResponse(dataBuffer)
    dataBuffer = parsed.remainingData
    if (parsed.firstCommand && parsed.firstCommand.length > 0) {
      try {
        const cmd = JSON.parse(parsed.firstCommand)
        if (cmd.Command === 'ERROR') {
          console.error(`AudioInfoFeedback - error RX received: ${cmd.Data.Message}`)
        } else {
          commands[cmd.Command](audioStore, cmd)
        }
      } catch (err) {
        console.error(
          `AudioInfoFeedback.createAudioControlPlugin() - failed to parse response: ${err.message}`
        )
      }
    }
  })
}
