# React Hooks

- Hook 是 React 16.8.0 增加的新特性，让我们能在`函数式组件`中使用 state 和其他特性

## State Hook

- `State Hook` 让函数式组件也可拥有 `state` 状态。
- 语法
  - `const [Xxx, setXxx] = React.useState(initValue)`
- useState()
  - 参数：`第一次初始化指定的值在内部缓存`
  - 返回值：包含 2 个元素的数组，分别为`内部当前状态值`和`状态更新函数`
- `setXxx()` 的 2 种用法：
  - `setXxx(newValue)` 参数为非函数值，直接指定新的状态值，内部用其覆盖原来的状态值
  - `setXxx(value => newValue)` 参数为函数，接收原本的状态值，返回新的状态值，内部用其覆盖原来的状态值

```jsx
function Demo() {
  const [count, setCount] = React.useState(0)

  function add() {
    // setCount(count + 1)
    setCount((count) => count + 1)
  }
  return (
    <div>
      <h2>{Count}</h2>
      <button onClick={add}>加1</button>
    </div>
  )
}
```

## Effect Hook

- `Effect Hook` 让我们能在函数式组件中执行副作用操作（就是`模拟生命周期钩子`）
- React 副作用操作
  - 发送 Ajax 请求获取数据
  - 设置订阅 、 启动定时器
  - 手动更改真实 DOM
- 可以把`useEffect Hook` 看成三个函数的组合
  - `componentDidMount`
  - `componentDidUpdate`
  - `componentWillUnmount`
- 语法和说明

```js
useEffect(() => {
  // 在此可以执行任何带副作用操作
  return () => {
    // 组件卸载前执行
    // 在此做一些收尾工作，比如清除定时器/取消订阅等
  }
}, [stateValue]) // 如果指定的是[],回调函数会在第一次render()后执行
```

```jsx
function Demo() {
  const [count, setCount] = React.useState(0)

  // 模拟 componentDidMount、componentDidUpdate
  // 若第二个参数不写，表示监听所有状态的更新
  React.useEffect(() => {
    console.log("模拟 componentDidMount、componentDidUpdate")
  })

  // 模拟 componentDidMount
  // 第二个参数数组为空，表示不监听任何状态的更新
  React.useEffect(() => {
    console.log("模拟 componentDidMount")
  }, [])

  // 模拟 componentDidMount、componentDidUpdate
  // 第二个参数数组写上状态，表示只监听这些状态的更新
  React.useEffect(() => {
    console.log("模拟 componentDidMount、componentDidUpdate，Count改变了")
  }, [count])

  // 模拟 componentWillUnmount
  React.useEffect(() => {
    return () => {
      console.log("模拟 componentWillUnmount")
    }
  })

  function add() {
    setCount(count + 1)
  }
  return (
    <div>
      <h2>{Count}</h2>
      <button onClick={add}>加1</button>
    </div>
  )
}
```

## Ref Hook

- `Ref Hook` 可以在函数式组件存储或查找组件内的标签或其他数据
- 语法：`const refContainer = React.useRef()`
- 保存标签对象的容器，和 `React.createRef()` 类似，也是专人专用

```js
function Demo() {
  const myRef = React.useRef()

  function show() {
    console.log(myRef.current.value)
  }

  return (
    <div>
      <input type="text" ref={myRef} />
      <button onClick={show}>展示数据</button>
    </div>
  )
}
```
