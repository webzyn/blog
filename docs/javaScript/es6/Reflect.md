# Reflect

[[toc]]

## 概述

Reflect 对象与 Proxy 对象一样，也是为了操作对象而提供的新 API。提供拦截 JavaScript 操作的方法

- Reflect `不是构造函数`,不能通过 new 运算符进行调用，也不能将 Reflect 对象作为函数调用
- Reflect 的所有属性和方法都是`静态`的

### 设计目的

- 1. 将 `Object` 对象的一些明显属于语言内部的方法，放到`Reflect`对象上
- 2. 修改某些 `Object` 方法的返回结果，让其变得更合理
- 3. 让 `Object` 操作都变成函数行为
- 4. Reflect 对象的方法与 Proxy 对象的方法一一对应,让 Proxy 对象可以方便地调用对应的 Reflect 方法，完成默认行为，作为修改行为的基础

### Proxy 与 Reflect 联合使用

- Proxy 拦截赋值操作
- Reflect 完成赋值的默认行为

## 静态方法

### Reflect.get() 读取对象中某个属性

- 描述: 从一个对象中取属性值，如果没有该属性则返回 undefined

> Reflect.get(target,propertyKey[,receiver])

- 参数
  - target: 需要取值的`目标对象`
  - propertyKey: 需要获取的值的`键值`
  - receiver: 如果`属性`部署了`取值函数(getter)`，则读取函数的`this`绑定`receiver`
- 返回值
  - `属性的值`
- 约束
  - target 必须是一个对象

```js
let obj = {
  foo: 1,
  bar: 2,
  get baz() {
    return this.foo + this.bar
  },
}

// 没有传 reveiver 参数
Reflect.get(obj, "foo") // 1
Reflect.get(obj, "bar") // 2
Reflect.get(obj, "baz") // 3

// 传 reveiver 参数 => baz 取值函数中的this绑定到该对象
let receiverObj = {
  foo: 10,
  bar: 20,
}
Reflect.get(obj, "foo", receiverObj) // 1
Reflect.get(obj, "bar", receiverObj) // 2
Reflect.get(obj, "baz", receiverObj) // 30

Reflect.get(1, "foo") // Uncaught TypeError: Reflect.get called on non-object
```

### Reflect.set() 给对象设置属性值

- 描述: 给目标对象设置属性值

> Reflect.set(target,propKey,value[,receiver])

- 参数
  - target: `目标对象`
  - propKey: `属性名`
  - value: `设置的值`
  - receiver: 如果属性设置了`赋值函数(setter)`,则赋值函数的 `this` 绑定 `receiver`
- 返回值
  - 返回一个`Boolean`值,表示是否设置成功
- 约束
  - 目标 target 必须是一个对象

```js
let obj = {
  foo: 1,
  set bar(value) {
    return (this.foo = value)
  },
}

obj.foo // 1
Reflect.set(obj, "foo", 10) // true
obj.foo // 10
// 调用赋值函数setter
Reflect.set(obj, "bar", 100) // true
obj.foo // 100

// 传 receiver 参数
let receiverObj = {
  foo: "我是receiver中的foo",
}
Reflect.set(obj, "foo", "传参receiver改变foo", receiverObj) // true
obj.foo // 100 => this 指向了receiver对象， 对象obj的 foo属性值未改变

receiverObj.foo // '传参receiver改变foo'
```

#### Proxy 和 Reflect 对象联合使用

- `Proxy.set` 拦截里面使用 `Reflect.set`，如果传入了 `receiver`，`Reflect.set` 会触发 `Proxy.defineProperty`
  - `Proxy.set` 的 `receiver` 参数指向`当前 Proxy 实例`
  - `Reflect.set` 会将属性赋值操作作用在 `receiver` 上，即 Proxy 实例上
  - `Proxy实例`改变导致触发 `Proxy.defineProperty` 拦截
  - 如果 `Reflect.set` 没有传入 `receiver`，捕获触发 `Proxy.defineProperty` 拦截

```js
let o = { a: "a" }
let handle = {
  set(target, key, value, receiver) {
    console.log("set触发")
    Reflect.set(target, key, value, receiver)
  },
  defineProperty(target, key, desc) {
    console.log("defineProperty触发")
    Reflect.defineProperty(target, key, desc)
  },
}

let p = new Proxy(o, handle)

p.a = "A"
// set触发
// defineProperty触发
```

### Reflect.has() 作用与 in 操作符相同(检查对象是否具有某属性)

- 描述: Reflect.has 用于检查一个对象是否拥有某个属性，相当于 in 操作符

> Reflect.has(target,propKey)

- 参数
  - target: `目标对象`
  - propKey: `属性名`，需要检查目标对象是否存在此属性
- 返回值
  - 返回一个 Boolean 值，表示是否存在此属性
- 约束
  - 目标对象必须是 Object 类型

