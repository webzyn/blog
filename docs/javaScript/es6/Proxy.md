# Proxy

[[toc]]

## 基本用法

`Proxy(代理)`: 在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写

> var proxy = new Proxy(target, handler);

- `new Proxy()`表示生成一个 Proxy 实例
- `target` 参数表示所`要拦截的目标对象`
- `handler` 参数也是一个`对象`，用来`定制拦截行为`(键是需要代理的操作，值是处理函数)
  - 对于每一个被代理的操作，需要提供一个对应的处理函数，该函数将拦截对应的操作

```js
// 拦截读取属性
var proxy = new Proxy(
  {},
  {
    get: function (target, propKey) {
      return 35
    },
  }
)

proxy.name // 35
proxy.title // 35
```

- Proxy 实例可以作为其他对象的`原型对象`

## Proxy.revocable() 返回一个可取消的 Proxy 实例

> let p = Proxy.revocable(target,handle)

- 返回值
  - 返回一个对象
    - proxy 属性是 Proxy 实例
    - revoke 属性是一个函数，可以取消 Proxy 实例

```js
let target = {},
  handle = {}
let p = Proxy.revocable(target, handle)

p.proxy.foo = 123
console.log(p.proxy.foo) // 123

// 取消代理
p.revoke()
console.log(p.proxy.foo) // Uncaught TypeError: Cannot perform 'get' on a proxy that has been revoked
```

## handle 对象上 的方法(13 种)

### get() 拦截某个属性的读取操作

- get 方法用于拦截对象某个属性的读取操作

> get(target, propKey, receiver)

- 参数
  - target: `目标对象`
  - propKey: `属性名`
  - receiver(可选): `Proxy` 或者`继承 Proxy 的对象`
- 返回值

  - 任意值

- 拦截以下操作
  - 访问属性：`proxy[foo]` 和 `proxy.bar`
  - 访问原型链上的属性：`Object.create(proxy)[foo]`
  - `Reflect.get()`
- 约束
  - 如果一个属性`不可配置`（configurable）且`不可写`（writable），则`handle.get`返回值必须与目标属性值相同(不能修改值)
  - 如果要访问的目标属性没有配置访问方法，即 get 方法是 undefined 的，则返回值必须为 undefined

```js
let person = { name: "张三" }
let proxy = new Proxy(person, {
  get: function (target, propKey, receiver) {
    if (propKey in target) {
      // 对象中存在某属性 取出属性值
      return target[propKey]
    } else {
      // 对象中不存在属性 抛出异常
      throw new Error(`目标对象不存在属性${propKey}`)
    }
  },
})
proxy.name // '张三'
proxy.age // Uncaught Error: 目标对象不存在属性age

const proxy = new Proxy(
  {},
  {
    get: function (target, key, receiver) {
      return receiver
    },
  }
)
proxy.name === proxy // true
```

#### get 方法可以继承

```js
let proxy = new Proxy(
  {
    foo: "我是foo",
  },
  {
    get(target, propertyKey, receiver) {
      return target[propertyKey]
    },
  }
)

let obj = Object.create(proxy) // 将proxy设为obj的原型对象
obj.foo // '我是foo'
```

#### 如果一个属性不可配置（configurable）且不可写（writable），则 Proxy 不能修改该属性，否则通过 Proxy 对象访问该属性会报错

```js
const target = Object.defineProperties(
  {},
  {
    foo: {
      value: 123,
      writable: false,
      configurable: false,
    },
  }
)

const handler = {
  get(target, propKey) {
    return "abc"
  },
}

const proxy = new Proxy(target, handler)

proxy.foo
// Uncaught TypeError: 'get' on proxy: property 'foo' is a read-only and non-configurable data property on the proxy target but the proxy did not return its actual value (expected '123' but got 'abc')
```

### set() 拦截某个属性的赋值操作

- set 方法用来拦截某个属性的赋值操作

> set(target, propKey, value, receiver)

- 参数
  - target: `目标对象`
  - propKey: `属性名`
  - value: `属性值`
  - receiver(可选): `proxy 实例本身`
- 返回值
  - 返回 true 代表属性设置成功
- 拦截以下操作

  - 指定属性值：`proxy[foo] = bar` 和 `proxy.foo = bar`
  - 指定继承者的属性值：`Object.create(proxy)[foo] = bar`
  - `Reflect.set()`

