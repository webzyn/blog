# 数组方法

[[toc]]

## 改变原数组的方法(9 个)

### 1. push() 向数组的末尾添加元素

定义：push() 方法可向数组的末尾添加一个或多个元素，并`返回新的长度`。

```js
let arr = ["a", "b", "c"]
let num = arr.push("d")

console.log(arr) // ['a', 'b', 'c', 'd']
console.log(num) // 4
```

### 2. unshift() 向数组的开头添加元素

定义：unshift() 方法可向数组的开头添加一个或更多元素，并`返回新的长度`

```js
let arr = [1, 2, 3]
let length = arr.unshift("a")

console.log(length) // 4
console.log(arr) // ['a', 1, 2, 3]
```

### 3. pop() 删除数组中的最后的一个元素

定义: pop() 方法删除一个数组中的最后的一个元素，并且`返回这个元素`。

```js
let arr = ["a", "b", "c"]
let item = arr.pop()

console.log(item) // 'c'
console.log(arr) // ['a', 'b']
```

### 4. shift() 删除数组的第一个元素

定义: shift()方法删除数组的第一个元素，并返回这个元素

```js
let arr = [1, 2, 3]
let item = arr.shift()

console.log(item) // 1
console.log(arr) // [2,3]
```

### 5. splice() 添加/删除数组元素

定义： splice() 方法向/从数组中添加/删除元素，然后`返回被删除的元素数组`

语法： array.splice(参数 1,参数 2,参数 3,.....,参数 n)

- 参数 1：必需。整数，规定添加/删除项目的位置(索引)，使用负数可从数组结尾处规定位置。
- 参数 2：可选。要删除的项目数量。如果设置为 0，则不会删除项目。
- 参数 3-参数 n： 可选。向数组添加的新元素。

```js
// eg1:删除元素
let a = ["a", "b", "c", "d", "e", "f", "g", "h"]
let item = a.splice(2, 3) // 从索引2开始删除3个

console.log(a) // ['a', 'b', 'f', 'g', 'h']
console.log(item) //  ['c', 'd', 'e'] 被删除的元素

let item2 = a.splice(-1, 2)
console.log(item) //['h'] 从最后一个元素开始删除2个元素，因为最后一个元素，所以只删除了h

// eg2:删除并添加
let a = [1, 2, 3, 4, 5, 6, 7]
let item = a.splice(2, 3, "a", "b")

console.log(item) // [3, 4, 5]
console.log(a) // [1, 2, 'a', 'b', 6, 7]

// eg3: 不删除只添加
let a = [1, 2, 3, 4, 5, 6, 7]
let item = a.splice(0, 0, "a", "b")

console.log(item) // [] 没有删除元素，返回空数组
console.log(a) // ['a', 'b', 1, 2, 3, 4, 5, 6, 7]
```

### 6. reverse() 颠倒数组中元素的顺序

定义: reverse() 方法用于颠倒数组中元素的顺序,`返回这个数组`

```js
let a = [1, 2, 3]
let b = a.reverse()
console.log(a) // [3,2,1]
console.log(b) // [3,2,1]
```

### 7. sort() 数组排序

定义: sort()方法对数组元素进行排序，并`返回这个数组`

参数: 可选 function(规定排序顺序的比较函数)

默认情况下 sort()方法没有传比较函数的话，默认按`字母升序`，如果不是元素不是字符串的话，会`调用toString()方法将元素转化为字符串的Unicode`(万国码)位点，然后再比较字符。

```js
let a = ["Banana", "Orange", "Apple", "Mango"]
let b = a.sort()

console.log(a) // ['Apple', 'Banana', 'Mango', 'Orange']
console.log(b) // ['Apple', 'Banana', 'Mango', 'Orange']

let a = [10, 1, 3, 20, 25, 8]
console.log(a.sort()) // [1,10,20,25,3,8];
```

**比较函数的参数**
sort 的比较函数有两个默认参数，要在函数中接收这两个参数，这两个参数是数组中两个要比较的元素，通常我们用 a 和 b 接收两个将要比较的元素：

- 若比较函数返回值<0，那么 a 将排到 b 的前面
- 若比较函数返回值=0，那么 a 和 b 相对位置不变
- 若比较函数返回值>0，那么 b 排在 a 将的前面

