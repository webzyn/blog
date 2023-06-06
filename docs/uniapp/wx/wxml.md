# wxml

## 1. 事件相关

[https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/event.html](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/event.html)

### 1.1 事件处理函数传递参数

```html
<button type="warn" bindtap="btnTap2" data-info="{{2}}">+2</button>
```

```js
Page({
  data: {
    count: 0,
  },
  btnTap2(e) {
    console.log(e)
    this.setData({
      count: this.data.count + e.target.dataset.info,
    })
  },
})
```

### 1.2 input 双向绑定

```html
<input type="text" value="{{ msg }}" bindinput="changeMsg" />
```

```js
Page({
  data: {
    msg: "你好",
  },
  changeMsg(e) {
    this.setData({
      msg: e.detail.value,
    })
  },
})
```

## 2. 条件渲染

[https://developers.weixin.qq.com/miniprogram/dev/reference/wxml/conditional.html](https://developers.weixin.qq.com/miniprogram/dev/reference/wxml/conditional.html)

### 2.1 wx:if、wx:elif、wx:else 相当于 v-if

```js
Page({
  data: {
    type: "1",
  },
})
```

```html
<view wx:if="{{type === '1'}}">男</view>
<view wx:elif="{{ type === '2' }}">女</view>
<view wx:else="">保密</view>
```

### 2.2 block 相当于 vue 中的 template

- `<block/>` 并不是一个组件，它仅仅是一个包装元素，不会在页面中做任何渲染，只接受控制属性。

```html
<block wx:if="{{type === '2'}}">
  <view>1</view>
  <view>2</view>
</block>
```

### 3.3 hidden 相当于 v-show

- 控制的是 display: none/block

```html
<view>
  <!-- 隐藏 -->
  <view hidden="{{ true }}">1</view>
  <!-- 显示 -->
  <view hidden="{{ false }}">2</view>
</view>
```

## 3.条件渲染

[https://developers.weixin.qq.com/miniprogram/dev/reference/wxml/list.html](https://developers.weixin.qq.com/miniprogram/dev/reference/wxml/list.html)

### 3.1 wx:for

- wx:for-item 指定数组当前元素的变量名，
- wx:for-index 指定数组当前下标的变量名：

```js
Page({
  data: {
    arr: ["苹果", "华为", "小米"],
    userList: [
      { id: 1, name: "小红" },
      { id: 2, name: "小黄" },
      { id: 3, name: "小蓝" },
    ],
  },
})
```

```html
<view wx:for="{{arr1}}" wx:key="index">{{index}} - {{item}}</view>

<view wx:for="{{arr1}}" wx:for-index="i" wx:for-item="val" wx:key="i">
  {{i}} - {{val}}
</view>
```

### 3.2 block wx:for

```html
<block wx:for="{{[1, 2, 3]}}">
  <view> {{index}}: </view>
  <view> {{item}} </view>
</block>
```

### 3.3 wx:key 唯一标识

```html
<view wx:for="{{userList}}" wx:key="id">{{item.name}}</view>
```

## 4. 模板与引用

### 4.1 模板

[https://developers.weixin.qq.com/miniprogram/dev/reference/wxml/template.html](https://developers.weixin.qq.com/miniprogram/dev/reference/wxml/template.html)

- WXML 提供模板（template），可以在模板中定义代码片段，然后在不同的地方调用
- 模板拥有自己的作用域，只能使用 data 传入的数据以及模板定义文件中定义的 `<wxs />` 模块

```html
<template name="test">
  <view>test</view>
</template>

<!-- 将模板内容渲染两次 -->
<template is="test"></template>
<template is="test"></template>
```

### 4.2 引用

[https://developers.weixin.qq.com/miniprogram/dev/reference/wxml/import.html](https://developers.weixin.qq.com/miniprogram/dev/reference/wxml/import.html)

**import**

- `import` 可以在该文件中使用目标文件定义的 `template`

  - 声明模板

  ```html
  <!-- index/item.wxml -->
  <template name="item">
    <text>{{ data }}</text>
  </template>
  ```

  - 使用模板

  ```html
  <!-- index/index.wxml -->
  <!-- 引入模板文件 -->
  <import src="item.wxml" />
  <!-- 使用模板 -->
  <template is="item" data="{{data: '数据'}}" />
  ```

  **include**

- `include` 可以将目标文件除了 `<template/>` `<wxs/>` 外的整个代码引入，相当于是拷贝到 `include` 位置

```html
<!-- index.wxml -->
<include src="header.wxml" />
<view> body </view>
<include src="footer.wxml" />
```

```html
<!-- header.wxml -->
<view> header </view>
```

```html
<!-- footer.wxml -->
<view> footer </view>
```
