# redux

[文档](https://cn.redux.js.org/)

## 概念

- redux 是什么
  - Redux 是用于做 `状态管理` 的 JS 库
  - 可用于 `React`、`Angular`、`Vue` 等项目中，常用于 React
  - `集中式管理` React 应用多个组件共享的`状态`
- 什么时候用 redux
  - 某个组件的状态，需要让其他组件拿到（状态共享）
  - 一个组件需要改变另一个组件的状态（通信）
  - 使用原则：不到万不得已不要轻易动用
- Redux 工作流程

<img :src="$withBase('/React/redux原理图.png')">

- 组件想操作 Redux 中的状态：把类型和数据告诉 `Action Creators`生成 `action 对象`
- 之后组件调用 `store.dispatch()` 传入 `action对象` 给 `Store`,之后`Reducers`函数执行
- `Reducers`接收 `previousState` `、action` 两个参数，对状态进行加工后返回新状态
- 组件调用 `store.getState()` 获取新状态

## store

- Redux 核心对象，内部维护着 `state` 和 `reducer`
- 核心 API
  - `store.getState()` ：获取状态
  - `store.dispatch(action)` ：分发任务，触发 reducer 调用，产生新状态
  - `store.subscribe(func)` ：注册监听函数，当状态改变自动调用

## reducer

- reducer 的本质是一个`函数`，接收`prevState`,`action`，返回加工后的状态
- reducer 的两个作用: `初始化状态`、`加工状态`
- reducer 被第一次调用时，是 store 自动触发的
  - 此时传递的 prevState 是 undefined
  - 传递的 action 是:{type:'@@REDUX/INIT_a.2.b.4'}

## 纯函数

- 概念：输入同样的参数，返回同样的输出。
- 约束：
  - 不能修改参数数据
  - 不产生任何副作用，如网络请求、输入和输出设备
  - 不能调用 Date.now() 或 Math.random() 等不纯的方法
- reducer 的函数必须是纯函数

## action

- 表示动作的对象，包含 2 个属性，`{type: 'increment', data: 2}`
  - `type` ：标识属性，值为字符串，唯一，必须属性
  - `data` ：数据属性，类型任意，可选属性

## 案例

- redux

  - src/redux/`store.js`

  ```js
  import { createStore } from "redux"
  // 引入为Count组件服务的reducer
  import countReducer from "./count_reducer"

  const store = createStore(countReducer)
  export default store
  ```

  - src/redux/`constand.js`

  ```js
  // 定义action对象中type类型的常量值
  export const INCREMENT = "INCREMENT"
  export const DECREMENT = "DECREMENT"
  ```

  - src/redux/`count_reducer.js`

  ```js
  import { INCREMENT, DECREMENT } from "./constant"

  // 初始化状态
  const initState = 0
  export default function countReducer(prevState = initState, action) {
    const { type, data } = action
    switch (type) {
      case INCREMENT:
        return prevState + data
      case DECREMENT:
        return prevState - data
      default:
        return prevState
    }
  }
  ```

  - src/redux/`count_action.js`

  ```js
  // 为Count组件生成action对象
  import { INCREMENT, DECREMENT } from "./constant"

  export const createIncrementAction = (data) => ({ type: INCREMENT, data })
  export const createDecrementAction = (data) => ({ type: DECREMENT, data })
  ```

- `index.js`

```js{9-13}
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import store from "./redux/store"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<App />)

// 检测redux状态的变化，只要变化，就调用回调
store.subscribe(() => {
  // 方法1
  root.render(<App />)
})
```

- `Count组件`

```jsx{2-6,18-22,37-38}
import React, { Component } from "react"
import store from "../../redux/store"
import {
  createIncrementAction,
  createDecrementAction,
} from "../../redux/count_action"

export default class count extends Component {
  // 检测redux状态的变化，只要变化，就调用回调
  // componentDidMount() {
  //   store.subscribe(() => {
  //     this.setState({}) // 方法2
  //     // this.forceUpdate() // 方法3
  //   })
  // }
  increment = () => {
    const { value } = this.selectNumber
    // 手动创建action对象
    // store.dispatch({ type: "INCREEMENT", data: value * 1 })

    // 创建一个action对象，并通过dispatch派发给redux
    store.dispatch(createIncrementAction(+value))
  }
  decrement = () => {
    const { value } = this.selectNumber
    store.dispatch(createDecrementAction(+value))
  }
  incrementAsync = () => {
    const { value } = this.selectNumber
    setTimeout(() => {
      store.dispatch(createIncrementAction(+value))
    }, 500)
  }
  render() {
    return (
      <div>
        {/* 获取redux状态 store.getState() */}
        <h1>当前求和为: {store.getState()}</h1>
        <select ref={(c) => (this.selectNumber = c)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <button onClick={this.increment}>+</button>&nbsp;
        <button onClick={this.decrement}>-</button>&nbsp;
        <button onClick={this.incrementAsync}>异步加</button>
      </div>
    )
  }
}

```

## redux 异步编程 redux-thunk

异步任务不想在组件中执行，可以交给 redux 执行异步任务(异步 redux 不是必须的)

- `action`默认只能是`普通对象`类型,需要借助`中间件`让`action`可以是一个函数类型

```shell
npm install redux-thunk
yarn add redux-thunk
```

- 安装异步中间件，通过这个中间件告诉 store：【action 可以是一个函数】
- `action`需要返回一个函数，让 store 执行这个函数，可以在这个函数中执行异步任务
- 异步任务完成后，分发一个`同步 action` 操作状态

```js
// store.js
// 引入 applyMiddleware , 让redux可以使用中间件
import { createStore, applyMiddleware } from "redux"
import countReducer from "./count_reducer"
import thunk from "redux-thunk"

export default createStore(countReducer, applyMiddleware(thunk))
```

```js
// count_action.js
import { INCREMENT, DECREMENT } from "./constant.js"

export const createIncrementAction = (data) => ({ type: INCREMENT, data })

// 异步 action 返回一个函数
export const createIncrementAsyncAction = (data) => {
  // 返回的这个函数交给store执行，store执行该函数传递一个dispatch方法
  return (dispatch) => {
    setTimeout(() => {
      dispatch(createIncrementAction(data))
    }, 500)
  }
}
```

```jsx
// Count.jsx 组件中使用这个异步redux
incrementAsync = () => {
  const { value } = this.selectNumber
  store.dispatch(createIncrementAsyncAction(value * 1))
}
```
