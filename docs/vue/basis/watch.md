# watch 和 $watch

[[toc]]

### watch

- 一个对象，键是需要`监听的数据`，值是对应的`回调函数`/`方法名`/`包含选项的对象`
  - 包含选项的对象
    - handler: 回调函数
    - deep: 深度监听
    - immediate: 该回调将会在侦听开始之后被立即调用

```js
const vm = new Vue({
  el: "#app",
  data: {
    a: 1,
    b: {
      c: {
        d: 2,
      },
    },
  },
  watch: {
    // 回调函数
    a: function (val, oldVal) {
      console.log("新值: %s,旧值: %s", val, oldVal)
    },
    // 方法名
    a: "valueChange",
    // 对象
    a: {
      handler: "valueChange",
    },
    // 数组
    a: [
      "valueChange",
      function handle2(val, oldVal) {
        console.log("新值: %s,旧值: %s", val, oldVal)
      },
      {
        handler: function handle3(val, oldVal) {
          console.log("新值: %s,旧值: %s", val, oldVal)
        },
      },
    ],

    b: {
      handler: "change2",
      deep: true, // 深度监听
      immediate: true, // 该回调将会在侦听开始之后被立即调用
    },

    "b.c": "change2",
    "b.c.d": "change2",
  },
  methods: {
    valueChange(val, oldVal) {
      console.log("新值: %s,旧值: %s", val, oldVal)
    },
    change2(val, oldVal) {
      console.log(val, oldVal)
    },
  },
})
```

### $watch

- 作用: 与 watch 相同(写法不同)

> vm.$watch(expOrFn, callback, [options] )

- 参数
  - expOrFn: 监听的数据
  - callback: 执行的回调函数
  - options: 配置对象
    - deep: 是否深度监听
    - immediate: 立即触发回调
- 返回值
  - unwatch: 取消观察函数，用来停止触发回调

```js
const vm = new Vue({
  el: "#app",
  data: {
    a: 1,
    b: {
      c: 2,
    },
  },
  created() {
    this.a++ // 这次改变不会监听到(因为这时还没有监听器)
    this.$watch("a", function (val, oldVal) {
      console.log(val)
    })
  },
})
```

- 嵌套对象

```js
created() {
  // 必须使用函数形式
  this.$watch(
      () => this.c.d,
      (newVal, oldVal) => {
        // 做点什么
      }
    )
  // vue2 可以简写
  this.$watch('c.d', (newVal, oldVal) => {
    // 做点什么
  })
}
```