- 约束
  - 如果目标属性`不可写`、`不可配置`，不能设置它的值。
  - 严格模式下，`set()`如果返回 `false`，会抛出异常
  - 如果目标属性没有配置存储方法，即 defineProperty 的 set 方法是 undefined 的，不能设置它的值。

```js
let setMinValue = {
  set: function (target, propKey, value) {
    if (value < 200) {
      target[propKey] = 200
    } else {
      target[propKey] = value
    }
    return true
  },
}
let person = new Proxy({}, setMinValue)
person.age = 100
person.result = 500
console.log(person.age) // 200
console.log(person.result) // 500
```

- 示例：禁止内部属性被访问

```js
function invariant(key, action) {
  if (key[0] === "_") {
    throw new Error(`${action}私有${key}属性的尝试失效`)
  }
}
const handle = {
  get(target, key) {
    invariant(key, "获取")
    return target[key]
  },
  set(target, key, value) {
    invariant(key, "设置")
    target[key] = value
    return true
  },
}
const proxy = new Proxy({}, handle)

console.log(proxy._prop) // Uncaught Error: 获取私有_prop属性的尝试失效
proxy._prop = "a" // VM4975:3 Uncaught Error: 设置私有_prop属性的尝试失效
```

#### 如果目标对象自身的某个属性不可写（writable），那么 set 方法将不起作用

```js
const obj = {}
Object.defineProperty(obj, "foo", {
  value: "bar",
  writable: false, // 设置foo属性不可写
  configurable: true,
})
const handle = {
  set(obj, prop, value) {
    obj[prop] = value
    return true
  },
}
const proxy = new Proxy(obj, handle)
proxy.foo = "foo"
console.log(proxy.foo) // "bar"
```

### apply() 拦截函数的调用、call 和 apply 操作

- `apply` 方法`拦截函数的调用`、`call` 和 `apply` 操作

> apply (target, ctx, args)

- 参数
  - target: `目标对象(函数)`
  - ctx: 目标对象的`上下文对象`(this)
  - args: 目标对象的`参数数组`
- 返回值
  - 返回任意值
- 拦截以下操作
  - `proxy(...args)`
  - `Function.prototype.apply()` 和 `Function.prototype.call()`
  - `Reflect.apply()`
- 约束
  - target 必须是一个函数对象
- 注意：`Proxy 实例`作为`函数调用`时，会被 `apply()`方法拦截

```js
var target = function () {
  return "I am the target"
}
var handle = {
  apply: function () {
    return "I am the proxy"
  },
}
var p = new Proxy(target, handle)
p() // "I am the proxy"
```

### has() 拦截 in 操作符

- has()方法用来拦截 `HasProperty` 操作，即`判断对象是否具有某个属性`时，这个方法会生效。典型的操作就是`in运算符`。

> has(target,propKey)

- 参数
  - target: `目标对象`
  - propKey: `需查询的属性名`
- 返回值
  - 返回一个 boolean 属性的值。
- 拦截以下操作
  - 属性查询：`foo in proxy`
  - 继承属性查询：`foo in Object.create(proxy)`
  - with 检查: `with(proxy) { (foo); }`
  - `Reflect.has()`
- 约束
  - 如果目标属性`不可配置(configurable)`，该属性不能够被代理隐藏
  - 如果目标属性`禁止扩展(Object.preventExtensions)`，该属性不能够被代理隐藏

```js
let target = {
  _prop: "_prop",
  prop: "prop",
}
let handle = {
  has(target, key) {
    if (key[0] === "_") {
      return false // 原对象属性名第一个字符是下划线，返回false，从而不会被in运算符发现
    }
    return key in target
  },
}
let proxy = new Proxy(target, handle)

"_prop" in proxy // false
"prop" in proxy // true

for (let i in proxy) {
  console.log(i) // _prop prop
}
```

#### 原对象不可配置(configurable)或者禁止扩展(Object.preventExtensions)，时 has()拦截会报错

```js
let obj = { a: 10 }
Object.preventExtensions(obj)

let p = new Proxy(obj, {
  has(target, prop) {
    return false
  },
})

"a" in p // Uncaught TypeError: 'has' on proxy: trap returned falsish for property 'a' but the proxy target is not extensible
```

### construct() 拦截 new 命令

- construct()方法用于拦截 new 命令

> construct (target, args, newTarget)

```js
const handle = {
  construct(target, args, newTarget) {
    return new target(...args)
  },
}
```

