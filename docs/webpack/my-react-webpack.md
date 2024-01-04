# 自定义react-webpack

[源码](https://gitee.com/webzyn/my-react-webpack)

## 配置流程
- 1. 解析html
- 2. 解析css
  - 2.1 postcss-loader解决css兼容性问题
  - 2.2 开发环境
    - 使用style-loader使css能够热更新(HMR)
  - 2.3 生产环境
    - 使用mini-css-extract-plugin将css提取为单独文件
    - 使用css-minimizer-webpack-plugin压缩css
- 3. 解析图片与其他资源
- 4. 解析js
  - 4.1 babel
  - 4.2 polyfill，如(core-js)
  - 4.3 eslint
  - 4.4 开发环境
    - js、jsx热更新 react-refresh、@pmmmwh/react-refresh-webpack-plugin
  - 4.5 生产环境
    - js压缩 terser-webpack-plugin
- 5. 代码分割优化
- 6. 生产环境将public复制到dist: copy-webpack-plugin

## 文件目录
- 生成package.json文件

```shell
npm init -y
```

- 生成目录结构

```
.
├── config
│   ├── webpack.dev.js
│   └── webpack.prod.js
├── node_modules
├── public
│   └── index.html
├── src
│   ├── App.jsx
│   └── main.js
├── .eslintrc.js
├── babel.config.js
└── package.json
```

## 开发环境配置 - webpack.dev.js

### 1.基本配置

```shell
npm i webpack webpack-cli webpack-dev-server react react-dom react-router-dom
```

- filename 入口文件
- chunkFilename 非入口的包文件
- assetModuleFilename 其他资源文件

```js
module.exports = {
  entry: './src/main.js',
  output: {
    path: undefined, // 开发环境不需要打包输出
    filename: 'static/js/[name].js', // bundle包名 打包的入口文件名
    // chunkFilename: 'static/js/[name].chunk.js', // chunk包名 打包的非入口文件名
    // assetModuleFilename: 'static/media/[hash:10][ext][query]', // 其他资源打包后的chunk包名 
  },
  mode: 'development',
  devtool: "cheap-module-source-map",
  // 开发服务器
  devServer: {
    host: "localhost", // 启动服务器域名
    port: "3000", // 启动服务器端口号
    open: true, // 是否自动打开浏览器
    hot: true, // 开启HMR 配合style-loader使css能够热更新
    historyApiFallback: true, // 解决前端路由刷新404问题
  }
}
```

### 2.处理html资源
```shell
npm i html-webpack-plugin
```
- html-webpack-plugin： 根据模板文件 生成一个 HTML 文件

```js
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
    }),
  ]
}
```
### 3.处理样式

- 3.1 添加loader
```shell
npm i style-loader css-loader less-loader sass sass-loader stylus-loader
```
```js
// 返回处理样式loader函数
const getStyleLoaders = (pre) => {
  return [
    "style-loader", // 将css生成style标签插入到html中
    "css-loader", // 将 Css 文件编译成 Webpack 能识别的模块
    pre,
  ].filter(Boolean);
};

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: getStyleLoaders(),
      },
      {
        test: /\.less$/,
        use: getStyleLoaders("less-loader"),
      },
      {
        test: /\.s[ac]ss$/,
        use: getStyleLoaders("sass-loader"),
      },
      {
        test: /\.styl$/,
        use: getStyleLoaders("stylus-loader"),
      },
    ]
  }
}
```
- 3.2 css开启HMR(热更新)
```js
// 将devServer.hot设为true，配合style-loader使css能够热更新
```

### 4. 样式兼容性处理 postcss-loader
```shell
npm i postcss postcss-loader postcss-preset-env
```
```js
const getStyleLoaders = (pre) => {
  return [
    "style-loader", 
    "css-loader",
    {
      // 处理css兼容性问题
      // 配合package.json中browserslist来指定兼容性
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: ["postcss-preset-env"],
        },
      },
    },
    pre,
  ].filter(Boolean);
};
```
- package.json
```json
{
  "browserslist": [
    "last 2 version",
    "> 1%",
    "not dead"
  ]
}
```
### 5.处理图片及其他资源

```js
module.exports = {
  output: {
    path: undefined, // 开发环境不需要打包输出
    filename: 'static/js/[name].js', // bundle包名 打包的入口文件名
    assetModuleFilename: 'static/media/[hash:10][ext][query]', // 其他资源打包后的chunk包名 
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 10kb 以下的图片转成 base64
          },
        },
        // Rule.generator.filename 与 output.assetModuleFilename 相同，
        // 并且仅适用于 asset 和 asset/resource 模块类型
        // generator: {
        //   filename: "static/media/[hash:10][ext][query]",
        // },
      },
      // 处理其他资源
      {
        test: /\.(ttf|woff2?)$/,
        type: "asset/resource",
        // generator: {
        //   filename: "static/media/[hash:10][ext][query]",
        // },
      },
    ]
  }
}
```
### 6.处理js/jsx

- 6.1 使webpack识别jsx文件

```js
module.exports = {
  // webpack解析模块加载选项
  resolve: {
    // 尝试按顺序解析这些后缀名。如果有多个文件有相同的名字，但后缀名不同，webpack 会解析列在数组首位的后缀的文件 并跳过其余的后缀
    extensions: [".jsx", ".js", ".json"],
  },
}
```
- 6.2 babel，将es6语法转为es5
```shell
npm i @babel/core babel-loader @babel/plugin-transform-runtime
```
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, '../src'),
        loader: "babel-loader",
        options: {
          cacheDirectory: true, // 开启babel编译缓存
          cacheCompression: false, // 缓存文件不要压缩
          plugins: [
            "@babel/plugin-transform-runtime", // 按需引入babel运行时的辅助函数，以减小输出的代码体积
          ],
        },
      },
    ]
  }
}
```
```shell
npm i babel-preset-react-app
```
```js
// babel.config.js
module.exports = {
  // 预设
  // presets: ["@babel/preset-env"], 允许使用最新的 JavaScript
  // https://github.com/facebook/create-react-app/blob/main/packages/babel-preset-react-app/create.js
  // babel-preset-react-app
  presets: ["react-app"], // 使用 create-react-app 默认的预设
};
/*
babel-preset-react-app 包含了 @babel/preset-env 和 @babel/preset-react，
其中 @babel/preset-env 被配置为自动根据目标浏览器环境引入必要的 polyfills
所以无需再配置core-js

babel-preset-react-app预设包含:

presets: 
  @babel/preset-env 
    处理 ECMAScript 新特性的兼容性问题

  @babel/preset-react
    处理 React JSX 语法的 Babel 预设，它包含了将 JSX 转换为 JavaScript 的相关插件

  @babel/preset-typescript
    处理 TypeScript 代码的转换

plugins
  @babel/plugin-transform-flow-strip-types
    用于转换 Flow 类型注解,使用特定的注释语法来标记变量、函数参数、函数返回类型等，以实现对代码中类型错误的检测

  babel-plugin-macros
  
  @babel/plugin-proposal-decorators
    用于支持 JavaScript 中的装饰器（Decorators）语法。装饰器是一种用于修改或扩展类和类成员的语法特性

  @babel/plugin-proposal-class-properties
    支持类属性的提案语法，使得在类中可以直接声明类属性而不必在构造函数中初始化

  @babel/plugin-proposal-private-methods
    用于支持 JavaScript 中的私有方法提案。私有方法是一种使类的方法成为私有的、只能在类内部访问的语法特性,旨在改善 JavaScript 中类的封装性

  @babel/plugin-proposal-private-property-in-object
    用于支持 JavaScript 中的对象字面量中的私有属性提案。这个提案使得在对象字面量中声明私有属性成为可能，以提高对象的封装性

  @babel/plugin-proposal-numeric-separator
    用于支持 JavaScript 中的数字分隔符提案。这个提案使得你可以在数字中使用下划线 _ 进行分隔，以提高数字的可读性。

  @babel/plugin-transform-runtime
    避免在每个文件中重复引入 Babel 编译时的辅助函数。有助于减小代码体积

  babel-plugin-transform-react-remove-prop-types
    用于在生产环境下移除 React 组件中的 PropTypes。在开发过程中，PropTypes 可以帮助开发者捕捉组件使用时的潜在错误，但在生产环境中，这些检查是不必要的，并且可能影响性能。

  @babel/plugin-proposal-optional-chaining
    支持可选链（Optional Chaining）语法

  @babel/plugin-proposal-nullish-coalescing-operator
    支持空值合并运算符（Nullish Coalescing Operator）语法
*/
```

- 6.3 core-js
```shell
npm i core-js
```
```js
/*
babel-preset-react-app 包含了 @babel/preset-env 和 @babel/preset-react，
其中 @babel/preset-env 被配置为自动根据目标浏览器环境引入必要的 polyfills
所以无需再配置core-js
*/
```
- 6.4 eslint
```shell
npm i eslint eslint-webpack-plugin
```
```js
const EslintWebpackPlugin = require('eslint-webpack-plugin');

