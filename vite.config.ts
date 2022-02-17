import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import WindiCss from "vite-plugin-windicss";
const isDev = process.env.NODE_ENV === "development";
const isOnlineTest = process.env.NODE_EVN === "online_test";

export default defineConfig({
  base: isDev ? "/" : "./",
  plugins: [WindiCss(), vue()],
  // 短路径
  resolve: {
    alias: {},
  },
  build: {},
  // 本地运行配置，及反向代理配置
  server: {
    proxy: {},
  },
});