- 参数:
  - target: `目标对象`(必须是函数)
  - args: 构造函数的`参数数组`
  - newTarget(可选): 创造实例对象时，new 命令作用的构造函数
- 返回值
  - construct()方法返回的必须是一个`对象`
- 拦截以下操作
  - `new proxy(...args)`
  - `Reflect.construct()`

```js
const P = new Proxy(function () {}, {
  construct(target, args) {
    return { value: args[0] * 10 }
  },
})
let o = new P(1)
console.log(o) // {value: 10}
```

### deleteProperty() 拦截 delete 操作

- `deleteProperty` 方法用于拦截 `delete` 操作，如果这个方法`抛出错误`或者返回 `false`，当前属性就无法被 delete 命令删除

> deleteProperty(target, propKey)

- 参数

  - target: `目标对象`
  - propKey: 待删除的`属性名`

- 返回值
  - 必须返回一个 Boolean 类型的值，表示了该属性是否被成功删除。
- 拦截以下操作
  - 删除属性：`delete proxy[foo]` 和 `delete proxy.foo`
  - `Reflect.deleteProperty()`
- 约束
  - 目标对象自身的`不可配置`（configurable）的属性，不能被 deleteProperty 方法删除

```js
function invariant(key, action) {
  if (key[0] === "_") {
    throw new Error(`${action}私有${key}属性的尝试无效`)
  }
}
let handle = {
  deleteProperty(target, key) {
    invariant(key, "删除")
    delete target[key]
    return true
  },
}
let target = {
  _prop: "_prop",
  prop: "prop",
}
let proxy = new Proxy(target, handle)
delete proxy._prop // Uncaught Error: 删除私有_prop属性的尝试无效
delete proxy.prop // true

console.log(proxy) // Proxy(Object) {_prop: '_prop'}
console.log(target) // {_prop: '_prop'}
```

### defineProperty() 拦截 Object.defineProperty()操作

- defineProperty()方法拦截了 Object.defineProperty()操作

> defineProperty (target, propKey, descriptor)

- 参数:
  - target: `目标对象`
  - propKey: `属性名`
  - descriptor: 这个属性的`描述对象`
- 返回值
  - 必须以一个 `Boolean` 返回，表示定义该属性的操作成功与否
- 会拦截以下操作
  - `Object.defineProperty()` 设置属性描述符
  - `Reflect.defineProperty()`
  - `proxy.property = 'value'`
- 约束
  - 如果目标对象`不可扩展`，将`不能`添加属性
  - 如果目标对象属性`不可配置`,`不能`添加或者修改属性
  - 在严格模式下，false 作为 handler.defineProperty 方法的返回值的话将会抛出异常

```js
let handle = {
  defineProperty(target, key, desc) {
    Object.defineProperty(target, key, {
      value: desc.value === "foo" ? "foo" : "bar",
      writable: true,
      enumerable: true,
      configurable: true,
    })
    return true
  },
}
let target = {}
let proxy = new Proxy(target, handle)

Object.defineProperty(proxy, "foo", { value: "foo" })
// Proxy(Object) {foo: 'foo'}
Object.defineProperty(proxy, "aaa", { value: "aaa" })
// Proxy(Object) {foo: 'foo', aaa: 'bar'}
```

### getOwnPropertyDescriptor() 拦截 Object.getOwnPropertyDescriptor()

- getOwnPropertyDescriptor()方法拦截 Object.getOwnPropertyDescriptor()

> getOwnPropertyDescriptor (target, prop)

- 参数:
  - target: `目标对象`
  - prop: `属性名`
- 返回值
  - 返回一个`属性描述对象` 或者 `undefined`
- 可以拦截的操作
  - `Object.getOwnPropertyDescriptor()` 获取属性描述符
  - `Reflect.getOwnPropertyDescriptor()`
- 约束
  - handle.getOwnPropertyDescriptor 必须返回一个 `object` 或 undefined
  - 如果目标属性为不可配置，则该属性无法报告为不存在
  - 如果目标对象存在，且不可扩展，则该属性无法报告为不存在
  - 如果目标属性不存在，且不可扩展，则不能将其报告为存在
  - 如果为目标属性不存在，或者目标属性不可配置，属性不能被报告为不可配置
  - Object.getOwnPropertyDescriptor（target）的结果可以使用 Object.defineProperty 应用于目标对象，也不会抛出异常

