# React 组件

## 1. 函数式组件与类式组件

- React 组件有两种
  - 函数式组件
  - 类式组件

### 1.1 函数式组件

- 执行了 ReactDOM.render()之后，发生了什么？
  - React 解析组件标签，找到了 MyComponent 组件。
  - 发现组件是使用函数定义的，随后**调用该函数**，将返回的虚拟 DOM 转为真实 DOM，随后呈现在页面中。

```html
<script type="text/babel">
  // 1. 创建函数式组件
  function MyComponent() {
    console.log(this) //此处的this是undefined，因为babel编译后开启了严格模式
    return <h2>我是用函数定义的组件（适用于简单组件的定义）</h2>
  }
  // 2. 渲染组件到页面
  ReactDOM.render(<MyComponent />, document.getElementById("test"))
</script>
```
