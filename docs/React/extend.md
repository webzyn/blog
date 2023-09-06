# 扩展

## setState 更新状态的两种写法

- 对象式：`setState(stateChange, [callback])`

  - `stateChange` 为状态改变对象(该对象可以体现出状态的更改)
  - `callback` 是可选的回调函数, 它在`状态更新完毕`、界面也`更新(render调用)后`才被调用

```jsx
state = { count: 0 }

add = () => {
  this.setState({ count: this.state.count + 1 })
}
```

- 函数式：`setState(updater, [callback])`

  - updater 为返回 `stateChange` 对象的函数。
  - updater 可以接收到 `state` 和 `props`。

```jsx
add = () => {
  this.setState((state, props) => {
    return { count: state.count + 1 }
  })
}
```

- React 状态更新是异步的

```jsx
add = () => {
  this.setState({ count: this.state.count + 1 })
  console.log(this.state.count) // 0 => 该行代码执行时状态还没有更新完成
}

add = () => {
  this.setState({ count: this.state.count + 1 }, () => {
    // 界面更新完毕才执行该回调
    console.log(this.state.count) // 1
  })
}
```

## 路由组件懒加载 lazy、Suspense

```jsx
import React, { Component, lazy, Suspense } from 'react'
import Loading from './Loading' // Loading组件

// 通过 lazy 函数配合 import() 函数动态加载路由组件
// 路由组件代码会被分开打包
const Home = lazy(() => import('./Home'))
const About = lazy(() => import('./About'))

export default Demo extends Component {
  render() {
    return (
      <div>
        <h1>Demo 组件</h1>
        <Link to="/home">Home</Link>
        <Link to="/about">About</Link>

        {/* 通过 <Suspense> 指定在加载得到路由打包文件前显示一个自定义 Loading 界面 */}
        <Suspense fallback={Loading}>
          <Switch>
            <Route path="/home" component={Home}>
            <Route path="/about" component={About}>
          </Switch>
        </Suspense>
      </div>
    )
  }
}
```

## Fragment

- `Fragment` 标签本身不会被渲染成一个真实 DOM 标签，有点像 Vue 的 `template`。
- 用空标签也有相同效果，但是空标签不能传递任何属性，`Fragment` 标签可以传递 `key` 属性，遍历时候可用。

```jsx
import React, { Component, Fragment } from "react"

export default class Demo extends Component {
  render() {
    return (
      <Fragment key={1}>
        <input type="text" />
        <input type="text" />
      </Fragment>
    )

    // 或
    return (
      <>
        <input type="text" />
        <input type="text" />
      </>
    )
  }
}
```

## Context

- Context 是一种组件间通信方式，常用于祖父组件与子孙组件。
- 实际开发一般不用，一般用 React-Redux
- 类似 vue 中的 provide/inject

```jsx{2,5-7,12-15,18-25}
1) 创建Context容器对象：
const XxxContext = React.createContext()

2) 渲染子组时，外面包裹xxxContext.Provider, 通过value属性给后代组件传递数据：
<XxxContext.Provider value={数据}>
  子组件
</XxxContext.Provider>

3) 后代组件读取数据：

// 第一种方式：仅适用于类组件
// 声明接收context
static contextType = xxxContext
// 读取context中的value数据
this.context

//第二种方式: 可用于函数组件与类组件
<XxxContext.Consumer>
  {
    // value就是context中的value数据
    value => (
      ...
    )
  }
</XxxContext.Consumer>
```

示例

```jsx{2,14-20,38,40,58-62}
import React from "react"
export const MyContext = React.createContext()
export const { Provider, Consumer } = MyContext

export default class A extends Component {
  state = { username: "tom", age: 18 }

  render() {
    const { username, age } = this.state
    return (
      <div>
        <h3>A组件</h3>
        <h4>用户名是:{username}</h4>
        <MyContext.Provider value={{ username, age }}>
          <B />
        </MyContext.Provider>
        {/* 可从MyContext上解构出Provider */}
        <Provider value={{ username, age }}>
          <B />
        </Provider>
      </div>
    )
  }
}

class B extends Component {
  render() {
    return (
      <div>
        <h3>B组件</h3>
        <C />
      </div>
    )
  }
}

class C extends Component {
  static contextType = MyContext
  render() {
    const { username, age } = this.context
    return (
      <div>
        <h3>C组件</h3>
        <h4>
          从A组件接收到的用户名:{username},年龄:{age}
        </h4>
      </div>
    )
  }
}

function C() {
  return (
    <div>
      <h3>我是C组件</h3>
      <h4>
        从A组件接收到的用户名:
        <MyContext.Consumer>
          {(value) => `${value.username},年龄是${value.age}`}
        </MyContext.Consumer>
        {/* 可从MyContext上解构出Consumer */}
        <Consumer>{(value) => `${value.username},年龄是${value.age}`}</Consumer>
      </h4>
    </div>
  )
}
```

## 组件渲染优化 PureComponent

问题：

- 只要执行 `setState()` ，即使不改变状态数据，组件也会重新 `render()`
- 只要父组件重新`render()`，即使子组件没有使用父组件的任何数据，也会重新 `render()`

效率高的做法：

- 只有组件的 `state` 或 `props` 的数据发生改变时才重新`render()`

原因：