```js
let handle = {
  getOwnPropertyDescriptor(target, key) {
    if (key[0] === "_") {
      return undefined
    }
    return Object.getOwnPropertyDescriptor(target, key)
  },
}
let target = { _foo: "_foo", bar: "bar" }
let proxy = new Proxy(target, handle)

Object.getOwnPropertyDescriptor(proxy, "foo") // undefined
Object.getOwnPropertyDescriptor(proxy, "_foo") // undefined => proxy 拦截
Object.getOwnPropertyDescriptor(proxy, "bar")
// {value: 'bar', writable: true, enumerable: true, configurable: true}
```

### getPrototypeOf() 拦截获取对象原型

- getPrototypeOf()方法主要用来拦截获取对象原型

> getPrototypeOf(target)

- 参数:
  - target: `目标对象`
- 返回值
  - 返回`一个对象`或者`null`
- 可以拦截的操作
  - `Object.getPrototypeOf()`
  - `Reflect.getPrototypeOf()`
  - `Object.prototype.__proto__`
  - `Object.prototype.isPrototypeOf()`
  - `instanceof`
- 约束
  - handle.getPrototypeOf() 方法`必须`返回`对象`或者`null`
  - 如果目标对象是`不可扩展`的， 该方法返回的原型必须是`目标对象本身的原型`

```js
let proto = { a: 1 }
let p = new Proxy(
  {},
  {
    getPrototypeOf(target) {
      return proto
    },
  }
)
Object.getPrototypeOf(p) // {a: 1}
```

```js
let pro = Object.create(null, { z: { value: "z" } })

let obj = Object.create(pro, { a: { value: 1 } }) // 创建新对象，并把pro设为obj的原型对象

Object.preventExtensions(obj) // 将obj设为不可扩展
Object.isExtensible(obj) // false => 不可扩展

let p = new Proxy(obj, {
  getPrototypeOf(target) {
    // return { a: 1 } => 报错
    return pro
  },
})
Object.getPrototypeOf(p) // {z: 'z'}
Object.getPrototypeOf(obj) // {z: 'z'}

Object.getPrototypeOf(p) === pro // true
```

### setPrototypeOf() 拦截 Object.setPrototypeOf()

> setPrototypeOf (target, proto){}

- 参数
  - target： 被拦截`目标对象`
  - prototype： `对象新原型`或`null`
- 返回值
  - 返回一个 `Boolean` 值或`可转换成 Boolean 的值`
- 可以拦截的操作
  - `Object.setPrototypeOf()`
  - `Reflect.setPrototypeOf()`
- 约束
  - 如果目标对象是`不可扩展`的， 原型`参数`必须与 `Object.getPrototypeOf(target)` 的值相同

```js
// 不为对象设置一个新的原型
// handler 的 setPrototypeOf 方法 抛出异常
var newProto = {},
  target = {}

var handler = {
  setPrototypeOf(target, proto) {
    throw new Error("不能修改原型对象")
  },
}

var p1 = new Proxy(target, handler)
Object.setPrototypeOf(p1, newProto) // Uncaught Error: 不能修改原型对象
```

### preventExtensions() 拦截 Object.preventExtensions()

- handler.preventExtensions() 拦截 Object.preventExtensions()返回一个布尔值

> preventExtensions: function(target) {}

- 参数
  - target: `目标对象`
- 返回值
  - 返回一个 `Boolean` 值或`可转换成 Boolean 的值`
- 可以拦截的操作
  - `Object.preventExtensions()` 阻止对象扩展
  - `Reflect.preventExtensions()`
- 约束条件(强限制)
  - 如果目标对象是可扩展的，那么只能变为不可扩展
  - 只有`目标对象不可扩展`时（即 Object.isExtensible(proxy)为 false），`proxy.preventExtensions 才能返回 true`

```js
// 对象默认是可扩展的
let obj = { a: 1 }
Object.isExtensible(obj) // true

let p1 = new Proxy(obj, {
  preventExtensions(target) {
    console.log("---拦截Object.preventExtensions()方法---")
    Object.preventExtensions(target) // 将目标对象不可扩展 => 重要
    return true
  },
})

Object.preventExtensions(p1)
// ---拦截Object.preventExtensions()方法---
// Proxy(Object) {a: 1}

Object.isExtensible(p1) // false
Object.isExtensible(obj) // false
```

