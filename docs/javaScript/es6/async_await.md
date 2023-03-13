# async、await

[[toc]]

async 函数是 Generator 函数的语法糖

- 对比 Generator 函数的改进
  - **内置执行器**
    - `Generator`函数的执行需要调用`next`方法，或者`co模块`
    - `async`函数自带执行器
  - **更好的语义**
    - async 函数将 Generator 函数的星号（\*）替换成 async，将 yield 替换成 await
  - **更广的适用性**
    - co 模块约定，yield 命令后面只能是 Thunk 函数或 Promise 对象
    - async 函数的 await 命令后面，可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，这时会自动转成立即 resolved 的 Promise 对象）
  - **返回值是 Promise**
    - async 函数的返回值是 Promise 对象，可以用 then 方法指定下一步的操作
    - Generator 函数的返回值是 Iterator 对象

## 基本用法

`async` 函数返回一个 Promise 对象，可以使用 `then` 方法添加回调函数。当函数执行的时候，一旦遇到 `await` 就会先返回，等到`异步操作完成`，再`接着执行`函数体内后面的语句

- 函数前面的`async`关键字，表明该函数内部有异步操作。_调用该函数时，会立即返回一个 Promise 对象_

```js
// 函数声明
async function foo() {}

// 函数表达式
const foo = async function () {};

// 箭头函数
const foo = async () => {};

// 对象的方法
let obj = { async foo() {} };
obj.foo().then(...)

// Class 的方法
class Storage {
  constructor() {
    this.cachePromise = caches.open('avatars');
  }

  async getAvatar(name) {
    const cache = await this.cachePromise;
    return cache.match(`/avatars/${name}.jpg`);
  }
}

const storage = new Storage();
storage.getAvatar('jake').then(…);
```

示例

```js
// 写法1
function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

// 写法2 由于async函数返回的是 Promise 对象，可以作为await命令的参数
async function timeout(ms) {
  await new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

async function asyncPrint(value, ms) {
  await timeout(ms)
  console.log("value:", value) // 一秒后打印
}
asyncPrint("hello", 1000)
```

### 与 Generator 函数的区别(示例)

[完整示例](/javascript/es6/Generator.html#异步请求-从上到下-顺序执行)

```js
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
// Generator函数
function getData(url) {
  getAction(url).then((res) => {
    f.next(res)
  })
}
function* fn() {
  let r1 = yield getData("a")
  console.log("r1", r1)
  let r2 = yield getData("b")
  console.log("r2", r2)
  let r3 = yield getData("c")
  console.log("r3", r3)
}
let f = fn()
f.next()

// async函数
async function fn() {
  let r1 = await getAction("a")
  console.log(r1)
  let r2 = await getAction("b")
  console.log(r2)
  let r3 = await getAction("c")
  console.log(r3)
}
fn()
```

## 语法

### 1. 返回 Promise 对象

- `async`函数返回一个 Promise 对象
- `async` 函数内部 `return` 语句返回的值，会成为 `then` 方法回调函数的参数
- `async` 函数内部抛出错误，会导致返回的 Promise 对象变为 `reject` 状态。抛出的错误对象会被 `catch` 方法回调函数接收到

```js
async function f() {
  return "hello"
}
f().then((r) => console.log(r)) // hello

async function f() {
  throw new Error("fail")
}
f().catch((e) => console.log(e)) // Error: fail
```

### 2. 返回的 Promise 对象的状态变化

- async 函数返回的 Promise 对象，必须等到*内部`所有` await 命令后面的 Promise 对象执行完*，`才会发生状态改变`，除非遇到 return 语句或者抛出错误。

### 3. await 命令

- await 命令后面是一个` Promise 对象`，返回该对象的结果
- await 命令后面`不是 Promise 对象`，就直接返回对应的值
- await 命令后面是一个 `thenable 对象`（即定义了 then 方法的对象），那么 await 会将其等同于 Promise 对象

```js
async function f() {
  // 等同于
  // return 123;
  return await 123
}

f().then((v) => console.log(v))
// 123
```

- await 命令后面的 Promise 对象如果变为 reject 状态，则 reject 的参数会被 catch 方法的回调函数接收到
- 任何一个 await 语句后面的 Promise 对象变为 reject 状态，那么整个 async 函数都会`中断执行`

```js
async function f() {
  await Promise.reject("出错了")
  await Promise.resolve("hello world") // 不会执行
}

f().catch((e) => console.log(e))
// 出错了
```

### 4.错误处理

- 如果 await 后面的异步操作出错，那么等同于 async 函数返回的 Promise 对象被 reject，整个 async 函数都会`中断执行`

防止代码出错中断运行：**最好把 await 命令都放在 try...catch 代码块中**

```js
//方法1
async function f() {
  try {
    await new Promise(function (resolve, reject) {
      throw new Error("出错了")
    })
  } catch (e) {}
  return await "hello world"
}
f().then((v) => console.log(v))
// hello world

// 方法2
async function f() {
  await Promise.reject("出错了").catch((e) => console.log(e))
  return await Promise.resolve("hello world")
}

f().then((v) => console.log(v))
// 出错了
// hello world
```
