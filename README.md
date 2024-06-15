# vue3-countdown

> A simple countdown component for Vue3.x.
>
> Inspired by [fengyuanchen/vue-countdown](https://github.com/fengyuanchen/vue-countdown) and [wuanrin/vue3-countdown](https://github.com/wuanrin/vue3-countdown)

## Getting started

### Installation

```bash
# pnpm
pnpm dlx jsr add @jjdev/vue3-countdown

# npm
npx jsr add @jjdev/vue3-countdown
```

### Usage

There are three ways to implement it.

1. Through `vueApp.use()`

```typescript
import { createApp } from 'vue';
import VueCountdownPlugin from '@jjdev/vue3-countdown';

const app = createApp({});
app.use(VueCountdownPlugin);
```

2. Through `vueApp.component()`

```typescript
import { createApp } from 'vue';
import { VueCountdown } from '@jjdev/vue3-countdown';

const app = createApp({});
app.VueCountdown(VueCountdown.name, VueCountdown);
```

3. Directly import it.

```typescript
<script setup lang="ts">
import { VueCountdown as Countdown } from '@jjdev/vue3-countdown'
</script>

<template>
  <div>
    <Countdown v-slot="{minute, second, total}" :start-time="'2024-06-08T16:54:03.000'" :end-time="'2024-06-08T16:55:03.000'">
      {{ String(minute).padStart(2, '0') }} : {{ String(second).padStart(2, '0')}}, total: {{ total }}
    </Countdown>
  </div>
</template>
```

### Parameters

| Name        | Type                                    | Default   |
| ----------- | --------------------------------------- | --------- |
| start-time  | string `Date ISO string`                | undefined |
| end-time    | string `Date ISO string`                | undefined |
| time-span   | number `in seconds`                     | 0         |
| autostart   | boolean                                 | true      |
| emit-events | boolean                                 | false     |
| state       | `ready \| running \| finished \| pause` | `ready`   |

### Methods

| Name   | Description                 |
| ------ | --------------------------- |
| start  | Start the countdown timer.  |
| pause  | Pause the countdown timer.  |
| resume | Resume the countdown timer. |
| reset  | Reset the countdown timer.  |
| stop   | Stop the countdown timer.   |

### Events

| Name   | Description                                          |
| ------ | ---------------------------------------------------- |
| update | Event handler for each tick of the countdown timer.  |
| finish | Event handler for when the countdown timer finishes. |

---

## Development

```bash
pnpm install
pnpm dev
```

## Versioning

Maintained under the Semantic Versioning guidelines.

## License

[MIT](https://opensource.org/licenses/MIT) © JJLee
