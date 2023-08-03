# Class 语法

[[toc]]

## 什么是类

- `class`可以被看作一个语法糖，让对象原型的写法更加清晰、更像面向对象编程的语法。

```js
// --------------class---------------
class PersonAsClass {
  // 实例属性/方法：定义在构造函数内部的属性，使用绑定在this上面。只能实例去访问，构造函数访问不到
  prop = "实例属性" // (方法2)
  // 构造器 相当于ES5中的构造函数
  constructor(name, age) {
    // 实例属性
    this.name = name // (方法1)
    this.age = age
    // 实例方法
    this.sayAge = function () {
      console.log("实例方法")
    }
  }

  // 原型属性/方法：定义在构造函数原型上的方法。实例可以访问到。构造函数可以通过prototype属性来访问
  // 不可枚举(与ES5不同)
  sayName() {
    console.log(this.name)
  }

  // 静态属性/方法:定义在构造函数上的属性，只能由构造函数来进行调用
  static P = "PersonAsClass上的属性(静态属性)"
  static say() {
    console.log("PersonAsClass上的方法")
  }

  // 私有属性/方法: 只能在内部调用
  #weight = "50kg"
  #sayWeight = function () {
    console.log(this.#weight)
  }
}

// MDN: 原型的数据属性必须定义在类定义的外面
PersonAsClass.prototype.height = "180cm"

let a = new PersonAsClass("张三", 18)
console.log(a, "class实例")

// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------
// -------------构造函数------------
function PersonAsFunction(name, age) {
  // 实例属性/方法：定义在构造函数内部的属性，使用绑定在this上面。只能实例去访问，构造函数访问不到
  this.name = name
  this.age = age
  // 实例方法
  this.sayAge = function () {
    console.log("实例方法")
  }
  // 模拟私有属性/方法: 无法强约束
  this._weight = "50kg"
  this._sayWeight = function () {
    console.log(this._weight)
  }
}

// 原型属性/方法：定义在构造函数原型上的方法。实例可以访问到。构造函数可以通过prototype属性来访问
// 可枚举
PersonAsFunction.prototype.height = "180cm"
PersonAsFunction.prototype.sayName = function () {
  console.log(this.name)
}

// 静态属性/方法:定义在构造函数上的属性，只能由构造函数来进行调用
PersonAsFunction.P = "PersonAsFunction上的属性(静态属性)"
PersonAsFunction.say = function () {
  console.log("PersonAsFunction上的方法(静态方法)")
}

let b = new PersonAsFunction("李四", 20)
console.log(b, "构造函数实例")
```

- class
  <img :src="$withBase('/javaScript/es6/class_07.png')">
  <img :src="$withBase('/javaScript/es6/class_05.png')">

- 构造函数
  <img :src="$withBase('/javaScript/es6/class_08.png')">
  <img :src="$withBase('/javaScript/es6/class_06.png')">

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
```

## 类的实例

- 使用 `new` 命令，生成类的实例
- 类的属性和方法，除非显式定义在其本身（即定义在 this 对象上），否则都是定义在原型上（即定义在 class 上）

```js{2-6,10-12}
// --------------class---------------
class PersonAsClass {
  constructor(name, age) {
    this.name = name
  }
}
let a = new PersonAsClass("张三", 18)

// -------------构造函数------------
function PersonAsFunction(name, age) {
  this.name = name
}
let b = new PersonAsFunction("李四", 20)
```

## 实例属性/方法

- 定义在构造函数内部的属性，使用绑定在 this 上面。只能实例去访问，构造函数访问不到

```js{3,5-10,16-21}
// --------------class---------------
class PersonAsClass {
  prop = "实例属性" // (实例属性: 写法2)
  constructor(name, age) {
    this.name = name // (实例属性: 写法1)
    this.age = age
    // 实例方法
    this.sayAge = function () {
      console.log("实例方法")
    }
  }
}

// -------------构造函数------------
function PersonAsFunction(name, age) {
  this.name = name
  this.age = age
  // 实例方法
  this.sayAge = function () {
    console.log("实例方法")
  }
}
```

## 原型属性/方法

- 定义在构造函数原型上的方法。实例可以访问到。构造函数可以通过 prototype 属性来访问

```js{4-6,10,15-18}
// --------------class---------------
class PersonAsClass {
  // 不可枚举(与ES5不同)
  sayName() {
    console.log(this.name)
  }
}
// MDN: 原型的数据属性必须定义在类定义的外面
// 可枚举
PersonAsClass.prototype.height = "180cm"

// -------------构造函数------------
function PersonAsFunction() {}
// 可枚举
PersonAsFunction.prototype.height = "180cm"
PersonAsFunction.prototype.sayName = function () {
  console.log(this.name)
}
```

## 静态属性/方法

- 定义在构造函数上的属性，只能由构造函数来进行调用

```js{3-6,11-14}
// --------------class---------------
class PersonAsClass {
  static P = "PersonAsClass上的属性(静态属性)"
  static say() {
    console.log("PersonAsClass上的方法")
  }
}

// -------------构造函数------------
function PersonAsFunction() {}
PersonAsFunction.P = "PersonAsFunction上的属性(静态属性)"
PersonAsFunction.say = function () {
  console.log("PersonAsFunction上的方法(静态方法)")
}
```

## 私有属性/方法

- 只能在内部调用

```js{3-6,12-15}
// --------------class---------------
class PersonAsClass {
  #weight = "50kg"
  #sayWeight = function () {
    console.log(this.#weight)
  }
}

// -------------构造函数------------
function PersonAsFunction(name, age) {
  // 模拟私有属性/方法: 无法强约束
  this._weight = "50kg"
  this._sayWeight = function () {
    console.log(this._weight)
  }
}
```

## 取值函数（getter）和存值函数（setter）

- 与 ES5 一样，在“类”的内部可以使用`get`和`set`关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为

```js{5-10}
class MyClass {
  constructor() {
    // ...
  }
  get prop() {
    return "getter"
  }
  set prop(value) {
    console.log("setter: " + value)
  }
}
```

## in 运算符

- in 运算符判断某个对象是否有某个私有属性#xxx

```js{2-5}
class PersonAsClass {
  #weight = "50kg"
  test() {
    console.log(#weight in this)
  }
  testX(){
    console.log(#x in this) // 报错 私有属性没有声明，就直接用于in运算符的判断,导致报错。
  }
}
let p = new PersonAsClass()
p.test() // true
```

## 静态块

- 在类的内部设置一个代码块，在类生成时运行且只运行一次
- 主要作用是<span style="color:red">对静态属性进行初始化</span>。
- 以后，新建类的实例时，这个块就不运行了。

```js{5-10}
function fn(x, y) {
  return x + y
}
// 静态块的内部不能有return语句
class PersonAsClass {
  static r1
  static r2
  static {
    // this 指当前类
    this.r1 = fn(1, 2) // static r1 = 3
    // PersonAsClass 当前类名
    PersonAsClass.r2 = fn(10, 20) // static r2 = 30
  }
}
```

<img :src="$withBase('/javaScript/es6/class_09.png')">

## name 属性

```js
class Point {}
Point.name // "Point"
```

[阮一峰 ES6](https://es6.ruanyifeng.com/#docs/class)
[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes)
[文章](https://juejin.cn/post/6844904041697263623)
