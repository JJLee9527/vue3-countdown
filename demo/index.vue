<script setup lang="ts">
import {VCountdown} from '../src/index'
</script>

<template>
  <div>
    <VCountdown v-slot="{state, minute, second, total}" :start-time="'2024-06-08T16:54:03.000'" :end-time="'2024-06-08T16:55:03.000'" :auto-start="true">
      {{ state }} -> {{ String(minute).padStart(2, '0') }} : {{ String(second).padStart(2, '0')}}, total: {{ total }}
    </VCountdown>
  </div>
</template>