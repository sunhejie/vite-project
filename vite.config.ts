import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCss from 'vite-plugin-windicss'
const isDev = process.env.NODE_ENV === 'development'

export default defineConfig({
  base: isDev ? '/' : './',
  plugins: [vue(), WindiCss()],
  resolve: {
    alias: {},
  },
  build: {},
  server: {
    proxy: {},
  },
})
