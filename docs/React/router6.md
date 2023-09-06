# React Router 6

## 概述

`React Router` 发布了三个不同的包：

- `react-router`：路由核心库，提供许多组件、钩子
- `react-router-dom`：包括了 `react-router` 所有内容，同时添加了用于 DOM 的组件，如 `<BrowserRouter>`
- `react-router-native`：包括了 `react-router` 所有内容，同时添加了用于 ReactNative 的 API，如 `<NativeRouter>`

与 React Router 5.x 版本的区别：

- 内置组件的变化：移除 `<Switch/>`，新增 `<Routes/>`等
- 语法变化：`component={About}` 变成 `element={<About/>}`等
- 新增 hook：`useParams`、`useNavigate`、`useMatch` 等
- **官方明确表示推荐使用函数式组件**

## 基本使用

安装 React Router 6

```shell
npm install react-router-dom

yarn add react-router-dom
```

使用

```jsx
import { NavLink, Routes, Route } from "react-router-dom"
import About from "./components/About/About"
import Home from "./components/Home/HellHomeo"

// React 18 默认使用函数式组件
export default function App() {
  return (
    <div>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/Home">Home</NavLink>
      <hr />
      <Routes>
        <Route path="/about" element={<About />}></Route>
        <Route path="/Home" element={<Home />}></Route>
      </Routes>
    </div>
  )
}
```

## ----Component----

- `<BrowserRouter>`
- `<HashRouter>`
- `<Routes>`
- `<Route>`
- `<Link>`
- `<NavLink>`
- `<Navigate>`
- `<Outlet>`

## `<BrowserRouter>`

- `<BrowserRouter>` 用于包裹整个应用
- 用法与 5.x 一样

## `<HashRouter>`

- 作用与 `<BrowserRouter>` 一样，但 `<HashRouter>` 修改的是地址栏的 hash 值
- 用法与 5.x 一样

## `<Routes>`替换`<Switch>`

- 6.x 移除了 `<Switch>`，引入了新的替代者：`<Routes>`
- `<Routes>` 和 `<Route>` 要配合使用，且必须要用 `<Routes>` 包裹 `<Route>`

```jsx
<Routes>
  <Route path="/about" element={<About />}></Route>
</Routes>
```

## `<Route>`

- `component={About}` 改为了 `element={<About/>}`
- `<Route caseSensitive>` 属性用于指定：匹配时是否区分大小写（默认为 false）
- `<Route>` 也可以嵌套使用，且可配合`useRoutes()`配置 “路由表” ，但需要通过 `<Outlet>` 组件来渲染其子路由

```jsx{2-3,5-10,12-15}
<Routes>
  {/*path属性用于定义路径，element属性用于定义当前路径所对应的组件*/}
  <Route path="/login" element={<Login />}></Route>

  {/*用于定义嵌套路由，home是一级路由，对应的路径/home*/}
  <Route path="home" element={<Home />}>
    {/*test1 和 test2 是二级路由,对应的路径是/home/test1 或 /home/test2*/}
    <Route path="test1" element={<Test />}></Route>
    <Route path="test2" element={<Test2 />}></Route>
  </Route>

  {/*Route也可以不写element属性, 这时就是用于展示嵌套的路由 .所对应的路径是/users/xxx*/}
  <Route path="users">
    <Route path="xxx" element={<Demo />} />
  </Route>
</Routes>
```

## `<Navigate>` 重定向

- 只要 `<Navigate>` 组件被渲染，就会修改路径，切换视图。可用于路由重定向。
- `replace` 属性用于控制跳转模式（push 或 replace，默认是 push）

```jsx{14-15}
import { NavLink, Routes, Route, Navigate } from "react-router-dom"
import About from "./components/About/About"
import Hello from "./components/Hello/Hello"

export default function App() {
  return (
    <div>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/hello">Hello</NavLink>
      <hr />
      <Routes>
        <Route path="/about" element={<About />}></Route>
        <Route path="/hello" element={<Hello />}></Route>
        {/* 匹配到路径 / 后，渲染 Navigate 组件，再修改路径 */}
        <Route path="/" element={<Navigate to="/about" />}></Route>
      </Routes>
    </div>
  )
}
```