**1、数组元素为数字的升序、降序**

```js
var array = [10, 1, 3, 4, 20, 4, 25, 8]
// 升序
array.sort(function (a, b) {
  return a - b
})
console.log(array) // [1,3,4,4,8,10,20,25];

// 降序
array.sort(function (a, b) {
  return b - a
})
console.log(array) // [25,20,10,8,4,4,3,1];
```

**2、数组多条件排序(可自定义)**

```js
var array = [
  { id: 10, age: 2 },
  { id: 5, age: 4 },
  { id: 6, age: 10 },
  { id: 9, age: 6 },
  { id: 2, age: 8 },
  { id: 10, age: 9 },
]
array.sort(function (a, b) {
  if (a.id === b.id) {
    // 如果id的值相等，按照age的值降序
    return b.age - a.age
  } else {
    // 如果id的值不相等，按照id的值升序
    return a.id - b.id
  }
})
// [{"id":2,"age":8},{"id":5,"age":4},{"id":6,"age":10},{"id":9,"age":6},{"id":10,"age":9},{"id":10,"age":2}]
```

### 8、(ES6)copyWithin() 指定位置的成员复制到其他位置

定义: 在当前数组内部，将指定位置的成员复制到其他位置,并`返回这个数组`

```js
array.copyWithin(target, (start = 0), (end = this.length))
```

- target（必需）：从该位置开始替换数据。如果为负值，表示倒数。
- start（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示倒数。
- end（可选）：到**该位置前**停止读取数据，默认等于数组长度。使用负数可从数组结尾处规定位置
- 读了几个元素就从开始被替换的地方替换几个元素,数组的长度不会改变

```js
let a = ["a", "b", "c", "d", "e"]
let b = a.copyWithin(0, 2, 4) // 从索引0开始替换,将索引[2,4)的复制上去,即2个

console.log(a) // ['c', 'd', 'c', 'd', 'e']
console.log(b) // ['c', 'd', 'c', 'd', 'e']

let a = [1, 2, 3, 4, 5, 6, 7, 8, 9]
a.copyWithin(0, -5, -4) // [5, 2, 3, 4, 5, 6, 7, 8, 9]
```

### 9、 (ES6)fill() 填充数组

定义: 使用给定值，填充一个数组

- 第一个元素(必须): 要填充数组的值
- 第二个元素(可选): 填充的开始位置,默认值为 0
- 第三个元素(可选)：填充的结束位置，默认是为数组长度 length

```js
let a = ["a", "b", "c", "d", "e"]
let b = a.fill(6)
console.log(a) // [6, 6, 6, 6, 6]
console.log(b) // [6, 6, 6, 6, 6]

let a = ["a", "b", "c", "d", "e"]
console.log(a.fill(7, 1, 3)) // ['a', 7, 7, 'd', 'e']
```

## 不改变原数组的方法(8 个)

### 1. slice() 浅拷贝数组的元素

定义: 返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象，且`原数组不会被修改`,`返回新数组`。

```js
let a = ["a", "b", "c", "d", "e"]
let b = a.slice(1, 3)
console.log(b) // ['b', 'c']
console.log(a) // ['a','b','c','d','e']

// 基本类型
a[0] = 1 // 改变原数组
console.log(b) // ['b', 'c'] 新数组不改变

// 引用类型
let a = ["a", "b", { x: 1 }, { y: 2 }]
let b = a.slice(1, 3)
console.log(b) // ['b',{x: 1 }]
a[2].x = 10
console.log(b) // ['b',{x: 10 }]
```

### 2. join() 数组转字符串

定义: join() 方法用于把数组中的所有元素通过`指定的分隔符(默认为逗号)`进行分隔放入一个字符串，`返回新字符串`

```js
let a = ["hello", "world"]
let str = a.join() // 'hello,world'
let str2 = a.join("+") // 'hello+world'

// 多维数组
let a = [["a", "b"], "c", 0]
let str = a.join() // 'a,b,c,0'

// 元素是对象
let a = [{ name: "zzz", age: 22 }, "a", "b"]
let str2 = a.join("+") // '[object Object],a,b'
let str3 = JSON.stringify(a) // '[{"name":"zzz","age":22},"a","b"]'

let a = ["a", 0, { name: "zyn" }, ["x", "y"], new Date()]
let b = a.join()
// 'a,0,[object Object],x,y,Tue Feb 14 2023 20:40:33 GMT+0800 (中国标准时间)'
```

