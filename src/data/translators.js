const icons = [
  { id: 'alert', css: 'fa-solid fa-circle-exclamation' },
  { id: 'power', css: 'fa-solid fa-power-off' },
  { id: 'home', css: 'fa-solid fa-house' },
  { id: 'volume', css: 'fa-solid fa-volume-off' },
  { id: 'volume-up', css: 'fa-solid fa-volume-high' },
  { id: 'volume-down', css: 'fa-solid fa-volume-low' },
  { id: 'mics', css: 'fa-solid fa-microphone' },
  { id: 'settings', css: 'fa-solid fa-gear' },
  { id: 'blu-ray', css: 'fa-solid fa-compact-disc' },
  { id: 'lights', css: 'fa-solid fa-lightbulb' },
  { id: 'routing', css: 'fa-solid fa-shuffle' },
  { id: 'camera', css: 'fa-solid fa-camera' },
  { id: 'dialer', css: 'fa-solid fa-table-cells' },
  { id: 'blank', css: 'fa-solid fa-eye-slash' },
  { id: 'lectern', css: 'fa-solid fa-computer' },
  { id: 'apple-tv', css: 'fa-brands fa-apple' },
  { id: 'air-media', css: 'fa-solid fa-cloud' },
  { id: 'laptop', css: 'fa-solid fa-laptop' },
  { id: 'menu', css: 'fa-solid fa-bars' },
  { id: 'mic-mute', css: 'fa-solid fa-microphone-slash' },
  { id: 'down', css: 'fa-solid fa-chevron-down' },
  { id: 'left', css: 'fa-solid fa-chevron-left' },
  { id: 'right', css: 'fa-solid fa-chevron-right' },
  { id: 'prev', css: 'fa-solid fa-backward-fast' },
  { id: 'rew', css: 'fa-solid fa-backward' },
  { id: 'stop', css: 'fa-solid fa-stop' },
  { id: 'play', css: 'fa-solid fa-play' },
  { id: 'pause', css: 'fa-solid fa-pause' },
  { id: 'fwd', css: 'fa-solid fa-forward' },
  { id: 'next', css: 'fa-solid fa-forward-fast' },
  { id: 'close', css: 'fa-solid fa-xmark' },
  { id: 'delete', css: 'fa-solid fa-circle-xmark' },
  { id: 'dial', css: 'fa-solid fa-phone' },
  { id: 'end-call', css: 'fa-solid fa-phone-slash' },
  { id: 'keypad', css: 'fa-solid fa-table-cells' },
  { id: 'plus', css: 'fa-solid fa-plus' },
  { id: 'minus', css: 'fa-solid fa-minus' },
  { id: 'projector', css: 'fa-solid fa-video' },
  { id: 'tv', css: 'fa-solid fa-tv' },
  { id: 'cable-tv', css: 'fa-solid fa-satellite-dish' },
  { id: 'help', css: 'fa-solid fa-circle-question' },
  { id: 'hdmi', css: 'fa-solid fa-laptop' },
  { id: 'vga', css: 'fa-solid fa-laptop' },
  { id: 'note', css: 'fa-solid fa-music' },
  { id: 'eject', css: 'fa-solid fa-eject' },
  { id: 'mute', css: 'fa-solid fa-volume-xmark' },
  { id: 'dvd', css: 'fa-solid fa-compact-disc' },
  { id: 'globe', css: 'fa-solid fa-globe' },
  { id: 'check', css: 'fa-solid fa-check' },
  { id: 'connector', css: 'fa-solid fa-right-to-bracket' },
  { id: 'wallplate', css: 'fa-solid fa-right-to-bracket' },
  { id: 'theater', css: 'fa-solid fa-film' },
  { id: 'event', css: 'fa-solid fa-eye' }
]

/**Convert a config response icon keyword to the custom fon CSS class for that icon
 * @param {string} tag The keyword associated with the icon. See GCU Av Framework documentation on Confluence for valid values.
 */
export const translateIconTag = (tag) => {
  let found = icons.find((x) => x.id === tag)
  if (found) {
    return found.css
  } else {
    return 'fa-solid fa-circle-info'
  }
}
