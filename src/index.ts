import VueCountdown from "./Countdown"
import type { App, Plugin } from "vue"

const VCountdownPlugin: Plugin = {
  install (app: App, name?: string) {
    app.component(name || VueCountdown.name!, VueCountdown)
  }
}

export { VCountdownPlugin, VueCountdown }

export default VCountdownPlugin