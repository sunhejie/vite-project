module.exports = {
  moduleFileExtensions: ["js", "vue"], //jest需要匹配的文件后缀
  transform: {
    "^.+\\.vue$": "@vue/vue3-jest",
    "^.+\\.js$": "<rootDir>/node_modules/babel-jest",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  snapshotSerializers: ["jest-serializer-vue"],
  testMatch: ["**/__tests__/**/*.spec.js"],
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
};
