import VCountdown from "./components/Countdown"
import type { App, Plugin } from "vue"

const VCountdownPlugin: Plugin = {
  install (app: App, options?: { name?: string }) {
    const name = options?.name
    app.component(name || 'v-countdown', VCountdown)
    app.component(name || 'VCountdown', VCountdown)
  }
}

export { VCountdownPlugin, VCountdown }

export default VCountdownPlugin