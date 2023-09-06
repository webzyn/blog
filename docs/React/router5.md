# React Router 5

## 路由的理解

- 何为路由？

  - 一个路由是一个映射关系
  - `key 为路径`，value 可能是 function 或 组件

- 后端路由：

  - value 是 `function` ，用于处理客户端的请求
  - 注册路由：`router.get(path, function(req, res))`
  - 工作过程：Node 接收到请求，根据路径匹配路由，调用对应函数处理请求，返回响应数据

- 前端路由：

  - value 是`组件`
  - 注册路由：`<Route path="/test" component={Test}>`
  - 工作过程：浏览器路径变为 `/test` ，展示 `Test` 组件

## 路由基本使用

- 安装 `react-router-dom`

```shell
// 安装 5.X 版本路由
npm install react-router-dom@5 -S

// 最新已经 6.X 版本，用法和 5.X 有所不同
npm install react-router-dom -S
```

- 使用
  - 导航区使用`<Link></Link>`
  - 展示区使用`<Route></Route>`
  - 外侧使用`<BrowserRouter></BrowserRouter>` 或 `<HashRouter></HashRouter>`包裹

```jsx{15-20,23,24}
// App.jsx
import { Link, Route } from "react-router-dom"
// 路由组件放在pages文件夹下
import About from "./pages/About"
import Home from "./pages/Home"
// 普通组件放在components文件夹下
import Header from "./components/Header"

function App() {
  return (
    <div className="App">
      <Header></Header>
      <main className="main">
        <div className="left">
          <Link to="/about" style={{ display: "block" }}>
            About
          </Link>
          <Link to="home" style={{ display: "block" }}>
            Home
          </Link>
        </div>
        <div className="right">
          <Route path="/about" component={About}></Route>
          <Route path="/home" component={Home}></Route>
        </div>
      </main>
    </div>
  )
}

export default App
```

```js{10,12}
// index.js
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { BrowserRouter } from "react-router-dom"

const root = ReactDOM.createRoot(document.getElementById("root"))
// 一般一个项目只有一个路由，所以使用 BrowserRouter 标签将整个App组件包裹
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
```

## 七个内置组件

- 1.`<BrowserRouter>`
- 2.`<HashRouter>`
- 3.`<Route>`
- 4.`<Redirect>`
- 5.`<Link>`
- 6.`<NavLink>`
- 7.`<Switch>`

## `<Link>` 的使用

```jsx
// <Link to="/路由名">标题</Link>
<Link to="/about">About</Link>
```

## `<Route>` 的使用

```jsx
// <Route path="/路由名" component={组件名}></Route>
<Route path="/about" component={About}></Route>
```

## 路由组件和一般组件区别

- 写法不同：
  - 一般组件：`<Demo/>`
  - 路由组件：`<Route path="/demo" component={Demo}/>`
- 存放位置不同：
  - 一般组件：`components`
  - 路由组件：`pages`
- 接收到的 `props` 不同：
  - 一般组件：标签属性传递
  - 路由组件：接收到`三个固定的props`属性

```js
history:
  go: ƒ go(n)
  goBack: ƒ goBack()
  goForward: ƒ goForward()
  push: ƒ push(path, state)
  replace: ƒ replace(path, state)

location:
  pathname: "/home/message/detail/2/hello"
  search: ""
  state: undefined

match:
  params: {}
  path: "/home/message/detail/:id/:title"
  url: "/home/message/detail/2/hello"
```

## `<NavLink>` 的使用

`NavLink` 可以实现路由链接的`高亮`，通过 `activeClassName` 指定样式名，默认追加类名为 `active`

```html
<!-- <NavLink activeClassName="样式名" to="/路由名">标题</NavLink> -->
<NavLink activeClassName="demo" to="/Home">Home</NavLink>
```

封装 NavLink 组件：由于 NavLink 组件中重复的代码太多，因此进行二次封装

细节点：组件标签的内容会传递到 this.props.children 属性中，反过来通过指定标签的 children 属性可以修改组件标签内容

```jsx
// MyNavLink 组件
import React, { Component } from "react"
import { NavLink } from "react-router-dom"

export default class MyNavLink extends Component {
  render() {
    // this.props.children 可以取到标签内容
    // 反过来通过指定标签的 children 属性可以修改标签内容
    return (
      <NavLink
        activeClassName="demo"
        className="list-group-item"
        {...this.props}
      />
    )
  }
}
```

```jsx
<MyNavLink to="/about">About</MyNavLink>

<MyNavLink to="/home">Home</MyNavLink>
```

## `<Switch>` 的使用

`Switch` 可以提高路由匹配效率，如果匹配成功，则不再继续匹配后面的路由，即单一匹配。

```jsx
// Home组件和Test组件都会渲染
<Route path="/about" component="{About}" />
<Route path="/home" component="{Home}" />
<Route path="/home" component="{Test}" />

// 只会展示 Home 组件
<Switch>
  <Route path="/about" component="{About}" />
  <Route path="/home" component="{Home}" />
  <Route path="/home" component="{Test}" />
</Switch>
```

## 多级路径刷新页面样式丢失的问题

- public/index.html 中 引入样式时不写 ./ 写 `/` （常用）
- public/index.html 中 引入样式时不写 ./ 写 `%PUBLIC_URL%` （常用）
- 使用 HashRouter

```html
<link rel="stylesheet" href="/css/index.css" />

<link rel="stylesheet" href="%PUBLIC_URL%/css/index.css" />
```

## 路由的严格匹配与模糊匹配