module.exports = {
  plugins: [
    // 配置eslint
    new EslintWebpackPlugin({
      context: path.resolve(__dirname, "../src"), // eslint 作用区域
      exclude: "node_modules",
      cache: true, // 开启eslint缓存
      cacheLocation: path.resolve(__dirname, "../node_modules/.cache/.eslintcache"), // eslint缓存文件位置
    }),
  ]
}
```
```shell
npm i eslint-config-react-app
```
```js
// .eslintrc.js
module.exports = {
  // https://github.com/facebook/create-react-app/tree/main/packages/eslint-config-react-app
  // eslint-config-react-app react官方eslint规则
  extends: ["react-app"],
  parserOptions: {
    ecmaVersion: 6, // ES 语法版本
    sourceType: "module", // ES 模块化
    ecmaFeatures: { // ES 其他特性
      jsx: true // 如果是 React 项目，就需要开启 jsx 语法
    },
    babelOptions: { // babel 解析器配置 , 确保 ESLint 正确解析和检查与 Babel 相关的代码
      presets: [ // presets 配置 Babel 预设，这里使用的是 create-react-app 默认的预设
        ["babel-preset-react-app", false],
        "babel-preset-react-app/prod",
      ],// https://blog.csdn.net/weixin_39786582/article/details/125068541
    },
  }
};
```
- 6.5 激活js、jsx的HMR(热更新)
```shell
npm i react-refresh @pmmmwh/react-refresh-webpack-plugin
```
```js
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, '../src'),
        loader: "babel-loader",
        options: {
          cacheDirectory: true, // 开启babel编译缓存
          cacheCompression: false, // 缓存文件不要压缩
          plugins: [
            // babel-preset-react-app 包含 @babel/plugin-transform-runtime，可以去掉
            // "@babel/plugin-transform-runtime", // 按需引入babel运行时的辅助函数，以减小输出的代码体积
            "react-refresh/babel", // 激活js的HMR -> react-refresh
          ],
        },
      },
    ]
  },
  plugins: [
    new ReactRefreshWebpackPlugin(), // 激活js的HMR -> @pmmmwh/react-refresh-webpack-plugin
  ]
}
```
### 7. 代码分割优化code split
```js
module.exports = {
  output: {
    path: undefined, // 开发环境不需要打包输出
    filename: 'static/js/[name].js', // bundle包名 打包的入口文件名
    chunkFilename: 'static/js/[name].chunk.js', // chunk包名 打包的非入口文件名
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
    runtimeChunk: {
      // 将 runtime 代码单独提取出来
      // 有助于减小每个 bundle 的体积，并在部署时提供更好的缓存机制
      name: (entrypoint) => `runtime~${entrypoint.name}.js`, 
    },
  },
}
```

### 8.配置命令

```json
{
  "scripts": {
    "start": "npm run dev",
    "dev": "webpack server --config ./config/webpack.dev.js"
  }
}
```

- 由于babel-preset-react-app中需要`NODE_ENV`或`BABEL_ENV`环境变量，所以添加cross-env插件
```shell
npm i cross-env
```
```json
{
  "scripts": {
    "start": "npm run dev",
    "dev": "cross-env NODE_ENV=development webpack server --config ./config/webpack.dev.js"
  }
}
```

## 生产环境配置 - webpack.prod.js

### 1. 基本配置
```js
const path = require('path');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, '../dist'), // 打包输出目录
    filename: 'static/js/[name].[contenthash:10].js', // bundle包名 打包的入口文件名
    chunkFilename: 'static/js/[name].[contenthash:10].chunk.js', // chunk包名 打包的非入口文件名
    assetModuleFilename: 'static/media/[hash:10][ext][query]', // 其他资源打包后的chunk包名 
    clean: true, // 清除上次打包的文件
  },
  mode: 'production',
  devtool: "source-map",
}
```

### 2. 将css提取为单独文件
```shell
npm i "mini-css-extract-plugin
```
```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const getStyleLoaders = (pre) => {
  return [
    MiniCssExtractPlugin.loader, // 将 CSS 提取到单独的文件
    "css-loader", // 将 Css 文件编译成 Webpack 能识别的模块
    {
      // 处理css兼容性问题
      // 配合package.json中browserslist来指定兼容性
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: ["postcss-preset-env"],
        },
      },
    },
    pre,
  ].filter(Boolean);
};

