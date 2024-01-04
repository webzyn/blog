# 自定义vue-webpack

[源码](https://gitee.com/webzyn/my-vue-webpack)

## 在react-webpack基础上进行修改

### 处理css
- 将`style-loader` 替换为 `vue-style-loader`
- `vue-style-loader`基于`style-loader`, 支持服务端渲染

### 处理vue
- 使用`vue-loader`,内部会给vue文件注入HMR功能代码

### 修改模块解析文件后缀
- resolve.extensions: [".vue", ".js", ".json"]

### DefinePlugin
- 解决`__VUE_OPTIONS_API__``__VUE_PROD_DEVTOOLS__`警告

### 修改babel预设
- 使用`@vue/cli-plugin-babel/preset`预设
- 使用`core-js`做 ES6 以及以上 API 的 `polyfill`

### 修改eslint规则及eslint解析器配置
- 继承`plugin:vue/vue3-essential``eslint:recommended`预设规则
- 使用`@babel/eslint-parser`解析器

## webpack.dev.js
```js
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require('vue-loader')
const EslintWebpackPlugin = require('eslint-webpack-plugin');
const { DefinePlugin } = require("webpack");

// 返回处理样式loader函数
const getStyleLoaders = (pre) => {
  return [
    // "style-loader", // 将css生成style标签插入到html中，支持热更新
    "vue-style-loader", // 基于style-loader, 支持服务端渲染
    "css-loader", // 将 Css 文件编译成 Webpack 能识别的模块
    {
      // 处理css兼容性问题
      // 配合package.json中browserslist来指定兼容性 -> 提取到.browerslistrc配置文件中
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
      // 处理js
      {
        test: /\.js$/,
        include: path.resolve(__dirname, '../src'),
        loader: "babel-loader",
        options: {
          cacheDirectory: true, // 开启babel编译缓存
          cacheCompression: false, // 缓存文件不要压缩
          // 提取到babel.config.js配置文件中
          // plugins: [
          //   "@babel/plugin-transform-runtime", // 按需引入babel运行时的辅助函数，以减小输出的代码体积
          // ],
        },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader', // 内部会给vue文件注入HMR功能代码
        options: {
          cacheDirectory: path.resolve(__dirname, '../node_modules/.cache/vue-loader'), // 开启vue-loader编译缓存
        }
      }
    ]
  },
  plugins: [
    // 处理html
    // 生成一个 HTML 文件
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
    }),
    new VueLoaderPlugin(),
    // 配置eslint
    new EslintWebpackPlugin({
      context: path.resolve(__dirname, "../src"), // eslint 作用区域
      exclude: "node_modules",
      cache: true, // 开启eslint缓存
      cacheLocation: path.resolve(__dirname, "../node_modules/.cache/.eslintcache"), // eslint缓存文件位置
    }),
    new DefinePlugin({
      __VUE_OPTIONS_API__: true, // 是否开启options api(vue2语法)
      __VUE_PROD_DEVTOOLS__: false // 生成环境是否支持DEVTOOLS
    })
  ],
  // webpack解析模块加载选项
  resolve: {
    // 尝试按顺序解析这些后缀名。如果有多个文件有相同的名字，但后缀名不同，webpack 会解析列在数组首位的后缀的文件 并跳过其余的后缀
    extensions: [".vue", ".js", ".json"],
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

## webpack.prod.js
```js
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require('vue-loader')
const EslintWebpackPlugin = require('eslint-webpack-plugin');
const { DefinePlugin } = require("webpack");
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
      // 处理js
      {
        test: /\.js$/,
        include: path.resolve(__dirname, '../src'),
        loader: "babel-loader",
        options: {
          cacheDirectory: true, // 开启babel编译缓存
          cacheCompression: false, // 缓存文件不要压缩
          // plugins: [
          //   "@babel/plugin-transform-runtime", // 按需引入babel运行时的辅助函数，以减小输出的代码体积
          // ],
        },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader', // 内部会给vue文件注入HMR功能代码
        options: {
          cacheDirectory: path.resolve(__dirname, '../node_modules/.cache/vue-loader'), // 开启vue-loader编译缓存
        }
      }
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
    // 提取css为单独文件
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[contenthash:10].css",
      chunkFilename: "static/css/[name].[contenthash:10].chunk.css",
    }),
    new VueLoaderPlugin(),
    new DefinePlugin({
      __VUE_OPTIONS_API__: true, // 是否开启options api(vue2语法)
      __VUE_PROD_DEVTOOLS__: false // 生成环境是否支持DEVTOOLS
    }),
    // 拷贝public中的文件到dist
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../public"),
          to: path.resolve(__dirname, "../dist"),
          toType: "dir",
          noErrorOnMissing: true,
          globOptions: {
            ignore: ["**/index.html"],
          },
          info: {
            minimized: true,
          },
        },
      ],
    }),
  ],
  
  // webpack解析模块加载选项
  resolve: {
    // 尝试按顺序解析这些后缀名。如果有多个文件有相同的名字，但后缀名不同，webpack 会解析列在数组首位的后缀的文件 并跳过其余的后缀
    extensions: [".vue", ".js", ".json"],
    // 路径别名
    alias: {
      "@": path.resolve(__dirname, "../src"),
    }
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vue: {
          test: /[\\/]node_modules[\\/]vue(.*)?[\\/]/,
          name: "chunk-vue",
          priority: 40,
        },
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

## package.json
```json
{
  "name": "my-vue-webpack",
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
    "@babel/eslint-parser": "^7.23.3",
    "@babel/plugin-transform-runtime": "^7.23.6",
    "@vue/cli-plugin-babel": "^5.0.8",
    "babel-loader": "^9.1.3",
    "cross-env": "^7.0.3",
    "css-loader": "^6.8.1",
    "eslint": "^8.56.0",
    "eslint-plugin-vue": "^9.19.2",
    "eslint-webpack-plugin": "^4.0.1",
    "html-webpack-plugin": "^5.6.0",
    "less-loader": "^11.1.3",
    "postcss-preset-env": "^9.3.0",
    "sass": "^1.69.5",
    "sass-loader": "^13.3.3",
    "stylus-loader": "^7.1.3",
    "vue": "^3.3.13",
    "vue-loader": "^17.4.0",
    "vue-router": "^4.2.5",
    "vue-style-loader": "^4.1.3",
    "vue-template-compiler": "^2.7.16",
    "webpack": "^5.89.0",
    "webpack-cli": "^5.1.4",
    "webpack-dev-server": "^4.15.1"
  }
}
```

## babel.config.js
```js
module.exports = {
  presets: [
    [
      "@vue/cli-plugin-babel/preset", // 已经包含了一些与 Vue 项目相关的默认配置，确保可以使用 Vue 的语法和功能
      // 按需加载core-js的polyfill
      { 
        useBuiltIns: "usage", // 告诉 Babel 使用 "按需引入" 的方式注入 Polyfill
        corejs: { 
          version: "3", // 使用 Core-js 版本 3
          proposals: true // 启用对 ECMAScript 提案的支持
        } 
      },
    ],
    // "@babel/preset-env",
    /*
      总的来说，大多数 Vue 项目只需要 @vue/cli-plugin-babel/preset 就足够了。
      如果你对 Babel 的配置有特定的需求，可以单独使用 @babel/preset-env 进行配置，而不必同时使用两者
    */
  ],
  plugins: [
    "@babel/plugin-transform-runtime"
  ]
};
```

## .eslintrc.js
```js
module.exports = {
  root: true,
  env: {
    node: true,
  },
  // extends: ["plugin:vue/recommended", "eslint:recommended"],
  extends: ["plugin:vue/vue3-essential", "eslint:recommended"],
  parserOptions: {
    parser: "@babel/eslint-parser",
    ecmaVersion: 6, // ES 语法版本
    sourceType: 'module', // ES 模块化
    // ecmaFeatures: { // ES 其他特性
    //   'jsx': true // 如果是 React 项目，就需要开启 jsx 语法
    // }
  },
  env: {
    "browser": true,
    "node": true,
    "es6": true
  },
  rules: {

  }
};
```

## .browerslistrc
```
> 1%
last 2 versions
not dead
```