```js
let obj = { a: 1, b: 2 }

// 旧写法
"a" in obj // true
"c" in obj // false

// 新写法
Reflect.has(obj, "a") // true
Reflect.has(obj, "c") // false
```

### Reflect.deleteProperty() 删除对象属性

- 描述: 用于删除对象的属性，等同于 `delete target[propKey]`

> Reflect.deleteProerty(target,propKey)

- 参数
  - target: `目标对象`
  - propKey: 需要删除的`属性的名称`
- 返回值
  - 返回 Boolean 值，表示是否删除成功
- 约束
  - target 必须是 Object 类型

```js
let obj = { a: 1, b: 2 }

// 旧写法
delete obj.a // true

// 新写法
Reflect.deleteProperty(obj, "b") // true
```

### Reflect.construct() 相当于 new 关键字

- 相当于运行 `new target(...args)`

> Reflect.construct(target, argumentsList[, newTarget])

- 参数
  - target: 被运行的目标`构造函数`
  - argumentsList: 类数组，目标构造函数`调用时的参数`
  - newTarget(可选): 作为新创建对象的`原型对象`的 `constructor` 属性
- 返回值
  - 一个实例
- 约束
  - target 和 newTarget 必须是构造函数

```js
function Person(name, age) {
  this.name = name
  this.age = age
}

// 旧写法
let p1 = new Person("张三", 20)
p1 // Person {name: '张三', age: 20}

// 新写法
let p2 = Reflect.construct(Person, ["李四", 20])
p2 // Person {name: '李四', age: 20}
```

#### Reflect.construct() 与 Object.create()

```js
function OneClass() {
  this.name = "one"
}
function OtherClass() {
  this.name = "other"
}

// 新写法
let obj = Reflect.construct(OneClass, [], OtherClass)

// 旧写法
let obj2 = Object.create(OtherClass.prototype)
OneClass.apply(obj2, [])
```

<img :src="$withBase('/javaScript/es6/Reflect_1.png')">

### Reflect.getPrototypeOf() 获取对象的原型

- 描述: Reflect.getPrototypeOf() 与 Object.getPrototypeOf()相同

> Reflect.getPrototypeOf(target)

- 参数
  - target: 获取原型的`目标对象`
- 返回值
  - 给定`对象的原型`。如果给定对象没有继承的属性，则返回 null
- 约束
  - target 必须是 Object

```js
let obj = {}

// 旧写法
Object.getPrototypeOf(obj)

// 新写法
Reflect.getPrototypeOf(obj)

Reflect.getPrototypeOf(obj) === Object.getPrototypeOf(obj) // true
```

### Reflect.setPrototypeOf() 给对象设置原型对象

- 改变指定对象的原型

> Reflect.setPrototypeOf(target, prototype)

- 参数
  - target: 设置原型的`目标对象`。
  - prototype: 对象的`新原型`（一个对象或 null）
- 返回值: 返回一个 Boolean 值，表示是否设置成功
- 约束
  - target 必须是 Object
  - prototype 必须是对象或 null

```js
let obj = {}

// 旧写法
Object.setPrototypeOf(obj, Array.prototype)

// 新写法
Reflect.setPrototypeOf(obj, Array.prototype) // true
```

### Reflect.apply() 改变 this 指向后执行函数

- 描述: 该方法与 ES5 中 `Function.prototype.apply()`方法类似

> Reflect.apply(target, thisArgument, argumentsList)

- 参数
  - target: `目标函数`
  - thisArgument: 函数调用时`绑定的 this 对象`
  - argumentsList: 函数调用时传入的`实参列表`
- 返回值
  - 函数调用后的返回值

```js
let arr = [11, 33, 22, 44, 55]

// 旧写法
let min = Math.min(...arr) // 11
let max = Math.max.apply(Math, arr) // 55
let type = Object.prototype.toString.call(arr) // '[object Array]'

// 新写法
let min = Reflect.apply(Math.min, Math, arr) // 11
let max = Reflect.apply(Math.max, Math, arr) // 55
let type = Reflect.apply(Object.prototype.toString, arr, []) // '[object Array]'
```

### Reflect.definePtoperty() 精确添加或修改对象上的属性

