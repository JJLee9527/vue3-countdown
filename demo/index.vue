<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { VueCountdown } from '../src/index'

const countdownRef = ref<any>()
const countdownRef2 = ref<any>()
const emitMessage = ref(false)
const dynamicStart = ref()
const dynamicEnd = ref()
const dynamicStart2 = ref()
const dynamicEnd2 = ref()


function startCountdown() {
  emitMessage.value = false
  dynamicStart.value = new Date().toISOString()
  dynamicEnd.value = new Date(Date.now() + 4000).toISOString()

  nextTick(() => {
    countdownRef.value?.start()
  })
}

function stopCountdown() {
  countdownRef.value?.stop()
}

function startCountdown2() {
  dynamicStart2.value = '2024-06-08T16:54:03.000'
  dynamicEnd2.value = '2024-06-08T16:54:08.000'

  nextTick(() => {
    countdownRef2.value?.start()
  })
}

function stopCountdown2() {
  countdownRef2.value?.stop()
}

function onCountdownFinished() {
  emitMessage.value = true
}
</script>

<template>
  <div>
    <section>
      <h1>Used directly</h1>
      <div class="demo">
        <VueCountdown :time-span="8.5" :auto-start="true" format="mm:ss.S" :interval="100">
        </VueCountdown>
      </div>
    </section>
    <section>
      <h1>Given start time and end time</h1>
      <div class="demo">
        <VueCountdown :start-time="'2024-06-08T16:54:03.000'" :end-time="'2024-06-08T16:55:03.000'" :auto-start="true">
          <template v-slot="{state, minute, second, total}">
            State: {{ String(state).toUpperCase() }},&#32;Total: {{ Math.floor(total/1000) }} seconds <br> {{ String(minute).padStart(2, '0') }} : {{ String(second).padStart(2, '0')}}
          </template>
        </VueCountdown>
      </div>
    </section>
    <section>
      <h1>Through start-time and end-time</h1>
      <div class="demo">
        <VueCountdown :start-time="dynamicStart" :end-time="dynamicEnd" :interval="100" :auto-start="false" :emit-events="true" format="ss.S" @finish="onCountdownFinished" ref="countdownRef">
        </VueCountdown>
        
        <div>
          <button @click="startCountdown">Start</button>
          <button @click="stopCountdown">Stop</button>
        </div>
        <p><span>Start Time: {{ dynamicStart }}</span><br><span>End Time: {{ dynamicEnd }}</span></p>
        <p>Finished: {{ emitMessage }}</p>
      </div>
    </section>

    <section>
      <h1>When end-time is after current time</h1>
      <div class="demo">
        <VueCountdown :start-time="dynamicStart2" :end-time="dynamicEnd2" :interval="100" :auto-start="false" :emit-events="true" format="ss.S" ref="countdownRef2">
        </VueCountdown>
        
        <div>
          <button @click="startCountdown2">Start</button>
          <button @click="stopCountdown2">Stop</button>
        </div>
        <p><span>Start Time: {{ dynamicStart2 }}</span><br><span>End Time: {{ dynamicEnd2 }}</span></p>
      </div>
    </section>
  </div>
</template>

<style>
html {
  font-size: 16px;
  color: white;
  background: rgb(10, 12, 17);
}

section {
  margin: 20px auto;
  padding: 12px 20px;

  width: 60%;
  min-width: 300px;
  background: #1f2024;
  border-radius: 8px;
}

.demo {
  padding: 12px;
  background: rgb(10, 12, 17);
  font-size: 18px;
  line-height: 1.5;
  font-weight: bold;
}
</style>