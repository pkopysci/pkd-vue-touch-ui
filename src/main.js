import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Toast from "vue-toastification"

import createErudaPlugin from './plugins/eruda'
import createCrestronPlugin from './plugins/crestronCom/responses/roomInfoFeedback'
import createCrestronXpanelPlugin from './plugins/crestronCom/crestronXpanel'
import createVideoControlPlugin from './plugins/crestronCom/responses/VideoInfoFeedback'
import createAudioControlPlugin from './plugins/crestronCom/responses/AudioInfoFeedback'
import createSecurityControlPlugin from './plugins/crestronCom/responses/securityFeedback'
import createDeviceControlPlugin from './plugins/crestronCom/responses/deviceControlFeedback'
import createLightingControlPlugin from './plugins/crestronCom/responses/lightingFeedback'
import createErrorPlugin from './plugins/crestronCom/responses/errorResponses'
import createCustomEventPlugin from './plugins/crestronCom/responses/CustomEventFeedback'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(Toast, {
    transition: "Vue-Toastification__bounce",
    maxToasts: 20,
    newestOnTop: true,
  })
app.mount('#app')

// load touchscreen UI developer tools.
createErudaPlugin()

// Initialize & establish an XPanel connection with a target control system.
createCrestronXpanelPlugin()

// Build state control & initialize CrComLib.
createCrestronPlugin()
createVideoControlPlugin()
createAudioControlPlugin()
createDeviceControlPlugin()
createSecurityControlPlugin()
createLightingControlPlugin()
createCustomEventPlugin()
createErrorPlugin()
