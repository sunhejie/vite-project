module.exports = {
  moduleFileExtensions: ['js', 'vue', 'ts', 'json', 'vue'], //jest需要匹配的文件后缀
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec|unit))\\.tsx?$',
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '\\.[jt]sx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  snapshotSerializers: ['jest-serializer-vue'],
  transformIgnorePatterns: ['/node_modules/'],
}
