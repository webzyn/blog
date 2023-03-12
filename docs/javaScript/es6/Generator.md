# Generator 函数

[[toc]]

## 基本概念

Generator 函数是 ES6 提供的一种异步编程解决方案

```js
function * foo(x, y) { ··· }
function *foo(x, y) { ··· }
function* foo(x, y) { ··· } // 一般采用这种
function*foo(x, y) { ··· }
```

### 如何理解

- 语法方面
  - Generator 函数是一个`状态机`，封装了多个内部状态
- 执行方面
  - 执行 Generator 函数会返回一个遍历器对象(Iterator 对象)，是一个`遍历器生成函数`
- 形式方面
  - function 关键字与函数名之间有一个星号
  - 函数体内部使用 yield 表达式，定义不同的内部状态

```js
// 遍历器生成函数
function* hwGenerator() {
  yield "hello"
  yield "world"
  return "ending"
}
var hw = hwGenerator() // 返回一个遍历器对象

hw.next() // { value: 'hello', done: false }
hw.next() // { value: 'world', done: false }
hw.next() // { value: 'ending', done: true }
hw.next() // { value: undefined, done: true }
```

### next 方法运行逻辑

- （1）遇到 `yield` 表达式，就暂停执行后面的操作，并将紧跟在 `yield 后面的那个表达式的值`，作为`返回的对象的 value 属性值`。
- （2）下一次调用 next 方法时，再继续往下执行，直到遇到下一个 yield 表达式。
- （3）如果没有再遇到新的 yield 表达式，就一直运行到函数结束，直到 `return 语句`为止，并将 `return 语句后面的表达式的值`，作为返回的`对象的 value 属性值`。
- （4）如果该函数`没有 return` 语句，则返回的对象的 value 属性值为 `undefined`。

### yield 表达式

由于 Generator 函数返回的遍历器对象，只有调用 next 方法才会遍历下一个内部状态，所以其实提供了一种可以暂停执行的函数。`yield` 表达式就是`暂停标志`

- **注意：yield 表达式`后面的表达式`，只有当调用 next 方法、内部指针指向该语句时才会执行**

```js
function* gen() {
  yield 123 + 456
}
```

- yield 表达式只能用在 Generator 函数里面，用在其他地方都会报错。

```js
(function (){
  yield 1;
})()
// SyntaxError: Unexpected number
```

- yield 表达式如果用`在另一个表达式`之中，`必须放在圆括号里面`

```js
// 语法错误
function* demo() {
  console.log('Hello' + yield); // Uncaught SyntaxError: Unexpected identifier 'yield'
  console.log('Hello' + yield 123); // Uncaught SyntaxError: Unexpected identifier 'yield'
}

// 正确写法
function* demo() {
  console.log('Hello ' + (yield)); // OK
  console.log('Hello ' + (yield 123)); // OK
}
let d = demo()

d.next() // {value: undefined, done: false}

d.next()
// VM71112:2 Hello undefined
// {value: 123, done: false}

d.next()
// VM71112:3 Hello undefined
// {value: undefined, done: true}
```

- `yield`表达式用作`函数参数`或放在`赋值表达式的右边`，可以不加括号

```js
function* demo() {
  foo(yield "a", yield "b") // OK
  let input = yield // OK
}
```

### 与 Iterator 接口关系

**任意一个对象的 `Symbol.iterator` 方法，等于该对象的遍历器生成函数，调用该函数会返回该对象的一个遍历器对象**

- 使用 Generator 函数部署 Iterator 接口

```js
// 使用Generator函数
let obj = {}
obj[Symbol.iterator] = function* () {
  yield 1
  yield 2
  yield 3
}
for (let i of obj) {
  console.log(i)
}
// 1 2 3

const a = [...obj] // [1, 2, 3]
```

- 手动实现遍历器生成函数部署 Iterator 接口

```js
// 使用遍历器生成函数
let obj = {}
obj[Symbol.iterator] = function () {
  var index = 1
  return {
    next() {
      return index <= 3 ? { value: index++ } : { done: true }
    },
  }
}
for (let i of obj) {
  console.log(i)
}
// 1 2 3
const a = [...obj] // [1, 2, 3]
```

### for...of、扩展运算符、解构赋值、Array.from 等

