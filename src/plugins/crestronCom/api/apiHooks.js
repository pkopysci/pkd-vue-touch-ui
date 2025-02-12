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

/** String join for sending and receivingvideo wall commands. */
export const videoWallHook = { type: 's', join: '10' }

/**
 * Tries to send a command to the control system. If successful, the command will be routed
 * to the correct device or subsystem. If a failure occurs, the error will be logged to
 * the console.
 *
 * @param {object} commandObject - The command object to be sent to the control system.
 * @param {object} hook - The hook object that defines the type and join for the command.
 */
export const trySend = (commandObject, hook) => {
  try {
    let cmd = JSON.stringify(commandObject) + 'EOF';
    window.CrComLib.publishEvent(hook.type, hook.join, cmd)
  } catch (err) {
    console.error('apiHooks.trySend() - failed to send command:' + err.message)
  }
}

/**
 * Sends a POST request to the control system with the specified command and data.
 * @param {string} command - The command to be sent.
 * @param {object} data - The data associated with the command.
 * @param {object} hook - The hook object that specifies the type and join for the command.
 */
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

/**
 * Sends a GET request to the control system with the specified command and data.
 * @param {string} command - The command to be sent.
 * @param {object} data - The data associated with the command.
 * @param {object} hook - The hook object that specifies the type and join for the command.
 */
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