```jsx{10-15}
import React, { useState } from "react"
import { Navigate } from "react-router-dom"

export default function Home() {
  const [sum, setSum] = useState(1)
  return (
    <div>
      <h1>Home</h1>
      {/* 根据sum的值决定是否切换视图 */}
      {sum === 1 ? (
        <h4>sum的值为{sum}</h4>
      ) : (
        {/* 渲染 Navigate组件，修改路径 */}
        <Navigate to="/about" replace={true} />
      )}
      <button onClick={() => setSum(2)}>将sum变为 2</button>
    </div>
  )
}
```

## `<Link>`

- 修改 URL，且不发送网络请求（路由链接）

```jsx
<Link to="/about">About</Link>
```

## `<NavLink>`

- 实现导航的 “高亮” 效果，6.x 版本不能直接指定高亮类名，需要通过函数返回。该函数传入一个对象，类似于 `{isActive: true}` 标识路由是否被激活。

- 默认情况下，当 Home 的子组件匹配成功，Home 的导航也会高亮，end 属性可移除该效果。

```jsx
// NavLink 默认类名是 active，下面是指定自定义类名

//自定义样式
<NavLink
    to="login"
    className={({ isActive }) => isActive ? 'base MyClass' : 'base'}
>about</NavLink>

// 默认情况下，当 Home 的子组件匹配成功，Home 的导航也会高亮
// 当 NavLink 上添加了 end 属性后，若 Home 的子组件匹配成功，则 Home 的导航没有高亮效果。
<NavLink to="home" end >home</NavLink>
```

## `<Outlet>` 嵌套路由

当`<Route>`产生嵌套时，渲染其对应的后续子路由(类似 vue 中`<router-view />`)

- 用法 1： 使用路由表的嵌套路由

```js
// 路由表
const routes = [
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/home",
    element: <Home />,
    children: [
      {
        path: "news",
        element: <News />,
      },
      {
        path: "message",
        element: <Message />,
      },
    ],
  },
  {
    path: "/",
    element: <Navigate to="/about" />,
  },
]
```

```jsx{11-12}
// Home 子组件
import React, { Fragment } from "react"
import { NavLink, Outlet } from "react-router-dom"

export default function Home() {
  return (
    <Fragment>
      <NavLink to="news">News</NavLink>
      <NavLink to="message">Message</NavLink>
      <hr />
      {/* 指定路由组件呈现的位置 */}
      <Outlet></Outlet>
    </Fragment>
  )
}
```

- 用法 2：不使用路由表的嵌套路由-分离式

```jsx
// App.jsx
export default function App() {
  render (
    <div>
      <div>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/home">Home</NavLink>
      </div>

      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Navigate to="about" />} />
      </Routes>
    </div>
  )
}

// Home.jsx
export default function App() {
  render (
    <div>
      <div>
        <NavLink to="news">News</NavLink>
        <NavLink to="message">Message</NavLink>
        <NavLink to="test">Test</NavLink>
      </div>

      <Routes>
        <Route path="news" element={<News />} />
        <Route path="./message" element={<Message />} />
        <Route path="/home/test" element={<Test />} />

        <Route path="/" element={<Navigate to="news" />} />
      </Routes>

    </div>
  )
}
```

- 用法 3：不使用路由表的嵌套路由-集合式

```jsx{12-16,33}
// App.jsx
export default function App() {
  render (
    <div>
      <div>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/home">Home</NavLink>
      </div>

      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/home" element={<Home />}>
          <Route path="news" element={<News />} />
          <Route path="./message" element={<Message />} />
          <Route path="/home/test" element={<Test />} />
        </Route>
        <Route path="/" element={<Navigate to="about" />} />
      </Routes>
    </div>
  )
}

// Home.jsx
export default function App() {
  render (
    <div>
      <div>
        <NavLink to="news">News</NavLink>
        <NavLink to="message">Message</NavLink>
        <NavLink to="test">Test</NavLink>
      </div>

      <Outlet />
    </div>
  )
}
```

## 路由传参

### 传递 params 参数

- 注册路由(声明接收)

