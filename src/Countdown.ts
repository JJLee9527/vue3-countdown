import { defineComponent,nextTick, ref, computed, onMounted, onBeforeUnmount, h } from "vue";
import type { Component } from "vue";
import { formatCountdown } from "./utils";

const UNIT_SECOND = 1000
const TOLERANCE = 30 // in milliseconds

const VueCountdown: Component = defineComponent({
  name: "VueCountdown",
  props: {
    startTime: {
      type: String,
      default: undefined,
    },
    endTime: {
      type: String,
      default: undefined,
    },
    // in seconds
    timeSpan: {
      type: Number,
      default: 0,
    },
    autoStart: {
      type: Boolean,
      default: true,
    },
    interval: {
      type: Number,
      default: 1000,
      validator: (value: number) => value >= 0,
    },
    format: {
      type: String,
      default: 'HH:mm:ss',
    },
    tag: {
      type: String,
      default: 'span',
    },
    emitEvents: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update', 'finish'],
  setup(props, { slots, emit, expose }) {
    let startTimestamp = 0 // initial timestamp
    let last = 0
    let activateTimeout: string | number | NodeJS.Timeout | undefined = undefined
    let frame: number | undefined = undefined
    const state = ref<'ready' | 'running' | 'paused' | 'stopped' | 'finished'>('ready')
    const total = ref(0) // in milliseconds

    const milliseconds = ref(0)
    const seconds = computed(() => Math.floor(milliseconds.value / UNIT_SECOND))
    const minutes = computed(() => Math.floor(seconds.value / 60))
    const hours = computed(() => Math.floor(minutes.value / 60))
    const days = computed(() => Math.floor(hours.value / 24))

    // time unit for display
    const millisecond = computed(() => milliseconds.value % 1000)
    const second = computed(() => seconds.value % 60)
    const minute = computed(() => minutes.value % 60)
    const hour = computed(() => hours.value % 24)
    const day = computed(() => days.value)

    onMounted(() => {
      init()
    })

    onBeforeUnmount(() => {
      stop()
      activateTimeout && clearTimeout(activateTimeout)
    })
    
    function init() {
      const now = new Date().getTime()
      const startTime = props.startTime ? new Date(props.startTime).getTime() : now
      const endTime = props.endTime ? new Date(props.endTime).getTime() : now
      const timeSpan = props.timeSpan * 1000 || (endTime - startTime) // convert to milliseconds
      total.value = milliseconds.value = timeSpan

      if (timeSpan <= 0 || now > endTime) {
        state.value = 'finished'
        update()
        return
      }

      if (!props.autoStart) return

      if( props.timeSpan > 0) {
        start()
        return
      }
      
      const delaySpan = startTime - now
      
      // 如果開始時間在現在時間之前，則直接開始倒數
      if (delaySpan <= 0) {
        start()
        return
      }

      activateTimeout = setTimeout(() => {
        start()
      }, delaySpan)

      console.log(`將於 ${Math.floor(delaySpan / 1000)} 秒後開始倒數`)
    }

    function step() {
      if (state.value !== 'running') return

      if (!startTimestamp) {
        startTimestamp = Date.now()
      }
      
      // calculate total remaining time
      const elapsed = Date.now() - startTimestamp
      last = total.value - elapsed

      if (last <= 0) {
        state.value = 'finished'
        stop()
        return
      }

      const delayed = elapsed % props.interval
      const updating = delayed <= TOLERANCE
      if (updating) {
        milliseconds.value = last
        update()
      }

      frame = requestAnimationFrame(step)
    }

    function update() {
      if (!props.emitEvents) return

      // emit events
      
      nextTick(() => {
        emit('update', {
          day: day.value,
          hour: hour.value,
          minute: minute.value,
          second: second.value,
          millisecond: millisecond.value,
          total: total.value,
        })
      })

      if (last <= 0) {
        emit('finish')
      }
    }
    
    function pause() {
      if (!frame) return
      state.value = 'paused'
      cancelAnimationFrame(frame)
    }

    function resume() {
      if (state.value !== 'paused') return

      startTimestamp = Date.now()
      start()
    }

    function stop() {
      if (state.value === 'stopped') return

      frame && cancelAnimationFrame(frame)
      state.value = 'stopped'
      milliseconds.value = 0
      update()
    }
    
    function start() {
      if (['running','finished'].includes(state.value)) return

      init()
      state.value = 'running'
      frame = requestAnimationFrame(step)
    }

    expose({
      start,
      pause,
      resume,
      stop,
    })

    return () => {
      if (slots.default)
        return h(props.tag, slots.default({
          state: state.value,
          day: day.value,
          hour: hour.value,
          minute: minute.value,
          second: second.value,
          millisecond: millisecond.value,
          total: total.value,
        }))
      else
        return h(props.tag, {
          class: 'vue-countdown',
          innerHTML: `${formatCountdown({
            DD: String(day.value).padStart(2, '0'),
            D: day.value,
            HH: String(hour.value).padStart(2, '0'),
            H: hour.value,
            mm: String(minute.value).padStart(2, '0'),
            m: minute.value,
            ss: String(second.value).padStart(2, '0'),
            s: second.value,
            S: Math.floor((millisecond.value / 100) % 10),
          },props.format)}`,
        })
    }
  },
})

export default VueCountdown
export { VueCountdown }