- 默认使用模糊匹配（输入的路径必须`包含要匹配的路径`，且输入的路径需要以匹配的路径开头）
- `exact`开启严格匹配：`<Route exact path="/about" component={About}/>`
- 严格匹配需要再开，开启可能会导致无法继续匹配二级路由

## `<Redirect>` 的使用

- 一般写在所有路由注册的最下方，当所有路由都无法匹配时，跳转到 Redirect 指定的路由

```jsx
<Switch>
  <Route path="/about" component="{About}" />
  <Route path="/home" component="{Home}" />
  <Redirect to="/about" />
</Switch>
```

## 嵌套路由

- 注册子路由需写上父路由的 path
- 路由的匹配是按照注册路由的顺序进行的
- 以下案例中：路由跳转到/home/message 的过程
  - 首先在父组件匹配路由，找到了/home 路由，挂载 Home 组件,若开启严格匹配找不到路由
  - 挂载完 Home 组件后，由于 Home 组件`又注册了路由`，继续找，找到了/home/message 路由，挂载 Message 组件

```jsx
// 父组件
<NavLink  to="/about">About</NavLink>
<NavLink  to="/home">Home</NavLink>

<Switch>
  <Route path="/about" component="{About}" />
  <Route path="/home" component="{Home}" />
  <Redirect to="/about" />
</Switch>

// 子组件
<ul className="nav nav-tabs">
  <li>
    <NavLink  to="/home/news">News</NavLink>
  </li>
  <li>
    <NavLink  to="/home/message">Message</NavLink>
  </li>
</ul>

<Switch>
  <Route path="/home/news" component="{News}" />
  <Route path="/home/message" component="{Message}" />
  <Redirect to="/home/news" />
</Switch>
```

## 路由传参

- `params` 和 `search` 参数保存在 URL 地址, 刷新页面或清缓存依然能保存
- `state` 参数保存在`浏览器历史记录`中, 刷新页面依然能保存, 清缓存或打开新的页签参数丢失

### params 传参

```jsx
const id = '02', name = 'zhangsan'

// 路由链接(携带参数)
<Link to='/home/message/detail/01/zyn'>详情</Link>
<Link to={`/home/message/detail/${id}/${name}`}>{name}</Link>
<Link to={pathname: `/home/message/detail/${id}/${name}`}>{name}</Link>

// 注册路由(声明接收)
<Route path='/home/message/detail/:id/:name' component={Detail} />

//接收params参数
const { name, age } = this.props.match.params
```

### search 传参

```jsx
const id = '02', name = 'zhangsan'

// 路由链接(携带参数)
<Link to='/home/message/detail/?id=01&name=zyn'>详情</Link>
<Link to={`/home/message/detail/?id=${id}&name=${name}`}>{name}</Link>
<Link to={{pathname: `/home/message/detail/?id=${id}&name=${name}`}}>{name}</Link>

// 注册路由(无需声明接收)
<Route path='/home/message/detail' component={Detail} />

//接收search参数
import qs from 'querystring'
const { search } = this.props.location // ?id=01&name=zyn
const { id, name } = qs.parse(search.slice(1))
```

```js
import qs from "querystring"
let str = "id=01&name=zyn"
console.log(qs.parse(str)) // { id: '01', name: 'zyn' }

let obj = { id: "01", name: "zyn" }
console.log(qs.stringify(obj)) // "id=01&name=zyn"
```

### state 传参

```jsx
// 路由链接(携带参数)
<Link to={{pathname: '/home/message/detail', state: {id:'01',name:'zyn'}}}>详情</Link>

// 注册路由(无需声明接收)
<Route path='/home/message/detail' component={Detail} />

//接收state参数
const { id, name } = this.props.location.state || {}
```

## push 模式与 replace 模式

- 路由默认打开的是 push 模式，向历史记录栈添加数据

```jsx
// 开启replace模式，替换历史记录栈顶数据
<Link replace to="/home/message/detail">
  详情
</Link>
```

## 编程式导航

编程式导航是使用路由组件 `this.props.history` 提供的 API 进行路由跳转

```js
this.props.history.push(path, state)
this.props.history.replace(path, state)
this.props.history.goForward() // 前进
this.props.history.goBack() // 回退
this.props.history.go(n) // 前进/后退n步
```

```js
// 编程式导航传参
// params模式
this.props.history.push(`/home/message/detail/${id}/${title}`)
// search模式
this.props.history.push(`/home/message/detail?id=${id}&title=${title}`)
// state模式
this.props.history.push(`/home/message/detail`, { id: id, title: title })
```

## withRouter 的使用

withRouter 的作用：加工一般组件，`让其拥有路由组件的 API` ，如 this.props.history.push 等。

```jsx
import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'

class Header extends Component {
  ...
}

export default withRouter(Header)
```

## `<BrowserRouter>` 和 `<HashRouter>` 区别

底层原理不一样：

- `BrowserRouter` 使用的是 H5 的 history API，不兼容 IE9 及以下版本。
- `HashRouter` 使用的是 URL 的哈希值。
  路径表现形式不一样

- `BrowserRouter` 的路径中没有 # ，如：localhost:3000/demo/test
- `HashRouter` 的路径包含#，如：localhost:3000/#/demo/test
  刷新后对路由 state 参数的影响

- `BrowserRouter` 没有影响，因为 state 保存在 history 对象中。
- `HashRouter` 刷新后会导致路由 state 参数的丢失！

备注：`HashRouter` 可以用于解决一些路径错误相关的问题([样式丢失问题](/React/router5.html#多级路径刷新页面样式丢失的问题))。
