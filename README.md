# vue3-countdown

這是一個基於 Vue3 的倒數計時器元件。它提供了一個簡單且易於使用的 API，讓你可以在你的 Vue 3 應用程式中輕鬆地加入倒數計時的功能。

## 如何使用

### 安裝

透過在終端輸入以下指令安裝

```bash
#terminal:bash
pnpm dlx jsr add @jjdev/vue3-countdown
```

或於 package.json 中加入

```json
// package.json

{
  "dependencies": {
    "@jjdev/vue3-countdown": "npm:@jsr/jjdev__vue3-countdown@^1.0.3",
  } 
}
```

```bash
#terminal:bash
pnpm install

# 如果遇到錯誤建議可以先刪除 node_modules 再試一次
```

### 使用

在你想引入的地方直接引入即可，如下圖：

```typescript
<script setup lang="ts">
import { VCountdown } from '@jjdev/vue3-countdown'
</script>

<template>
  <div>
    <VCountdown v-slot="{state, minute, second, total}" :start-time="'2024-06-08T16:54:03.000'" :end-time="'2024-06-08T16:55:03.000'" :auto-start="true">
      {{ state }} -> {{ String(minute).padStart(2, '0') }} : {{ String(second).padStart(2, '0')}}, total: {{ total }}
    </VCountdown>
  </div>
</template>
```

### Parameters

| Name       | Interface         | Type    | Defaults                  | Required |
| ---------- | ----------------- | ------- | ------------------------- | -------- |
| start-time | Prop              | string  | `<today>T00:00:00.000`    | false    |
| end-time   | Prop              | string  | `<tomorrow>T00:00:00.000` | false    |
| left-time  | Prop              | number  | 0                         | false    |
| autostart  | Prop              | boolean | true                      | false    |
| second     | Extractable Param | number  | 0                         | --       |
| minute     | Extractable Param | number  | 0                         | --       |
| hour       | Extractable Param | number  | 0                         | --       |
| day        | Extractable Param | number  | 0                         | --       |
| state     | Extractable Param | `ready \| running \| finished \| pause`  | `ready`                    | --       |

### Methods

| Name     | Description       |
| ---------- | ----------------- |
| start      | Start the countdown timer. |
| pause      | Pause the countdown timer. |
| resume     | Resume the countdown timer. |
| reset      | Reset the countdown timer. |

### Events

| Name     | Description       |
| ---------- | ----------------- |
| tick     | Event handler for each tick of the countdown timer. |
| finish   | Event handler for when the countdown timer finishes. |

---

## 開發

如果你想要在本地開發這個專案，可以使用以下指令啟動開發伺服器：

```bash
pnpm dev
```

## 授權

這個專案使用 MIT 授權，詳情請見 LICENSE 檔案。

## 貢獻

我們歡迎所有的貢獻！如果你有任何問題或建議，請開啟一個 issue。如果你想要直接改進這個專案，請開啟一個 pull request 🤞