### 3. toLocaleString() 数组转字符串

定义: 用于将给定数组的元素转换为字符串(将每个元素转化为字符串后用逗号拼接为新字符串),`返回新字符串`

```js
let a = ["a", "b", 1, 2]
let str = a.toLocaleString() // 'a,b,1,2'

let a = ["a", 0, { name: "zyn" }, ["x", "y"], new Date()]
let b = a.toLocaleString() // 'a,0,[object Object],x,y,2023/2/14 20:40:33'
```

如上述栗子：调用数组的`toLocaleString`方法，数组中的每个元素都会**调用自身**的`toLocaleString`方法，对象调用对象的`toLocaleString`,Date 调用 Date 的`toLocaleString`。

### 4. toString() 数组转字符串 不推荐

定义: toString() 方法可把数组转换`为由逗号链接`起来的字符串,`返回新字符串`

```js
let a = ["a", "b", "c"]
let b = a.toString() // 'a,b,c'

let a = ["a", "b", "c"] + 5
// 'a,b,c5' 当数组和字符串操作的时候，js 会调用toString方法将数组自动转换成字符串

let a = [{ name: "zyn" }, 22, ["a", "b"], new Date()]
let b = a.toString()
// '[object Object],22,a,b,Tue Feb 14 2023 20:50:51 GMT+0800 (中国标准时间)'
```

### 5. cancat 合并数组

定义： 方法用于合并两个或多个数组，`返回一个新数组`

```js
let a = [1, 2, 3].concat(["a", "b", "c"]) // [1, 2, 3, 'a', 'b', 'c']

let a = [{ name: "zyn" }, 22, ["a", "b"]].concat([1, 2]) // [{name:'zyn'},22,['a','b'],1,2]
```

### 6. indexOf() 查找指定元素的所有

定义: 返回在数组中可以找到一个给定元素的第一个`索引`，如果不存在，则返回-1

```js
array.indexOf(ele, start)
```

- ele: 被查找的元素
- start: 开始查找的位置(不能大于等于数组的长度，返回-1)，接受负值，默认值为 0。

数组的 indexOf 搜索使用严格相等===搜索元素，即**数组元素要完全匹配**才能搜索成功。\
注意: console.log(NaN === NaN) 返回 false

```js
let a = ["啦啦", 2, 4, 24, NaN]
console.log(a.indexOf("啦")) // -1
console.log(a.indexOf("NaN")) // -1
console.log(a.indexOf("啦啦")) // 0
```

### 7. lastIndexOf() 查找指定元素在数组中的最后一个位置

定义: 方法返回指定元素,在数组中的最后一个的索引，如果不存在则返回 -1。（从数组后面往前查找）

```js
array.lastIndexOf(ele, start)
```

### 8. ES7 includes() 查找数组是否包含某个元素

定义： `返回一个布尔值`，表示某个数组是否包含给定的值

```js
array.indexOf(ele, (start = 0))
```

**注意: includes()可以识别 NaN**

```js
let a = ["a", "b", "c", NaN, "d"]
let b = a.includes(NaN) // true

let c = a.includes("a", 1) // false 从索引1开始查找
```

### 9. flat()多维数组转一维数组

```js
array.flat([depth])
```

- 参数
  - depth 可选 : 指定要提取嵌套数组的结构深度(降维深度)，默认值为 1。

```js
// 默认只提取一层
let a = [1, 2, ["a", "b", ["x", "y"]]]
let b = a.flat()

console.log(a) // [1, 2, ["a", "b", ["x", "y"]]]
console.log(b) // [1, 2, 'a', 'b', ["x", "y"]]

// Infinity扁平化任意深度
let c = a.flat(Infinity) // [1, 2, 'a', 'b', 'x', 'y']
```

## 遍历数组(12 个)

- 遍历规则
  - 1. 对于空数组是不会执行回调函数的
  - 2. 对于已在迭代过程中删除的元素，或者空元素会跳过回调函数
  - 3. 遍历次数再第一次循环前就会确定，再添加到数组中的元素不会被遍历。
  - 4. 如果已经存在的值被改变，则传递给 callback 的值是遍历到他们那一刻的值。

