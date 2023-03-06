# Promise 对象

[[toc]]

`Promise(承诺)` 是异步编程的一种解决方案，它支持链式调用，解决了回调地狱问题。

- 特点
  - Promise 对象的状态不受外界的影响，Promise 对象代表一个异步操作，有`pending(进行中)`,`fulfilled(已成功)`,`rejected(已失败)`这三种状态。只有异步操作的结果可以决定当前是哪种状态。
  - 状态一旦改变，就不会再发生变化。Promise 对象的状态改变只能由 `pending 变为 fulfilled` 和从 `pending 变为 rejected` 这两种可能。
- 缺点
  - `Promise 一旦新建就会立即执行`，无法中途取消
  - 如果不设置回调函数，Promise 内部抛出的错误，不会反应到外部
  - 如果处于 pending 状态时，不能得知当前进展到哪一个阶段(刚刚开始还是即将完成)

## 基本用法

Promise 对象是一个构造函数，用来生成 Promise 实例。

- Promise 构造函数`接受一个函数作为参数`，这个`函数的参数分别是resolve和reject`。resolve 和 reject 由 JavaScript 引擎提供。
  - resolve 函数的作用
    - 将 Promise 状态由`未完成变为成功`(pending 变为 resolved)。
    - 在异步操作成功时调用，并将异步操作的结果，作为参数传递出去
  - reject 函数的作用
    - 将 Promise 状态变为由`未完成变为失败`(pending 变为 rejected)。
    - 在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。
- Promise 实例生成后，可以用 `then` 方法指定 resolved 状态和 rejected 状态的回调
  - then 方法接受两个回调函数作为参数，回调函数都接受 Promise 对象传出的值作为参数
    - 第一个回调函数是 状态 变为 resolved 时调用
    - 第二个回调函数是 状态 变为 rejected 时调用

```js
new Promise(function (resolve, reject) {
  // ....
  if (true /* 异步操作成功 */) {
    resolve("成功")
  } else {
    reject("失败")
  }
}).then(
  // resolve函数的参数传递到此函数中
  function (res) {
    console.log(res) // '成功' => 执行此行代码
  },
  // reject函数的参数传递到此函数中
  function (err) {
    console.log(err)
  }
)
```

- Promise 新建后就会立即执行

```js
let promise = new Promise((resolve, reject) => {
  console.log("promise") // 执行顺序 1
  resolve()
})
promise.then(() => {
  console.log("resolved") // 执行顺序 3
})
console.log(promise) // 执行顺序 2

// promise
// Promise {<fulfilled>: undefined}
// resolved
```

## 原型方法(实例调用)

### Promise.prototype.then() 为 Promise 对象添加状态改变时的回调函数

> promise.then(resolvedCallback,rejectedCallback)

- 作用: 为 Promise 实例**添加状态改变时的回调函数**,可以链式调用
- 参数:
  - resolvedCallback: 状态为 resolved 时的回调函数
  - rejectedCallback: 状态为 rejected 时的回调函数
- 返回值:
  - 返回一个`新的Promise实例`(不是原来哪个 Promise 实例)

```js
let promise = function () {
  return new Promise((resolve, reject) => {
    let value = 1
    if (value) {
      resolve(value)
    } else {
      reject(new Error("fail"))
    }
  })
}
promise()
  .then(
    (res) => {
      console.log(res)
      return res * 2 // 返回新的Promise 并传递参数
    },
    (err) => {
      console.log(err)
    }
  )
  .then(
    (res) => {
      console.log(res)
    },
    (err) => {
      console.log(err)
    }
  )
// 1 2
```

### Promise.prorotype.catch() 用于指定发生错误时的回调函数

`Promise.prototype.catch()`方法是`.then(null, rejection)`或`.then(undefined, rejection)`的别名，用于指定发生错误时的回调函数。

> promise.catch(rejectedCallback)

- 作用
  - 如果异步操作抛出错误，状态就会变为 rejected，就会调用 catch()方法指定的回调函数，处理这个错误。
  - then()方法指定的回调函数，如果运行中抛出错误，也会被 catch()方法捕获
- catch()方法`返回的还是一个 Promise 对象`，因此后面还可以接着调用 then()方法。
- catch()方法之中，还能`再抛出错误`

```js
// 以下三种写法等价
// 写法1
new Promise((resolve, reject) => {
  throw new Error("error") // Promise抛出一个错误
}).catch((err) => {
  console.log(err) // Error: error => 该回调函数捕获异常
})

// 写法2
new Promise((resolve, reject) => {
  try {
    throw new Error("error")
  } catch (e) {
    reject(e) // 抛出异常
  }
}).catch((err) => {
  console.log(err) // Error: error => 捕获异常
})

// 写法3
new Promise((resolve, reject) => {
  reject(new Error("error")) // 抛出异常
}).catch((err) => {
  console.log(err) // Error: error
})
```

```js
// 栗子
let promise = function () {
  return new Promise((resolve, reject) => {
    let value = false
    if (value) {
      resolve(value)
    } else {
      reject(new Error("fail"))
    }
  })
}
promise()
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err) // Error: fail
  })
```