```jsx{7,26-28,43}
// 嵌套路由用法2 略

// 不使用路由表 => 参考嵌套路由用法3
<Routes>
  <Route path="home" element={<Home />}>
    <Route path="message" element={<Message />}>
      <Route path="detail/:id/:name" element={<Detail />} />
    </Route>
  </Route>
</Routes>

// 使用路由表 => 参考嵌套路由用法1
export default [
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/home",
    element: <Home />,
    children: [
      {
        path: "message",
        element: <Message />,
        children: [
          {
            path: "detail/:id/:name",
            element: <Detail />,
          },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <Navigate to="/about" />,
  },
]
export default function Message() {
  return (
    <Fragment>
      <h2>我是Message</h2>
      <Outlet></Outlet>
    </Fragment>
  )
}
```

- 路由链接(携带参数)

```jsx{17,22}
const id = '02', name = 'zhangsan'
<Link to='detail/01/zyn'>详情</Link>
<Link to={`detail/${id}/${name}`}>{name}</Link>
<Link to={pathname: `detail/${id}/${name}`}>{name}</Link>
```

- 使用 `useParams()` 接收 `params` 参数。`useParams()` 返回一个参数对象

```jsx{7}
// Detail.jsx
import React from "react"
import { useParams, useMatch } from "react-router-dom"
export default function Detail() {
  // 解构赋值
  const { id, name, age } = useParams()
  return (
    <div>
      <li>id:{id}</li>
      <li>name:{name}</li>
      <li>age:{age}</li>
    </div>
  )
}
```

### 传递 search 参数

- 注册路由

```jsx
// 标签
<Route path="detail" element={<Detail />} />

// 路由表
{
  path: 'detail',
  element: <Detail />
}
```

- 传递参数

```jsx
<Link to={`detail?id=001&name=zs&age=20`}>zs</Link>
```

- 使用 `useSearchParams()` 接收参数。该方法返回一个包含两个元素的数组：`search 参数`和`修改 search 参数的方法`

```jsx{5-7,11}
import React from "react"
import { useSearchParams } from "react-router-dom"

export default function Detail() {
  const [search, setSearch] = useSearchParams()
  const id = search.get("id")
  const name = search.get("name")
  return (
    <ul>
      <li>
        <button onClick={() => setSearch("id=008&name=哈哈")}>
          点我更新一下收到的search参数
        </button>
      </li>
      <li>消息编号：{id}</li>
      <li>消息标题：{name}</li>
    </ul>
  )
}
```

### 传递 state 参数

- 注册路由

```jsx
<Route path="detail" element={<Detail />} />

{
  path: 'detail',
  element: <Detail />
}
```

- 传递参数，这里相较于 5.x 版本有所不同，不必写到一个对象里面

```jsx
<Link to="detail" state={{ id: "001", name: "张三", age: 20 }}>
  张三
</Link>
```

- 使用 `useLocation()` 接收参数。该方法返回路由组件的 `location` 对象，就是 5.x 版本路由组件的 location 属性，其中包含 `state` 参数

```jsx
import { useLocation } from "react-router-dom"

export default function Detail() {
  // 连续解构赋值
  const {
    state: { id, name },
  } = useLocation()

  return (
    <div>
      <li>id:{id}</li>
      <li>name:{name}</li>
    </div>
  )
}
```

## ----Hooks----

- useRoutes()
- useNavigate()
- useParams()
- useSearchParams()
- useLocation()
- useMatch()
- useInRouterContext()
- useNavigationType()
- useOutlet()
- useResolvedPath()

## useRoutes()

- 根据路由表，动态创建`<Routes>`和`<Route>`

```js
//路由表配置：src/routes/index.js
import About from "../pages/About"
import Home from "../pages/Home"
import { Navigate } from "react-router-dom"

export default [
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/",
    element: <Navigate to="/about" />,
  },
]
```

```jsx
//App.jsx
import { NavLink, useRoutes } from "react-router-dom"
// 引入路由表
import routes from "./routes"

export default function App() {
  //根据路由表生成对应的路由规则
  const element = useRoutes(routes)
  return (
    <div>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/home">Home</NavLink>
      <hr />
      {/* 注册路由 */}
      {element}
    </div>
  )
}
```

## useParams()

返回当前匹配路由的`params`参数，类似于 5.x 中的`match.params`

```jsx
import React from "react"
import { Routes, Route, useParams } from "react-router-dom"
import User from "./pages/User.jsx"

function ProfilePage() {
  // 获取URL中携带过来的params参数
  let { id } = useParams()
}

function App() {
  return (
    <Routes>
      <Route path="users/:id" element={<User />} />
    </Routes>
  )
}
```

## useMatch()