### 1. forEach 遍历数组

```js
array.forEach(callback[, thisArg])
```

- 描述:
  - 为数组中的每个元素执行一次回调函数
- 参数:
  - callback: 为数组中每个元素执行的函数，该函数接收三个参数：
    - currentValue(当前值): 数组中正在处理的当前元素。
    - index(索引): 数组中正在处理的当前元素的索引。
    - array: forEach()方法正在操作的数组。
  - thisArg (可选): 当执行回调函数时 this 绑定对象的值
- 返回值:
  - undefined

```js
const arr = [1, 2, 3, 4, 5]
const newArr = []
let result = arr.forEach((item, index) => {
  item += item
  newArr.push(item)
})
console.log(arr) //[1, 2, 3, 4, 5]
console.log(newArr) //[2, 4, 6, 8, 10]
console.log(result) //undefined 无返回值
```

```js
// 利用类创建对象,而且forEach中参数以箭头函数方式传入
class Counter {
  constructor() {
    this.sum = 0
    this.count = 0
  }
  add(array) {
    array.forEach((item) => {
      // 箭头函数没有自身的this,在箭头函数中使用的this指向当前箭头函数声明时所在的作用域的this
      this.sum += item
      ++this.count
    })
  }
}
const obj = new Counter()
obj.add([1, 2, 3, 4, 5])
obj.sum // 15
obj.count // 5
```

**参数 thisArg 的示例**

```js
// 利用类创建对象,而且forEach中参数以函数方式传入
class Counter {
  constructor() {
    this.sum = 0
    this.count = 0
  }
  add(array) {
    array.forEach(function (item) {
      this.sum += item
      ++this.count
    })
  }
}
const obj = new Counter()
obj.add([1, 2, 3, 4, 5])
obj.sum // Uncaught TypeError: Cannot read property 'sum' of undefined

// 利用类创建对象,而且forEach中参数以箭头函数方式传入，并传入this
class Counter {
  constructor() {
    this.sum = 0
    this.count = 0
  }
  add(array) {
    array.forEach(function (item) {
      this.sum += item
      ++this.count
      // 将当前函数的this指向构造函数的this
    }, this)
  }
}
const obj = new Counter()
obj.add([1, 2, 3, 4, 5])
obj.sum // 15
```

### 2. every 检测数组所有元素是否都符合判断条件

定义: 方法用于检测数组所有元素是否`都符合`函数定义的条件,`返回boolean布尔值`

```js
array.every(callback[, thisArg])
```

```js
let arr1 = [1, 2, 3, 4, 5]
let a = arr1.every((item, index) => {
  return item > 2
}) // false

let arr2 = [3, 4, 5, 6, 7]
let b = arr2.every((item, index) => {
  return item > 2
}) // true
```

### 3. some 数组中的是否有满足判断条件的元素

定义：数组中的是否`有满足`判断条件的元素,`返回boolean布尔值`

```js
array.some(callback[, thisArg])
```

```js
let arr1 = [1, 2, 3, 4, 5]
let a = arr1.some((item, index) => {
  return item > 2
}) // true

let arr2 = [3, 4, 5, 6, 7]
let b = arr2.some((item, index) => {
  return item > 10
}) // false
```

### 4. filter 过滤原始数组，返回新数组

描述: 将所有在过滤函数中返回 true 的数组元素放进一个新数组中,`并返回新数组`

```js
array.filter(callback[, thisArg])
```

```js
let arr1 = [1, 2, 3, 4, 5]
let a = arr1.filter((item, index) => {
  return item > 2
}) // [3,4,5]
```

### 5. map 对数组中的每个元素进行处理，返回新的数组

描述: 返回一个由回调函数的返回值组成的新数组

```js
array.map(callback[, thisArg])
```

```js
let arr1 = [1, 2, 3, 4, 5]
let a = arr1.map((item, index) => {
  return item * 2
}) // [2, 4, 6, 8, 10]
```

### 6. reduce 为数组提供累加器，合并为一个值

```js
array.reduce(callback[, initialValue])
```

- 描述:
  从左到右为每个数组元素执行一次回调函数，并把上次回调函数的返回值放在一个暂存器中传给下次回调函数，
  并返回最后一次回调函数的返回值
