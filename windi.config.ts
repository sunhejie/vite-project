import { defineConfig } from "windicss/helpers";
import plugin from "windicss/plugin";
export default defineConfig({
  extract: {
    //当开发服务器/构建过程开始时，Windi CSS 将扫描您的源代码并提取实用程序使用情况。
    //默认情况下，它会扫描src/带有扩展名的文件vue, html, mdx, pug, jsx, tsx
    //使用include(启用)和exclude(禁用)选项进行配置
    include: ["index.html", "src/**/*.{vue,html,jsx,tsx}"],
  },
  shortcuts: {}, //快捷方式
  theme: {
    //用法？
    extend: {},
  },
  plugins: [
    require("windicss/plugin/filters"),
    require("windicss/plugin/forms"),
    require("windicss/plugin/aspect-ratio"),
    require("windicss/plugin/line-clamp"),
    plugin(({ addUtilities }) => {
      const classes = {
        ".center-flex": {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      };
      addUtilities(classes);
    }),
    plugin(({ addComponents }) => {
      const classes = {
        ".user-wrap": {
          width: "200px",
          height: "200px",
          backgroundColor: "#409EFF",
        },
      };
      addComponents(classes);
    }),
  ],
});
