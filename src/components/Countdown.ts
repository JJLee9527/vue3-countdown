import { Component, defineComponent, reactive, ref, nextTick, onMounted, onBeforeUnmount } from "vue";
import dayjs from "dayjs";

const vCountdown = defineComponent({
  name: "vCountdown",
  props: {
    startTime: {
      type: String,
      default: () => dayjs().toISOString(),
    },
    endTime: {
      type: String,
      default: () => dayjs().add(1, 'day').toISOString(),
    },
    leftTime: {
      type: Number,
      default: 0,
    },
    autoStart: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { slots }) {
    const data= reactive<{
      state: 'ready' | 'running' | 'paused' | 'stopped' | 'finished',
      day: number,
      hour: number,
      minute: number,
      second: number,
      millisecond: number,
      total: number,
      left: number,
    }>({
      state: 'ready',
      day: 0,
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
      total: 0,
      left: 0,
    })
    const firstTimestamp = ref(0)
    const elapsed = ref(0)
    const frame = ref<number>()
    const timeout = ref<any>()

    onMounted(() => {
      init()
    })

    onBeforeUnmount(() => {
      stopFrame()
      clearTimeout(timeout.value)
    })
    
    function init() {
      const now = dayjs()
      const startTime = dayjs(props.startTime)
      const endTime = dayjs(props.endTime)
      const leftTime = props.leftTime ? props.leftTime * 1000 : endTime.diff(startTime).valueOf() // convert to milliseconds
      
      data.total = data.left = leftTime
      data.second = Math.floor(leftTime / 1000) % 60,
      data.minute = Math.floor(leftTime / 1000 / 60) % 60,
      data.hour = Math.floor(leftTime / 1000 / 60 / 60) % 24
      data.day = Math.floor(leftTime / 1000 / 60 / 60 / 24)

      if (endTime.isBefore(now)) {
        data.state = 'finished'
        return
      }

      data.state = 'ready'

      if (!props.autoStart) return

      if( props.leftTime > 0) {
        startCountdown()
        return
      }
      
      const delay = startTime.diff(now).valueOf()
      
      if (delay <= 0) {
        startCountdown()
        return
      }

      timeout.value = setTimeout(() => {
        startCountdown()
      }, delay)

      console.log('delay', delay / 1000)
    }

    function updateCountdown(timestamp: number) {
      if(!firstTimestamp.value) {
        firstTimestamp.value = timestamp
      } else {
        elapsed.value = timestamp - firstTimestamp.value
      }
      data.left = data.total - elapsed.value

      if (data.left <= 0) {
        clearData()
        stopFrame()
        data.state = 'finished'
        return
      }

      data.millisecond = 999 - Math.floor(elapsed.value % 1000)
      data.second = Math.floor(data.left / 1000)
      data.minute = Math.floor(data.second / 60)
      data.hour = Math.floor(data.minute / 60)

      frame.value = requestAnimationFrame(updateCountdown)
    }
    
    function stopFrame() {
      if (!frame.value) return
      cancelAnimationFrame(frame.value)
    }
    
    function startCountdown() {
      frame.value = requestAnimationFrame(updateCountdown)
      data.state = 'running'
    }

    function clearData() {
      firstTimestamp.value = 0
      data.hour = 0
      data.minute = 0
      data.second = 0
      data.millisecond = 0
      data.total = 0
      data.left = 0
    }

    return () => {
      if (slots.default)
        return slots.default(data)
    }
  },
})

export default vCountdown as Component