- 参数:
  - callback
    执行数组中每个值的函数，包含四个参数：
    - accumulator
      累加器累加回调的返回值; 它是`上一次调用回调时返回的累积值`，或 initialValue
    - currentValue
      数组中正在处理的元素。
    - currentIndex
      数组中正在处理的当前元素的索引。 如果提供了 initialValue，则索引号为 0，否则为索引为 1。
    - array
      调用 reduce 的数组
    - 返回值:
      强制返回 accumulator,否则为 undefined
  - initialValue
    用作第一个调用 callback 的第一个参数的值。 如果没有提供`初始值`，则将使用数组中的第一个元素
- 返回值:
  函数累计处理的结果

```js
let result = [1, 2, 3, 4, 5].reduce((init, item, index, array) => {
  return item + init
})
console.log(result) // 15

let arr = [
  { name: "zyn", money: 100 },
  { name: "tony", money: 300 },
  { name: "xiaobai", money: 150 },
]
let result2 = arr.reduce((init, item, index, array) => init + item.money, 0)
console.log(result2) // 550
```

### 7. reduceRight 从右至左累加

描述: 这个方法除了与 reduce 执行方向相反外，其他完全与其一致

### 8. (ES6) find() 根据条件找到数组成员

```js
array.find(callback, thisArg)
```

定义：用于找出第一个符合条件的数组成员，并返回该成员，如果没有符合条件的成员，则返回 undefined

```js
let a = [1, -4, -5, 10].find((n) => n < 0)
console.log(a) // -4

let b = [1, 4, -5, 10, NaN].find((n) => Object.is(NaN, n)) // 返回元素NaN
```

### 9. (ES6) findIndex() 根据条件找到数组成员

```js
array.findIndex(callback, thisArg)
```

findIndex()定义：返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1

```js
let b = [1, -4, -5, 10].findIndex((n) => n < 0)
console.log(b) // 1

let b = [1, 4, -5, 10, NaN].findIndex((n) => Object.is(NaN, n)) // 返回索引4
```

### 10.(ES6) keys() 遍历键名

- 描述:
  返回一个`数组迭代器对象`，该迭代器会包含所有数组元素的`键`
- 无参:
- 返回值:
  一个新的 Array 迭代器对象

```js
let arr = ["a", "b", "c"]
let iterator = arr.keys()

console.log(iterator) // Array Iterator {}

console.log(iterator.next()) // { value: 0, done: false }
console.log(iterator.next()) // { value: 1, done: false }
console.log(iterator.next()) // { value: 2, done: false }
console.log(iterator.next()) // { value: undefined, done: true}
```

```js
let a = ["a", "b", "c", "d"]
let iterator = a.keys()
for (let i of iterator) {
  console.log(i)
}
// 0
// 1
// 2
// 3
```

### 11.(ES6) values() 遍历键值

- 描述:
  返回一个`数组迭代器对象`，该迭代器会包含所有数组元素的`值`
- 无参:
- 返回值:
  一个新的 Array 迭代器对象

```js
let arr = ["a", "b", "c"]
let iterator = arr.values()

console.log(iterator.next()) // {value: 'a', done: false}
console.log(iterator.next()) // {value: 'b', done: false}
console.log(iterator.next()) // {value: 'c', done: false}
console.log(iterator.next()) // {value: undefined, done: true}
```

```js
let a = ["a", "b", "c", "d"]
let iterator = a.values()
for (let i of iterator) {
  console.log(i)
}
// a
// b
// c
// d
```

### 12.(ES6) entries() 遍历键名+键值

- 描述:
  返回一个数组迭代器对象，该迭代器会包含所有数组元素的`键值对`
- 无参:
- 返回值:
  一个新的 Array 迭代器对象

```js
let arr = ["a", "b", "c"]
let iterator = arr.entries()
console.log(iterator.next()) // { value:[0,'a'], done:false}
console.log(iterator.next()) // { value:[1,'b'], done:false}
console.log(iterator.next()) // { value:[2,'c'], done:false}
console.log(iterator.next()) // { value:undefined, done:done}
```

```js
let a = ["a", "b", "c", "d"]
let iterator = a.entries()
for (let i of iterator) {
  console.log(i)
}
// [0, 'a']
// [1, 'b']
// [2, 'c']
// [3, 'd']
```

