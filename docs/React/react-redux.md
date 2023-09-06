# react-redux

<img :src="$withBase('/React/react-redux模型图.png')">

React-Redux 将组件分为两类：

- UI 组件
  - 只负责 UI 呈现，不带有业务逻辑
  - 通过 `props` 接收数据
  - 不能使用 Redux 的 API
- 容器组件
  - 负责管理数据和业务逻辑，和 Redux 通信，将结果交给 UI 组件
  - 可使用 Redux 的 API

## 基本使用

- `connect(mapStateToProps,mapDispatchToProps)(UI组件)` ：创建容器组件
- `mapStateToProps(state)` ：映射状态，返回值是一个对象
- `mapDispatchToProps(dispatch)` ：映射操作状态的方法，返回值是一个对象
- 容器组件中的 `store` 是靠 `props` 传进去，而不是在容器组件中直接引入

[前往案例中 redux 的代码](/React/redux.html#%E6%A1%88%E4%BE%8B)

- src/`App.jsx` `容器组件的父组件`

```jsx{11-12}
import React, { Component } from "react"
// 引入容器组件
import Count from "./containers/Count"
// 引入store
import store from "./redux/store"

export default class App extends Component {
  render() {
    return (
      <div>
        {/* 给容器组件传入store */}
        <Count store={store} />
      </div>
    )
  }
}
```

- src/`containers/Count/index.jsx` `容器组件`

```jsx
// 引入Count的UI组件
import CountUI from "../../components/Count"

// 引入connect用于连接UI组件和redux
import { connect } from "react-redux"

// 引入action
import {
  createIncrementAction,
  createDecrementAction,
  createIncrementAsyncAction,
} from "../../redux/count_action"

/*
  1. mapStateToProps函数返回一个对象
  2. 返回的对象中的key作为传递给UI组件props中的key,value作为传递给UI组件props中的value
  3. mapStateToProps用于传递状态
*/
function mapStateToProps(state) {
  return {
    count: state,
  }
}
/*
  1. mapDispatchToProps函数返回一个对象
  2. 返回的对象中的key作为传递给UI组件props中的key,value作为传递给UI组件props中的value
  3. mapDispatchToProps用于传递操作状态的方法
*/
function mapDispatchToProps(dispatch) {
  return {
    add: (data) => dispatch(createIncrementAction(data)),
    sub: (data) => dispatch(createDecrementAction(data)),
    addAsync: (data) => dispatch(createIncrementAsyncAction(data)),
  }
}

// 使用connect()()创建并暴露一个Count的容器组件
export default connect(mapStateToProps, mapDispatchToProps)(CountUI)
```

- src/`components/Count/index.jsx` `UI 组件`

```jsx{6,12}
import React, { Component } from "react"

export default class count extends Component {
  increment = () => {
    const { value } = this.selectNumber
    this.props.add(value * 1)
  }
  // 略...
  render() {
    return (
      <div>
        <h1>当前求和为: {this.props.count}</h1>
        <select ref={(c) => (this.selectNumber = c)}>
          <option value="1">1</option>
        </select>
        <button onClick={this.increment}>+</button>
      </div>
    )
  }
}
```

## 优化写法

- (1).mapDispatchToProps 也可以简单的`写成一个对象`
- (2).使用了 react-redux 后也不用再自己检测 redux 中状态的改变了，容器组件可以`自动完成`这个工作。
- (3).无需自己给容器组件传递 store，给`<App/>`包裹一个`<Provider store={store}>`即可。
- (4).容器组件和 UI 组件整合一个文件
- (5).一个组件要和 redux“打交道”要经过哪几步?
  - (1).定义好 UI 组件---不暴露
  - (2).引入 connect 生成一个容器组件，并暴露，写法如下:
    - connect( state => ({key : value}),{ key :xxxxxAction} )(UI 组件)
  - (4).在 UI 组件中通过 this.props.xxxxxxx 读取和操作状态

### 1、 connect()()

- `connect()()`中`mapDispatchToProps` 可以写成对象形式，React-Redux 底层会帮助自动分发

```jsx
// 函数写法
export default connect(
  (state) => ({ count: state }),
  (dispatch) => ({
    add: (data) => dispatch(createIncrementAction(data)),
    sub: (data) => dispatch(createDecrementAction(data)),
    addAsync: (data) => dispatch(createIncrementAsyncAction(data)),
  })
)(CountUI)

// 对象写法
export default connect((state) => ({ count: state }), {
  add: createIncrementAction,
  sub: createDecrementAction,
  addAsync: createIncrementAsyncAction,
})(CountUI)
```

### 2、 自动监测 Redux 状态变化

- 优化前：在没有使用 react-redux 时需要在 index.js 中检测 store 中状态的改变

```js
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import store from "./redux/store"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<App />)

store.subscribe(() => {
  root.render(<App />)
})
```

- 优化后：React-Redux 容器组件可以`自动监测 Redux 状态变化`，因此 index.js 不需要手动监听

```js
// index.js
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<App />)
```

### 3、Provider 组件的使用

- 优化前：需要给每个容器组件传递`store`

```jsx
// 使用Count容器组件
<Count store={store} />
```

- 优化后：`Provider 组件`让所有组件都能获得状态数据，不必一个一个传递

```js
// index.js
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import store from "./redux/store"
import { Provider } from "react-redux"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
```

```jsx
// 使用Count容器组件
<Count />
```

### 4、 整合容器组件和 UI 组件为一个文件

src/`containers/Count/index.jsx`

```jsx
import React, { Component } from "react"
import { connect } from "react-redux"
import {
  createIncrementAction,
  createDecrementAction,
  createIncrementAsyncAction,
} from "../../redux/count_action"

class Count extends Component {
  // ...
}

export default connect((state) => ({ count: state }), {
  add: createIncrementAction,
  sub: createDecrementAction,
  addAsync: createIncrementAsyncAction,
})(Count)
```

## 多个组件间数据共享-最终版 combineReducers

```
文件结构
src
--containers 存放容器组件-UI组件
  --Child1
    --index.jsx
  --Child2
    --index.jsx
--redux
  --actions 存放action
    --child1.js
    --child2.js
  --reducers 存放reducer
    --child1.js
    --child2.js
  --constant.js 存放常量
  --store.js
--App.jsx
--indeex.js
```

- `index.js`

```js
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import store from "./redux/store"
import { Provider } from "react-redux"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
```

- `App.jsx`

```jsx
import React, { Component } from "react"
import Child1 from "./containers/Child1"
import Child2 from "./containers/Child2"

export default class App extends Component {
  render() {
    return (
      <div>
        <Child1 />
        <hr />
        <Child2 />
      </div>
    )
  }
}
```

- redux

  - `store.js`

  ```js
  import { createStore, applyMiddleware, combineReducers } from "redux"
  import child1Reducer from "./reducers/child1"
  import child2Reducer from "./reducers/child2"
  import thunk from "redux-thunk"

  // 组合reducers,组合后的对象就是state
  /*
    如 {a: 0, person: {…}}
  */
  const Reducers = combineReducers({
    a: child1Reducer,
    person: child2Reducer,
  })

  const store = createStore(Reducers, applyMiddleware(thunk))
  export default store
  ```

  - `constant.js`

  ```js
  export const CHILD1_ADDA = "CHILD1_ADDA"
  export const CHILD2_CHANGENAME = "CHILD2_CHANGENAME"
  export const CHILD2_CHANGEAGE = "CHILD2_CHANGEAGE"
  ```

  - actions

    - `child1.js`

    ```js
    import { CHILD1_ADDA } from "../constant"

    export const createAddAAction = (data) => ({ type: CHILD1_ADDA, data })
    export const createAddAAsyncAction = (data) => {
      return (dispatch) => {
        setTimeout(() => {
          dispatch(createAddAAction(data))
        }, 500)
      }
    }
    ```

    - `child2.js`

    ```js
    import { CHILD2_CHANGENAME, CHILD2_CHANGEAGE } from "../constant"

    export const createChangeNameAction = (data) => ({
      type: CHILD2_CHANGENAME,
      data,
    })
    export const createChangeAgeAction = (data) => ({
      type: CHILD2_CHANGEAGE,
      data,
    })
    export const createChangeAgeAsyncAction = (data) => {
      return (dispatch) => {
        setTimeout(() => {
          dispatch(createChangeAgeAction(data))
        }, 1000)
      }
    }
    ```

  - reducers

    - `child1.js`

    ```js
    import { CHILD1_ADDA } from "../constant"

    // 初始化状态
    const initState = 0
    export default function child1Reducer(prevState = initState, action) {
      const { type, data } = action
      switch (type) {
        case CHILD1_ADDA:
          return prevState + data
        default:
          return prevState
      }
    }
    ```

    - `child2.js`

    ```js
    import { CHILD2_CHANGENAME, CHILD2_CHANGEAGE } from "../constant"

    const initState = { name: "张三", age: 18 }
    export default function child2Reducer(prevState = initState, action) {
      const { type, data } = action
      switch (type) {
        case CHILD2_CHANGENAME:
          return {
            ...prevState,
            name: data,
          }
        case CHILD2_CHANGEAGE:
          return {
            ...prevState,
            age: data,
          }
        default:
          return prevState
      }
    }
    ```

- containers

  - Child1

    - index.jsx

    ```jsx
    import React, { Component } from "react"
    import { connect } from "react-redux"
    import {
      createAddAAction,
      createAddAAsyncAction,
    } from "../../redux/actions/child1"

    class Child1 extends Component {
      add = () => {
        this.props.addA(1)
      }
      addAsync = () => {
        this.props.addAsyncA(1)
      }
      render() {
        return (
          <div>
            <h2>我是组件1</h2>
            <h4>组件1中的值a: {this.props.a}</h4>
            <button onClick={this.add}>a+1</button>
            <button onClick={this.addAsync}>异步+1</button>
            <h4>
              组件2的信息：{this.props.person.name}：{this.props.person.age}
            </h4>
          </div>
        )
      }
    }
    export default connect((state) => ({ a: state.a, person: state.person }), {
      addA: createAddAAction,
      addAsyncA: createAddAAsyncAction,
    })(Child1)
    ```

  - Child2

    - index.jsx

    ```jsx
    import React, { Component } from "react"
    import { connect } from "react-redux"
    import {
      createChangeAgeAsyncAction,
      createChangeNameAction,
    } from "../../redux/actions/child2"

    class Child2 extends Component {
      changeName = () => {
        this.props.changeName("李四")
      }
      changeAsyncAge = () => {
        this.props.changeAsyncAge(20)
      }
      render() {
        return (
          <div>
            <h2>我是组件2</h2>
            <h4>组件2中的姓名: {this.props.person.name}</h4>
            <h4>组件2中的年龄: {this.props.person.age}</h4>
            <button onClick={this.changeName}>改变name</button>
            <button onClick={this.changeAsyncAge}>改变age</button>
            <h4>组件1的状态a：{this.props.a}</h4>
          </div>
        )
      }
    }
    export default connect((state) => ({ person: state.person, a: state.a }), {
      changeName: createChangeNameAction,
      changeAsyncAge: createChangeAgeAsyncAction,
    })(Child2)
    ```

---

<img :src="$withBase('/React/17.png')">

## redux 开发者工具

- Chrome 安装 Redux DevTools 开发者工具
- 项目下载依赖包

```shell
npm i redux-devtools-extension
yarn add redux-devtools-extension
```

- 最后在 `store.js` 进行配置

```js
import { composeWithDevTools } from 'redux-devtools-extension'
// 需要异步中间件
export default createStore(Reducers, composeWithDevTools(applyMiddleware(thunk)))
// 不需要异步中间件
export default createStore(Reducers, composeWithDevTools())
```

## 项目打包运行

- `npm run build` 进行项目打包，生成 `build` 文件夹存放着打包完成的文件
- `npm i serve -g` 全局安装 `serve`
  - `serve` 命令在当前路径开启一台服务器
  - `serve build`在 build 路径开启一台服务器