### isExtensible() 拦截 Object.isExtensible()

- isExtensible()方法拦截 Object.isExtensible()操作

> isExtensible(target){}

- 参数
  - target: `目标对象`
- 返回值
  - 必须返回一个 `Boolean` 值或`可转换成 Boolean 的值`
- 可以拦截的操作
  - `Object.isExtensible()` 判断对象是否可扩展
  - `Reflect.isExtensible()`
- 约束
  - `Object.isExtensible(proxy)` 必须同 `Object.isExtensible(target)` 返回相同值

```js
let obj = { name: "张三" }
// 将对象obj设为不可扩展
Object.preventExtensions(obj)
console.log(Object.isExtensible(obj)) // false

let proxy = new Proxy(obj, {
  isExtensible(target) {
    return true
  },
})
Object.isExtensible(proxy) // 报错 => 不满足强限制

let p = new Proxy(obj, {
  isExtensible(target) {
    console.log("---拦截Object.isExtensible()---")
    return Object.isExtensible(target)
  },
})
Object.isExtensible(p)
// ---拦截Object.isExtensible()---
// false
```

### ownKeys() 拦截对象自身属性的读取操作

- ownKeys()方法用来拦截对象自身属性的读取操作

> ownKeys(target)

- 参数
  - target: `目标对象`
- 返回值
  - 必须返回一个`可枚举对象`
- 可以拦截以下操作

  - `for...in 循环`
  - `Object.getOwnPropertyNames()`\
    获取对象的所有自身属性的属性名(包括不可枚举属性,不包括 Symbol 键名属性)
  - `Object.getOwnPropertySymbols()` 获取对象自身所有的 Symbol 键名的属性
  - `Object.keys()` 返回可枚举属性的 key 组成的数组
  - `Reflect.ownKeys()`

- 约束

  - handle.ownKeys 的结果必须是一个`数组`
  - 数组的`元素类型`必须是一个 `String` 或者 `Symbol`
  - 数组必须包含`目标对象`的`不可配置的 key`、`自有属性的 key`
  - 如果目标对象`不可扩展`，那么必须包含目标对象的`所有自有（own）属性的 key`，`不能有其他值`

#### 拦截 for...in 循环

- 会被过滤的属性
  - 目标对象上不存在的属性
  - 属性名为 Symbol 值
  - 不可遍历（enumerable）的属性

```js
let target = { a: 1 }

let handle = {
  ownKeys(target) {
    return ["b", "c"]
  },
}

// 进行拦截
let p1 = new Proxy(target, handle)
for (let i in p1) {
  console.log(i)
} // 没有任何输出  => 因为ownkeys()指定只返回b和c属性，但是目标对象没有这两个属性

// 未拦截
for (let i in target) {
  console.log(i)
} // "a"
```

#### 拦截 Object.keys()

- 会被过滤的属性
  - 目标对象上不存在的属性
  - 属性名为 Symbol 值
  - 不可遍历（enumerable）的属性

```js
let obj = {
  a: 1,
  b: 2,
  c: 3,
}

let handle = {
  ownKeys(target) {
    return ["a", "d"]
  },
}

// 进行拦截
let p1 = new Proxy(obj, handle)
Object.keys(p1) // ['a']

// 不拦截
Object.keys(obj) // ['a', 'b', 'c']
```

#### 拦截 Object.getOwnPropertyNames()

```js
let obj = {}
let handle = {
  ownKeys(target) {
    return ["a", "b", "c"]
  },
}

// 拦截
let p1 = new Proxy(obj, handle)
Object.getOwnPropertyNames(p1) // ['a', 'b', 'c']

// 未拦截
Object.getOwnPropertyNames(obj) // []
```

## this

- 在 Proxy 代理的情况下，`目标对象`内部的 this 关键字会指向 `Proxy 代理`

```js
const target = {
  m: function () {
    console.log(this)
  },
}
target.m() // {m: ƒ} => 指向target对象

const handle = {}
const proxy = new Proxy(target, handle)
proxy.m() // Proxy(Object) {m: ƒ} => 指向 Proxy对象
```

- Proxy `拦截函数`内部的 this，指向的是 `handler 对象`

```js
const handler = {
  get: function (target, key, receiver) {
    console.log(this === handler)
    return "Hello, " + key
  },
}

const proxy = new Proxy({}, handler)

proxy.foo
// true
// Hello, foo
```

[前往 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
