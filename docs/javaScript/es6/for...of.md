# for...of 循环

[[toc]]

## 基本概念

for...of 循环，**遍历所有数据结构的统一的方法**。

- 一个数据结构只要部署了 Symbol.iterator 属性，就被视为具有 iterator 接口，就可以用 for...of 循环遍历它的成员。
- for...of 循环内部调用的是数据结构的 Symbol.iterator 方法

## 使用的范围

for...of 循环可以使用的范围包括`数组`、`Set 和 Map 结构`、`某些类似数组的对象（比如arguments对象、DOM NodeList 对象）`、 `Generator 对象`，以及`字符串`

### 数组

数组原生具备 `iterator` 接口（即默认部署了 `Symbol.iterator` 属性），for...of 循环本质上就是调用这个接口产生的遍历器

```js
const arr = ["red", "green", "blue"]
for (let v of arr) {
  console.log(v) // red green blue
}
```

- 与 for...in 区别
  - for...in 循环，获取对象的键名，for...of 循环，获取键值
  - for...of 只返回具有数字索引的属性值，for...in 可以返回任意键名

```js
// 区别1
var arr = ["a", "b", "c", "d"]
for (let a in arr) {
  console.log(a) // 0 1 2 3
}
for (let a of arr) {
  console.log(a) // a b c d
}

// 区别2
let arr = [3, 5, 7]
arr.foo = "hello"
for (let i in arr) {
  console.log(i) // "0", "1", "2", "foo"
}
for (let i of arr) {
  console.log(i) //  "3", "5", "7"
}
```

### Set 和 Map 结构

Set 和 Map 结构也原生具有 Iterator 接口，可以直接使用 for...of 循环

```js
let set = new Set(["Gecko", "Trident", "Webkit", "Webkit"])
for (let i of set) {
  console.log(i)
}
// Gecko Trident Webkit

let map = new Map([
  ["a", 1],
  ["b", 2],
])
map.set("c", 3)
for (let i of map) {
  console.log(i)
}
// ['a', 1]  ['b', 2]  ['c', 3]
```

### 类似数组的对象(字符串、DOM NodeList 对象、arguments 对象等)

- 具有 Iterator 接口

```js
// 字符串
let str = "hello"

for (let s of str) {
  console.log(s) // h e l l o
}

// DOM NodeList对象
let paras = document.querySelectorAll("p")

for (let p of paras) {
  p.classList.add("test")
}

// arguments对象
function printArgs() {
  for (let x of arguments) {
    console.log(x)
  }
}
printArgs("a", "b")
// 'a'
// 'b'
```

- 不具有 Iterator 接口

  - 并不是所有类似数组的对象都具有 Iterator 接口，一个简便的解决方法，就是使用 `Array.from` 方法将其转为数组

```js
let arrayLike = { length: 2, 0: "a", 1: "b" }

// 报错
for (let x of arrayLike) {
  console.log(x)
}

// 正确
for (let x of Array.from(arrayLike)) {
  console.log(x)
}
```

### 对象(未部署 Iterator 接口)

对于普通的对象，for...of 结构不能直接使用，会报错，必须部署了 Iterator 接口后才能使用

- 1. 使用 Object.keys 方法将对象的键名生成一个数组，然后遍历这个数组。

```js
let obj = { a: 1, b: 2, c: 3 }
for (let i of Object.keys(obj)) {
  console.log(i + ":" + obj[i])
}
// a:1 b:2 c:3

let obj = { a: 1, b: 2, c: 3 }
for (let i of Object.values(obj)) {
  console.log(i)
}
// 1 2 3

let obj = { a: 1, b: 2, c: 3 }
for (let i of Object.entries(obj)) {
  console.log(i)
}
// ['a', 1]  ['b', 2]  ['c', 3]
```

- 2. 使用 Generator 函数将对象重新包装一下

```js
const obj = { a: 1, b: 2, c: 3 }

function* entries(obj) {
  for (let key of Object.keys(obj)) {
    yield [key, obj[key]]
  }
}

for (let [key, value] of entries(obj)) {
  console.log(key, "->", value)
}
// a -> 1
// b -> 2
// c -> 3
```

## for...of 与其他遍历区别

- 最原始的`for`循环

```js
let arr = ["a", "b", "c"]
for (var i = 0; i < arr.length; i++) {
  console.log(i)
}
// 0 1 2
```

- 数组内置的`forEach`方法，为了简化 for 循环
  - 缺点：`无法中途跳出` forEach 循环，`break` 和 `return` 无效

```js
let arr = ["a", "b", "c"]
arr.forEach(function (item) {
  console.log(item)
})
// a b c
```

- for...in 循环(遍历键名)
  - 缺点：
    - 数组的键名是数字，但是 for...in 会转化为字符串
    - for...in 会遍历`数字键名`和`手动添加的其他键`，以及`原型链上的键`
    - 某些情况下，for...in 循环会以任意顺序遍历键名

```js
let arr = ["a", "b", "c"]
for (var i in arr) {
  console.log(i)
}
// 0 1 2
```

- for...of
  - 优点
    - 与 for...in 一样简介，但是没有 for...in 的缺点
    - 对比 forEach，for...in 可以与 break、continue、return 搭配使用
    - 提供了遍历所有数据结构的统一操作接口

```js
let arr = ["a", "b", "c", "d", "e", "f"]
for (let i of arr) {
  if (i === "c") break
  console.log(i)
}
// a b
```

[具体用法->](/javascript/basis/for)
