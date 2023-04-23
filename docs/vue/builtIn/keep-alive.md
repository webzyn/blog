# keep-alive

## 作用

- 主要用于保留组件状态或避免重新渲染。

## 特点

- \<keep-alive>包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。
- \<keep-alive> 是一个抽象组件：它自身不会渲染一个 DOM 元素，也不会出现在组件的父组件链中。
- \<keep-alive> 只能用在只有一个子组件的情况。如果你在其中有 v-for 则不会产生效果

## 钩子函数

- activated：激活，当组件在 keep-alive 内被切换时，进入组件触发
- deactivated：缓存，当组件在 keep-alive 内被切换时，离开组件触发

---

- 正常组件生命周期函数顺序
  - 第一次进入组件: beforeCreate -> created -> beforeMount -> mounted
  - 第一次离开组件: deactivated -> destroyed
  - 第二次进入组件: beforeCreate -> created -> beforeMount -> mounted
  - 第二次离开组件: deactivated -> destroyed
- 使用 keep-alive 生命周期函数执行顺序
  - 第一次进入组件: beforeCreate -> created -> beforeMount -> mounted -> activated
  - 第一次离开组件: deactivated
  - 第二次进入组件: activated
  - 第二次离开组件: deactivated

## 属性

- include - 字符串或正则表达式。只有名称匹配的组件会被缓存。
- exclude - 字符串或正则表达式。任何名称匹配的组件都不会被缓存。

## 常见使用方式

- 1.动态组件\<component>

```html
<keep-alive>
  <component :is="view"></component>
</keep-alive>
```

- 2.出现条件判断时的子组件

```html
<keep-alive>
  <comp-a v-if="a > 1"></comp-a>
  <comp-b v-else></comp-b>
</keep-alive>
```

- 3.结合路由使用

```html
<keep-alive>
  <router-view></router-view>
</keep-alive>
```

## 示例

[完整代码](/vue/builtIn/comp)

- 进入组件，进行操作，然后切换组件

<img :src="$withBase('/vue/builtIn/3.png')">

- 不使用 keep-alive 缓存组件时，状态丢失

<img :src="$withBase('/vue/builtIn/4.png')">

- 使用 keep-alive 缓存组件时，状态被保留

```html
<div class="content">
  <keep-alive>
    <component :is="active"></component>
  </keep-alive>
</div>
```

<img :src="$withBase('/vue/builtIn/3.png')">