`for...of` 循环可以自动遍历 Generator 函数运行时`生成的 Iterator 对象`，且此时不再需要调用 next 方法

- 一旦 next 方法的返回对象的 done 属性为 true，for...of 循环就会中止，且`不包含`该返回对象

```js
function* foo() {
  yield 1
  yield 2
  yield 3
  yield 4
  yield 5
  return 6 // 返回 {value: 6, done: true} => done为true，for...of 不包含
}

for (let v of foo()) {
  console.log(v)
}
// 1 2 3 4 5
```

```js
function* numbers() {
  yield 1
  yield 2
  return 3
  yield 4
}

// 扩展运算符
;[...numbers()] // [1, 2]

// Array.from 方法
Array.from(numbers()) // [1, 2]

// 解构赋值
let [x, y] = numbers()
x // 1
y // 2

// for...of 循环
for (let n of numbers()) {
  console.log(n)
}
// 1
// 2
```

## next 方法参数与 yield 表达式的返回值

- **yield 表达式本身没有返回值**，或者说总是返回 undefined。
- next 方法可以带一个参数，该参数就会被**当作上一个 yield 表达式的返回值**。

```js
// 例1
function* fn() {
  let res = yield 10
  console.log("第一次yield返回值：", res)
  yield 20
}
let f1 = fn()
f1.next() // {value: 10, done: false}
f1.next()
// 第一次yield返回值： undefined
// {value: 20, done: false}
f1.next() // {value: undefined, done: true}

let f2 = fn()
f2.next() // {value: 10, done: false}
f2.next("next的参数")
// 第一次yield返回值： next的参数
// {value: 20, done: false}
f2.next() // {value: undefined, done: true}
```

```js
// 例2
function* foo(x) {
  var y = 2 * (yield x + 1)
  var z = yield y / 3
  return x + y + z
}

var a = foo(5)
a.next() // Object{value:6, done:false}
a.next() // Object{value:NaN, done:false}
a.next() // Object{value:NaN, done:true}

var b = foo(5)
b.next() // { value:6, done:false }
// 第一次执行： (yield x + 1) => 此时x = 5 => (yield 5 + 1) => value返回6

b.next(12) // { value:8, done:false }
// 第二次执行： 用 12 替换 (yield x + 1)的返回值 => 此时y = 2 * 12 => 即y = 24 => (yield y / 3) == (yield 24 / 3) => value返回8

b.next(13) // { value:42, done:true }
// 第三次执行： 用 13 替换 (yield y / 3)*的返回值 => 此时z = 13 => value返回5 + 24 + 13 = 42

b.next() // {value: undefined, done: true}
```

## 原型方法

### next()

作用： 使指针移向下一个状态

- 运行逻辑
  - （1）遇到 `yield` 表达式，就暂停执行后面的操作，并将紧跟在 `yield 后面的那个表达式的值`，作为`返回的对象的 value 属性值`。
  - （2）下一次调用 next 方法时，再继续往下执行，直到遇到下一个 yield 表达式。
  - （3）如果没有再遇到新的 yield 表达式，就一直运行到函数结束，直到 `return 语句`为止，并将 `return 语句后面的表达式的值`，作为返回的`对象的 value 属性值`。
  - （4）如果该函数`没有 return` 语句，则返回的对象的 value 属性值为 `undefined`。

### throw()

作用： 在函数体外抛出错误，然后在 Generator 函数体内捕获

- throw 方法可以接受一个参数，该`参数会被catch语句接收`，建议抛出 Error 对象的实例
- throw 方法被捕获以后，会附带执行下一条 yield 表达式。也就是说，会附带执行一次 next 方法

```js
var g = function* () {
  try {
    yield "a"
  } catch (e) {
    console.log(e)
  }
  yield "b"
  yield "c"
}

var i = g()
i.next() // {value: 'a', done: false}

i.throw(new Error("出错了！")) // 被捕获后附带执行一次next方法
// Error: 出错了！(…)
// {value: 'b', done: false}

i.next() // {value: 'c', done: false}
```

### return()

作用： 返回给定的值，并且终结遍历 Generator 函数。

- 如果 return()方法调用时，不提供参数，则返回值的 value 属性为 undefined

```js
function* gen() {
  yield 1
  yield 2
  yield 3
}

var g = gen()

g.next() // { value: 1, done: false }

g.return("foo") // { value: "foo", done: true }
// g.return() // { value: undefined, done: true }

g.next() // { value: undefined, done: true }
```

