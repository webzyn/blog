# wxs

[https://developers.weixin.qq.com/miniprogram/dev/reference/wxs/](https://developers.weixin.qq.com/miniprogram/dev/reference/wxs/)

`WXS` ( WeiXin Script〉是`小程序独有的一套脚本语言`，结合 WXML，可以构建出页面的结构

## 应用场景

<span style='color: red'>wxml 中无法调用在页面的.js 中定义的函数</span>，但是，wxml 中可以调用 wxs 中定义的函数。因此，小程序中 wxs 的典型应用场景就是<span style='color: red'>“过滤器”</span>。

## wxs 和 JavaScript 的关系

虽然 wxs 的语法类似于 JavaScript，但是 wxs 和 JavaScript 是完全不同的两种语言:wxs

- <span style='color: red'>① 有自己的数据类型</span>
  - number 数值类型、string 字符串类型、boolean 布尔类型、object 对象类型、function 函数类型、array 数组类型、date 日期类型、regexp 正则
- <span style='color: red'>② wxs 不支持类似于 ES6 及以上的语法形式</span>
  - 不支持: let、const、解构赋值、展开运算符、箭头函数、对象属性简写...
  - 支持: var 定义变量、普通 function 函数等类似于 ES5 的语法
- <span style='color: red'>③ wxs 遵循 CommonJS 规范</span>
  - module 对象
  - require()函数
  - module.exports 对象

## 使用

### 内联 wxs

```html
<text>{{ m1.toUpper('pages/message/message.wxml') }}</text>

<wxs module="m1">
  module.exports.toUpper = function(str) { return str.toUpperCase() }
</wxs>
```

### 外联 wxs 脚本

```html
<view>{{ m2.toLower('CHINA') }}</view>

<!-- 必须是相对路劲 -->
<wxs src="../../utils/tools.wxs" module="m2"></wxs>
```

```js
// utils/tools.wxs
function toLower(str) {
  return str.toLowerCase()
}

module.exports = {
  toLower: toLower,
}
```

### wxs 的特点

1. 与 JavaScript 不同

- 为了降低 wxs ( Weixin Script)的学习成本,wxS 语言在设计时借大量鉴了 JavaScript 的语法。但是本质上,wxs 和 JavaScript 是完全不同的两种语言!

2. 不能作为组件的事件回调

- wxs 典型的应用场景就是“`过滤器`”，经常配合 `Mustache` 语法进行使用
- 但是，在 wxs 中定义的函数`不能作为组件的事件回调函数`

3. 隔离性

- 隔离性指的是 wxs 的运行环境和其他 JavaScript 代码是隔离的。体现在如下两方面
  - wxs 不能调用 js 中定义的函数
  - wxs 不能调用小程序提供的 API

4. 性能好

- 在 iOS 设备上，小程序内的 wXS 会比 JavaScript 代码快 2~20 倍
- 在 android 设备上，二者的运行效率无差异
