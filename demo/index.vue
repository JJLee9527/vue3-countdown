<script setup lang="ts">
import { ref } from 'vue'
import { VueCountdown } from '../src/index'

const countdownRef = ref<any>()
const emitMessage = ref(false)

function startCountdown() {
  countdownRef.value?.start()
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
      <h1>Manually start counting down</h1>
      <div class="demo">
        <VueCountdown :time-span="8.5" :interval="100" :auto-start="false" :emit-events="true" format="ss.S">
        </VueCountdown>
        
        <div>
          <button @click="startCountdown">Start</button>
        </div>
      </div>
    </section>
    <section>
      <h1>Get emitting events</h1>
      <div class="demo">
        <VueCountdown :time-span="3" :interval="100" :auto-start="false" :emit-events="true" format="ss.S" @finish="onCountdownFinished" ref="countdownRef">
        </VueCountdown>
        
        <div>
          <button @click="startCountdown">Start</button>
        </div>
        <p>@finish: {{ emitMessage }}</p>
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