module.exports = {
  plugins: [
    // 提取css为单独文件
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[contenthash:10].css",
      chunkFilename: "static/css/[name].[contenthash:10].chunk.css",
    }),
  ]
}
```

### 3. css压缩
```shell
npm i css-minimizer-webpack-plugin
```
```js
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin")

module.exports = {
  optimization: {
    minimize: true, // 开启代码压缩
    minimizer: [
      // css压缩
      new CssMinimizerWebpackPlugin(),
    ],
  }
}
```

### 4. js压缩
```js
const TerserWebpackPlugin = require("terser-webpack-plugin");

module.exports = {
  optimization: {
    minimizer: [
      // js压缩
      new TerserWebpackPlugin(), 
    ],
  }
}
```

### 5. 将大的node_modules包文件单独打包
```js
module.exports = {
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        // react react-dom react-router-dom 一起打包成一个js文件
        react: {
          test: /[\\/]node_modules[\\/]react(.*)?[\\/]/,
          name: "chunk-react",
          priority: 40,
        },
        // antd 单独打包
        antd: {
          test: /[\\/]node_modules[\\/]antd[\\/]/,
          name: "chunk-antd",
          priority: 30,
        },
        // 剩下node_modules单独打包
        libs: {
          test: /[\\/]node_modules[\\/]/,
          name: "chunk-libs",
          priority: 20,
        },
      },
    },
  }
}
```

### 6. 拷贝public中的文件到dist
```shell
npm i copy-webpack-plugin
```
```js
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  plugins: [
    // 拷贝public中的文件到dist
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../public"),
          to: path.resolve(__dirname, "../dist"),
          globOptions: {
            // 忽略index.html文件
            ignore: ["**/index.html"],
          },
        },
      ],
    }),
  ]
}
```
### 7. 配置命令 - package.json
```json
"scripts": {
    "start": "npm run dev",
    "dev": "cross-env NODE_ENV=development webpack server --config ./config/webpack.dev.js",
    "build": "cross-env NODE_ENV=production webpack --config ./config/webpack.prod.js",
  },
