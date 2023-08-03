# jsx 语法

## 1. 概述

- 1. 全称: `JavaScript XML`
- 2. React 定义的一种类似于 XML 的`JS扩展语法`
  - JS + XML 本质是`React.createElement(标签名, 标签属性, 标签内容)`方法的语法糖
- 3. 作用: 用来简化创建虚拟 DOM

## 2. 基本规则

- 1. 定义虚拟 DOM 时，`不要写引号`。
- 2. 标签中混入 **JS 表达式**时要用 `{ }`
- 3. 样式的类名指定不要用 class，要用 `className`。（因为 class 是 ES6 中类的关键字）
- 4. 内联样式，要用 <span style="color: red">style = \{ \{ key: value \} \}</span> 的形式去写
- 5. 只有`一个根标签`
- 6. 标签必须闭合
- 7. 标签首字母
  - (1) 若**小写字母开头**，则**将该标签转为 html 中同名元素**，若 html 中无该标签对应的同名元素，则报错。
  - (2) 若**大写字母开头**，React 就去**渲染对应的组件**，若组件没有定义，则报错

**注意： 【JS 表达式】与【js 语句】**

- 表达式: <span style="color: red">一个表达式会产生一个值</span>，可以放在任何一个需要值的地方,例：
  - 变量 `a`
  - `a + b`
  - `demo(1)` 函数调用表达式
  - `arrmap()`
  - `function test () {}`
- 语句(代码): <span style="color: red">控制语句</span>，控制代码走向，而不是产生值,例：
  - `if() {}`
  - `for () {}`
  - `switch() {}`

```html{28-43}
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Document</title>
    <style>
      .title {
        color: red;
      }
    </style>
  </head>

  <body>
    <div id="test"></div>
    <script type="text/javascript" src="../js/react.development.js"></script>
    <script
      type="text/javascript"
      src="../js/react-dom.development.js"></script>
    <script src="../js/babel.min.js"></script>

    <script type="text/babel">
      const myId = "at"
      const myData = "HeLlo,rEaCt"

      const data = ["react", "angular", "vue"]

      const VDOM = (
        <div>
          <h2 id={myId.toLowerCase()} className="title">
            <span style={{ fontSize: "40px" }}>{myData.toLowerCase()}</span>
          </h2>
          <h2 id={myId.toUpperCase()} className="title">
            <span style={{ fontSize: "40px" }}>{myData.toLowerCase()}</span>
          </h2>
          <ul>
            {
              // 只能写js表达式(有返回值)
              data.map((item, index) => {
                return <li key={index}>{item}</li>
              })
            }
          </ul>
        </div>
      )

      ReactDOM.render(VDOM, document.getElementById("test"))
    </script>
  </body>
</html>
```
