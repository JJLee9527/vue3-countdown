import VCountdown from "./components/VCountdown"
import type { App, Plugin } from "vue"

const vc: Plugin = {
  install (app: App, options?: { name?: string }) {
    const name = options?.name || 'v-countdown'
    app.component(name, VCountdown)
  }
  
  // if (typeof window !== "undefined" && window.Vue) {
  //   window.Vue.use(vac)
  // }
}

export default vc