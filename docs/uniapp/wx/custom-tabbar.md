# 自定义 tabbar

## 1. 实现步骤

自定义 tabBar 分为 3 大步骤，分别是:

- ① 配置信息
- ② 添加 tabBar 代码文件
- ③ 编写 tabBar 代码

[https://developers.weixin.qq.com/miniprogram/dev/framework/ability/custom-tabbar.html](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/custom-tabbar.html)

### 1.1 开启 custom: true

在 app.json 中的 tabBar 项指定 custom 字段，同时其余 tabBar 相关配置也补充完整

<img :src="$withBase('/uniapp/wx/20.png')">

### 1.2 添加 tabBar 代码文件

在项目根目录创建文件夹 `custom-tab-bar`, 新建组件 index

<img :src="$withBase('/uniapp/wx/21.png')">

### 1.3 编写 tabBar 代码

[https://vant-contrib.gitee.io/vant-weapp/#/tabbar](https://vant-contrib.gitee.io/vant-weapp/#/tabbar)

```json
{
  "component": true,
  "usingComponents": {
    "van-tabbar": "@vant/weapp/tabbar/index",
    "van-tabbar-item": "@vant/weapp/tabbar-item/index"
  }
}
```

```html
<!--custom-tab-bar/index.wxml-->
<van-tabbar active="{{ active }}" bind:change="onChange" active-color="#13a7a0">
  <van-tabbar-item
    wx:for="{{list}}"
    wx:key="index"
    info="{{ item.info ? item.info : '' }}">
    <image
      slot="icon"
      src="{{ item.iconPath }}"
      mode="aspectFit"
      style="width: 25px; height: 25px;" />
    <image
      slot="icon-active"
      src="{{ item.selectedIconPath }}"
      mode="aspectFit"
      style="width: 25px; height: 25px;" />
    {{ item.text }}
  </van-tabbar-item>
</van-tabbar>
```

```css
/* custom-tab-bar/index.wxss */
.van-tabbar-item {
  /* 防止角标溢出 */
  --tabbar-item-margin-bottom: 0;
}
```

```js
// custom-tab-bar/index.js
import { storeBindingsBehavior } from "mobx-miniprogram-bindings"
import { store } from "../store/store"

Component({
  options: {
    // 在自定义组件中使用样式覆盖
    styleIsolation: "shared",
  },
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    store,
    fields: {
      sum: "sum",
      active: "activeTabbarIndex",
    },
    actions: {
      updateActiveTabbarIndex: "updateActiveTabbarIndex",
    },
  },
  observers: {
    sum: function (val) {
      this.setData({
        "list[1].info": val,
      })
    },
  },
  data: {
    list: [
      {
        pagePath: "/pages/home/home",
        text: "首页",
        iconPath: "/image/home.png",
        selectedIconPath: "/image/home-active.png",
      },
      {
        pagePath: "/pages/message/message",
        text: "消息",
        iconPath: "/image/message.png",
        selectedIconPath: "/image/message-active.png",
        info: 2,
      },
      {
        pagePath: "/pages/contact/contact",
        text: "联系我们",
        iconPath: "/image/contact.png",
        selectedIconPath: "/image/contact-active.png",
      },
    ],
  },
  methods: {
    onChange(event) {
      // event.detail 的值为当前选中项的索引
      // this.setData({ active: event.detail });
      // 当前选中页进行全局管理
      this.updateActiveTabbarIndex(event.detail)
      // 页面跳转
      wx.switchTab({
        url: this.data.list[event.detail].pagePath,
      })
    },
  },
})
```

```js
// store/store.js 管理全局数据
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
  activeTabbarIndex: 0,
  // axtions 方法，用来修改 store 中的数据
  updateNum1: action(function (step) {
    this.numA += step
  }),
  updateNum2: action(function (step) {
    this.numB += step
  }),
  updateActiveTabbarIndex: action(function (index) {
    this.activeTabbarIndex = index
  }),
})
```
