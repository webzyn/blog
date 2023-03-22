# Class(停)

[[toc]]

## 什么是类

- class 类是一种抽象的体现，用来表示具有相同特性的一类事物。

- JavaScript 使用原型继承：每个对象都从其原型对象继承属性和方法。
- `原型继承可以模仿经典类的继承`。ES6 引入 class 语法(`基于原型继承上的语法糖`)

```js
// ES5 使用构造函数
function Point(x, y) {
  this.x = x
  this.y = y
}
Point.prototype.toString = function () {
  return `(${this.x},${this.y})`
}
let p = new Point(1, 2)

p // Point {x: 1, y: 2}

// ES6 使用 class
class Point {
  // constructor => 构造函数
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  toString() {
    return `(${this.x},${this.y})`
  }
}
let p = new Point(1, 2)
p // Point {x: 1, y: 2}

// 类的数据类型是函数
typeof Point // 'function'

// 类本身指向构造函数
Point === Point.prototype.constructor // true
```

## constructor() 方法

- constructor()方法是类的`默认方法`，通过 new 命令生成对象实例时，自动调用该方法。
- 如果不指定一个构造函数 (constructor) 方法，则使用一个默认的构造函数 (constructor)

> constructor([arguments]) { ... }

- 返回值
  - 默认返回实例对象(this)
  - 可以指定返回另一个对象

```js
// 默认 添加 构造函数
class Point {}

// 等同于
class Point {
  constructor() {}
}

// 指定返回另一个对象
class Foo {
  constructor() {
    return Object.create(null)
  }
}
// constructor()函数返回一个全新的对象，导致实例对象不是Foo类的实例
new Foo() instanceof Foo // false
```

## 类的实例

- 使用 `new` 命令，生成类的实例
- 类的属性和方法，除非显式定义在其本身（即定义在 this 对象上），否则都是定义在原型上（即定义在 class 上）

```js
class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  toString() {
    return `(${this.x},${this.y})`
  }
}

let p = new Point(1, 2)

p.toString() // '(1,2)'

p.hasOwnProperty("x") // true => 存在于 实例本身 上

p.hasOwnProperty("toString") // false

p.__proto__.hasOwnProperty("toString") // true
p.__proto__.hasOwnProperty("constructor") // true
// 相当于
Object.getPrototypeOf(p).hasOwnProperty("toString") // true
```

<img :src="$withBase('/javaScript/es6/class_1.png')">

[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes)
[文章](https://juejin.cn/post/6844904041697263623)
