# 指令

[[toc]]

### v-text

```html
<span v-text="msg"></span>
<!-- 等同于 -->
<span>{{ msg }}</span>
```

### v-html

```js
let vm = new Vue({
  el: "#app",
  template: `<p v-html="html"></p>`,
  data() {
    return {
      html: "<span style='color:red'>我是一个标签</span>",
    }
  },
})
```

效果如图:
<img :src="$withBase('/vue/basis/tem_1.png')">

### v-show

- 控制元素的 `display` 属性

```js
let vm = new Vue({
  el: "#app",
  template: `
  <div>
    <span v-show="show">{{ msg }}</span>
    <p v-html="html"></p>
  </div>`,
  data() {
    return {
      msg: "msg",
      html: "<span style='color:red'>我是一个标签</span>",
      show: false,
    }
  },
})
```

### v-if、v-else-if、v-else

- 控制元素是否`渲染`
- 与`v-for`一起使用时，`v-for`优先级比`v-if`高

```html
<div v-if="type === 'A'">A</div>
<div v-else-if="type === 'B'">B</div>
<div v-else>C</div>
```

### v-for

- `Array | Object | number | string | Iterable (2.6 新增)`

```vue
<template>
  <div>
    <!-- 数组 -->
    <p v-for="item in arr">{{ item }}</p>
    <!-- 对象 -->
    <p v-for="(value, key) in obj">{{ key }} : {{ value }}</p>
    <!-- 数字 : 渲染 1 - 10 -->
    <p v-for="item in num">{{ item }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      arr: [1, 2, 3],
      obj: {
        a: "value1",
        b: "value2",
        c: "value3",
      },
      num: 10,
    }
  },
}
</script>
```

### v-on 或 @

- 绑定事件监听器

> <button v-on:参数.修饰符="预期"></button>

- 参数
  - event 事件
- 预期
  - Function 方法
  - 内联语句
  - 对象
- 修饰符
  - `.stop` - 调用 `event.stopPropagation()`。
  - `.prevent` - 调用 `event.preventDefault()`。
  - `.capture` - 添加事件侦听器时使用 capture 模式。
  - `.self `- 只当事件是从侦听器`绑定的元素本身`触发时才触发回调。
  - `.{keyCode | keyAlias}` - 只当事件是从`特定键触发`时才触发回调。
  - `.native` - 监听组件根元素的`原生事件`。
  - `.once` - `只触发一次`回调。
  - `.left` - (2.2.0) 只当点击鼠标左键时触发。
  - `.right` - (2.2.0) 只当点击鼠标右键时触发。
  - `.middle` - (2.2.0) 只当点击鼠标中键时触发。
  - `.passive` - (2.3.0) 以 { passive: true } 模式添加侦听器

```vue
<template>
  <!-- 方法处理 -->
  <button v-on:click="handle">按钮</button>
  <!-- 内联语句 -->
  <button v-on:click="handle2('ok', $event)">按钮</button>
  <!-- 对象语法 (2.4.0+) -->
  <button v-on="{ mousedown: doThis, mouseup: doThat }">按钮</button>
</template>
<script>
export default {
  methods: {
    // 回调函数
    handle(e) {
      // 参数: 鼠标事件 $event
      console.log(e)
      // PointerEvent {isTrusted: true, pointerId: 1, width: 1, height: 1, pressure: 0, …}
    },
    // 内联语句 - 传递多个参数
    handle2(msg, e) {
      console.log(msg) // ok
      console.log(e)
    },
    // 对象语法 - 绑定多个事件
    doThis() {
      console.log("鼠标按下")
    },
    doThat() {
      console.log("鼠标松开")
    },
  },
}
</script>
```

### v-bind 或 :

- 修饰符
  - `.prop` - 作为一个 `DOM property` 绑定而不是作为 `attribute(HTML property)` 绑定
  - `.camel` - 将 kebab-case attribute 名转换为 camelCase。
  - `.sync` - 自定义事件的语法糖，会扩展成一个更新父组件绑定值的 v-on 侦听器。

```html
<!-- dom属性和html属性的差异 -->
<body>
  <input type="text" value="1" />
  <button>get value</button>

  <script>
    const input = document.querySelector("input")
    document.querySelector("button").addEventListener("click", function () {
      //输入20后点击按钮
      console.log(input.value) //读取dom属性 ，20
      console.log(input.getAttribute("value")) //读取html属性 ，1 => 固定不变
    })
  </script>
</body>
```

[前往 -> .sync 修饰符](/vue/components/sync.html)

### v-model

- 只能用于`<input>`,`<select>`、`<textarea>`、`组件`
- 修饰符
  - `.lazy`: 取代`input(内容改变)` 事件改为` change(失去焦点)` 事件
  - `.number` - 输入字符串转为有效的数字
  - `.trim` - 输入首尾空格过滤

```html
<!-- 在“change”时而非“input”时更新 -->
<input v-model.lazy="msg" />
```

[前往 -> 组件之间数据双向绑定](/vue/components/vModel.html)

### v-slot

[前往 -> slot](/vue/components/slot.html)

### v-pre

- 跳过其所在节点的编译过程

```html
<script>
  const app = new Vue({
    el: "#app",
    template: `
      <div>
        <p>{{ message }}</p>
        <p v-pre>{{ message }}</p>
      </div>
    `,
    data() {
      return {
        message: "hello,Vue",
      }
    },
  })
</script>
```

<img :src="$withBase('/vue/basis/tem_2.png')">

### v-cloak

- 在 vue 中，渲染普通文本有 2 种方式：{{}}与 v-text

```html
<div id="app">{{ message }}</div>

<div id="app" v-text="message"></div>
```

- 在使用`{{}}`展示或更新页面数据时：当网速比较慢时，会让用户先看到我们的表达式（上面页面中的{{ message }}），然后才看到 data 中的值（hello,Vue）->即所谓的闪烁问题！

- 解决方法
  - 1. 使用 v-text
  - 2. 使用 v-cloak 结合 display:none

```vue
<template>
  <!-- 使用cloak -->
  <div id="app" v-cloak>{{ message }}</div>
</template>

<script>
const app = new Vue({
  el: "#app",
  data() {
    return {
      message: "hello,Vue",
    }
  },
})
</script>

<style>
[v-cloak] {
  display: none !important;
}
</style>
```

### v-once

- 只渲染元素和组件一次

```js
const app = new Vue({
  el: "#app",
  template: `
      <div>
        <p v-once>{{ message }}</p>  
        <p>{{ message }}</p>  
      </div>
    `,
  data() {
    return {
      message: "hello,Vue",
    }
  },
  mounted() {
    setTimeout(() => {
      this.message = "message值改变"
    }, 1000)
  },
})
```

<img :src="$withBase('/vue/basis/tem_3.png')">