### Promise.prototype.finally() 用于指定不管 Promise 对象最后状态如何，都会执行的操作

finally()方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的。

```js
new Promise()
.then(result => {···})
.catch(error => {···})
.finally(() => {···});
```

- finally 本质上是`then方法的特例`

```js
new Promise()
  .then(
    (result) => {
      // 语句
      return result
    },
    (error) => {
      // 语句
      throw error
    }
  )
  .finally(() => {
    // 语句
  })

// 等同于
new Promise()
  .then(
    (result) => {
      // 语句
      return result
    },
    (error) => {
      // 语句
      throw error
    }
  )
  // then方法 创建的Promise对象 需要继续指定回调函数进行处理
  .then((res) => {
    // ...
  })
  .catch((err) => {
    // ...
  })
```

- finally 实现原理

```js
Promise.prototype.finally = function (callback) {
  let P = this.constructor
  return this.then(
    (res) => P.resolve(callback()).then(() => res),
    (err) =>
      P.resolve(callback()).then(() => {
        throw err
      })
  )
}
```

上面代码中，不管前面的 Promise 是 fulfilled 还是 rejected，都会执行回调函数 callback。

## 静态方法 - 将多个 Promise 实例，包装成一个新的 Promise 实例

### Promise.all() - 状态：全部成功才成功，一个失败就失败

> const p = Promise.all([p1, p2, p3, ...]);

- 描述: Promise.all()方法用于将多个 Promise 实例，包装成一个新的 Promise 实例

- 参数
  - 1. 数组(数组中每个成员都是 Promise 实例)
    - 如果不是 Promise 实例，会调用 `Promise.resolve()`,将参数`转为 Promise 实例`
  - 2. 具有 iterable 接口的其他数据结构(返回的每个成员都是 Promise 实例)
- 包装实例状态：
  - 参数实例都变成`fulfilled`状态，包装实例变成`fulfilled`状态，
    - 此时参数实例的返回值`组成一个数组`，传递给`包装实例`的回调函数。
  - 参数实例中有一个`rejected`，包装实例的状态就变成`rejected`
    - 此时第一个`reject` 实例的返回值，传递给`包装实例`的回调函数。

```js
let p1 = new Promise((resolve, reject) => {
  resolve("p1")
})
let p2 = new Promise((resolve, reject) => {
  resolve("p2")
})
let p3 = new Promise((resolve, reject) => {
  resolve("p3")
})
const p = Promise.all([p1, p2, p3])
p.then((res) => {
  console.log(res)
}).catch((err) => {
  console.log(err)
})
// ['p1', 'p2', 'p3']
```

- 如果作为参数的 Promise 实例，自己**定义了 catch 方法，那么它一旦被 rejected**，并**不会触发 Promise.all()的 catch**方法
  - 因为**catch 方法返回的是一个新的 Promise 实例**，传递给 Promise.all 的也是这个新的 Promise 实例

```js
const p1 = new Promise((resolve, reject) => {
  resolve("hello")
})
  .then((res) => {
    return `${res} world`
  }) // then方法返回新的Promise实例 返回值被新Promise的then()方法接收
  .catch((e) => e)

const p2 = new Promise((resolve, reject) => {
  throw new Error("报错了")
})
  .then((res) => res)
  .catch((e) => {
    return e + "fail"
  }) // catch方法返回新的Promise实例 返回值会被新Promise的then()方法接收

Promise.all([p1, p2])
  .then((res) => console.log(res))
  .catch((err) => {
    console.log(err)
  })
// ['hello world', 'Error: 报错了fail']
```

### Promise.race() - 状态：谁先改变状态就跟谁相同

- Promise.race()方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例

> const p = Promise.race([p1, p2, p3, ...]);

- 参数: 与 Promise.all() 一致
- 状态:
  - 参数实例中谁`率先改变状态`，包装实例的状态就跟踪改变
    - 率先改变状态的`参数实例的返回值`，就传递给`包装实例`的回调函数

```js
let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("p1")
  }, 1000)
})
let p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("p2")
  }, 2000)
})
let p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("p3")
  }, 3000)
})
Promise.race([p1, p2, p3])
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })
// 1秒后 => p1
```

### Promise.allSettled() - 状态：参数实例状态全改变后，状态变为 fulfilled

- Promise.allSettled()方法接受一个数组作为参数，数组的每个成员都是一个 Promise 对象，并返回一个新的 Promise 对象。
- 只有等到`参数数组的所有 Promise 对象都发生状态变更`（不管是 fulfilled 还是 rejected），返回的 Promise 对象`才会发生状态变更`。

> const p = Promise.allSettled([p1, p2, p3, ...])

- 状态：(参数实例状态全改变，包装实例状态才改变)
  - 一旦发生状态变更，状态总是`fulfilled`，不会变成 rejected
    - `参数实例`传递给`包装实例`的回调函数

