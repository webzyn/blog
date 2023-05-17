# 其他Composition API

## 1.shallowReactive 与 shallowRef
- shallowReactive：只处理对象最外层属性的响应式（浅响应式）。

- shallowRef：只处理基本数据类型的响应式, 不进行对象的响应式处理。

- 什么时候使用?

    - 如果有一个对象数据，结构比较深, 但变化时只是外层属性变化 ===> shallowReactive。
    - 如果有一个对象数据，后续功能不会修改该对象中的属性，而是生新的对象来替换 ===> shallowRef。
```vue
<template>
  <h1>reactive</h1>
  <h2>年龄: {{person.age}}</h2>
  <h2>薪水: {{person.job.j1.salary}}</h2>
  <button @click='person.age++'>年龄+1</button>
  <button @click='person.job.j1.salary++'>涨薪</button>
  <hr>
  <h1>shallowReactive</h1>
  <h2>年龄: {{person2.age}}</h2>
  <h2>薪水: {{person2.job.j1.salary}}</h2>
  <button @click='person2.age++'>年龄+1</button>
  <button @click='person2.job.j1.salary++'>涨薪</button>
</template>

<script>
import { reactive, shallowReactive} from "vue"
export default{
  name:"Demo",
  setup(){
    let person = reactive({
      age: 18,
      job:{
        j1:{
          salary: 20
        }
      }
    })
    console.log(person.job); // 是响应式对象

    let person2 = shallowReactive({
      age: 18,
      job:{
        j1:{
          salary: 20
        }
      }
    })
    console.log(person2.job); // 是普通对象

    return{ person, person2 }
  }
}
</script>

```
<img :src="$withBase('/vue3/13.png')">

```vue
<template>
  <h1>ref</h1>
  <h2>年龄: {{age}}</h2>
  <h2>薪水: {{job.salary}}</h2>
  <button @click='age++'>年龄+1</button>
  <button @click='job.salary++'>涨薪</button>
  <hr>
  <h1>shallowRef</h1>
  <h2>年龄: {{age2}}</h2>
  <h2>薪水: {{job2.salary}}</h2>
  <button @click='age2++'>年龄+1</button>
  <button @click='job2.salary++'>涨薪</button>
</template>

<script>
import { ref, shallowRef} from "vue"
export default{
  name:"Demo",
  setup(){
    let age = ref(18)
    let job = ref({
      salary: 10
    })
    console.log('ref基本类型',age);
    console.log('ref对象类型',job.value); // 依然具有响应式

    let age2 = shallowRef(18)
    let job2 = shallowRef({
      salary: 10
    })
    console.log('shallowRef基本类型',age2);
    console.log('shallowRef对象类型',job2.value); // 只是普通对象

    return{ age, job, age2, job2 }
  }
}
</script>
```
<img :src="$withBase('/vue3/14.png')">

## 2.readonly 与 shallowReadonly

- readonly: 让一个响应式数据变为只读的（深只读）。
- shallowReadonly：让一个响应式数据变为只读的（浅只读）。
- 应用场景: 不希望数据被修改时。

```vue
<template>
  <h2>年龄: {{age}}</h2>
  <h2>薪水: {{job.j1.salary}}</h2>
  <button @click='age++'>年龄+1</button>
  <button @click='job.j1.salary++'>涨薪</button>
  <h2>薪水2: {{job2.j1.salary}}</h2>
  <button @click='job2.j1.salary++'>涨薪2</button>
</template>

<script>
import { ref, reactive, readonly, shallowReadonly} from "vue"
export default{
  name:"Demo",
  setup(){
    let age = ref(18)
    let job = reactive({
      j1:{
        salary: 10
      }
    })

    // 无论嵌套多深都只读
    age = readonly(age)
    job = readonly(job)

    // 只把第一层变为只读
    let job2 = reactive({
      j1:{
        salary: 10
      }
    })
    job2 = shallowReadonly(job2)

    return{ age, job, job2 }
  }
}
</script>
```
## 3.toRaw 与 markRaw

- toRaw：
  - 作用：将一个由```reactive```生成的<strong style="color:orange">响应式对象</strong>转为<strong style="color:orange">普通对象</strong>。
  - 使用场景：用于读取响应式对象对应的普通对象，对这个普通对象的所有操作，不会引起页面更新。
- markRaw：
  - 作用：标记一个对象，使其永远不会再成为响应式对象。
  - 应用场景:
    1. 有些值不应被设置为响应式的，例如复杂的第三方类库等。
    2. 当渲染具有不可变数据源的大列表时，跳过响应式转换可以提高性能。

## 4.customRef

- 作用：创建一个自定义的 ref，并对其依赖项跟踪和更新触发进行显式控制。

```vue
<template>
  <input type="text" v-model="key">
  <h3>{{key}}</h3>
</template>

<script>
import { ref, customRef } from "vue"
export default{
  name:"Demo",
  setup(){
    // let key = ref('hello') // Vue内置ref

    // 自定义一个ref名为myRef
    function myRef(value, delay){
      let timer
      return customRef((track, trigger)=>{
        return {
          get:function(){
            console.log(`读取数据${value}`);
            
            track() // 通知Vue追踪value的变化(提前和get商量一下，让他认为这个value是有用的)
            return value
          },
          set:function(newVal){
            console.log(`修改数据为${newVal}`);

            clearTimeout(timer) // 防抖
            timer = setTimeout(()=>{
              value = newVal
              trigger() // 通知Vue去重新解析模板
            },delay)
          }
        }
      })
    }

    let key = myRef('hello',500)

    return{ key }
  }
}
</script>
```

<img :src="$withBase('/vue3/15.png')">
<img :src="$withBase('/vue3/16.png')">

## 5.provide 与 inject

- 作用：实现<strong style="color:#DD5145">祖与后代组件间</strong>通信

- 父组件有一个 `provide` 选项来提供数据，后代组件有一个 `inject` 选项来开始使用这些数据

- 具体写法：

  1. 祖组件中：

    ```vue
    <script>
      import { provide } from "Vue"
      export default{
        setup(){
          let car = reactive({name:'奔驰',price:'40万'})
          provide('car',car)
        }
      }
    </script>
    ```

  2. 后代组件中：

    ```vue
    <script>
      import { inject } from "Vue"
      export default{
        setup(props,context){
          const car = inject('car')
          return {car}
        }
      }
    </script>
    ```

## 6.响应式数据的判断

- isRef: 检查一个值是否为一个 ref 对象
- isReactive: 检查一个对象是否是由 `reactive` 创建的响应式代理
- isReadonly: 检查一个对象是否是由 `readonly` 创建的只读代理
- isProxy: 检查一个对象是否是由 `reactive` 或者 `readonly` 方法创建的代理