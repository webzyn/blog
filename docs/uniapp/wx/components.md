# 自定义组件

[[toc]]

[https://developers.weixin.qq.com/miniprogram/dev/reference/api/Component.html](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Component.html)

[https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/)

## 1. 创建组件

- ① 在项目的根目录中，鼠标右键，创建 components -> test 文件夹
- ② 在新建的 components -> test 文件夹上，鼠标右键，点击“新建 Component"
- ③ 键入组件的名称之后回车，会自动生成组件对应的 4 个文件，后缀名分别为.js，.json，.wxml 和.wxsS

## 2. 引用组件

- 局部引用:组件只能在当前被引用的页面内使用
- 全局引用:组件可以在每个小程序页面中使用

### 2.1 局部引用

- 在页面的.json 配置文件中引用组件的方式，叫做“局部引用”

```json
{
  "usingComponents": {
    "my-test1": "/components/test/test"
  }
}
```

### 2.2 全局引用

- 在 app.json 全局配置文件中引用组件的方式，叫做“全局引用”

## 3. 组件与页面的区别

从表面来看，组件和页面都是由.js、.json、.wxml 和.wxss 这四个文件组成的。但是，组件和页面的.js 与.json 文件有明显的不同:

- 组件的.json 文件中需要声明<span style="color: red">"component": true</span> 属性
- 组件的.js 文件中调用的是 <span style="color: red">Component()</span>函数
- 组件的事件处理函数需要定义到 <span style="color: red">methods</span> 节点中

## 4. 样式

### 4.1 组件样式隔离

默认情况下，自定义组件的样式只对当前组件生效，不会影响到组件之外的 UI 结构，如图所示:

- 组件 A 的样式不会影响组件 C 的样式
- 组件 A 的样式不会影响小程序页面的样式
- 小程序页面的样式不会影响组件 A 和 C 的样式

<img :src="$withBase('/uniapp/wx/07.png')">

好处:

- 防止外界的样式影响组件内部的样式
- 防止组件的样式破坏外界的样式

### 4.2 组件样式隔离的注意点

- app.wxss 中的全局样式对组件无效
- 只有 class 选择器会有样式隔离效果，id 选择器、属性选择器、标签选择器不受样式隔离的影响

建议:在<span style="color: red">组件</span>和<span style="color: red">引用组件的页面</span>中建议使用 class 选择器，<span style="color: red">不要使用 id、属性、标签选择器</span>!

### 4.3 修改组件的样式隔离选项

[https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/wxml-wxss.html#%E7%BB%84%E4%BB%B6%E6%A0%B7%E5%BC%8F%E9%9A%94%E7%A6%BB](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/wxml-wxss.html#%E7%BB%84%E4%BB%B6%E6%A0%B7%E5%BC%8F%E9%9A%94%E7%A6%BB)

默认情况下，自定义组件的<span style="color: red">样式隔离特性</span>能够<span style="color: red">防止组件内外样式互相干扰的问题</span>。但有时，我们希望在外界能够控制组件内部的样式，此时，可以通过<span style="color: red">styleIsolation</span>修改组件的样式隔离选项，用法如下:

- 用法 1 在修改组件的.js 文件中新增配置

```js
Component({
  options: {
    styleIsolation: "isolated",
  },
})
```

- 用法 2 在组件的.json 文件中新增配置

```json
{
  "styleIsolation": "isolated"
}
```

- `styleIsolation` 取值
  - `isolated` <span style="color: red">启用样式隔离</span>，在自定义组件内外，使用 class 指定的样式将<span style="color: red">不会相互影响</span>
  - `apply-shared` 表示<span style="color: red">页面 wxss 样式将影响到自定义组件</span>，但自定义组件 wxss 中指定的样式不会影响页面
  - `shared` 表示页面 wxss 样式将影响到自定义组件，自定义组件 wxss 中指定的样式也会影响页面和其他设置了 apply-shared 或 shared 的自定义组件
- 如果这个 `Component 构造器用于构造页面` ，则默认值为 `shared` ，且还有以下几个额外的样式隔离选项可用
  - `page-isolated` 表示在这个页面<span style="color: red">禁用 app.wxss</span> ，同时，页面的 wxss 不会影响到其他自定义组件
  - `page-apply-shared` 表示在这个页面<span style="color: red">禁用 app.wxss</span> ，同时，页面 wxss 样式不会影响到其他自定义组件，但<span style="color: red">设为 shared 的自定义组件会影响到页面</span>
  - `page-shared` 表示在这个页面<span style="color: red">禁用 app.wxss</span> ，同时，页面 wxss 样式会影响到<span style="color: red">其他设为 apply-shared 或 shared 的自定义组件，也会受到设为 shared 的自定义组件的影响</span>

## 5. 数据、方法和属性

### 5.1 data 数据

在小程序组件中，<span style="color: red">用于组件模板渲染的私有数据</span>，需要定义到<span style="color: red">data 节点</span>中

### 5.2 methods 方法

在小程序组件中，<span style="color: red">事件处理函数</span>和<span style="color: red">自定义方法</span>需要定义到<span style="color: red">methods 节点</span>中

```js
// components/test/test.js
Component({
  data: {
    count: 0,
  },
  methods: {
    addCount() {
      // 事件处理函数
      this.setData({
        count: this.data.count + 1,
      })
      this._showCount()
    },
    _showCount() {
      // 自定义方法建议以_开头
      wx.showToast({
        title: `count: ${this.data.count}`,
        icon: "none",
      })
    },
  },
})
```

### 5.3 perperties 属性

在小程序组件中，properties 是组件的对外属性，<span style="color: red">用来接收外界传递到组件中的数据</span>

- type: 属性的类型
- optionalTypes: 属性的类型（可以指定多个）
- value: 属性的初始值
- observer: 属性值变化时的回调函数(建议使用 Component 构造器的 observers 字段代替)

```html
<!--pages/message/message.wxml-->
<my-test1 max="9" min="0"></my-test1>
```

```js
// components/test/test.js
Component({
  properties: {
    max: {
      type: "Number",
      value: 10,
    },
    min: Number, // 简化方式
  },
  methods: {
    getMax() {
      // 获取properties值
      console.log(this.properties.max)
    },
  },
})
```

#### 5.3.1 data 和 properties 的区别

在小程序的组件中，properties 属性和 data 数据的用法相同，它们都是<span style="color: red">可读可写</span>的，只不过:

- data 更倾向于<span style="color: red">存储组件的私有数据</span>
- properties 更倾向于<span style="color: red">存储外界传递到组件中的数据</span>

```js
Component({
  properties: {
    max: {
      type: "Number",
      value: 10,
    },
    min: Number, // 简化方式
  },
  data: {
    count: 0,
  },
  methods: {
    showInfo() {
      console.log(this.data) // 输出: {count: 0, max: "9", min: 0}
      console.log(this.properties) // 输出: {count: 0, max: "9", min: 0}
      console.log(this.properties === this.data) // // 输出: true
    },
  },
})
```

#### 5.3.2 使用 setData 修改 properties 的值

由于 <span style="color: red">data 数据</span>和 <span style="color: red">properties 属性</span>在<span style="color: red">本质上没有任何区别</span>，因此 properties 属性的值也可以用于页面渲染或使用 setData 为 properties 中的属性重新赋值

```js
Component({
  properties: {
    max: {
      type: "Number",
      value: 10,
    },
  },
  methods: {
    addMax() {
      this.setData({
        max: this.properties.max + 1,
      })
    },
  },
})
```

### 5.4 数据监听器

[https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/observer.html](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/observer.html)

数据监听器用于<span style="color: red">监听和响应任何属性和数据字段的变化,从而执行特定的操作</span>。它的作用类似于 vue 中的 watch 侦听器

#### 5.4.1 使用

- 基本语法

```js
Component({
  observers: {
    "字段A, 字段B": function (字段A的新值, 字段B的新值) {
      // ...
    },
  },
})
```

- 例:

```js
Component({
  data: {
    n1: 0,
    n2: 0,
    sum: 0,
  },
  methods: {
    addN1() {
      this.setData({
        n1: this.data.n1 + 1,
      })
    },
    addN2() {
      this.setData({
        n2: this.data.n2 + 1,
      })
    },
  },
  observers: {
    "n1, n2": function (newN1, newN2) {
      this.setData({
        sum: newN1 + newN2,
      })
    },
  },
})
```

#### 5.4.2 监听对象属性的变化

数据监听器支持监听对象中`单个`或`多个属性`的变化

```js
Component({
  observers: {
    "对象.属性A, 对象.属性B": function (属性A的新值, 属性B的新值) {
      //触发此监听器的3种情况:
      // [为属性A赋值]使用setData设置 this.data.对象.属性A 时触发
      // [为属性B赋值]使用setData设置 this.data.对象.属性B 时触发
      // [直接为对象赋值]使用setData设置 this.data.对象 时触发
      // ...
    },
  },
})
```

- 例

```js
Component({
  data: {
    rgb: {
      r: 0,
      g: 0,
      b: 0,
    },
    fullColor: "0, 0, 0",
  },
  methods: {
    changR() {
      this.setData({
        "rgb.r": Math.round(Math.random() * 256),
      })
    },
    changG() {
      this.setData({
        "rgb.g": Math.round(Math.random() * 256),
      })
    },
    changB() {
      this.setData({
        "rgb.b": Math.round(Math.random() * 256),
      })
    },
  },
  observers: {
    "rgb.r, rgb.g, rgb.b"(r, g, b) {
      this.setData({
        fullColor: `${r}, ${g}, ${b}`,
      })
    },
  },
})
```

#### 5.4.3 监听对象所有属性的变化

如果某个对象中需要被监听的属性太多，为了方便，可以使用<span style="color: red">通配符\*\*</span>来<span style="color: red">监听</span>对象中<span style="color: red">所有属性的变化</span>

```js
Component({
  observers: {
    "对象.**": function (对象的新值) {
      // ...
    },
  },
})
```

- 例

```js
Component({
  observers: {
    "rgb.**": function (obj) {
      this.setData({
        fullColor: `${obj.r}, ${obj.g}, ${obj.b}`,
      })
    },
  },
})
```

### 5.5 纯数据字段

[https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/pure-data.html](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/pure-data.html)

概念:<span style="color: red">纯数据字段</span>指的是那些<span style="color: red">不用于界面渲染的 data 字段</span>。

应用场景:例如有些情况下，某些 data 中的字段<span style="color: red">既不会展示在界面上，也不会传递给其他组件</span>，仅仅在当前组件内部使用。带有这种特性的 data 字段适合被设置为纯数据字段。

好处:纯数据字段<span style="color: red">有助于提升页面更新的性能</span>。

#### 5.5.1 使用

在 Component 构造器的 options 节点中，指定<span style="color: red">pureDataPattern</span>为一个<span style="color: red">正则表达式</span>，字段名符合这个正则表达式的字段将成为纯数据字段

```js
Component({
  options: {
    pureDataPattern: /^_/, // 指定所有 _ 开头的数据字段为纯数据字段
  },
  data: {
    a: true, // 普通数据字段
    _b: true, // 纯数据字段
  },
  methods: {
    myMethod() {
      console.log(this.data._b) // 纯数据字段可以在 this.data 中获取
      this.setData({
        c: true, // 普通数据字段
        _d: true, // 纯数据字段
      })
    },
  },
})
```

## 6. 组件生命周期

[https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/lifetimes.html](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/lifetimes.html)

### 6.1 组件生命周期

<img :src="$withBase('/uniapp/wx/08.png')">

#### 6.1.1 created

组件实例<span style="color: red">刚被创建好</span>的时候，created 生命周期函数会被触发

- 此时还不能调用 setData
- 通常在这个生命周期函数中，只应该用于给组件的 this 添加一些自定义的属性字段

#### 6.1.2 attached

在组件<span style="color: red">完全初始化完毕、进入页面节点树后</span>，attached 生命周期函数会被触发

- 此时，this.data 已被初始化完毕
- 这个生命周期很有用，绝大多数初始化的工作可以在这个时机进行（例如发请求获取初始数据)

#### 6.1,。3 detached

在组件<span style="color: red">离开页面节点树后</span>，detached 生命周期函数会被触发

- 退出一个页面时，会触发页面内每个自定义组件的 detached 生命周期函数此时适合做一些清理性质的工作
- 此时适合做一些清理性质的工作

#### 6.1.4 定义生命周期方法

- 生命周期方法可以直接定义在 Component 构造器的第一级参数中
- 件的的生命周期也可以在 `lifetimes` 字段内进行声明（这是推荐的方式，其优先级最高）

```js
Component({
  // 推荐用法
  lifetimes: {
    attached: function () {}, // 在组件实例进入页面节点树时执行
    detached: function () {}, // 在组件实例被从页面节点树移除时执行
  },
  // 以下是旧式的定义方式，可以保持对 <2.2.3 版本基础库的兼容
  attached: function () {},
  detached: function () {},
  // ...
})
```

### 6.2 组件所在页面的生命周期

有时，<span style="color: red">自定义组件的行为依赖于页面状态的变化</span>，此时就需要用到<span style="color: red">组件所在页面的生命周期</span>

<img :src="$withBase('/uniapp/wx/09.png')">

- 注意：自定义 tabBar 的 pageLifetime 不会触发

```js
Component({
  pageLifetimes: {
    show: function () {}, // 页面被展示
    hide: function () {}, // 页面被隐藏
    resize: function (size) {}, // 页面尺寸变化
  },
})
```

## 7. 插槽

在自定义组件的 wxml 结构中，可以提供一个`<slot>`节点(插槽)，<span style="color: red">用于承载组件使用者提供的 wxml 结构</span>

### 7.1 单个插槽

在小程序中，默认每个自定义组件中只允许使用一个`<slot>`进行占位，这种个数上的限制叫做单个插槽

```html
<!--组件的封装者-->
<view class="wrapper">
  <view>这里是组件的内部节点</view>
  <!--对于不确定的内容，可以使用<slot>进行占位，具体的内容由组件的使用者决定-->
  <slot></slot>
</view>

<!--组件的使用者-->
<component-tag-name>
  <!--这部分内容将被放置在组件<slot>的位置上-->
  <view>这里是插入到组件slot中的内容</view>
</component-tag-name>
```

### 7.2 多个插槽

#### 7.2.1 启用多个插槽

在小程序的自定义组件中，需要使用多个`<slot>`插槽时，可以在组件的.js 文件中，配置 options 的<span style="color: red">multipeSlots</span>启用

```js
Component({
  options: {
    multipleSlots: true,
  },
})
```

#### 7.2.2 定义多个插槽

可以在组件的.wxml 中使用多个`<slot>`标签，以不同的<span style="color: red">name</span>来区分不同的插槽

```html
<!--组件模板-->
<view class="wrapper">
  <!-- name为 before的第一个 slot插槽-->
  <slot name="before"></slot>

  <view>这是一段固定的文本内容</view>
  <!-- name 为after的第二个slot插槽-->
  <slot name="after"></slot>
</view>
```

#### 7.2.3 使用多个插槽

在使用<span style="color: red">带有多个插槽的自定义组件</span>时，需要用<span style="color: red">slot 属性</span>来将节点插入到不同的`<slot>`中

```html
<!--引用组件的页面模板-->
<component-tag-name>
  <!--这部分内容将被放置在组件<slot name="before">的位置上 -->
  <view slot="before">这里是插入到组件name为before的slot中的内容</view>

  <!--这部分内容将被放置在组件<slot name="after">的位置上-->
  <view slot="after">这里是插入到组件name为after的slot中的内容</view>
</component-tag-name>
```

## 8. 父子组件之间的通信

[https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/events.html](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/events.html)

- ① 属性绑定
  - 用于父组件向子组件的指定属性设置数据，仅能设置 JSON 兼容的数据
- ② 事件绑定
  - 用于子组件向父组件传递数据，可以传递任意数据
- ③ 获取组件实例
  - 父组件还可以通过 `this.selectComponent()`获取子组件实例对象这样就可以直接访问子组件的任意数据和方法

### 8.1 属性绑定(父传子)

<span style="color: red">属性绑定</span>用于实现<span style="color: red">父向子传值</span>，而且<span style="color: red">只能传递普通类型的数据</span>，无法将方法传递给子组件

子组件在<span style="color: red">properties</span>节点中<span style="color: red">声明对应的属性并使用</span>

```html
<!-- 父组件 -->
<view>父组件中count值:{{ count }}</view>

<my-test5 count="{{ count }}"></my-test5>
```

```js
// 父组件
Page({
  data: {
    count: 0,
  },
})
```

```html
<!-- 子组件 -->
<view>子组件中count:{{ count }}</view>
```

```js
// 子组件
Component({
  properties: {
    count: {
      type: Number,
    },
  },
})
```

### 8.2 事件绑定(子传父)

- 事件绑定用于实现子向父传值，可以传递任何类型的数据。使用步骤如下:
  - ① 在父组件的 js 中，定义一个函数，这个函数即将通过自定义事件的形式，传递给子组件
  - ② 在父组件的 wxml 中，通过自定义事件的形式，将步骤 1 中定义的函数引用，传递给子组件
  - ③ 在子组件的 js 中，通过调用 `this.triggerEvent("自定义事件名称'，{/_参数对象_/})`，将数据发送到父组件
  - ④ 在父组件的 js 中，通过 e.detail 获取到子组件传递过来的数据

```html
<!-- 父组件 -->
<view>父组件中count值:{{ count }}</view>

<!-- <my-test5 count="{{ count }}" bind:changeCount="changCount"></my-test5> -->
<my-test5 count="{{ count }}" bindchangeCount="changCount"></my-test5>
```

```js
// 父组件
Page({
  data: {
    count: 0,
  },
  changCount(e) {
    this.setData({
      count: e.detail.value,
    })
  },
})
```

```html
<!-- 子组件 -->
<view>子组件中count:{{ count }}</view>
<button bindtap="addCount">子组件按钮count+1</button>
```

```js
// 子组件
Component({
  properties: {
    count: {
      type: Number,
    },
  },
  methods: {
    addCount() {
      this.triggerEvent("changeCount", { value: this.properties.count + 1 })
    },
  },
})
```

### 8.3 获取组件实例

可在父组件里调用 <span style="color: red">this.selectComponent("id 或 class 选择器")</span>，获取子组件的实例对象，从而直接访问子组件的任意数据和方法。调用时需要传入一个<span style="color: red">选择器</span>，例如 this.selectComponent(".my-component")。

```html
<!-- 父组件 -->
<view>父组件中count值:{{ count }}</view>
<button bindtap="getChild">获取子组件的实例对象</button>

<my-test5
  class="customA"
  id="cA"
  count="{{ count }}"
  bind:changeCount="changCount"></my-test5>
```

```js
// 父组件
Page({
  data: {
    count: 0,
  },
  getChild() {
    const child = this.selectComponent(".customA")
    // child.setData({
    //   count: child.properties.count + 1
    // })
    child.addCount()
  },
  changCount(e) {
    this.setData({
      count: e.detail.value,
    })
  },
})
```

```html
<!-- 子组件 -->
<view>子组件中count:{{ count }}</view>
```

```js
// 子组件
Component({
  properties: {
    count: {
      type: Number,
    },
  },
  methods: {
    addCount() {
      this.triggerEvent("changeCount", { value: this.properties.count + 1 })
    },
  },
})
```

## 9. behaviors

[https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/behaviors.html](https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/behaviors.html)

[https://developers.weixin.qq.com/miniprogram/dev/reference/api/Behavior.html](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Behavior.html)

behaviors 是小程序中，用于<span style="color: red">实现组件间代码共享的特性</span>，类似于 Vue.js 中的“mixins"

每个 behavior 可以包含一组<span style="color: red">属性</span>、<span style="color: red">数据</span>、<span style="color: red">生命周期函数</span>和<span style="color: red">方法</span>。组件引用它时，它的属性、数据和方法<span style="color: red">会被合并到组件中</span>。

每个组件可以引用多个 behavior，behavior 也可以引用其它 behavior。

### 9.1 创建 behaviors

调用 <span style="color: red">Behavior</span>(Object object)方法即可创建一个<span style="color: red">共享的 behavior 实例对象</span>，供所有的组件使用

```js
//调用 Behavior()方法，创建实例对象
//并使用module.exports将behavior实例对象共享出去
module.exports = Behavior({
  //属性节点
  properties: {},
  //私有数据节点
  data: { username: "zs" },
  //事件处理函数和自定义方法节点
  methods: {},
  //其它节点...
})
```

### 9.2 导入并使用 behavior

在组件中，使用 <span style="color: red">require()</span>方法导入需要的 behavior， <span style="color: red">挂载后即可访问 behavior 中的数据或方法</span>

```js
// 1．使用require()导入需要的自定义 behavior模块
const myBehavior = require("../../behaviors/my-behavior")
Component({
  //2．将导入的 behavior实例对象，挂载到 behaviors数组节点中，即可生效
  behaviors: [myBehavior],
  //组件的其它节点...
})
```
