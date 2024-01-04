# 概念

## polyfill 和 babel

- Babel 主要用于处理 JavaScript 语法的兼容性问题，目标是`将新版本的 ECMAScript 代码转换为向后兼容的代码`
- Polyfill 主要用于提供缺失的功能或 API 支持，目标是`填充环境的功能缺陷`

- 实际项目中，`Babel` 处理语法转换，而 `Polyfill` 用于提供缺失的功能支持，以确保应用在各种环境中都能够正常运行

### core-js
- `core-js`通常用作一个 polyfill 提供商

## eslint 相关
### babelOptions 与 babel配置文件区别

- `babelOptions` 用于在 ESLint 运行过程中配置 Babel 的一些行为，而不是直接指定 Babel 的配置文件。
- Babel 配置文件（.babelrc 或 babel.config.js）是由 Babel 直接使用的配置文件，它用于`指定 Babel 的详细配置`
### 
```js
// eslintrc.js
module.exports = {
  parserOptions: {
    babelOptions: {}
  }
}
```

### extends、parser、parserOptions区别
- `extends` 用于引入已有的 ESLint 配置，这样不必从头开始配置所有规则
- `parser` 用于指定用于解析 JavaScript 代码的解析器
- `parserOptions` 用于配置解析器的选项

```js
// eslintrc.js
module.exports = {
  extends: ["eslint:recommended"],
  parser: "@babel/eslint-parser",
  parserOptions: {
    // ...
  }
}
```