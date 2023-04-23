# slot 插槽

### 1. 默认插槽/匿名插槽

通过组件标签内容区域传入数据,默认被挂载到 this.$slots.default 上

**父组件**

<img :src="$withBase('/vue/components/slot_1.png')">

**子组件**

<img :src="$withBase('/vue/components/slot_2.png')">

**渲染结果**

<img :src="$withBase('/vue/components/slot_3.png')">

### 2. 具名插槽

一个不带 `name` 的 `<slot>` 出口会带有隐含的名字“default”。

**父组件**

<img :src="$withBase('/vue/components/slot_4.png')">

**子组件**

<img :src="$withBase('/vue/components/slot_5.png')">

**渲染结果**

<img :src="$withBase('/vue/components/slot_6.png')">

### 3. 作用域插槽 | 带数据的插槽

父组件访问子组件的数据，然后传递回子组件

**父组件**

<img :src="$withBase('/vue/components/slot_7.png')">

**子组件**

<img :src="$withBase('/vue/components/slot_8.png')">

**渲染结果**

<img :src="$withBase('/vue/components/slot_9.png')">
