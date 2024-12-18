/** Boolean join for subscribing to control system connection events */
export const onlineHook = { type: 'b', join: 'Csig.All_Control_Systems_Online_fb' }

/** String join for subscribing to basic room information change messages. */
export const roomConfigHook = { type: 's', join: '1' }

/** String join for subscribing to/sending video routing events/commands. */
export const videoControlHook = { type: 's', join: '2' }

/** String join for subscribing to/sending display control events/commands. */
export const displaysChangeHook = { type: 's', join: '3' }

/** String join for sendinging IR controlled device commands. */
export const deviceControlHook = { type: 's', join: '4' }

/** String join for sending security related commands. */
export const securityHook = { type: 's', join: '5' }

/** String joing for sending special event commands. */
export const eventHook = { type: 's', join: '6' }

/** String joing for sending audio routing and level adjustment commands. */
export const audioControlHook = { type: 's', join: '7' }

/** String joing for sending audio routing and level adjustment commands. */
export const lightingControlHook = { type: 's', join: '8' }

/** String join for querying for and receiving device error notices. */
export const errorReportingHook = { type: 's', join: '9'}

export const trySend = (commandObject, hook) => {

  console.log('apiHooks.trySend(' + JSON.stringify(commandObject) + ')', hook)

  try {
    let cmd = JSON.stringify(commandObject) + 'EOF';
    window.CrComLib.publishEvent(hook.type, hook.join, cmd)
  } catch (err) {
    console.error('apiHooks.trySend() - failed to send command:' + err.message)
  }
}

export const sendPost = (command, data, hook) => {
  trySend(
    {
      Method: 'POST',
      Command: command,
      Data: data
    },
    hook
  )
}

export const sendGet = (command, data, hook) => {
  trySend(
    {
      Method: 'GET',
      Command: command,
      Data: data
    },
    hook
  )
}