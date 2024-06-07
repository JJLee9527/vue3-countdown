<script setup lang="ts">
import {VCountdown} from '../src/index'
</script>

<template>
  <div>
    <VCountdown v-slot="{state, minute, second}" :start-time="'2024-06-07T23:34:46.000'" :end-time="'2024-06-07T23:35:49.000'" :auto-start="true">
      {{ state }} -> {{ String(minute).padStart(2, '0') }} : {{ String(second).padStart(2, '0')}}
    </VCountdown>
  </div>
</template>