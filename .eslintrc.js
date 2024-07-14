module.exports = {
  "env": {
      "browser": true,
      "es6": true,
      "node": true,
      "mocha": true
  },
  "plugins": ["import"],
  "parserOptions": {
      "project": "./tsconfig.json"
  },
  "extends": [
      "airbnb-typescript/base"
  ],
  "rules": {
      "@typescript-eslint/indent": [
          4,
          "tab"
      ],
      "no-tabs": 0,
      "@typescript-eslint/quotes": ["error", "double"],
      "semi": [
          "error",
          "always"
      ],
      "max-len": [
          2,
          180,
          4
      ],
      "no-console": 0,
      "linebreak-style": 0,
      "global-require": 0,
      "eslint linebreak-style": [
          0,
          "error",
          "windows"
      ],
      "radix": 0,
      "class-methods-use-this": 0
  }
};
