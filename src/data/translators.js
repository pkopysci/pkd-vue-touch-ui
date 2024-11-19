const icons = [
  { id: 'alert', css: 'crneo crf-alert' },
  { id: 'power', css: 'crneo crf-power' },
  { id: 'home', css: 'crneo crf-home' },
  { id: 'volume', css: 'crneo crf-volume' },
  { id: 'mics', css: 'crneo crf-mic' },
  { id: 'settings', css: 'crneo crf-gear' },
  { id: 'blu-ray', css: 'crneo crf-blu-ray' },
  { id: 'lights', css: 'crneo crf-lights' },
  { id: 'routing', css: 'crneo crf-shuffle' },
  { id: 'camera', css: 'crneo crf-camera' },
  { id: 'dialer', css: 'spin-dialer' },
  { id: 'blank', css: 'crneo crf-stop-source' },
  { id: 'lectern', css: 'crneo crf-laptop' },
  { id: 'apple-tv', css: 'crneo crf-apple' },
  { id: 'air-media', css: 'crneo crf-airmedia' },
  { id: 'laptop', css: 'crneo crf-laptop' },
  { id: 'menu', css: 'crneo crf-list' },
  { id: 'mic-mute', css: 'crneo crf-mic-mute' },
  { id: 'volume-up', css: 'crneo crf-volume-hi' },
  { id: 'volume-down', css: 'crneo crf-volume-lo' },
  { id: 'up', css: 'crneo crf-up-alt' },
  { id: 'down', css: 'crneo crf-down-alt' },
  { id: 'left', css: 'crneo crf-left-alt' },
  { id: 'right', css: 'crneo crf-right-alt' },
  { id: 'play-pause', css: 'crneo crf-play-pause' },
  { id: 'prev', css: 'crneo crf-previous' },
  { id: 'rew', css: 'crneo crf-previous' },
  { id: 'stop', css: 'crneo crf-stop' },
  { id: 'play', css: 'crneo crf-play' },
  { id: 'pause', css: 'crneo crf-pause' },
  { id: 'fwd', css: 'crneo crf-fwd' },
  { id: 'next', css: 'crneo crf-next' },
  { id: 'close', css: 'crneo crf-delete' },
  { id: 'delete', css: 'crneo crf-delete-alt' },
  { id: 'dial', css: 'crneo crf-phone' },
  { id: 'end-call', css: 'crneo crf-phone-down' },
  { id: 'keypad', css: 'crneo crf-keypad' },
  { id: 'plus', css: 'crneo crf-plus' },
  { id: 'minus', css: 'crneo crf-minus' },
  { id: 'projector', css: 'crneo crf-projector' },
  { id: 'tv', css: 'crneo crf-tv' },
  { id: 'cable-tv', css: 'crneo crf-satellite' },
  { id: 'help', css: 'crneo crf-help' },
  { id: 'hdmi', css: 'icon-hdmi' },
  { id: 'vga', css: 'icon-vga' },
  { id: 'note', css: 'crneo crf-audio-note' },
  { id: 'eject', css: 'crneo crf-eject' },
  { id: 'mute', css: 'crneo crf-volume-mute' },
  { id: 'dvd', css: 'crneo crf-dvd' },
  { id: 'globe', css: 'crneo crf-globe' },
  { id: 'check', css: 'crneo crf-check' },
  { id: 'connector', css: 'crneo crf-connector' },
  { id: 'wallplate', css: 'crneo crf-connector-plate' },
  { id: 'theater', css: 'crneo crf-film' },
  { id: 'event', css: 'crneo crf-live' }
]

/**Convert a config response icon keyword to the custom fon CSS class for that icon
 * @param {string} tag The keyword associated with the icon. See GCU Av Framework documentation on Confluence for valid values.
 */
export const translateIconTag = (tag) => {
  let found = icons.find((x) => x.id === tag)
  if (found) {
    return found.css
  } else {
    return 'crneo crf-alert'
  }
}
