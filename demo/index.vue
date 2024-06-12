<script setup lang="ts">
import {VueCountdown} from '../src/index'
</script>

<template>
  <div>
    <VueCountdown v-slot="{state, minute, second, total}" :start-time="'2024-06-08T16:54:03.000'" :end-time="'2024-06-08T16:55:03.000'" :auto-start="true">
      {{ state }} -> {{ String(minute).padStart(2, '0') }} : {{ String(second).padStart(2, '0')}}, total: {{ total }}
    </VueCountdown>
    <VueCountdown :time-span="5.5" :auto-start="true" format="mm:ss.S" :interval="100">
    </VueCountdown>
  </div>
</template>

<style>
html {
  font-size: 16px;
  color: white;
  background: rgb(10, 12, 17);
}
</style>