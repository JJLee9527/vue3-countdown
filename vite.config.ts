// <reference types="vitest" />
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { readFileSync } from 'fs'
const jsrJson = JSON.parse(readFileSync('./jsr.json', 'utf-8'))
const appVersion = jsrJson.version

export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(appVersion),
  },
  plugins: [
    vue(
      {
        template: {
          compilerOptions: {
            isCustomElement: (tag) => tag.includes('-')
          }
        }
      }
    ),
  ],
  build: {
    commonjsOptions: {
      esmExternals: true,
    },
  }
})
