import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCss from 'vite-plugin-windicss'

const isDev = process.env.NODE_ENV === 'development'

export default defineConfig({
  base: isDev ? '/' : './',
  plugins: [vue(), WindiCss()],
  resolve: {
    alias: {
      assets: resolve('assets'),
      components: resolve('components'),
      router: resolve('router'),
      store: resolve('store'),
      utils: resolve('utils'),
      views: resolve('views'),
      service: resolve('service'),
      config: resolve('config'),
    },
  },
  build: {},
  server: {
    proxy: {},
  },
})

function resolve(name) {
  return `/src/${name}`
}
