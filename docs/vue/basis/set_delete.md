# set、delete

[[toc]]

## set

- 向`响应式对象`中添加`响应式属性`，且触发`视图更新`

> Vue.set(target, propertyName/index, value)

> this.$set(target, propertyName/index, value)

- 参数:

  - target: 目标对象 (对象或数组)
  - propertyName/index: 对象属性或数组索引
  - value: 值

- 目标对象`不能`是 Vue 实例，或者 Vue 实例的根数据对象 data。

```html
<body>
  <div id="app">
    <button @click="handle">按钮</button>
  </div>
</body>
<script src="https://cdn.jsdelivr.net/npm/vue@2.7.14/dist/vue.js"></script>
<script>
  const vm = new Vue({
    el: "#app",
    data: {
      arr: [1, 2, 3],
      obj: {
        a: 1,
      },
      isShow: false,
    },
    methods: {
      // 添加数组元素
      handle1() {
        console.log(this.arr) // [1, 2, 3, __ob__: Observer]
        this.$set(this.arr, 3, 4) // 在索引 3 的位置添加值4
        Vue.set(this.arr, 4, 5)
        console.log(this.arr) // [1, 2, 3, 4, 5, __ob__: Observer]
      },
      // 改变数组元素
      handle2() {
        console.log(this.arr) // [ 0, 2, 3, __ob__: Observer]
        this.$set(this.arr, 0, "a")
        console.log(this.arr) // ['a', 2, 3, __ob__: Observer]
      },
      // 改变整个数组（相当于改变Vue实例的属性）
      handle3() {
        console.log(this.arr) // [1, 2, 3, __ob__: Observer]
        this.$set(this, "arr", ["a", "b", "c"])
        console.log(this.arr) // ['a', 'b', 'c', __ob__: Observer]

        Vue.set(this, "arr", "arr")
        console.log(this.arr) // "arr"
      },
      // 添加对象属性值
      handle4() {
        this.$set(this.obj, "b", 2)
        console.log(this.obj) // { a: 1, b: 2}
      },
      // 改变对象属性值
      handle5() {
        this.$set(this.obj, "a", "a")
        console.log(this.obj) // { a: 'a'}
      },
      // 改变整个对象（相当于改变Vue实例的属性）
      handle6() {
        this.$set(this, "obj", "我是obj")
        console.log(this.obj) // "我是obj"
      },
      // 改变Vue实例的属性值
      handle8() {
        console.log(this.isShow) // false
        this.$set(this, "isShow", true)
        console.log(this.isShow) // true
      },
    },
  })
</script>
```

## delete

- 删除对象的属性。如果对象是响应式，则会触发更新视图

> Vue.delete(target, propertyName/index)

> this.$delete(target, propertyName/index)

- 参数

  - target: 目标对象 (对象或数组)
  - propertyName/index: 对象属性或数组索引

- `2.2.0+` 支持数组
- 目标对象`不能`是 Vue 实例，或者 Vue 实例的根数据对象 data。

```html
<script>
  const vm = new Vue({
    el: "#app",
    data: {
      arr: [1, 2, 3],
      obj: {
        a: 1,
      },
      isShow: false,
    },
    methods: {
      // 删除数组元素
      handle1() {
        console.log(this.arr) // [1, 2, 3, __ob__: Observer]
        this.$delete(this.arr, 2)
        Vue.delete(this.arr, 0)
        console.log(this.arr) // [2, __ob__: Observer]
      },
      // 删除对象属性
      handle2() {
        this.$delete(this.obj, "a")
        console.log(this.obj) // {}
      },
    },
  })
</script>
```
