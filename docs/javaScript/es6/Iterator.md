# Iterator(遍历器)

[[toc]]

## 概念

遍历器（Iterator）是一种接口，为`各种不同的数据结构提供统一的访问机制`。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）

- 作用

  - 为各种数据结构，提供一个统一的、简便的访问接口
  - 使数据结构的成员能够按某种次序排列
  - 主要供`for...of`消费

- 遍历过程

  - （1）创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个`指针对象`。
  - （2）第一次调用指针对象的 `next` 方法，可以将指针指向数据结构的第一个成员。
  - （3）第二次调用指针对象的 `next` 方法，指针就指向数据结构的第二个成员。
  - （4）不断调用指针对象的 `next` 方法，直到它指向数据结构的结束位置

每一次调用 next 方法，都会返回数据结构的`当前成员的信息`。具体来说，就是返回一个包含 value 和 done 两个属性的对象。其中，value 属性是当前成员的值，done 属性是一个布尔值，表示遍历是否结束

```js
// 遍历器生成函数
function iterator() {
  var index = 0
  return {
    next: function () {
      if (index < 3) {
        return { value: index++, done: false }
      } else {
        return { value: undefined, done: true }
      }
    },
  }
}

// 遍历器对象（指针对象）
let it = iterator()

it.next() // {value: 0, done: false}
it.next() // {value: 1, done: false}
it.next() // {value: 2, done: false}
it.next() // {value: undefined, done: true}
```

## 默认 Iterator 接口

默认的 Iterator 接口部署在数据结构的 Symbol.iterator 属性，或者说，一个数据结构只要具有 Symbol.iterator 属性，就可以认为是“可遍历的”

- 原生具备 Iterator 接口的数据结构
  - Array
  - Map
  - Set
  - String
  - TypedArray
  - 函数的 arguments 对象
  - NodeList 对象

```js
let arr = ["a", "b", "c"]
let iter = arr[Symbol.iterator]()

iter.next() // { value: 'a', done: false }
iter.next() // { value: 'b', done: false }
iter.next() // { value: 'c', done: false }
iter.next() // { value: undefined, done: true }
```

- 对象部署 Iterator 接口(原生不具备)
  - 一个`对象`如果要具备可被 for...of 循环调用的 `Iterator` 接口，就必须在 Symbol.iterator 的属性上部署遍历器生成方法（原型链上的对象具有该方法也可）

```js
let obj = { a: "aa", b: "bb" }

// 给对象obj添加遍历器接口
obj[Symbol.iterator] = function () {
  let count = 0 // 对象属性总个数
  for (let i in this) {
    count++
  }
  let propertyArr = Object.getOwnPropertyNames(this) // 属性名数组
  let index = 0 // 指针
  let _this = this
  return {
    next: function () {
      if (index < count) {
        return { value: _this[propertyArr[index++]], done: false }
      } else {
        return { value: undefined, done: true }
      }
    },
  }
}

// 指针对象
let iter = obj[Symbol.iterator]()
iter.next() // {value: 'aa', done: false}
iter.next() // {value: 'bb', done: false}
iter.next() // {value: undefined, done: true}

// 可以使用for...of
for (let i of obj) {
  console.log(i)
} // aa bb
```

## 调用 Iterator 接口的场合

有一些场合会默认调用 Iterator 接口（即 Symbol.iterator 方法）

- 1. for...of

一个数据结构只要部署了 Symbol.iterator 属性，就被视为具有 iterator 接口，就可以用 for...of 循环遍历它的成员

```js
let arr = ["a", "b", "c"]
for (let i of arr) {
  console.log(i)
}
// a b c
let iter = arr[Symbol.iterator]()
iter.next() // {value: 'a', done: false}
iter.next() // {value: 'b', done: false}
iter.next() // {value: 'c', done: false}
iter.next() // {value: undefined, done: true}
```

- 2. 解构赋值

