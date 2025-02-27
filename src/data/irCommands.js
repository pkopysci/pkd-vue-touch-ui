/**
 * Collection of valid IR transport commands. to use, call irCommands.get(). invalid arguments return an empty string.
 * Valid args:
*   powerOn
    powerOff
    powerToggle
    dial
    dash
    chanUp
    chanDown
    pageUp
    pageDown
    guide
    menu
    info
    exit
    back
    play
    pause
    stop
    record
    scanFwd
    scanBack
    skipFwd
    skipBack
    up
    down
    left
    right
    red
    green
    yellow
    blue
    select
*/
export const irCommands = (function () {
  const commands = {
    powerOn: 'POWERON',
    powerOff: 'POWEROFF',
    powerToggle: 'POWERTOGGLE',
    dial: 'DIAL',
    dash: 'DASH',
    chanUp: 'CHANUP',
    chanDown: 'CHANDOWN',
    chanStop: 'CHANSTOP',
    pageUp: 'PAGEUP',
    pageDown: 'PAGEDOWN',
    pageStop: 'PAGESTOP',
    guide: 'GUIDE',
    menu: 'MENU',
    info: 'INFO',
    exit: 'EXIT',
    back: 'BACK',
    play: 'PLAY',
    pause: 'PAUSE',
    stop: 'STOP',
    record: 'RECORD',
    scanFwd: 'FWD',
    scanBack: 'REV',
    skipFwd: 'SKIPFWD',
    skipBack: 'SKIPREV',
    up: 'NAVUP',
    down: 'NAVDOWN',
    left: 'NAVLEFT',
    right: 'NAVRIGHT',
    navStop: 'NAVSTOP',
    red: 'RED',
    green: 'GREEN',
    yellow: 'YELLOW',
    blue: 'BLUE',
    select: 'SELECT',
    previous: 'PREV',
    replay: 'REPLAY',
    dishNet: 'DISHNET'
  }
  return {
    get: function (cmd) {
      if (!cmd || typeof(cmd) != 'string' || cmd.length === 0) {
        return ''
      }

      return commands[cmd]
    }
  }
})()