- [Object.defineProperty](/javascript/basis/object.html#object-defineproperty-设置属性描述符) `返回一个对象`，或者如果属性没有被成功定义，抛出一个 `TypeError`
- `Reflect.defineProperty` 方法只返回一个 `Boolean`，来说明该属性是否被成功定义

> Reflect.defineProperty(target, propertyKey, attributes)

- 参数
  - target: `目标对象`
  - propertyKey: 要定义或修改的`属性名`
  - attributes: 要定义或修改的`属性描述`
- 返回值
  - 返回`Boolean`，表示属性是否成功定义
- 约束
  - target 必须是 Object

```js
let obj = {}

// 旧写法
Object.defineProperty(obj, "a", { value: 1 }) // {a: 1}

// 新写法
Reflect.defineProperty(obj, "b", { value: 2 }) // true

console.log(obj) // {a: 1, b: 2}

let p = new Proxy(obj, {
  defineProperty(target, prop, descriptor) {
    console.log(descriptor)
    return Reflect.defineProperty(target, prop, descriptor)
  },
})
p.c = 3
// {value: 3, writable: true, enumerable: true, configurable: true}

console.log(p) // Proxy(Object) {c: 3, a: 1, b: 2}
console.log(obj) // {c: 3, a: 1, b: 2}
```

### Reflect.getOwnPropertyDescriptor() 获取属性描述符

> Reflect.getOwnPropertyDescriptor(target, propertyKey)

- 参数
  - target: 需要查找属性的`目标对象`。
  - propertyKey: 需要获取属性描述符的`属性名`。
- 返回值
  - 返回`属性描述符` 或 `undefined`
- 约束
  - target 必须是 Object

```js
let obj = {}
Object.defineProperty(obj, "a", {
  value: 1,
  enumerable: false,
})
Reflect.defineProperty(obj, "b", {
  value: 2,
  enumerable: false,
})

// 旧写法
let desc = Object.getOwnPropertyDescriptor(obj, "a")
desc // {value: 1, writable: false, enumerable: false, configurable: false}

// 新写法
let desc = Reflect.getOwnPropertyDescriptor(obj, "b")
desc // {value: 2, writable: false, enumerable: false, configurable: false}
```

### Reflect.isExtensible() 判断一个对象是否可扩展(是否能够添加新的属性)

- `Reflect.isExtensible` 判断一个对象是否可扩展（即是否能够添加新的属性）。与 [Object.isExtensible()](/javascript/basis/object.html#object-isextensible-判断对象是否可扩展) 方法一样

> Reflect.isExtensible(target)

- 参数
  - target: `目标对象`
- 返回值
  - 返回一个`Boolean`，表示是否该对象可扩展
- 约束
  - target 必须是 Object

```js
const myObject = {}

// 旧写法
Object.isExtensible(myObject) // true

// 新写法
Reflect.isExtensible(myObject) // true
```

### Reflect.preventExtensions() 阻止对象扩展

- `Reflect.preventExtensions` 方法阻止新属性添加到对象 (例如：防止将来对对象的扩展被添加到对象中)。该方法与 [Object.preventExtensions()](/javascript/basis/object.html#object-preventextensions-阻止对象扩展) 方法相似

> Reflect.preventExtensions(target)

- 参数
  - target: 阻止扩展的`目标对象`
- 返回值
  - 返回一个`Boolean`值，表示是否成功设置为不可扩展
- 约束
  - target 必须是 Object

```js
var myObject = {}

// 旧写法
Object.preventExtensions(myObject) // Object {}

// 新写法
Reflect.preventExtensions(myObject) // true
```

### Reflect.ownKeys() 获取对象自身属性键组成的数组

- `Reflect.ownKeys` 方法用于返回对象的所有属性，基本等同于 [Object.getOwnPropertyNames](/javascript/basis/object.html#object-getownpropertynames-获取对象的所有自身属性的属性名-包括不可枚举属性) 与 [Object.getOwnPropertySymbols](/javascript/basis/object.html#object-getownpropertysymbols-获取对象自身所有的-symbol-键名的属性) 之和

> Reflect.ownKeys(target)

- 参数
  - target: 获取自身属性键的`目标对象`。
  - 返回值: 由目标对象的`*自身属性键*组成的 Array`。

```js
var myObject = {
  foo: 1,
  bar: 2,
  [Symbol.for("baz")]: 3,
  [Symbol.for("bing")]: 4,
}

// 旧写法
Object.getOwnPropertyNames(myObject)
// ['foo', 'bar']

Object.getOwnPropertySymbols(myObject)
//[Symbol(baz), Symbol(bing)]

// 新写法
Reflect.ownKeys(myObject)
// ['foo', 'bar', Symbol(baz), Symbol(bing)]
```

## Proxy 实现观察者模式

观察者模式（Observer mode）指的是`函数自动观察数据对象`，一旦`对象有变化`，`函数就会自动执行`

```js
// 存放所有 观察者函数
const queuedObservers = new Set()

// 将 观察者函数 存入Set队列
const observe = (fn) => queuedObservers.add(fn)

const handle = {
  set(target, key, value, receiver) {
    const result = Reflect.set(target, key, value, receiver)
    // 执行 所有 观察者函数
    queuedObservers.forEach((observe) => observe())
    return result
  },
}

// 创建一个 Proxy 代理， 拦截赋值操作
const observable = (obj) => new Proxy(obj, handle)

// 观察目标
let person = observable({
  name: "张三",
  age: 20,
})
let print1 = () => {
  console.log(person.name)
}
let print2 = () => {
  console.log(person.age)
}
observe(print1, print2)

person.age = 22
// 张三
// 22
```

[阮一峰](https://es6.ruanyifeng.com/#docs/reflect)
[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect)
