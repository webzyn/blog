# 自定义指令 directive

有的情况下，要对普通 DOM 元素进行底层操作，这时候就会用到自定义指令

## 使用方法

**1、全局注册**

```js
// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 该对象是指令定义对象
  // 以下一个钩子函数 当绑定元素插入到 DOM 中...
  inserted: function (el) {
    el.focus()
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
```

_页面使用_

```html
<template>
  <div class="content">
    <input type="text" v-focus />
  </div>
</template>
```

**2、局部注册**

```vue
<template>
  <div class="content">
    <input type="text" v-focus />
  </div>
</template>

<script>
export default {
  name: 'Content',
  directives: {
    focus: {
      // 指令的定义
      inserted: function (el) {
        el.focus()
      }
    }
  }
}
</script>
```

## 钩子函数

```js
Vue.directive('my-directive', {
  bind: function (el, binding, vnode, oldVnode) {
    // 只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
  },
  inserted: function () {
    // 被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
  },
  update: function () {
    // 所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。
    // 指令的值可能发生了改变，也可能没有。
    // 但是你可以通过比较更新前后的值来忽略不必要的模板更新
  },
  componentUpdated: function () {
    // 指令所在组件的 VNode 及其子 VNode 全部更新后调用。
  },
  unbind: function () {
    // 只调用一次，指令与元素解绑时调用。
  }
})
```

**钩子函数参数**

<img :src="$withBase('/vue/directive/1.png')">

**参数的值如下**

<img :src="$withBase('/vue/directive/2.png')">
<img :src="$withBase('/vue/directive/3.png')">

### 动态 argument 参数

```html
<div id="dynamicexample">
  <!-- 自定义指令 参数arg 动态设置 -->
  <p v-pin:[direction]="200">I am pinned onto the page at 200px to the left.</p>
</div>
```

```js
Vue.directive('pin', {
  bind: function (el, binding, vnode) {
    el.style.position = 'fixed'
    var s = binding.arg == 'left' ? 'left' : 'top'
    el.style[s] = binding.value + 'px'
  }
})

new Vue({
  el: '#dynamicexample',
  data: function () {
    return {
      direction: 'left' // 自定义指令 参数 arg 值
    }
  }
})
```

### 简写

在 bind 和 update 时触发相同行为，而不关心其它的钩子。

```js
Vue.directive('color-swatch', function (el, binding) {
  // ...
})
```

### 对象字面量

如果指令需要多个值，可以传入一个 JavaScript 对象字面量。指令函数能够接受所有合法的 JavaScript 表达式。

```html
<!-- 使用时 -->
<div v-demo="{ color: 'white', text: 'hello!' }"></div>
```

```js
// 注册时
Vue.directive('demo', function (el, binding) {
  console.log(binding.value.color) // => "white"
  console.log(binding.value.text) // => "hello!"
})
```

[参考官网](https://v2.cn.vuejs.org/v2/guide/custom-directive.html)
