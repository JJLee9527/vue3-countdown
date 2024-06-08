import { Component, defineComponent, defineExpose, defineEmits, ref, computed, onMounted, onBeforeUnmount } from "vue";
import dayjs from "dayjs";

const vCountdown: Component = defineComponent({
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
    const emit = defineEmits(['finish', 'tick'])

    let firstTimestamp = 0
    let elapsed = 0
    let last = 0
    let activateTimeout: string | number | NodeJS.Timeout | undefined = undefined
    let frame: number | undefined = undefined
    const state = ref<'ready' | 'running' | 'paused' | 'stopped' | 'finished'>('ready')
    const total = ref(0)
    const delay = ref(0)
    const seconds = ref(0)

    const minutes = computed(() => Math.floor(seconds.value / 60))
    const hours = computed(() => Math.floor(minutes.value / 60 ))
    const days = computed(() => Math.floor(hours.value / 24))
    const second = computed(() => seconds.value % 60)
    const minute = computed(() => minutes.value % 60)
    const hour = computed(() => hours.value % 24)
    const day = computed(() => days.value)

    onMounted(() => {
      init()
    })

    onBeforeUnmount(() => {
      pause()
      activateTimeout && clearTimeout(activateTimeout)
    })
    
    function init() {
      const now = dayjs()
      const startTime = dayjs(props.startTime)
      const endTime = dayjs(props.endTime)
      const timeSpan = props.leftTime ? props.leftTime * 1000 : endTime.diff(startTime).valueOf() // convert to milliseconds
      
      total.value = last = timeSpan
      seconds.value = Math.floor(timeSpan / 1000) // 設定初始總秒數後，將會透過 computed 來取得各時間單位

      if (endTime.isBefore(now)) {
        state.value = 'finished'
        emit('finish')
        return
      }

      state.value = 'ready'

      if (!props.autoStart) return

      if( props.leftTime > 0) {
        startCountdown()
        return
      }
      
      const delaySpan = startTime.diff(now).valueOf()
      
      // 如果開始時間在現在時間之前，則直接開始倒數
      if (delaySpan <= 0) {
        startCountdown()
        return
      }

      activateTimeout = setTimeout(() => {
        startCountdown()
      }, delaySpan)
      delay.value = delaySpan

      console.log(`將於 ${Math.floor(delaySpan / 1000)} 秒後開始倒數`)
    }

    function updateCountdown(timestamp: number) {
      if(!firstTimestamp) {
        firstTimestamp = timestamp
      } else {
        elapsed = timestamp - firstTimestamp
      }
      // 算出總剩餘時間
      last = total.value - elapsed

      if (last <= 0) {
        pause()
        clearData()
        state.value = 'finished'
        emit('finish')
        return
      }

      const calcSeconds = Math.floor(last / 1000)
      if(calcSeconds !== seconds.value) {
        seconds.value = calcSeconds
        emit('tick', {
          day: day.value,
          hour: hour.value,
          minute: minute.value,
          second: second.value,
          total: total.value,
        })
      }

      frame = requestAnimationFrame(updateCountdown)
    }
    
    function pause() {
      if (!frame) return
      state.value = 'paused'
      cancelAnimationFrame(frame)
    }

    function resume() {
      if (state.value !== 'paused') return
      startCountdown()
    }
    
    function startCountdown() {
      frame = requestAnimationFrame(updateCountdown)
      state.value = 'running'
    }

    function clearData() {
      firstTimestamp = 0
      elapsed = 0
      last = 0
      delay.value = 0
    }

    defineExpose({
      start: startCountdown,
      pause,
      resume,
      clearData,
    })

    return () => {
      if (slots.default)
        return slots.default({
          state: state.value,
          day: day.value,
          hour: hour.value,
          minute: minute.value,
          second: second.value,
          delay: delay.value,
          total: total.value,
        })
    }
  },
})

export default vCountdown