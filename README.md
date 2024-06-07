# vue3-countdown

這是一個使用 Vue 3 建立的倒數計時器元件。它提供了一個簡單且易於使用的 API，讓你可以在你的 Vue 3 應用程式中輕鬆地加入倒數計時的功能。

## 功能

透過給予開始與結束時間，或直接給予一定的秒數以進行倒數計時。

### 如何使用

你只需要在你想引入的地方引入即可。 可見下圖示意。

```typescript
<script setup lang="ts">
import { VCountdown } from '@jjdev/vue3-countdown'
</script>

<template>
  <div>
    <VCountdown v-slot="{state, minute, second}" :start-time="'2024-06-07T23:34:46.000'" :end-time="'2024-06-07T23:35:49.000'" :auto-start="true">
      {{ state }} | {{ String(minute).padStart(2, '0') }} : {{ String(second).padStart(2, '0')}}
    </VCountdown>
  </div>
</template>
```

## 開發

如果你想要在本地開發這個專案，你可以使用以下的指令來啟動開發伺服器：

```bash
pnpm dev
```

## 授權

這個專案使用 MIT 授權，詳情請見 LICENSE 檔案。

## 貢獻

我們歡迎所有的貢獻！如果你有任何問題或建議，請開啟一個 issue。如果你想要直接改進這個專案，請開啟一個 pull request。