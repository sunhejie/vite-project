const prettierConfig = {
  singleQuote: true, //双引号转为单引号
  trailingComma: 'es5', //为多行数组的非末尾行添加逗号(在 ES5 中生效的逗号 (对象，数组等等))
  tabWidth: 2, //缩进空格数
  semi: false, //. 语句末尾是否带分号
  printWidth: 80, //打印宽度
  jsxSingleQuote: true, //. jsx文件里使用单引号
  overrides: [
    //设置解析器配置项(如果有 Prettier 不识别的文件类型,结合覆写功能告诉 Prettier 如何解析)
    {
      files: ['*.ts', '*.tsx'],
      options: {
        parser: 'typescript',
      },
    },
  ],
}

module.exports = prettierConfig