- `shouldComponentUpdate()` 钩子默认总是返回 `true`

方式：

- 1.重写 `shouldComponentUpdate(nextProps, nextState)`
  - 比较新旧 `state` 和 `props` 数据,如果有变化返回 `true`，否则返回 `false`

```jsx
import React, { Component } from 'react'
class Demo extends Component {
  state = {name: '张三'}

  shouldComponentUpdate = (nextProps, nextState) => {
    // 手动控制组件更新阀门是否开启
    if (this.state.name === nextState.name) {
      return false
    } else {
      return true
    }
  }
  ...
}
```

- 2.使用 `PureComponent`

  - `PureComponent`重写了 `shouldComponentUpdate()` ， 只有 `state` 或 `props` 数据有变化才返回 `true`
  - 注意
    - `PureComponent` 内部只是进行 `state` 和 `props` 数据的`浅比较,` 如果只是数据对象内部数据变了, 返回 `false`。
    - 不要直接修改 `state` 数据, 而是要产生`新数据`

```jsx{3}
import React, { PureComponent } from 'react'

class Demo extends PureComponent {
  state = { stu: ['小张', '小李', '小王'] }
  addStu = () => {
    // 不会渲染 => 新state对象与旧state对象相同
    const { stus } = this.state
    stus.unshift('小刘')
    this.setState({ stus })

    // 重新渲染 => 新state对象与旧state对象不同
    const { stus } = this.state
    this.setState({ stus: ['小刘', ...stus] })
  }
  ...
}
```

## render props(相当于 vue 中的 slot)

- 如何向组件内部动态传入带内容的结构（即标签或组件）
  - Vue：`slot` 插槽技术
  - React：
    - 使用 `children props`：通过组件标签体传入结构
    - 使用 `render props`：通过组件标签属性传入结构，可携带数据,一般用 render 函数属性
- `children props` 方式：
  - 组件标签体内容会存储到 `this.props.children` 中
  - 缺点：A 组件无法向 B 组件传递数据
- `render props` 方式：
  - 预留插槽`{this.props.render(name)}`
  - 使用插槽`<A render={(name) => <B name={name} />} />`

```jsx{9-11,22}
// children props
import React, { Component } from "react"

export default class Parent extends Component {
  render() {
    return (
      <div>
        <h3>Parent组件</h3>
        <A>
          <B />
        </A>
      </div>
    )
  }
}

class A extends Component {
  render() {
    return (
      <div>
        <h3>A组件</h3>
        {this.props.children}
      </div>
    )
  }
}

class B extends Component {
  render() {
    return (
      <div>
        <h3>B组件</h3>
      </div>
    )
  }
}
```

```jsx{9,22,32}
// render props
import React, { Component } from "react"

export default class Parent extends Component {
  render() {
    return (
      <div>
        <h3>Parent组件</h3>
        <A render={(name) => <B name={name} />} />
      </div>
    )
  }
}

class A extends Component {
  state = { name: "tom" }
  render() {
    const { name } = this.state
    return (
      <div>
        <h3>A组件</h3>
        {this.props.render(name)}
      </div>
    )
  }
}

class B extends Component {
  render() {
    return (
      <div>
        <h3>B组件,{this.props.name}</h3>
      </div>
    )
  }
}
```

## 错误边界

- 理解
  - `错误边界(Error boundary)`：用来捕获`后代`组件错误，渲染出备用页面。
- 特点
  - 只能捕获`后代组件生命周期`产生的错误，不能捕获自己组件产生的错误和其他组件在合成事件、定时器中产生的错误
- 使用方式
  - `getDerivedStateFromError` 配合 `componentDidCatch`(只在生产环境有效)

```jsx{11,19}
import React, { Component } from "react"
import Child from "./Child"

export default class Parent extends Component {
  state = {
    //用于标识子组件是否产生错误
    hasError: false,
  }

  // 生命周期函数，一旦后台组件报错，就会触发，并携带错误信息
  static getDerivedStateFromError(error) {
    console.log(error)
    // render 之前触发
    // 返回新的 state
    return { hasError: true }
  }

  // 生命周期函数，子组件产生错误时调用该钩子
  componentDidCatch(error, info) {
    console.log(error, info)
    console.log("此处统计错误，反馈给服务器")
  }

  render() {
    return (
      <div>
        <h2>Parent组件</h2>
        {this.state.hasError ? <h2>网络不稳定，稍后再试</h2> : <Child />}
      </div>
    )
  }
}
```

## 组件通信方式总结

- 几种通信方式

  - [props](/React/component.html#_4-组件实例核心属性-props)
    - [children props](/React/extend.html#render-props-相当于-vue-中的-slot)
    - [render props](/React/extend.html#render-props-相当于-vue-中的-slot)
  - `消息订阅-发布`
    - [pubs-sub](/React/network.html#消息订阅-发布机制)、event 等
  - `集中式管理`
    - [Redux](/React/redux.html#redux)、dva 等
  - [conText](/React/extend.html#context)
    - 生产者-消费者模式

- 推荐搭配：
  - 父子组件
    - `props`
  - 兄弟组件
    - 消息订阅-发布、集中式管理
  - 祖孙组件(跨级组件)
    - 消息订阅-发布、集中式管理、`conText`(开发用的少，封装插件用的多)
