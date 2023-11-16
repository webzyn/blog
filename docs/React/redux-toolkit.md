# redux-toolkit

[参考](https://juejin.cn/post/7101688098781659172?searchId=20230919195829AC82DC3D21D71C18620D)

## 安装

```shell
yarn add @reduxjs/toolkit react-redux
```

## 目录结构

```
- store
  - festures 存放所有store
    - counter.ts
    - user.ts
  - index.ts store入口文件
```

## 创建仓库

- `index.ts`

```js{9-25}
import { configureStore } from '@reduxjs/toolkit'
import userSlice from './festures/user'
import counterSlice from './festures/counter'

// 从本地存储中加载之前的状态
const savedState = localStorage.getItem('user')

// configureStore创建一个redux数据
const store = configureStore({
  // 合并多个Slice
  reducer: {
    user: userSlice,
    counter: counterSlice
  },
  // 从本地存储中加载之前的状态
  preloadedState: {
    user: savedState ? JSON.parse(savedState) : undefined
  }
})

// 状态更新时保存到本地存储
store.subscribe(() => {
  const { user } = store.getState()
  localStorage.setItem('user', JSON.stringify(user))
})

export default store
```

- `counter.ts`

```js
import { createSlice } from '@reduxjs/toolkit'

export interface CounterState {
  value: number
  title: string
}

const savedState = localStorage.getItem('a')
const initialState: CounterState = {
  // 本地读取
  value: savedState ? JSON.parse(savedState) : 0,
  title: 'redux toolkit pre'
}

// 创建一个 Slice
export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  // 定义 reducers 并生成关联的操作
  reducers: {
    // 定义一个加的方法
    increment: (state) => {
      state.value += 1
      // 保存到本地
      localStorage.setItem('a', JSON.stringify(state.value))
    },
    // 定义一个减的方法
    decrement: (state) => {
      localStorage.setItem('a', JSON.stringify(state.value))
      state.value -= 1
    }
  }
})
// 导出加减的方法
export const { increment, decrement } = counterSlice.actions

// 默认导出
export default counterSlice.reducer

```

- `user.ts`

```ts
import { createSlice } from '@reduxjs/toolkit'

export interface User {
  id: number
  name: string
}
interface IAction {
  type: string
  payload: {
    id: number
    name: string
  }
}

const initialState: User = {
  id: -1,
  name: ''
}

// 创建一个 Slice
export const userSlice = createSlice({
  name: 'user',
  initialState,
  // 定义 reducers 并生成关联的操作
  reducers: {
    setUser: (state, action: IAction) => {
      const { type, payload } = action
      return {
        ...state,
        ...payload
      }
    }
  }
})
// 导出加减的方法
export const { setUser } = userSlice.actions

// 默认导出
export default userSlice.reducer
```

## 使用 store

- `index.tsx`

```jsx{4,5,13,15}
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import store from 'store'
import { Provider } from 'react-redux'

import App from './App'


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
)
```

- 页面使用

```tsx
import { useDispatch } from 'react-redux/es/exports'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { setUser } from 'store/festures/user'

export default function DiscoveringMusic() {
  const user = useSelector((store: any) => store.user) // 获取store
  const dispatch = useDispatch()
  const click = () => {
    dispatch(setUser({ id: 90, name: '张三' }))
  }
  return (
    <div>
      <button onClick={click}>按钮</button>
    </div>
  )
}
```