```

## 详细配置
### webpack.dev.js
```js
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const EslintWebpackPlugin = require('eslint-webpack-plugin');
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

// 返回处理样式loader函数
const getStyleLoaders = (pre) => {
  return [
    "style-loader", // 将css生成style标签插入到html中
    "css-loader", // 将 Css 文件编译成 Webpack 能识别的模块
    {
      // 处理css兼容性问题
      // 配合package.json中browserslist来指定兼容性
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: ["postcss-preset-env"],
        },
      },
    },
    pre,
  ].filter(Boolean);
};
module.exports = {
  entry: './src/main.js',
  output: {
    path: undefined, // 开发环境不需要打包输出
    filename: 'static/js/[name].js', // bundle包名 打包的入口文件名
    chunkFilename: 'static/js/[name].chunk.js', // chunk包名 打包的非入口文件名
    assetModuleFilename: 'static/media/[hash:10][ext][query]', // 其他资源打包后的chunk包名 
  },
  module: {
    rules: [
      // 处理css
      {
        test: /\.css$/,
        use: getStyleLoaders(),
      },
      {
        test: /\.less$/,
        use: getStyleLoaders("less-loader"),
      },
      {
        test: /\.s[ac]ss$/,
        use: getStyleLoaders("sass-loader"),
      },
      {
        test: /\.styl$/,
        use: getStyleLoaders("stylus-loader"),
      },
      // 处理图片
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 10kb 以下的图片转成 base64
          },
        },
        // Rule.generator.filename 与 output.assetModuleFilename 相同，
        // 并且仅适用于 asset 和 asset/resource 模块类型
        // generator: {
        //   filename: "static/media/[hash:10][ext][query]",
        // },
      },
      // 处理其他资源
      {
        test: /\.(ttf|woff2?)$/,
        type: "asset/resource",
        // generator: {
        //   filename: "static/media/[hash:10][ext][query]",
        // },
      },
      // 处理js/jsx
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, '../src'),
        loader: "babel-loader",
        options: {
          cacheDirectory: true, // 开启babel编译缓存
          cacheCompression: false, // 缓存文件不要压缩
          plugins: [
            "@babel/plugin-transform-runtime", // 按需引入babel运行时的辅助函数，以减小输出的代码体积
            "react-refresh/babel", // 激活js的HMR -> react-refresh
          ],
        },
      },
    ]
  },
  plugins: [
    // 处理html
    // 生成一个 HTML 文件
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
    }),
    // 配置eslint
    new EslintWebpackPlugin({
      context: path.resolve(__dirname, "../src"), // eslint 作用区域
      exclude: "node_modules",
      cache: true, // 开启eslint缓存
      cacheLocation: path.resolve(__dirname, "../node_modules/.cache/.eslintcache"), // eslint缓存文件位置
    }),
    new ReactRefreshWebpackPlugin(), // 激活js的HMR -> @pmmmwh/react-refresh-webpack-plugin
  ],
  // webpack解析模块加载选项
  resolve: {
    // 尝试按顺序解析这些后缀名。如果有多个文件有相同的名字，但后缀名不同，webpack 会解析列在数组首位的后缀的文件 并跳过其余的后缀
    extensions: [".jsx", ".js", ".json"],
    // 路径别名
    alias: {
      "@": path.resolve(__dirname, "../src"),
    }
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
    runtimeChunk: {
      // 将 runtime 代码单独提取出来
      // 有助于减小每个 bundle 的体积，并在部署时提供更好的缓存机制
      name: (entrypoint) => `runtime~${entrypoint.name}.js`, 
    },
  },
  mode: 'development',
  devtool: "cheap-module-source-map",
  // 开发服务器
  devServer: {
    host: "localhost", // 启动服务器域名
    port: "3000", // 启动服务器端口号
    open: true, // 是否自动打开浏览器
    hot: true, // 开启HMR 配合style-loader使css能够热更新
    historyApiFallback: true, // 解决前端路由刷新404问题
  }
}
```

### webpack.prod.js
```js
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const EslintWebpackPlugin = require('eslint-webpack-plugin');
// const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin")
const TerserWebpackPlugin = require("terser-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

// 返回处理样式loader函数
const getStyleLoaders = (pre) => {
  return [
    MiniCssExtractPlugin.loader, // 将 CSS 提取到单独的文件
    "css-loader", // 将 Css 文件编译成 Webpack 能识别的模块
    {
      // 处理css兼容性问题
      // 配合package.json中browserslist来指定兼容性
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: ["postcss-preset-env"],
        },
      },
    },
    pre,
  ].filter(Boolean);
};
module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, '../dist'), // 打包输出目录
    filename: 'static/js/[name].[contenthash:10].js', // bundle包名 打包的入口文件名
    chunkFilename: 'static/js/[name].[contenthash:10].chunk.js', // chunk包名 打包的非入口文件名
    assetModuleFilename: 'static/media/[hash:10][ext][query]', // 其他资源打包后的chunk包名 
    clean: true, // 清除上次打包的文件
  },
  module: {
    rules: [
      // 处理css
      {
        test: /\.css$/,
        use: getStyleLoaders(),
      },
      {
        test: /\.less$/,
        use: getStyleLoaders("less-loader"),
      },
      {
        test: /\.s[ac]ss$/,
        use: getStyleLoaders("sass-loader"),
      },
      {
        test: /\.styl$/,
        use: getStyleLoaders("stylus-loader"),
      },
      // 处理图片
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 10kb 以下的图片转成 base64
          },
        },
        // Rule.generator.filename 与 output.assetModuleFilename 相同，
        // 并且仅适用于 asset 和 asset/resource 模块类型
        // generator: {
        //   filename: "static/media/[hash:10][ext][query]",
        // },
      },
      // 处理其他资源
      {
        test: /\.(ttf|woff2?)$/,
        type: "asset/resource",
        // generator: {
        //   filename: "static/media/[hash:10][ext][query]",
        // },
      },
      // 处理js/jsx
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, '../src'),
        loader: "babel-loader",
        options: {
          cacheDirectory: true, // 开启babel编译缓存
          cacheCompression: false, // 缓存文件不要压缩
          plugins: [
            "@babel/plugin-transform-runtime", // 按需引入babel运行时的辅助函数，以减小输出的代码体积
            // "react-refresh/babel", // 激活js的HMR
          ],
        },
      },
    ]
  },
  plugins: [
    // 处理html
    // 生成一个 HTML 文件
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
    }),
    // 配置eslint
    new EslintWebpackPlugin({
      context: path.resolve(__dirname, "../src"), // eslint 作用区域
      exclude: "node_modules",
      cache: true, // 开启eslint缓存
      cacheLocation: path.resolve(__dirname, "../node_modules/.cache/.eslintcache"), // eslint缓存文件位置
    }),
    // new ReactRefreshWebpackPlugin(), // 激活js的HMR
    // 提取css为单独文件
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[contenthash:10].css",
      chunkFilename: "static/css/[name].[contenthash:10].chunk.css",
    }),
    // 拷贝public中的文件到dist
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../public"),
          to: path.resolve(__dirname, "../dist"),
          globOptions: {
            // 忽略index.html文件
            ignore: ["**/index.html"],
          },
        },
      ],
    }),
  ],
  
  // webpack解析模块加载选项
  resolve: {
    // 尝试按顺序解析这些后缀名。如果有多个文件有相同的名字，但后缀名不同，webpack 会解析列在数组首位的后缀的文件 并跳过其余的后缀
    extensions: [".jsx", ".js", ".json"],
    // 路径别名
    alias: {
      "@": path.resolve(__dirname, "../src"),
    }
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        // react react-dom react-router-dom 一起打包成一个js文件
        react: {
          test: /[\\/]node_modules[\\/]react(.*)?[\\/]/,
          name: "chunk-react",
          priority: 40,
        },
        // antd 单独打包
        antd: {
          test: /[\\/]node_modules[\\/]antd[\\/]/,
          name: "chunk-antd",
          priority: 30,
        },
        // 剩下node_modules单独打包
        libs: {
          test: /[\\/]node_modules[\\/]/,
          name: "chunk-libs",
          priority: 20,
        },
      },
    },
    runtimeChunk: {
      // 将 runtime 代码单独提取出来
      // 有助于减小每个 bundle 的体积，并在部署时提供更好的缓存机制
      name: (entrypoint) => `runtime~${entrypoint.name}.js`, 
    },
    minimize: true, // 开启代码压缩
    minimizer: [
      // css压缩
      new CssMinimizerWebpackPlugin(),
      // js压缩
      new TerserWebpackPlugin(), 
    ],
  },
  mode: 'production',
  devtool: "source-map",
}
```

### package.json
```json
{
  "name": "my-react-cli",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "npm run dev",
    "dev": "cross-env NODE_ENV=development webpack server --config ./config/webpack.dev.js",
    "build": "cross-env NODE_ENV=production webpack --config ./config/webpack.prod.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@babel/core": "^7.23.6",
    "@babel/plugin-transform-runtime": "^7.23.6",
    "@babel/preset-env": "^7.23.6",
    "@pmmmwh/react-refresh-webpack-plugin": "^0.5.11",
    "babel-loader": "^9.1.3",
    "babel-preset-react-app": "^10.0.1",
    "copy-webpack-plugin": "^11.0.0",
    "cross-env": "^7.0.3",
    "css-loader": "^6.8.1",
    "css-minimizer-webpack-plugin": "^5.0.1",
    "eslint": "^8.56.0",
    "eslint-config-react-app": "^7.0.1",
    "eslint-webpack-plugin": "^4.0.1",
    "html-webpack-plugin": "^5.6.0",
    "less-loader": "^11.1.3",
    "mini-css-extract-plugin": "^2.7.6",
    "postcss": "^8.4.32",
    "postcss-loader": "^7.3.3",
    "postcss-preset-env": "^9.3.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-refresh": "^0.14.0",
    "react-router-dom": "^6.21.1",
    "sass": "^1.69.5",
    "sass-loader": "^13.3.2",
    "style-loader": "^3.3.3",
    "stylus-loader": "^7.1.3",
    "webpack": "^5.89.0",
    "webpack-cli": "^5.1.4",
    "webpack-dev-server": "^4.15.1"
  },
  "browserslist": [
    "last 2 version",
    "> 1%",
    "not dead"
  ]
}
```

### babel.config.js
```js
module.exports = {
  // 预设
  // https://github.com/facebook/create-react-app/blob/main/packages/babel-preset-react-app/create.js
  // babel-preset-react-app
  // presets: ["@babel/preset-env"], 允许使用最新的 JavaScript
  // presets: ["react-app"], // 使用 create-react-app 默认的预设
  presets: ["react-app"],
};

