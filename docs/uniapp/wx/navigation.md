# 1. 页面导航

## 1.1 声明式导航

[https://developers.weixin.qq.com/miniprogram/dev/component/navigator.html](https://developers.weixin.qq.com/miniprogram/dev/component/navigator.html)

- 页面中声明`<navigation>`导航组件，点击`<navigation>`组件实现页面跳转

### 1.1.1 导航到 tabBar 页面

- 在使用`<navigator>`组件跳转到指定的 `tabBar` 页面时，需要指定 `url` 属性和 `open-type` 属性，其中;

  - url 表示要跳转的`页面的地址`，必须以 `/` 开头
  - open-type 表示`跳转的方式`，必须为 `switchTab`

- 为了简便，在导航到非 tabBar 页面时，`open-type="navigate"`属性`可以省略`

```html
<navigator url="/pages/message/message" open-type="switchTab">
  导航到消息页面
</navigator>
```

### 1.1.2 导航到 非 tabBar 页面

- 在使用`<navigator>`组件跳转到普通的`非tabBar` 页面时，则需要指定 `url` 属性和 `open-type` 属性，其中;
  - url 表示要跳转的页面的地址，必须以 `/` 开头
  - open-type 表示跳转的方式，必须为 `navigate`

```html
<navigator url="/pages/info/info" open-type="navigate"
  >导航到info页面</navigator
>
```

### 1.1.3 后退导航

- 如果要后退到上一页面或多级页面，则需要指定 open-type 属性和 delta 属性，其中:
  - `open-type` 的值必须是 `navigateBack`，表示要进行后退导航
  - `delta` 的值必须是`数字`，表示要`后退的层级`
- 为了简便，如果只是后退到上一页面，则可以省略`delta`属性，因为其`默认值就是1`。

```html
<navigator open-type="navigateBack" delta="1">后退</navigator>
```

## 1.2 编程式导航

- 调用小程序的导航 API，实现页面的跳转

### 1.2.1 导航到 tabBar 页面

[https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.switchTab.html](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.switchTab.html)

- 调用 `wx.switchTab`(Object object)方法，可以跳转到 tabBar 页面。

<img :src="$withBase('/uniapp/wx/04.png')">

```html
<button bindtap="gotoMessage">跳转到message页面</button>
```

```js
Page({
  gotoMessage() {
    wx.switchTab({
      url: "/pages/message/message",
    })
  },
})
```

### 1.2.2 导航到 非 tabBar 页面

[https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.navigateTo.html](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.navigateTo.html)

- 调用`wx.navigateTo`(Object object)方法，可以跳转到非 tabBar 的页面

<img :src="$withBase('/uniapp/wx/05.png')">

```html
<button bindtap="gotoInfo">跳转到info页面</button>
```

```js
Page({
  gotoInfo() {
    wx.navigateTo({
      url: "/pages/info/info",
    })
  },
})
```

### 1.2.3 后退导航

[https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.navigateBack.html](https://developers.weixin.qq.com/miniprogram/dev/api/route/wx.navigateBack.html)

- 调用 `wx.navigateBack`(Object object)方法，可以返回上一页面或多级页面。

<img :src="$withBase('/uniapp/wx/06.png')">

```html
<button bindtap="goBack">后退</button>
```

```js
Page({
  goBack() {
    wx.navigateBack()
  },
})
```

## 1.3. 导航传参

### 1.3.1 声明式导航传参

- `navigator` 组件的 url 属性用来指定将要跳转到的页面的路径。同时，路径的后面还可以携带参数
  - `参数`与`路径`之间使用`?`分隔
  - `参数键`与`参数值`用`=`相连
  - `不同参数`用`&`分隔

```html
<navigator url="/pages/info/info?name=zs&age=20">导航到info页面</navigator>
```

### 1.3.2 编程式导航传参

- 调用 `wx.navigateTo`(Object object)方法跳转页面时，也可以携带参数

```html
<button bindtap="gotoInfo2">跳转到info页面</button>
```

```js
Page({
  gotoInfo2() {
    wx.navigateTo({
      url: "/pages/info/info?name=ls&age=20",
    })
  },
})
```

### 1.3.3 在 onLoad 中接收导航参数

- 通过`声明式导航传参`或`编程式导航传参`所携带的参数，可以直接在`onLoad`事件中直接获取到

```js
Page({
  data: {
    query: {},
  },
  onLoad(options) {
    // options 就是参数对象
    console.log(options)
    this.setData({
      query: options,
    })
  },
})
```
