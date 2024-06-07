import Countdown from "./components/Countdown"
import type { App, Plugin } from "vue"

const VCountdown: Plugin = {
  install (app: App, options?: { name?: string }) {
    const name = options?.name || 'v-countdown'
    app.component(name, Countdown)
  }
}

export { Countdown, VCountdown }

export default VCountdown