## 构造函数 Array 方法

### 1. Array.isArray() 判断是否是数组

- 描述:
  假如一个变量是数组则返回 true，否则返回 false
- 参数:
  obj
- 返回值:
  boolean 值

```js
// 下面的函数调用都返回 true
Array.isArray([])
Array.isArray([1])
Array.isArray(new Array())
// 鲜为人知的事实：其实 Array.prototype 也是一个数组。
Array.isArray(Array.prototype)

// 下面的函数调用都返回 false
Array.isArray()
Array.isArray({})
Array.isArray(null)
Array.isArray(undefined)
Array.isArray(17)
Array.isArray("Array")
Array.isArray(true)
Array.isArray(false)
Array.isArray({ __proto__: Array.prototype })
```

### 2. Array() 创建一个数组

```js
// 字面量方式:
// 这个方法也是我们最常用的，在初始化数组的时候 相当方便
var a = [3, 11, 8] // [3,11,8];
// 构造器:
// 实际上 new Array === Array,加不加new 一点影响都没有。
var a = Array() // []
var a = Array(3, 11, 8) // [ 3,11,8 ]

var a = Array(3) // [,,]
```

### 3. (ES6) Array.of() 返回由所有参数值组成的数组

**Array.of(element0[, element1[, ...[, elementN]]])**

- 描述:
  方法创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型
- 参数:
  elementN
  任意个参数，将按顺序成为返回数组中的元素。
- 返回值
  新的 Array 实例

```js
let a = Array.of(3, 11, 8) // [3,11,8]
let a = Array.of(3) // [3]
```

### 4. (ES6) Arrary.from() 将类数组或者迭代对象转化为数组

伪数组对象:（拥有一个 length 属性和若干索引属性的任意对象）\
可迭代对象:（可以获取对象中的元素,如 Map 和 Set 等）\
[可迭代对象](https://blog.csdn.net/qq_35652006/article/details/128509560)

```js
Array.from(arrayLike, mapFn, thisArg)

Array.from(obj, mapFn, thisArg) 就相当于 Array.from(obj).map(mapFn, thisArg)
```

- 参数:
  - arrayLike:
    想要转换成数组的伪数组对象或可迭代对象。
  - mapFn (可选参数):
    如果指定了该参数，新数组中的每个元素会执行该回调函数。\
    类似数组的 map 方法，对每个元素进行处理，将处理后的值放入返回的数组
  - thisArg (可选参数):
    可选参数，执行回调函数 mapFn 时 this 对象
- 返回值:
  一个新的数组实例

```js
// 1. 对象拥有length属性
let obj = { 0: "a", 1: "b", 2: "c", length: 3 }
let arr = Array.from(obj) // ['a','b','c'];

// 2. 部署了 Iterator接口的数据结构
let arr = Array.from("hello") // ['h','e','l','l','o']
let arr = Array.from(new Set(["a", "b"])) // ['a','b']
```

## 其他方法

### 1. valueOf() 返回数组本身

- JavaScript 中的 valueOf() 方法用于返回指定对象的原始值，若对象没有原始值，则将返回对象本身。通常由 JavaScript 内部调用，而不是在代码中显式调用。
- 默认情况下，valueOf 方法由 Object 后面的每个对象继承。 每个内置的核心对象都会覆盖此方法以返回适当的值。
- JavaScript 的许多内置对象都重写了该函数，以实现更适合自身的功能需要。因此，不同类型对象的 valueOf() 方法的返回值和返回值类型均可能不同。

```js
let res = [1, 2].valueOf() // [1,2]
```

**不同类型对象的 valueOf() 方法的返回值：**

```js
Array：返回数组对象本身。

Boolean： 返回布尔值

Date：存储的时间是从 1970 年 1 月 1 日午夜开始计的毫秒数 UTC。

Function： 返回函数本身。

Number： 返回数字值。

Object：返回对象本身。这是默认情况。

String：返回字符串值。

Math 和 Error 对象没有 valueOf 方法。
```

[参考 1](https://juejin.cn/post/6844903614918459406#heading-17)
[参考 2](https://www.jianshu.com/p/cf95d58d89a4?utm_campaign=maleskine...&utm_content=note&utm_medium=seo_notes&utm_source=recommendation)