- 如果 Generator 函数内部有`try...finally`代码块，且`正在执行try`代码块，那么 return()方法会导致`立刻进入finally代码块`，执行完以后，整个函数才会结束

```js
function* numbers() {
  yield 1
  try {
    yield 2
    yield 3
  } finally {
    yield 4
    yield 5
  }
  yield 6
}
var g = numbers()
g.next() // { value: 1, done: false }
g.next() // { value: 2, done: false }
g.return(7) // { value: 4, done: false }
g.next() // { value: 5, done: false }
g.next() // { value: 7, done: true }
```

### next()、throw()、return() 的共同点

next()、throw()、return()这三个方法`本质上是同一件事`，可以放在一起理解。它们的`作用都是让 Generator 函数恢复执行`，并且`使用不同的语句替换yield表达式`

- next()是将 yield 表达式替换成一个值

```js
// next 不传值
const g = function* (x, y) {
  let result = yield x + y
  return result
}
const gen = g(1, 2)
gen.next() // {value: 3, done: false}

gen.next() // {value: undefined, done: true}
// 由于next 没有传参 所有第一次 yield 的返回值为 undefined 即result==undefined
```

```js
// next 传值
const g = function* (x, y) {
  let result = yield x + y
  return result
}
const gen = g(1, 2)
gen.next() // {value: 3, done: false}

gen.next(1) // {value: 1, done: true}
// 传参 即 yield x + y == 1 ,即result==1
```

- throw()是将 yield 表达式替换成一个 throw 语句

```js
// throw()
const g = function* (x, y) {
  let result = yield x + y
  return result
}
const gen = g(1, 2)
gen.next() // {value: 3, done: false}

gen.throw(new Error("出错了")) // Uncaught Error: 出错了
// 相当于 yield x + y 替换成 throw(new Error("出错了"))
```

- return()是将 yield 表达式替换成一个 return 语句

```js
// return()
const g = function* (x, y) {
  let result = yield x + y
  return result
}
const gen = g(1, 2)
gen.next() // {value: 3, done: false}

gen.return(2) // Object {value: 2, done: true}
// 相当于 yield x + y 替换为 return 2
```

## yield\* 表达式

用来在一个 Generator 函数里面执行另一个 Generator 函数

```js
function* foo() {
  yield "a"
  yield "b"
}

function* bar() {
  yield "x"
  yield* foo()
  yield "y"
}

// 等同于
function* bar() {
  yield "x"
  yield "a"
  yield "b"
  yield "y"
}

// 等同于
function* bar() {
  yield "x"
  for (let v of foo()) {
    yield v
  }
  yield "y"
}

for (let v of bar()) {
  console.log(v)
}
// "x" "a" "b" "y"
```

## 异步请求(从上到下，顺序执行)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script>
      function getAction(url) {
        return new Promise((resolve, reject) => {
          axios
            .get(`http://127.0.0.1:80/${url}`)
            .then((res) => {
              resolve(res.data)
            })
            .catch((e) => {
              reject(e)
            })
        })
      }
      function getData(url) {
        getAction(url).then((res) => {
          // console.log(res);
          // f.next(res)
          setTimeout(() => {
            f.next(res)
          }, 1000)
        })
      }
      function* fn() {
        // let r1 = yield getAction(url).then((res) => {
        //   f.next(res) // 通过 next()方法 将 请求结果 赋值给 yield的返回值r1
        // })

        let r1 = yield getData("a")
        console.log("r1", r1) // 一秒后打印 r1 {value: 10}
        let r2 = yield getData("b")
        console.log("r2", r2) // 再一秒后打印 r2 {value: 20}
        let r3 = yield getData("c")
        console.log("r3", r3) // 再一秒后打印 r3 {value: 30}
      }
      let f = fn()
      f.next()
    </script>
  </body>
</html>
```

- 后台接口

```js
// app.js
const express = require("express")

const app = express()
app.get("/a", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.send({
    value: 10,
  })
})
app.get("/b", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.send({
    value: 20,
  })
})
app.get("/c", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.send({
    value: 30,
  })
})
app.listen(80, () => {
  console.log("Express server running at http://127.0.0.1")
})
```
