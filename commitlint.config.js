module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2, //0:disable,1:warning,2:error
      "always", // always||never
      [
        "feat",
        "fix",
        "refactor",
        "test",
        "types",
        "chore",
        "docs",
        "wip",
        "build",
        "ci",
        "style",
        "perf",
      ],
    ],
  },
};
