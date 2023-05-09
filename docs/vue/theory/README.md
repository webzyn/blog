# 原理

[[toc]]

## 数据代理

#### 作用

- 通过 vm 对象来代理 data 对象中属性的操作(读/写)
- 更加方便地操作 data 中的数据

#### 基本原理

- 1、通过 Object.defineProperty()把 data 对象中所有属性添加到 vm 上
- 2、为每个添加到 vm 上的属性，都指定一个 getter/setter
- 3、在 getter/setter 内部去操作(读/写)data 中对应的属性

<img :src="$withBase('/vue/theory/1.png')">

```html
<script>
  // 模拟Vue的data选项
  let data = {
    a: 1,
    b: 2,
  }

  // 简易Observe
  function Observe(obj) {
    const keys = Object.keys(obj)

    // 遍历给 构造函数生成的实例 添加属性
    keys.forEach((k) => {
      // Vue会对值进行判断，如果值依然是对象 则递归(略)
      Object.defineProperty(this, k, {
        enumerable: true,
        get() {
          return obj[k]
        },
        set(value) {
          obj[k] = value
        },
      })
    })
  }

  const obs = new Observe(data)
  console.log(obs)

  // 模拟一个Vue实例
  let vm = {}
  vm._data = obs
  console.log(vm)
</script>
```

## key 的作用

- 1、虚拟 DOM 中 key 的作用

  - key 是虚拟 DOM 对象的标识，当数据发生变化时，Vue 会根据【新数据】生成【新的虚拟 DOM】
  - 随后 Vue 进行【新虚拟 DOM】与【旧虚拟 DOM】的差异对比

- 2、对比规则
  - (1) 旧虚拟 DOM 中找到了与新虚拟 DOM 相同的 key:
    - ① 若虚拟 DOM 中内容没变,直接使用之前的真实 DOM!
    - ② 若虚拟 DOM 中内容变了，则生成新的真实 DOM，随后替换掉页面中之前的真实 DOM.
  - (2) 旧虚拟 DOM 中未找到与新虚拟 DOM 相同的 key
    - 创建新的真实 DOM，随后渲染到到页面。