对数组和 Set 结构进行解构赋值时，会默认调用`Symbol.iterator`方法

```js
let set = new Set().add("a").add("b").add("c")

let [x, y] = set
// x='a'; y='b'

let [first, ...rest] = set
// first='a'; rest=['b','c'];
```

- 3. 扩展运算符

扩展运算符（...）也会调用默认的 Iterator 接口。

**只要某个数据结构部署了 Iterator 接口，就可以对它使用扩展运算符，将其转为数组**

```js
var str = "hello"
[...str] //  ['h','e','l','l','o']

let arr = ["b", "c"]
["a", ...arr, "d"]
// ['a', 'b', 'c', 'd']
```

- 4. yield

`yield`后面跟的是一个`可遍历的结构`，它会调用该结构的遍历器接口

```js
let generator = function* () {
  yield 1
  yield* [2, 3, 4]
  yield 5
}

var iterator = generator()

iterator.next() // { value: 1, done: false }
iterator.next() // { value: 2, done: false }
iterator.next() // { value: 3, done: false }
iterator.next() // { value: 4, done: false }
iterator.next() // { value: 5, done: false }
iterator.next() // { value: undefined, done: true }
```

- 5. 接受数组作为参数的场合

由于数组的遍历会调用遍历器接口，所以`任何接受数组作为参数的场合`，其实`都调用了遍历器接口`

```js
// 例:
for...of
Array.from()
Map(), Set(), WeakMap(), WeakSet()（比如new Map([['a',1],['b',2]])）
Promise.all()
Promise.race()
```

## Iterator 接口与 Generator 函数

Symbol.iterator()方法的最简单实现，还是使用 [Generator 函数]()

```js
let myIterable = {
  [Symbol.iterator]: function* () {
    yield 1
    yield 2
    yield 3
  },
}
[...myIterable] // [1, 2, 3]

// 或者采用下面的简洁写法

let obj = {
  *[Symbol.iterator]() {
    yield "hello"
    yield "world"
  },
}

for (let x of obj) {
  console.log(x)
}
// "hello"
// "world"
```

## 遍历器对象的 return()，throw()

遍历器对象除了具有`next()`方法，还可以具有`return()`方法和`throw()`方法。如果自己写遍历器对象生成函数，那么 next()方法是`必须`部署的，return()方法和 throw()方法是否部署是`可选`的

### return()方法的使用场合

- 如果 for...of 循环`提前退出`（通常是因为出错，或者有 break 语句），就会调用 return()方法。
- 如果一个对象在完成遍历前，需要清理或释放资源，就可以部署 return()方法

- **注意: return 方法必须返回一个对象，这是 Generator 规格决定的**

```js
// 未部署return方法
let iterator = function () {
  var index = 0
  return {
    next() {
      return index < 3 ? { value: index++ } : { done: true }
    },
  }
}
let iter = iterator()

iter.next() // {value: 0}
iter.next() // {value: 1}
iter.next() // {value: 2}
iter.next() // {done: true}

// 将遍历器生成方法 部署 到Symbol.iterator上，使obj能够被for...of循环
let obj = {}
obj[Symbol.iterator] = iterator

for (let i of obj) {
  console.log(i)
}
// 0 1 2

// 未部署return方法 提前接受循环
for (let i of obj) {
  if (i === 1) break
  console.log(i)
}
// 0
```

```js
// 部署return方法
let iterator2 = function () {
  var index = 0
  return {
    next() {
      return index < 3 ? { value: index++ } : { done: true }
    },
    return() {
      console.log("return方法执行")
      return { done: true }
    },
  }
}
let obj = {}
obj[Symbol.iterator] = iterator2

for (let i of obj) {
  if (i === 1) break
  console.log(i)
}
// 0 return方法执行
```

### throw()

throw()方法主要是配合 [Generator]() 函数使用，一般的遍历器对象用不到这个方法
