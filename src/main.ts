import Countdown from "./components/VCountdown"
import type { App, Plugin } from "vue"

const VCountdown: Plugin = {
  install (app: App, options?: { name?: string }) {
    const name = options?.name || 'v-countdown'
    app.component(name, Countdown)
  }
  
  // if (typeof window !== "undefined" && window.Vue) {
  //   window.Vue.use(vac)
  // }
}

export default VCountdown