/*
babel-preset-react-app 包含了 @babel/preset-env 和 @babel/preset-react，
其中 @babel/preset-env 被配置为自动根据目标浏览器环境引入必要的 polyfills
所以无需再配置core-js

babel-preset-react-app预设包含:

presets: 
  @babel/preset-env 
    处理 ECMAScript 新特性的兼容性问题

  @babel/preset-react
    处理 React JSX 语法的 Babel 预设，它包含了将 JSX 转换为 JavaScript 的相关插件

  @babel/preset-typescript
    处理 TypeScript 代码的转换

plugins
  @babel/plugin-transform-flow-strip-types
    用于转换 Flow 类型注解,使用特定的注释语法来标记变量、函数参数、函数返回类型等，以实现对代码中类型错误的检测

  babel-plugin-macros
  
  @babel/plugin-proposal-decorators
    用于支持 JavaScript 中的装饰器（Decorators）语法。装饰器是一种用于修改或扩展类和类成员的语法特性

  @babel/plugin-proposal-class-properties
    支持类属性的提案语法，使得在类中可以直接声明类属性而不必在构造函数中初始化

  @babel/plugin-proposal-private-methods
    用于支持 JavaScript 中的私有方法提案。私有方法是一种使类的方法成为私有的、只能在类内部访问的语法特性,旨在改善 JavaScript 中类的封装性

  @babel/plugin-proposal-private-property-in-object
    用于支持 JavaScript 中的对象字面量中的私有属性提案。这个提案使得在对象字面量中声明私有属性成为可能，以提高对象的封装性

  @babel/plugin-proposal-numeric-separator
    用于支持 JavaScript 中的数字分隔符提案。这个提案使得你可以在数字中使用下划线 _ 进行分隔，以提高数字的可读性。

  @babel/plugin-transform-runtime
    避免在每个文件中重复引入 Babel 编译时的辅助函数。有助于减小代码体积

  babel-plugin-transform-react-remove-prop-types
    用于在生产环境下移除 React 组件中的 PropTypes。在开发过程中，PropTypes 可以帮助开发者捕捉组件使用时的潜在错误，但在生产环境中，这些检查是不必要的，并且可能影响性能。

  @babel/plugin-proposal-optional-chaining
    支持可选链（Optional Chaining）语法

  @babel/plugin-proposal-nullish-coalescing-operator
    支持空值合并运算符（Nullish Coalescing Operator）语法
*/
```

### .eslintrc.js
```js
module.exports = {
  // https://github.com/facebook/create-react-app/tree/main/packages/eslint-config-react-app
  // eslint-config-react-app react官方eslint规则
  extends: ["react-app"],
  parserOptions: {
    ecmaVersion: 6, // ES 语法版本
    sourceType: "module", // ES 模块化
    ecmaFeatures: { // ES 其他特性
      jsx: true // 如果是 React 项目，就需要开启 jsx 语法
    },
    babelOptions: { // babel 解析器配置 , 确保 ESLint 正确解析和检查与 Babel 相关的代码
      presets: [ // presets 配置 Babel 预设，这里使用的是 create-react-app 默认的预设
        ["babel-preset-react-app", false],
        "babel-preset-react-app/prod",
      ],// https://blog.csdn.net/weixin_39786582/article/details/125068541
    },
  }
};
```
<!-- 
- 1.配置入口文件
- 2.配置输出output
- 3.处理html
- 4.处理css
  - postcss-loader处理css兼容性
- 5.处理图片及其他资源
- 6.处理js/jsx
  - babel-loader
  - core-js
  - resolve.extensions
  - eslint
  - react-refresh/@pmmmwh/react-refresh-webpack-plugin react热模块更新
- 7.配置mode、devtool、devServer
- 8.配置optimization.splitChunks
  - 代码分割

- prod
- 配置输出output
- MiniCssExtractPlugin css提取单独文件
- CssMinimizerWebpackPlugin css压缩
- TerserWebpackPlugin js压缩
- CopyWebpackPlugin -->