```js
let p1 = new Promise((resolve, reject) => {
  resolve("p1")
})
let p2 = new Promise((resolve, reject) => {
  reject("p2")
})
let p3 = new Promise((resolve, reject) => {
  reject(new Error("fail"))
})
const p = Promise.allSettled([p1, p2, p3])

// Promise.allSettled()的参数 传入 回调函数
p.then((results) => {
  console.log(results)
})
// [
//   { status: "fulfilled", value: "p1" },
//   { status: "fulfilled", value: "p2" },
//   {status: 'rejected', reason: Error: fail at <anonymous>:8:10 at new Promise (<anonymous>) at <anonymous>:7:10}
// ]
```

- Promise.allSettled()的返回值，状态只可能变成 fulfilled。
- 它的回调函数接收到的参数是数组 results。该数组的每个成员都是一个对象，对应传入 Promise.allSettled()的数组里面的 Promise 对象。

```js
// 异步操作成功时
{status: 'fulfilled', value: value}

// 异步操作失败时
{status: 'rejected', reason: reason}
```

### Promise.any() - 状态：一个成功就成功，所有失败才失败

- Promise.any() 接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例返回。

> const p = Promise.all([p1, p2, p3, ...]);

- 状态:
  - 一个参数实例变成`fulfilled`状态，包装实例就变成`fulfilled`状态
  - 所有参数实例变成`rejected`状态，包装实例就变成`rejected`状态

```js
// 成功一个
let p1 = new Promise((resolve, reject) => {
  resolve("p1")
})
let p2 = new Promise((resolve, reject) => {
  reject(new Error())
})
let p3 = new Promise((resolve, reject) => {
  reject(new Error())
})
const p = Promise.any([p1, p2, p3])
p.then((res) => {
  console.log(res) // p1
}).catch((err) => {
  console.log(err)
})

// 全部失败
let p1 = new Promise((resolve, reject) => {
  reject(new Error())
})
let p2 = new Promise((resolve, reject) => {
  reject(new Error())
})
let p3 = new Promise((resolve, reject) => {
  reject(new Error())
})
const p = Promise.any([p1, p2, p3])
p.then((res) => {
  console.log(res)
}).catch((err) => {
  console.log(err) // AggregateError: All promises were rejected
})
```

Promise.any()抛出的错误是一个 `AggregateError` 实例，这个 AggregateError 实例对象的`errors属性`是一个数组，包含了所有成员的错误。

```js
let p1 = new Promise((resolve, reject) => {
  reject(new Error("fail"))
})
let p2 = new Promise((resolve, reject) => {
  reject(new Error())
})
let p3 = new Promise((resolve, reject) => {
  reject(new Error("err"))
})
const p = Promise.any([p1, p2, p3])
p.then((res) => {
  console.log(res)
}).catch((err) => {
  console.log(err.errors)
})
```

![](/javaScript/ES6/Promise_1.png)

## 静态方法 - 返回新的 Promise 对象

### Promise.resolve()

#### 1. 参数是一个 Promise 实例

如果参数是 Promise 实例，那么 Promise.resolve 将不做任何修改、`原封不动地返回`这个实例。

#### 2. 不带参数

Promise.resolve()方法允许调用时不带参数，直接`返回一个resolved状态的 Promise 对象`

```js
const p = Promise.resolve()

p.then(function () {
  // ...
})
```

- **注意: 立即 resolve()的 Promise 对象，是在本轮“事件循环”的结束时执行，而不是在下一轮“事件循环”的开始时**

```js
setTimeout(function () {
  console.log("three")
}, 0)

Promise.resolve().then(function () {
  console.log("two")
})

console.log("one")

// one
// two
// three
```

#### 3. 参数是一个 thenable 对象

- thenable 对象指的是具有 then 方法的对象
- Promise.resolve()方法会将这个对象`转为 Promise 对象`，然后就`立即执行thenable对象的then()`方法

- **注意: 立即 resolve()的 Promise 对象，是在本轮“事件循环”的结束时执行，而不是在下一轮“事件循环”的开始时**

```js
// thenable 对象
let thenable = {
  then: function (resolve, reject) {
    resolve(42)
  },
}

let p1 = Promise.resolve(thenable)
p1.then(function (value) {
  console.log(value) // 42
})
```

#### 4. 参数不是具有 then()方法的对象，或根本就不是对象

如果参数是一个`原始值`，或者是一个`不具有 then()方法的对象`，则 Promise.resolve()方法返回一个`新的 Promise 对象，状态为 resolve`d。

- **注意: 立即 resolve()的 Promise 对象，是在本轮“事件循环”的结束时执行，而不是在下一轮“事件循环”的开始时**

```js
const p = Promise.resolve("Hello")

p.then(function (s) {
  console.log(s)
})
// Hello
```

### Promise.reject() 返回 rejected 状态的 Promise 实例

`Promise.reject(reason)`方法也会返回一个新的 Promise 实例，该实例的状态为`rejected`，回调函数会**立即执行**。

- 参数会原封不动地作为 reject 的理由，变成后续方法的参数。

```js
const p = Promise.reject("出错了")
// 等同于
const p = new Promise((resolve, reject) => reject("出错了"))

p.then(null, function (s) {
  console.log(s)
})
// 出错了

Promise.reject("出错了").catch((e) => {
  console.log(e === "出错了")
})
// true
```
