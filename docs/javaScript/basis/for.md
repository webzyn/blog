# 四种 for 循环

[[toc]]

## for

- 描述: for 循环可以`遍历数组`和`字符串`

```js
// 用 let 定义的变量只能在循环语句的局部变量使用
for (let i = 0; i < 5; i++) {
  console.log(i)
}
// 0 1 2 3 4
console.log(i) // VM108:1 Uncaught ReferenceError: i is not defined

// 用 var 定义的变量 与 for 循环处在同样的作用域中
for (var i = 0; i < 5; i++) {
  console.log(i)
}
// 0 1 2 3 4
console.log(i) // 5
```

```js
// 遍历数组
let arr = ["a", "b", "c", "d", "e"]
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i])
} // 'a' 'b' 'c' 'd' 'e'

// 遍历字符串
let string = "abcde"
for (let i = 0; i < string.length; i++) {
  console.log(string[i])
} // 'a' 'b' 'c' 'd' 'e'
```

## for...in

- 描述: for-in 可以`遍历字符串`，`数组`，以及`对象的可枚举的属性(Symbol除外)`

**1. 对字符串和数组的遍历，能得到数组或者字符串的下标**

```js
// 遍历字符串 得到字符串的下标
let str = "abcde"
for (i in str) {
  console.log(i, str[i])
}
// 0 a
// 1 b
// 2 c
// 3 d
// 4 e

// 遍历数组 得到数组的下标
let arr = ["a", "b", "c", "d", "e"]
for (i in arr) {
  console.log(i, arr[i])
}
// 0 a
// 1 b
// 2 c
// 3 d
// 4 e
```

**2. 对于对象的遍历，可以遍历`可枚举对象的属性`，得到的是对象的 key 值(属性名)**

```js
let obj = { a: 1, b: 2, c: 3 }
for (i in obj) {
  console.log(i, obj[i])
}
// a 1
// b 2
// c 3

// 通过Object.defineProperty 设置可枚举属性为 false
Object.defineProperty(obj, "a", {
  configurable: false,
  writable: true,
  enumerable: false,
})
for (i in obj) {
  console.log(i)
} // b c 此时属性a不能遍历到
```

**3. for...in 与 object.keys() 的区别在于，`for in 可以遍历自身的属性以及可以继承的属性` ，而 object.keys() 只能遍历自身的属性**

```js
function Person(name, age) {
  this.name = name
  this.age = age
}
Person.prototype.address = "天津" // 向构造函数原型添加属性address

for (let i in person1) {
  consoole.log(i)
} // name age address 原型上的属性也可以遍历到

console.log(Object.keys(person1)) // ['name','age'] 只能遍历该实例自身的属性
```

## for...of(ES6)

- 描述: for-of 循环 遍历的是`具有 iterator 接口的数据结构`
  - 数组，字符串，Map，Set 等部署了遍历接口的数据结构
  - 普通对象不具有 iterator 接口

```js
// 遍历数组
let arr = ["a", "b", "c", "d"]
for (let a of arr) {
  console.log(a) // a b c d
}
// 遍历 Set
let s = new Set(["a", "b", "c", "d"]) // Set(4) {'a', 'b', 'c', 'd'}
for (i of s) {
  console.log(i) // a b c d
}

// 遍历字符串
let str = "abcde"
for (i of str) {
  console.log(i) // a b c d e
}
```

object 没有 iterable 接口,for-of 无法直接遍历

```js
let obj = { a: 1, b: 2, c: 3 }
for (let i of obj) {
  console.log(i) // Uncaught TypeError: obj is not iterable
}
```

- **for...of 实现遍历对象**

  - **遍历类数组对象**

    使用 Array.from()方法将对象转换为数组

  ```js
  var obj = {
    0: "one",
    1: "two",
    length: 2,
  }
  obj = Array.from(obj) // ['one', 'two']
  for (var k of obj) {
    console.log(k) // 'one'  'two'
  }
  ```

  - **遍历普通对象**

    - 使用 Object.key()或 Object.values()

    ```js
    let obj = { a: 1, b: 2, c: 3 }
    let k = Object.values(obj) // 转化为数组 [1, 2, 3]
    for (let i of k) {
      console.log(i) // 1 2 3
    }
    let k2 = Object.keys(obj) // ['a', 'b', 'c']
    for (let i of k2) {
      console.log(i, obj[i])
    }
    // a 1
    // b 2
    // c 3
    ```

    - 给对象添加一个`[symbol.iterator]`属性，并指向一个迭代器

      - 方法一

      ```js
      var obj = { a: 1, b: 2, c: 3 }
      obj[Symbol.iterator] = function () {
        var keys = Object.keys(this)
        var count = 0
        let _this = this
        return {
          next() {
            if (count < keys.length) {
              return { value: _this[keys[count++]], done: false }
            } else {
              return { value: undefined, done: true }
            }
          },
        }
      }
      for (var k of obj) {
        console.log(k) // 1 2 3
      }
      ```

      - 方法二(使用 Generator 函数生成迭代器)

      ```js
      var obj = { a: 1, b: 2, c: 3 }
      obj[Symbol.iterator] = function* () {
        var keys = Object.keys(obj)
        for (var k of keys) {
          yield [k, obj[k]]
        }
      }
      for (var [k, v] of obj) {
        console.log(k, v)
      }
      // a 1
      // b 2
      // c 3
      ```

## forEach

[前往 forEach](/javaScript/basis/array.html#_1-foreach-遍历数组)

[参考 1](https://blog.csdn.net/qq_40410916/article/details/120053728)
[参考 2](https://blog.csdn.net/gdloveyl/article/details/104167775)
[参考 3](https://blog.csdn.net/daisyer_cat/article/details/126728169)

<!-- # for of 与 for in

**for in 可以遍历数组和对象 而 for or 只能遍历数组**

**在数组中 ，for in 遍历的是数组的键(索引) ， for of 遍历的是数组的值**

### 遍历数组

**for of**

```js
for (let i of ["a", "b", "c", "d"]) {
  console.log(i) // 输出 'a' 'b' 'c' 'd'
}
```

**for in**

```js
for (let i of ["a", "b", "c", "d"]) {
  console.log(i) // 输出 0 1 2 3
}
```

**对象数组**

**for of**

```js
var arr = [
  { name: "张三", age: 18 },
  { name: "李四", age: 24 },
  { name: "王五", age: 26 },
  { name: "赵六", age: 34 },
]
for (var item of arr) {
  console.log(item)
}
// 结果
// {name: '张三', age: 18}
// {name: '李四', age: 24}
// {name: '王五', age: 26}
// {name: '赵六', age: 34}
```

**for in**

```js
var arr = [
  { name: "张三", age: 18 },
  { name: "李四", age: 24 },
  { name: "王五", age: 26 },
  { name: "赵六", age: 34 },
]
for (var item in arr) {
  console.log(item)
}
// 输出
// 0
// 1
// 2
// 3
```

### 遍历对象

**for in**

```js
var user = {
  0: "张三",
  1: "李四",
  2: "王五",
  3: "赵六",
}

for (var key in user) {
  console.log(key, user[key])
}
// 0 张三
// 1 李四
// 2 王五
// 3 赵六
```

**for of**

```js
var user = {
  0: "张三",
  1: "李四",
  2: "王五",
  3: "赵六",
}

for (var i of user) {
  console.log(i)
}

// 报错
//VM942:8 Uncaught TypeError: user is not iterable
```

[参考链接](http://www.lucklnk.com/godaddy/details/aid/934120534) -->
