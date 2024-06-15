import Countdown from "./Countdown"
import type { App, Plugin } from "vue"

/**
 * Vue 3 component to render a countdown timer.
 * 
 * @example
 * <VueCountdown :time-span="8.5" :auto-start="true" format="mm:ss.S" :interval="100"></VueCountdown>
 * 
 * @link Examples
 * https://github.com/JJLee9527/vue3-countdown/tree/main/demo
 */
const VueCountdown: typeof Countdown = Countdown

/**
 * Vue 3 plugin to provide the VueCountdown component.
 * @param app Vue app instance
 * @param name Component name
 * 
 * @example
 * import { createApp } from 'vue'
 * import VCountdown from 'vue-countdown'
 * 
 * const app = createApp({})
 * app.use(VCountdown)
 * app.mount('#app')
 * 
 */
const VCountdownPlugin: Plugin = {
  install (app: App, name?: string) {
    app.component(name || VueCountdown.name!, VueCountdown)
  }
}

export { VCountdownPlugin, VueCountdown }

export default VCountdownPlugin