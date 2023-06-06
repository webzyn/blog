# 全局数据共享

<span style="color: red">全局数据共享</span>（又叫做:状态管理）是为了解决<span style="color: red">组件之间数据共享</span>的问题。开发中常用的全局数据共享方案有:Vuex、Redux、MobX 等。

## 1.小程序中的全局数据共享方案

在小程序中，可使用 <span style="color: red">mobx-miniprogram</span> 配合 <span style="color: red">mobx-miniprogram-bindings</span> 实现全局数据共享。其中:

- mobx-miniprogram 用来<span style="color: red">创建 Store 实例对象</span>
- mobx-miniprogram-bindings 用来<span style="color: red">把 Store 中的共享数据或方法，绑定到组件或页面中使用</span>

[https://developers.weixin.qq.com/miniprogram/dev/platform-capabilities/extended/utils/computed.html](https://developers.weixin.qq.com/miniprogram/dev/platform-capabilities/extended/utils/computed.html)

### 1.1 安装 MobX 相关的包

```shell
npm install --save mobx-miniprogram@4.13.2 mobx-miniprogram-bindings@1.2.1
```

- 安装完需要删除 miniprogram_npm 目录后，重新构建 npm

### 1.2 创建 MobX 的 Store 实例

- 项目根目录新建文件夹 store，新建文件 store.js

```js
// /store/store.js
// 在这个js文件中，专门来创建 Store的实例对象
import { observable, action } from "mobx-miniprogram"

export const store = observable({
  // 数据字段
  numA: 1,
  numB: 2,
  // 计算属性
  get sum() {
    return this.numA + this.numB
  },
  // axtions 方法，用来修改 store 中的数据
  updateNum1: action(function (step) {
    this.numA += step
  }),
  updateNum2: action(function (step) {
    this.numB += step
  }),
})
```

### 1.3 将 Store 中的成员绑定到页面中

```js
// 页面的.js文件
import { createStoreBindings } from "mobx-miniprogram-bindings"
import { store } from "../../store/store"
Page({
  onLoad(options) {
    // 创建store
    this.storeBindings = createStoreBindings(this, {
      // 数据源
      store,
      // 需要使用的字段和计算属性
      fields: ["numA", "numB", "sum"],
      // 需要使用的方法
      actions: ["updateNum1"],
    })
  },
  onUnload() {
    // 卸载store
    this.storeBindings.destroyStoreBindings()
  },
})
```

### 1.4 在页面中使用 Store 中的成员

```html
<!-- wxml结构 -->
<view>{{numA}} + {{numB}} = {{sum}}</view>
<van-button type="primary" bindtap="changeNumA" data-step="{{ 1 }}"
  >numA + 1</van-button
>
<van-button type="danger" bindtap="changeNumA" data-step="{{ -1 }}"
  >numA - 1</van-button
>
```

```js
// 页面的.js文件
// 绑定步骤 略... 见1.3
Page({
  changeNumA(e) {
    this.updateNum1(e.target.dataset.step)
  },
})
```

### 1.5 将 Store 中的成员绑定到组件中

```js
// components/numbers/numbers.js
import { storeBindingsBehavior } from "mobx-miniprogram-bindings"
import { store } from "../../store/store"

Component({
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    // 数据源
    store,
    // 需要绑定的字段
    fields: {
      numA: () => store.numA, // 第一种方式
      numB: (store) => store.numB, // 第二种
      sum: "sum", // 第三种
    },
    // 要绑定的方法
    actions: {
      updateNum2: "updateNum2",
    },
  },
})
```

### 1.6 在组件中使用 Store 中的成员

```html
<!-- 自定义组件的 wxml结构 -->
<view>{{numA}} + {{numB}} = {{sum}}</view>
<van-button type="primary" bindtap="changeNumB" data-step="{{ 1 }}"
  >numB + 1</van-button
>
<van-button type="danger" bindtap="changeNumB" data-step="{{ -1 }}"
  >numB - 1</van-button
>
```

```js
// 组件的.js文件
// 绑定步骤 略... 见1.5

Component({
  methods: {
    changeNumB(e) {
      this.updateNum2(e.target.dataset.step)
    },
  },
})
```
