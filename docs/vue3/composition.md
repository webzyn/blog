# 常用 Composition API

官方文档: [https://v3.cn.vuejs.org/guide/composition-api-introduction.html](https://v3.cn.vuejs.org/guide/composition-api-introduction.html)

[[toc]]

## 1.setup

1. 理解：Vue3.0 中一个新的配置项，值为一个函数。
2. setup 是所有<strong style="color:#DD5145">Composition API（组合 API）</strong><i style="color:gray;font-weight:bold">“ 表演的舞台 ”</i>。
3. 组件中所用到的：数据、方法等等，均要配置在 setup 中。
4. setup 函数的两种返回值：
   1. 若返回一个对象，则对象中的属性、方法, 在模板中均可以直接使用。（重点关注！）
   2. <span style="color:#aad">若返回一个渲染函数：则可以自定义渲染内容。（了解）</span>
5. 注意点：
   1. 尽量不要与 Vue2.x 配置混用
      - **Vue2.x 配置（data、methos、computed...）中<strong style="color:#DD5145">可以访问到</strong>setup 中的属性、方法**。
      - 但**在 setup 中<strong style="color:#DD5145">不能访问到</strong>Vue2.x 配置（data、methos、computed...）**。
      - 如果有重名, setup 优先。
   2. setup 不能是一个 async 函数，因为返回值不再是 return 的对象, 而是 promise, 模板看不到 return 对象中的属性。（后期也可以返回一个 Promise 实例，但需要 Suspense 和异步组件的配合）

## 2.setup 的两个注意点

- setup 执行的时机
  - 在 beforeCreate 之前执行一次，this 是 undefined。
- setup 的参数
  - props：值为对象，包含：组件外部传递过来，且组件内部声明接收了的属性。
  - context：上下文对象
    - attrs: 值为对象，包含：组件外部传递过来，但没有在 props 配置中声明的属性, 相当于 `this.$attrs`。
    - slots: 收到的插槽内容, 相当于 `this.$slots`。
    - emit: 分发自定义事件的函数, 相当于 `this.$emit`。

```vue
<!-- App.vue -->
<template>
  <!-- 自定义事件 props attrs -->
  <Demo @hello="showHello" name="张三" age="李四">
    <!-- slots -->
    <span>使用默认插槽</span>
    <template v-slot:qwe>
      <span>使用具名插槽</span>
    </template>
  </Demo>
</template>
<script>
import Demo from "./components/Demo.vue"
export default {
  name: "App",
  components: { Demo },
  setup() {
    function showHello() {
      alert("hello")
    }
    return { showHello }
  },
}
</script>

<!-- Demo.vue -->
<template>
  <button @click="test">触发自定义事件</button>
</template>

<script>
export default {
  name: "Demo",
  props: ["name"],
  emits: ["hello"], // 注册自定义事件
  setup(props, context) {
    console.log(props)
    console.log(context.attrs)
    console.log(context.emit)
    console.log(context.slots)

    function test() {
      // 触发自定义事件
      context.emit("hello", 666)
    }
    return { test }
  },
}
</script>
```

<img :src="$withBase('/vue3/4.png')">

## 3.ref 函数(用于基本类型)

- 作用: 定义一个响应式的数据
- 语法: `const xxx = ref(initValue)`
  - 创建一个包含响应式数据的<strong style="color:#DD5145">引用对象（reference 对象，简称 ref 对象）</strong>。
  - JS 中操作数据： `xxx.value`
  - 模板中读取数据: 不需要.value，直接：`<div>{{xxx}}</div>`
- 备注：
  - 接收的数据可以是：基本类型、也可以是对象类型。
  - 基本类型的数据：响应式依然是靠`Object.defineProperty()`的`get`与`set`完成的。
  - 对象类型的数据：内部 <i style="color:gray;font-weight:bold">“ 求助 ”</i> 了 Vue3.0 中的一个新函数—— `reactive`函数。

```vue
<template>
  <h2>姓名:{{ name }}</h2>
  <h2>年龄:{{ age }}</h2>
  <h2>工作:{{ job.type }}</h2>
  <button @click="changeInfo">按钮</button>
</template>

<script>
import { ref } from "vue"
export default {
  name: "App",
  setup() {
    // 基本类型
    let name = ref("zs")
    let age = ref(14)
    //引用类型
    let job = ref({
      type: "搬砖佬",
    })

    function changeInfo() {
      // 处理基本类型
      name.value = "ls"
      age.value = 20
      console.log(name)

      // 处理引用类型
      job.value.type = "牛马"
      console.log(job)
      console.log(job.value)
    }

    return {
      name,
      age,
      job,
      changeInfo,
    }
  },
}
</script>
```

<img :src="$withBase('/vue3/1.png')">
<img :src="$withBase('/vue3/2.png')">

## 4.reactive 函数(用于引用类型)

- 作用: 定义一个<strong style="color:#DD5145">对象类型</strong>的响应式数据（基本类型不要用它，要用`ref`函数）
- 语法：`const 代理对象= reactive(源对象)`接收一个对象（或数组），返回一个<strong style="color:#DD5145">代理对象（Proxy 的实例对象，简称 proxy 对象）</strong>
- reactive 定义的响应式数据是“深层次的”。
- 内部基于 ES6 的 Proxy 实现，通过代理对象操作源对象内部数据进行操作。

```vue
<script>
import { reactive } from "vue"
export default {
  name: "App",
  setup() {
    //引用类型
    let job = reactive({
      type: "搬砖佬",
    })
    let hobby = reactive(["抽烟", "喝酒", "打架"])

    function changeInfo() {
      // 处理引用类型
      job.type = "牛马"
      // vue3可以直接改变数组元素 - vue2不能
      hobby[0] = "学习"
      console.log(job)
      console.log(hobby)
    }

    return {
      job,
      hobby,
      changeInfo,
    }
  },
}
</script>
```

<img :src="$withBase('/vue3/3.png')">

## 5.reactive 对比 ref

- 从定义数据角度对比：
  - ref 用来定义：<strong style="color:#DD5145">基本类型数据</strong>。
  - reactive 用来定义：<strong style="color:#DD5145">对象（或数组）类型数据</strong>。
  - 备注：ref 也可以用来定义<strong style="color:#DD5145">对象（或数组）类型数据</strong>, 它内部会自动通过`reactive`转为<strong style="color:#DD5145">代理对象</strong>。
- 从原理角度对比：
  - ref 通过`Object.defineProperty()`的`get`与`set`来实现响应式（数据劫持）。
  - reactive 通过使用<strong style="color:#DD5145">Proxy</strong>来实现响应式（数据劫持）, 并通过<strong style="color:#DD5145">Reflect</strong>操作<strong style="color:orange">源对象</strong>内部的数据。
- 从使用角度对比：
  - ref 定义的数据：操作数据<strong style="color:#DD5145">需要</strong>`.value`，读取数据时模板中直接读取<strong style="color:#DD5145">不需要</strong>`.value`。
  - reactive 定义的数据：操作数据与读取数据：<strong style="color:#DD5145">均不需要</strong>`.value`。

## 6.Vue3.0 中的响应式原理

### vue2.x 的响应式

- 实现原理：

  - 对象类型：通过`Object.defineProperty()`对属性的读取、修改进行拦截（数据劫持）。

  - 数组类型：通过重写更新数组的一系列方法来实现拦截。（对数组的变更方法进行了包裹）。

    ```js
    Object.defineProperty(data, "count", {
      get() {},
      set() {},
    })
    ```

- 存在问题：
  - 新增属性、删除属性, 界面不会更新。
  - 直接通过下标修改数组, 界面不会自动更新。
- 解决方法
  - this.$set/this.$delete(对象/数组)
  - Vue.set/Vue.delete(对象/数组)
  - (数组)使用 push,pop,unshift,shift,splice,sort,reverse 这七个改变数组本身的方法

### Vue3.0 的响应式

- 实现原理:

  - 通过 Proxy（代理）: 拦截对象中任意属性的变化, 包括：属性值的读写、属性的添加、属性的删除等。
  - 通过 Reflect（反射）: 对源对象的属性进行操作。
  - MDN 文档中描述的 Proxy 与 Reflect：

    - Proxy：[https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

    - Reflect：[https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect)

      ```js
      new Proxy(data, {
        // 拦截读取属性值
        get(target, prop) {
          return Reflect.get(target, prop)
        },
        // 拦截设置属性值或添加新属性
        set(target, prop, value) {
          return Reflect.set(target, prop, value)
        },
        // 拦截删除属性
        deleteProperty(target, prop) {
          return Reflect.deleteProperty(target, prop)
        },
      })
      ```

## 7.计算属性computed

- 与 Vue2.x 中 computed 配置功能一致

- 写法

```vue
<template>
  <div>姓: <input type="text" v-model="person.firstName" /></div>
  <div>名: <input type="text" v-model="person.lastName" /></div>
  <div>全名: <input type="text" v-model="person.fullName" /></div>
  <div>全名: <input type="text" v-model="fullName" /></div>
</template>

<script>
import { reactive, computed } from "vue"
export default {
  name: "Demo",
  setup() {
    let person = reactive({
      firstName: "张",
      lastName: "三",
    })

    let fullName = computed({
      get() {
        return person.firstName + "-" + person.lastName
      },
      set(value) {
        const nameArr = value.split("-")
        person.firstName = nameArr[0]
        person.lastName = nameArr[1]
      },
    })

    // 将计算属性添加为响应式对象的属性

    //计算属性——简写
    // person.fullName = computed(() => {
    //   return person.firstName + "-" + person.lastName
    // })

    //计算属性——完整
    person.fullName = computed({
      get() {
        return person.firstName + "-" + person.lastName
      },
      set(value) {
        const nameArr = value.split("-")
        person.firstName = nameArr[0]
        person.lastName = nameArr[1]
      },
    })

    return { person, fullName }
  },
}
</script>
```
## 8.监视watch函数

- 与 Vue2.x 中 watch 配置功能一致

- 两个小“坑”：

  - 监视 reactive 定义的响应式数据时：oldValue 无法正确获取、强制开启了深度监视（deep 配置失效）。
  - 监视 reactive 定义的响应式数据中某个属性时：deep 配置有效。

**情况一: 多次调用 watch 函数监听 ref 定义的响应式数据**

```vue
<template>
  <h2>sum:{{ sum }}</h2>
  <button @click="sum++">sum+1</button>
  <hr />
  <h2>msg:{{ msg }}</h2>
  <button @click="msg += '!'">改变msg</button>
</template>
<script>
import { ref, watch } from "vue"
export default {
  name: "App",
  setup() {
    let sum = ref(0)
    let msg = ref("你好")

    // 多次调用watch函数监听ref定义的响应式数据
    watch(
      sum,
      (newValue, oldValue) => {
        console.log("sum值改变", newValue, oldValue)
      },
      { immediate: true }
    )
    watch(msg, (newValue, oldValue) => {
      console.log("msg值改变", newValue, oldValue)
    })

    return { sum, msg }
  },
}
</script>
```

<img :src="$withBase('/vue3/5.png')">

**情况二: 监听多个 ref 定义的响应式数据**

```vue
<script>
import { ref, watch } from "vue"
export default {
  name: "App",
  setup() {
    let sum = ref(0)
    let msg = ref("你好")

    // 监听多个ref定义的响应式数据
    watch([sum, msg], (newValue, oldValue) => {
      console.log("msg或msg值改变", newValue, oldValue)
    })

    return { sum, msg }
  },
}
</script>
```

<img :src="$withBase('/vue3/6.png')">

**情况三: 监视 reactive 定义的响应式数据**

- 注意
  - 1.无法正确获取 oldValue
  - 2.强制开启了深度监视(deep 配置无效)

```vue
<template>
  <h2>name:{{ person.name }}</h2>
  <h2>age:{{ person.age }}</h2>
  <h2>j1:{{ person.job.j1.type }}</h2>
  <button @click="person.name += '~'">修改</button>
  <button @click="person.age++">修改</button>
  <button @click="person.job.j1.type += '~'">修改</button>
</template>
<script>
import { ref, reactive, watch } from "vue"
export default {
  name: "App",
  setup() {
    let person = reactive({
      name: "张三",
      age: 18,
      job: {
        j1: {
          type: "web",
        },
      },
    })
    watch(
      person,
      (newValue, oldValue) => {
        console.log("newValue", newValue)
        console.log("oldValue", oldValue)
      },
      { deep: false }
    ) //  deep: false失效

    // 相当于下面两种 --> 因为ref内部借助了reactive
    let person = ref({
      name: "张三",
      age: 18,
      job: {
        j1: {
          type: "web",
        },
      },
    })
    watch(person.value, (newValue, oldValue) => {
      console.log("newValue", newValue)
      console.log("oldValue", oldValue)
    })
    watch(
      person,
      (newValue, oldValue) => {
        console.log("newValue", newValue)
        console.log("oldValue", oldValue)
      },
      { deep: true }
    )
    return { person }
  },
}
</script>
```

<img :src="$withBase('/vue3/7.png')">

**情况四: 监视 reactive 定义的响应式数据的某个属性**

```vue
<template>
  <h2>age:{{ person.age }}</h2>
  <button @click="person.age++">修改</button>
</template>
<script>
import { reactive, watch } from "vue"
export default {
  name: "App",
  setup() {
    let person = reactive({
      name: "张三",
      age: 18,
      job: {
        j1: {
          type: "web",
        },
      },
    })
    // 第一个参数需要写成函数
    watch(
      () => person.age,
      (newValue, oldValue) => {
        console.log("newValue", newValue)
        console.log("oldValue", oldValue)
      }
    )
    return { person }
  },
}
</script>
```

<img :src="$withBase('/vue3/8.png')">

**情况五: 监视 reactive 定义的响应式数据的某些属性**

```vue
<template>
  <h2>name:{{ person.name }}</h2>
  <h2>age:{{ person.age }}</h2>
  <button @click="person.name += '~'">修改</button>
  <button @click="person.age++">修改</button>
</template>
<script>
import { reactive, watch } from "vue"
export default {
  name: "App",
  setup() {
    let person = reactive({
      name: "张三",
      age: 18,
      job: {
        j1: {
          type: "web",
        },
      },
    })
    watch([() => person.name, () => person.age], (newValue, oldValue) => {
      console.log("newValue", newValue)
      console.log("oldValue", oldValue)
    })
    return { person }
  },
}
</script>
```

<img :src="$withBase('/vue3/9.png')">

**情况六: 监视 reactive 定义的响应式数据的 对象类型数据**

- 注意：
  - 由于监视的 reactive 定义的响应式数据的`某个属性`依然是`对象`,所以需要开启深度监视 deep
  - oldValue 无法正确获取
- 与情况三区别是监视的数据不同

```vue
<template>
  <h2>j1:{{ person.job.j1.type }}</h2>
  <button @click="person.job.j1.type += '~'">修改</button>
</template>
<script>
import { reactive, watch } from "vue"
export default {
  name: "App",
  setup() {
    let person = reactive({
      name: "张三",
      age: 18,
      job: {
        j1: {
          type: "web",
        },
      },
    })
    // 由于监视的是
    watch(
      () => person.job,
      (newValue, oldValue) => {
        console.log("newValue", newValue)
        console.log("oldValue", oldValue)
      },
      { deep: true }
    )
    return { person }
  },
}
</script>
```

<img :src="$withBase('/vue3/10.png')">

## 9.监视watchEffect函数

- watch 的套路是：既要指明监视的属性，也要指明监视的回调。

- watchEffect 的套路是：不用指明监视哪个属性，监视的回调中用到哪个属性，那就监视哪个属性。

- watchEffect 有点像 computed：

  - 但 computed 注重的计算出来的值（回调函数的返回值），所以必须要写返回值。
  - 而 watchEffect 更注重的是过程（回调函数的函数体），所以不用写返回值。

```vue
<template>
  <h2>sum:{{ sum }}</h2>
  <button @click="sum++">sum+1</button>
  <h2>age:{{ person.age }}</h2>
  <h2>j1:{{ person.job.j1.type }}</h2>
  <button @click="person.age++">修改</button>
  <button @click="person.job.j1.type += '~'">修改</button>
</template>
<script>
import { ref, reactive, watch, watchEffect } from "vue"
export default {
  name: "App",
  setup() {
    let sum = ref(0)
    let person = reactive({
      name: "张三",
      age: 18,
      job: {
        j1: {
          type: "web",
        },
      },
    })

    // 立即执行一次回调函数 回调函数中使用的数据发生改变 回调函数重新执行
    watchEffect(() => {
      const x1 = sum.value
      const x2 = person.age
      const x3 = person.job.j1.type
      console.log("watchEffect回调执行")
    })

    return { sum, person }
  },
}
</script>
```
## 10.生命周期

 -|vue2|vue3选项式|vue3组合式
-|-|-|-
渲染阶段|
-|beforeCreate|beforeCreate|setup
-|created|created|setup
-|beforeMount|beforeMount|onBeforeMount
-|mounted|mounted|onMounted
更新阶段|
-|beforeUpdete|beforeUpdate|onBeforeUpdate
-|updated|updated|onUpdated
销毁阶段|
-|beforeDestroy|beforeUnmount|onBeforeUnmount
-|destroyed|unmounted|onUnmounted

**组合式+选项式**
- 渲染阶段
    - setup(组)  -->  beforeCreate(选)  -->  created(选)  ->  onBeforeMount(组)  -->  beforeMount(选)  -->  onMounted(组)  -->  mounted(选)
- 更新阶段
    - onBeforeUpdate(组)  -->  beforeUpdate(选)  -->  onUpdated(组)  -->  updated(选)
- 销毁阶段
    - onBeforeUnmount(组)  -->  beforeUnmount(选)  -->  onUnmounted(组)  -->  unmounted(选)

## 11.自定义hook函数
- 什么是hook?----本质是一个函数， 把setup函数中使用的Composition API进行了封装。
- 类似于vue2.x中的mixin。
- 自定义hook的优势:复用代码，让setup中的逻辑更清楚易懂。

```js
// usePoint.js  --> hook 函数
import { reactive , onMounted, onBeforeUnmount } from "vue"
export default function(){
    // 数据
    let point = reactive({
        x: 0,
        y:0
    })

    // 方法
    function savePonit(event){
        point.x = event.pageX
        point.y = event.pageY
        // console.log(event.pageX,event.pageY);
    }

    // 生命周期钩子
    onMounted(()=>{
        window.addEventListener("click",savePonit)
    })

    onBeforeUnmount(()=>{
        window.removeEventListener('click',savePonit)
    })

    return { point }
}
```
```vue
<script>
// 页面使用
import usePoint from "./hooks/usePonit"
export default{
  setup(){
    let { point } = usePoint()
    return { point }
  }
}
</script>
```

## 12.toRef

- 作用: 创建一个 ref 对象，其value值指向另一个对象中的某个属性。
- 语法: `const name = toRef(person, 'name')`
- 应用: 要将响应式对象中的某个属性单独提供给外部使用时。
- 扩展: `toRefs` 与 `toRef` 功能一致, 但可以批量创建多个ref对象，语法: `toRefs (person)`


```vue
<template>
  <h2>person: {{ person }}</h2>
  <h2>姓名: {{name2}}</h2>
  <h2>年龄: {{age}}</h2>
  <h2>薪水: {{salary}}</h2>
</template>

<script>
import { reactive, toRef} from "vue"
export default{
  name:"Demo",
  setup(){
    let person = reactive({
      name:"张三",
      age: 18,
      job:{
        j1:{
          salary: 20
        }
      }
    })

    console.log('name1',person.name); // name1 张三  ==> 这里相当于字符串'张三',没有响应式

    let name2 = toRef(person,'name')
    // 相当于从person响应式对象中取值
    console.log('name2',name2); // name2 ObjectRefImpl {_object: Proxy(Object), _key: 'name', _defaultValue: undefined, __v_isRef: true}

    return{ 
      person, 
      name2,
      age: toRef(person,'age'),
      salary: toRef(person.job.j1,'salary').
    }
  }
}
</script>
```
<img :src="$withBase('/vue3/11.png')">

## 13.toRefs
- 创建多个 ref 对象

```vue
<template>
  <h2>姓名: {{name}}</h2>
  <h2>年龄: {{age}}</h2>
  <h2>薪水: {{job.j1.salary}}</h2>
</template>

<script>
import { reactive, toRefs} from "vue"
export default{
  name:"Demo",
  setup(){
    let person = reactive({
      name:"张三",
      age: 18,
      job:{
        j1:{
          salary: 20
        }
      }
    })

    console.log(toRefs(person)); // 是一个对象

    return{ 
      // 数据解构出来
      ...toRefs(person)
    }
  }
}
</script>
```
<img :src="$withBase('/vue3/12.png')">