返回当前匹配信息，对标 5.x 中的路由组件的`match`属性

```jsx
<Route path="/login/:page/:pageSize" element={<Login />}/>
<NavLink to="/login/1/10">登录</NavLink>

export default function Login() {
  const match = useMatch('/login/:x/:y')
  console.log(match) //输出match对象
  //match对象内容如下：
  /*
  	{
      params: {x: '1', y: '10'}
      pathname: "/LoGin/1/10"
      pathnameBase: "/LoGin/1/10"
      pattern: {
      	path: '/login/:x/:y',
      	caseSensitive: false,
      	end: false
      }
    }
  */
  return (
  	<div>
      <h1>Login</h1>
    </div>
  )
}
```

## useSearchParams()

- 作用：用于读取和修改当前位置的 URL 中的`查询字符串`。
- 返回一个包含两个值的数组，内容分别为：当前的 `seaech 参数`、`更新 search 的函数`

```jsx{5-7,11}
import React from "react"
import { useSearchParams } from "react-router-dom"

export default function Detail() {
  const [search, setSearch] = useSearchParams()
  const id = search.get("id")
  const name = search.get("name")
  return (
    <ul>
      <li>
        <button onClick={() => setSearch("id=008&name=哈哈")}>
          点我更新一下收到的search参数
        </button>
      </li>
      <li>消息编号：{id}</li>
      <li>消息标题：{name}</li>
    </ul>
  )
}
```

## useLocation()

- 获取当前 location 信息，对标 5.x 中的路由组件的`location`属性

```jsx{5,9-15}
import React from "react"
import { useLocation } from "react-router-dom"

export default function Detail() {
  const x = useLocation()
  console.log("@", x)
  /*
    x就是location对象
      {
        hash: "",
        key: "ah9nv6sz",
        pathname: "/login",
        search: "?name=zs&age=18",
        state: {a: 1, b: 2}
      }
	*/
  return <div></div>
}
```

## useNavigate() 编程式路由导航

- `useNavigate()` 返回一个函数，调用该函数实现编程式路由导航。
- 函数有两种参数传递方式
  - 第一种方式传递两个参数：`路由`和`配置对象`。配置对象只能设置 `replace` 和 `state`。想要传递 params 和 search 参数直接在路由带上
  - 第二种方式传递数字，代表前进或后退几步

```jsx{14-21,24-26}
import React, { useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"

export default function Message() {
  const [list] = useState([
    { id: 1, name: "JavaScript", age: 18 },
    { id: 2, name: "Vue", age: 19 },
    { id: 3, name: "React", age: 20 },
  ])

  const navigate = useNavigate()

  function showDetail(item) {
    navigate("detail", {
      replace: true,
      state: {
        id: item.id,
        name: item.name,
        age: item.age,
      },
    })
  }

  function back() {
    navigate(1)
  }

  function forward() {
    navigate(-1)
  }

  return (
    <div>
      <ul>
        {list.map((item) => {
          return (
            <li key={item.id}>
              <button onClick={() => showDetail(item)}>查看详情</button>
              <button onClick={back}>后退</button>
              <button onClick={forward}>前进</button>
            </li>
          )
        })}
      </ul>
      <Outlet></Outlet>
    </div>
  )
}
```

## useInRouterContext()

- 如果组件在 `<Router>` 的上下文中呈现，则 `useInRouterContext`函数 返回 `true`，否则返回 `false`
- 即组件有没有被包裹在 `<BrowserRouter>` 这种东西里面。这个对第三方组件库有用处

## useNavigationType()

- 返回当前的`导航类型`（用户是如何来到当前页面的）
- 返回值：`POP`、`PUSH`、`REPLACE`。
  - `POP` 是指在浏览器中直接打开了这个路由组件（刷新页面）

## useOutlet()

- 用来呈现当前组件中渲染的嵌套路由

```js
const result = useOutlet()
console.log(result)
// 如果嵌套路由没有挂载,则返回 null
// 如果嵌套路由已经挂载,则展示嵌套的路由对象
```

## useResolvedPath()

- 给定一个 URL 值，解析其中的：`path`、`search`、`hash` 值

```js
const res = useResolvedPath("/user?id=001&name=zs#React")
console.log(res)

/*
  {
    hash: '#React',
    pathname: '/user',
    search: '?id=001&name=zs'
  }
*/
```
