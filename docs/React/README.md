# React 入门

## 1. React 特点

- 1.采用<span style="color: red">组件化</span>模式、<span style="color: red">声明式编码</span>，提高开发效率及组件复用率。
- 2.在 React Native 中可以使用 React 语法进行<span style="color: red">移动端开发</span>。
- 3.使用<span style="color: red">虚拟 DOM</span>+优秀的<span style="color: red">Diffing 算法</span>，尽量减少与真实 DOM 的交互

## 2. Hello React

- react.js：React 核心库。
- react-dom.js：提供操作 DOM 的 React 扩展库。
- babel.min.js：解析 JSX 语法代码转为 JS 代码的库
  - 浏览器不能直接解析 JSX 代码, 需要 babel 转译为纯 JS 的代码才能运行
  - 只要用了 JSX，都要加上 `type="text/babel"`, 声明需要 babel 来处理

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
  </head>

  <body>
    <div id="test"></div>

    <!-- react核心库 全局多个React对象 -->
    <script src="./js/react.development.js"></script>
    <!-- react-dom, 用于支持react操作dom  全局多个ReactDOM对象 -->
    <script src="./js/react-dom.development.js"></script>
    <!-- babel，用于将jsx转为js -->
    <script src="./js/babel.min.js"></script>

    <script type="text/babel">
      /* 此处一定要写babel */
      // 1. 创建虚拟dom
      const VDOM = <h1>Hello,React</h1> /* 此处一定不要写引号，因为不是字符串 */
      // 2. 渲染虚拟dom到页面
      // ReactDOM.render(虚拟DOM,容器)
      ReactDOM.render(VDOM, document.getElementById("test"))
    </script>
  </body>
</html>
```

## 3. 创建虚拟 DOM 的两种方式

### 3.1 使用 jsx 创建虚拟 DOM

- 备注
  - <span style="color:red">JSX 方式就是 js 创建虚拟 DOM 的语法糖</span>
  - 在编译之后，JSX 表达式会被转为普通 JavaScript 函数调用，并且对其取值后得到 JavaScript 对象

```html{14-19}
<body>
  <div id="test"></div>

  <!-- react核心库 全局多个React对象 -->
  <script src="../js/react.development.js"></script>
  <!-- react-dom, 用于支持react操作dom  全局多个ReactDOM对象 -->
  <script src="../js/react-dom.development.js"></script>
  <!-- babel，用于将jsx转为js -->
  <script src="../js/babel.min.js"></script>

  <script type="text/babel">
    /* 此处一定要写babel */
    // 1. 创建虚拟dom
    const VDOM = (
      /* 此处一定不要写引号，因为不是字符串 */
      <h1 id="title">
        <span>Hello,React</span>
      </h1>
    )
    // 2. 渲染虚拟dom到页面
    // ReactDOM.render(虚拟DOM,容器)
    ReactDOM.render(VDOM, document.getElementById("test"))
  </script>
</body>
```

### 3.2 使用 js 创建虚拟 DOM

- 语法
  - `React.createElement(标签名, 标签属性, 标签内容)`

```html{12-16}
<body>
  <div id="test"></div>

  <!-- react核心库 全局多个React对象 -->
  <script type="text/javascript" src="../js/react.development.js"></script>
  <!-- react-dom, 用于支持react操作dom  全局多个ReactDOM对象 -->
  <script type="text/javascript" src="../js/react-dom.development.js"></script>

  <script type="text/javascript">
    // 1. 创建虚拟dom
    // const VDOM = React.createElement(标签名, 标签属性, 标签内容)
    const VDOM = React.createElement(
      "h1",
      { id: "title" },
      React.createElement("span", {}, "Hello,React")
    )

    // 2. 渲染虚拟dom到页面
    // ReactDOM.render(虚拟DOM,容器)
    ReactDOM.render(VDOM, document.getElementById("test"))
  </script>
</body>
```

## 4. 虚拟 DOM 与真实 DOM 对比

- 虚拟 DOM
  - <img :src="$withBase('/React/01.png')">
- 真实 DOM

  - <img :src="$withBase('/React/02.png')">

- `虚拟DOM` 本质是 `Object` 类型的对象（一般对象）
- `虚拟DOM` 比较 “**轻**”，`真实DOM` 比较 “**重**”，因为虚拟 DOM 是 `React` 内部在用，无需真实 DOM 上那么多的属性
- 虚拟 DOM 最终会被 React `转化`为真实 DOM，呈现在页面上
