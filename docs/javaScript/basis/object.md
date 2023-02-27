# Object 对象

[[toc]]

## 属性描述符

对对象的属性进行配置

- 数据属性

  - configurable(可配置的): 是否可以`删除该属性`以及是否可以`修改以下特性（writable, configurable, enumerable）`, 默认值为 true\
    **注意: writable 状态为 true 改为 false 可以执行, false 改 true 报错**

  - enumerable(可枚举的): 是否能枚举。也就是`是否能被 for-in 遍历`。默认值为 true
  - writable(可写的): `是否能修改值`。默认为 true
  - value(值): 该`属性的具体值`是多少。默认为 undefined

- 访问器属性
  - configurable
  - enumerable
  - get:function: `取值函数`,默认值为 undefined，当访问该属性时，该方法会被执行
  - set: `赋值函数`,默认值为 undefined，当属性修改时，触发执行改方法，该方法接收一个参数，就是该属性新的值

### 数据描述符(数据属性)

- configurable

```js
let obj = {}
obj.name = "张三"
obj.age = 20
console.log(obj) // {name: '张三', age: 20}

// 将 configurable 设为false
Object.defineProperty(obj, "name", {
  configurable: false,
})

// 1. 删除属性
delete obj.name // 无法删除
console.log(obj) // {name: '张三', age: 20}

// 2. 修改 writable
// 2.1 writable状态为true改为false时可以执行
Object.defineProperty(obj, "name", {
  writable: false, //
})
// 获取指定对象上自有属性对应的属性描述符
Object.getOwnPropertyDescriptor(obj, "name")
// {value: '张三', writable: false, enumerable: true, configurable: false}

// 2.2 writable状态为false改为true
Object.definProperty(obj, "name", {
  writable: true,
})
// writable状态为false改为true时报错 => Uncaught TypeError: Cannot redefine property: name

// 3. 修改value
Object.defineProperty(obj, "name", {
  value: "李四",
})
// 报错: Uncaught TypeError: Cannot redefine property: name
obj.name = "李四"
console.log(obj) // {name: '张三', age: 20}

// 4. 修改enumerable
for (let key in obj) {
  console.log(key) // name age
}
Object.defineProperty(obj, "name", {
  enumerable: false,
})
// 报错 Uncaught TypeError: Cannot redefine property: name

// 5. 修改 configurable
Object.defineProperty(obj, "name", {
  configurable: true,
})
// 报错 Uncaught TypeError: Cannot redefine property: name
```

- enumerable

```js
let obj = {}
obj.name = "张三"
obj.age = 20
console.log(obj) //  {name: '张三', age: 20}

for (let key in obj) {
  console.log(key) // name age
}

// enumerable 改为false
Object.defineProperty(obj, "name", {
  enumerable: false,
})

for (let key in obj) {
  console.log(key)
}
// age 只打印第一个,无法遍历
```

- writable

```js
let obj = {}
obj.name = "张三"
obj.age = 20
console.log(obj) //  {name: '张三', age: 20}

obj.name = "李四"
console.log(obj) //  {name: '李四', age: 20}

Object.defineProperty(obj, "name", {
  writable: false,
})

obj.name = "王五"
console.log(obj) //  {name: '李四', age: 20}
```

- value

```js
let obj = {}
obj.name = "张三"
obj.age = 20
console.log(obj) //  {name: '张三', age: 20}

Object.defineProperty(obj, "name", {
  value: "李四",
})
console.log(obj) //  {name: '李四', age: 20}
```

### 存取描述符(访问器属性)

- configurable
- enumerable
- get:function
- set:function

```js
let obj = {
  name: "张三",
  age: 22,
}
console.log(obj) // {name: '张三', age: 22}

Object.defineProperty(obj, "age", {
  get: function () {
    return 18
  },
  set: function (val) {
    console.log(val)
  },
})
console.log(obj) // {name: '张三'}

console.log(obj.age) // 18

obj.age = 30 // 30 打印val

console.log(obj.age) // 18
```

## 属性相关方法

### Object.getOwnPropertyDescriptor() 获取属性描述符

> Object.getOwnPropertyDescriptor(obj, prop)

- 参数
  - obj: 目标对象
  - prop: 属性键名
- 返回值
  - 返回指定对象上自有属性对应的属性描述符

```js
let obj = {}
obj.name = "张三"
Object.getOwnPropertyDescriptor(obj, "name")
// {value: '张三', writable: true, enumerable: true, configurable: true}
```

### Object.defineProperty() 设置属性描述符

> Object.defineProperty(obj, prop, desc)

- 描述
  - 在对象上定义新的属性，或者修改对象中的属性，结果返回`该对象`
- 参数
  - obj: 目标对象
  - prop: 属性键名
  - desc: 这个属性的描述对象
- 返回值
  - 返回该对象 obj

```js
let person = {}
let res = Object.defineProperty(person, "name", {
  value: "jonas",
  writable: true,
  enumerable: true,
  configurable: true,
})
console.log(res) //{name: "jonas"}
console.log(person) //{name: "jonas"}
```

### Object.defineProperties() 设置多个属性的属性描述对象

> Object.defineProperties(obj, propertiesObject)

- 描述
  - 在对象上定义一个(多个)新的属性或修改原有属性，结果返回`该对象`
- 参数
  - obj: 目标对象
  - propertiesObject: 对象的属性描述对象
- 返回该对象 obj

```js
let obj = {}
Object.defineProperties(obj, {
  name: {
    writable: false,
    value: "张三",
  },
  age: {
    value: 22,
  },
})
console.log(obj) // { name: "张三", age: 22 }
```

### Object.getOwnPropertyNames() 获取对象的所有自身属性的属性名(包括不可枚举属性)

> Object.getOwnPropertyNames(obj)

- 描述: 该方法返回一个由指定对象的所有自身属性的属性名（`包括不可枚举属性`但不包括 Symbol 作为键名的属性）`组成的数组`

```js
let obj = {}
Object.defineProperty(obj, "name", {
  configurable: false,
  enumerable: false, // 不可枚举
  writable: true,
  value: "Jonas",
})
Object.defineProperty(obj, Symbol(), {
  configurable: false,
  enumerable: false,
  writable: true,
  value: 18,
})
let arr = Object.getOwnPropertyNames(obj)
console.log(arr) //["name"]
```

### Object.getOwnPropertySymbols() 获取对象自身所有的 Symbol 键名的属性

```js
let obj = {}
Object.defineProperty(obj, "name", {
  configurable: false,
  enumerable: false,
  writable: true,
  value: "Jonas",
})
Object.defineProperty(obj, Symbol(), {
  configurable: false,
  enumerable: false,
  writable: true,
  value: 18,
})
let arr = Object.getOwnPropertySymbols(obj)
console.log(arr) //[Symbol()]
```

## 原型相关方法

### Object.getPrototypeOf() 返回指定对象的原型对象

> Object.getPrototypeOf(obj)

```js
function Person() {}
let pro = {
  money: 100,
  say() {
    console.log("hello")
  },
}
Person.prototype = pro
let p1 = new Person() // { [[prototype]]: Object }

// Object.getPrototypeOf() 获取指定对象的原型对象
console.log(Object.getPrototypeOf(p1)) // {money: 100, say: ƒ}

console.log(Object.getPrototypeOf(p1) === pro) // true
```
### Object.setPrototypeOf() 为对象设置原型对象
> Object.setPrototypeOf(obj,proto)
- 描述: 为现有对象设置原型，返回一个新对象
- 参数:
  - obj: 现有对象
  - proto: 原型对象
- 返回值: 新对象
```js
// 创建一个没有原型的对象
let obj = Object.create(null,{
  name:{
    value:"张三",
  }
})
console.log(obj) // { name: "张三" }

// 给对象设置原型对象
let obj1 = Object.setPrototypeOf(obj,{
    addredd:"天津",
    say:function(){
        console.log("^_^")
    }
})
console.log(obj1) 
// { name: "张三",[[Prototype]]:{ addredd: "天津",say: f (), [[Prototype]]: Object } } => 末尾的 [[Prototype]]: Object参考原型链
console.log(obj) // { name: "张三",[[Prototype]]:{ addredd: "天津",say: f (), [[Prototype]]: Object } } => 末尾的 [[Prototype]]: Object参考原型链
console.log(obj1 === obj) // true
```
## Object 自身相关的方法

### Object.assign() 合并对象--浅拷贝

> Object.assign(target,...assign)

- 作用：将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
- 参数
  - target 目标对象
  - assign 源对象
- 返回值
  - 目标对象

```js
const target = {
  name: "张三",
  age: 20,
}
const source = {
  address: "天津",
}
const res = Object.assign(target, source)
console.log(res) // {name: '张三', age: 20, address: '天津'}

// ES6 => 三点运算符
const res2 = { ...target, ...source } // {name: '张三', age: 20, address: '天津'}
```

### Object.keys() 返回 可枚举属性的 key 组成的数组

```js
let obj = { a: 1, b: 2 }
Object.defineProperty(obj, "c", {
  enumerable: false,
  value: 3,
})
console.log(obj) // { a: 1, b: 2, c:3 }
Object.keys(obj) // [a,b]
```

### Object.values() 返回 可枚举属性的 value 组成的数组

```js
let obj = { a: 1, b: 2 }
Object.defineProperty(obj, "c", {
  enumerable: false,
  value: 3,
})
console.log(obj) // { a: 1, b: 2, c:3 }
Object.values(obj) // [1, 2]
```

### Object.entries() 返回 可枚举属性的 键值对 数组

- 该方法返回对象 obj 自身的可枚举属性的键值对数组。结果是一个二维数组，数组中的元素是一个由两个元素 `key` ，`value` 组成的数组

```js
let person = { name: "jonas", age: 18 }
let arr = Object.entries(person)
console.log(arr) //[["name", "jonas"],["age", 18]]

// 使用场景：将普通的对象转换为 Map
let person = { name: "jonas", age: 18 }
let map = new Map(Object.entries(person))
console.log(map) //Map(2) {"name" => "jonas", "age" => 18}
```

### Object.fromEntries() 将键值对数组变为对象--与 entries 相反

> Object.fromEntries(arr)

```js
let arr = [["a", 1],["b", 2]]
let obj = Object.fromEntries(arr) // { a: 1, b: 2 }
```

### * Object.create() 创建新对象
**谷歌73以上版本才支持**

> Object.create(proto,propertiesObject)

- 参数
  - proto: 用于指定新建对象的原型对象，为 null 时不指定原型
  - propertiesObject: 对象的属性描述对象
- 返回值

  - 返回新建的对象

- **Object.create()和 new Object() 的区别**
  - Object.create()继承指定对象， new Object()继承内置对象 Object
  - 可以通过 Object.create(null) 创建一个干净的对象，也就是没有原型，而 new Object() 创建的对象是 Object 的实例，原型永远指向 Object.prototype

```js
function Person() {} // 新建构造函数
Person.prototype.say = function () {
  // 构造函数原型添加方法
  console.log("hello")
}
// 创建对象 并传入构造函数Person的原型对象,并添加属性及属性描述符
let person = Object.create(Person.prototype, {
  name: {
    value: "张三",
    writable: true,
  },
  age: {
    value: 20,
    writable: true,
  },
})
console.log(person)
// 参考原型链
// Person {name: '张三', age: 20, [[Prototype]]: {say: ƒ (), constructor: ƒ Person(), [[Prototype]]: Object}}
person.say() // 可使用构造函数Person原型上的方法 打印hello

// 查看对象person原型
Object.getPrototypeOf(person)
// {say: ƒ (), constructor: ƒ Person(), [[Prototype]]: Object} 最后这个Object是内置对象Object的原型对象
```

- 当第一个参数为 null 时,创建的是一个没有原型的对象

```js
let obj = Object.create(null, {
  a: 1,
  b: 2,
})
let obj = Object.create(null, {
  a: {
    value: 1,
    writable: true,
  },
  b: {
    value: 2,
  },
})
console.log(obj) // {a: 1, b: 2} => 没有原型
```

- 当第一个参数为 null，不传第二个参数时,创建的是一个没有原型且没有属性的对象(干净的对象)

```js
let obj = Object.create(null)
console.log(obj) // {} => 无属性
```

- 两个参数都不为空

```js
let o = {
  a: 1,
  b: 2,
  c: function () {
    console.log("c")
  },
}
let obj = Object.create(o, {
  d: {
    value: 4,
  },
})
console.log(obj)
//{
//  d: 4,
//  [[prototype]]:{  ==> 对象o
//    a:1,
//    b:2,
//    c:f(),
//    [[prototype]]:Object ==> 这里指向Object的原型对象
//  }
//}
```

### Object.is() 判断两个值是否相同

- 描述: 用来判断两个值是否相等，它接收两个参数，分别是需要比较的两个值
- 返回值: boolean 布尔值

**注意：该方法不会做隐式类型转换**

```js
// 基本类型
Object.is(undefined, undefined) // true
Object.is(null, null) // true
Object.is(false, false) // true
Object.is("1", "1") // true
Object.is("a", "a") // true
Object.is(NaN, NaN) // true
Object.is(NaN, 0 / 0) // true
Object.is(0, 0) // true
Object.is(+0, +0) // true
Object.is(+0, -0) // false

// 引用类型
let obj = { a: 1, b: 2 }
let obj1 = { a: 1, b: 2 }
let test = obj

Object.is(obj, obj1) // false => 内存地址不同
Object.is(obj, test) // true => 内存地址相同

Object.is([], []) // false => 内存地址不同
```

### Object.preventExtensions() 阻止对象扩展

> Object.preventExtensions(obj)

- 描述: 阻止对象扩展，让一个对象变的不可扩展，也就是`永远不能再添加新的属性`,但是`可以删除属性`，可以修改已有属性的值

```js
let obj = { name: "张三" }
obj.age = 22
console.log(obj) // {name: '张三', age: 22}

// 阻止对象扩展
Object.preventExtensions(obj)

// 添加属性
obj.address = "天津"
console.log(obj) // {name: '张三', age: 22}
console.log(obj.address) // undefined => 严格模式下会报错

// 删除属性
delete obj.age
console.log(obj) // {name: '张三'}

// 修改已有属性的值
obj.name = "李四"
console.log(obj) // {name: '李四'}
```

### Object.isExtensible() 判断对象是否可扩展

> Object.isExtensible(obj)

- 描述: 判断一个对象是否可扩展，即是否可以给它添加新属性

```js
let obj = { name: "张三" }
Object.isExtensible(obj) // true
Object.preventExtensions(obj) // 阻止对象扩展

Object.isExtensible(obj) // false
```

### Object.seal() 密封对象

> Object.seal(obj)

- 作用: 让一个对象密封，并返回被密封后的对象。密封对象是指那些`不能添加新的属性，不能删除已有属性`，以及`不能修改已有属性的可枚举性、可配置性、可写性`，但可以修改已有属性的值的对象。

```js
let obj = { name: "张三" }
// 密封对象
Object.seal(obj)

// 添加属性
obj.age = 20
console.log(obj) // {name: '张三'}

// 删除属性
delete obj.name // false
console.log(obj) // {name: '张三'}

// 修改属性的可配置性、可枚举性、可写性
Object.defineProperty(obj, "name", {
  configurable: true,
  writable: true,
  enumerable: true,
}) // 报错 => Uncaught TypeError: Cannot redefine property: name

// 修改已有属性的值
obj.name = "李四" // '李四'
console.log(obj) // {name: '李四'}
```

### Object.isSealed() 判断对象是否密封

> Object.isSealed(obj)

- 判断一个对象是否是密封的（sealed）

```js
let obj = { name: "张三" }
Object.isSealed(obj) // false
// 将对象密封
Object.seal(obj) // {name: '张三'}
Object.isSealed(obj) // true
```

### Object.freeze() 冻结对象

> Object.freeze(obj)

- 冻结对象是指 `不能添加`新的属性，`不能修改`已有属性的值，`不能删除`已有属性，以及`不能修改已有属性的可枚举性、可配置性、可写性`的对象。也就是说，这个对象`永远是不可变`的。

```js
let obj = { name: "张三" }
// 冻结对象
Object.freeze(obj) // {name: '张三'}

// 添加属性
obj.age = 22
console.log(obj) // {name: '张三'}

// 修改已有属性的属性值
obj.name = "李四"
console.log(obj) // {name: '张三'}

// 删除已有属性
delete obj.name // false
console.log(obj) // {name: '张三'}

// 修改已有属性的可枚举性、可配置性、可写性
Object.defineProperty(obj, "name", {
  configurable: true,
  writable: true,
  enumerable: true,
}) // 报错 => Uncaught TypeError: Cannot redefine property: name
```

### Object.isFrozen() 判断对象是否冻结

> Object.isFrozen(obj)

```js
let obj = { name: "张三" }
Object.isFrozen(obj) // false

// 冻结对象
Object.freeze(obj) // {name: '张三'}
Object.isFrozen(obj) // true
```

### ES13 Object.hasOwn()
- 作用: 用于解决原型上的hasOwnProperty方法的缺陷,用于替换Object.prototype.hasOwnProperty.call
```js
let obj = {
  name:"张三",
  hasOwnProperty:"哈哈",
  hasOwn:function(){
    console.log("我是hasOwn")
  }
}
console.log(Object.hasOwn(obj,'name')) // true => 这是Object内置对象的方法
obj.hasOwn() // 我是hasOwn => 这是实例对象的方法
```
[hasOwn](https://ost.51cto.com/posts/10066)
[hasOwn](https://zhuanlan.zhihu.com/p/385865696)

## Object原型上的方法(Object.prototype)
### constructor 返回创建实例的构造函数
```js
let obj = {}
obj.constructor === Object // true
obj.__proto__.constructor === Object // true
Object.prototype.constructor === Object // true

function Person(name,age){
  this.name = name;
  this.age = age;
  this.say = () => {
    console.log('我是',this.name)
  }
}
let p1 = new Person('张三',20)
console.log(p1.constructor) // ƒ Person(name,age){ ... } 返回构造函数Person
```

### hasOwnProperty() 判断属性值是否在对象上
> obj.hasOwnProperty(attr)
- 参数
  - obj: 指定对象
  - attr: 指定属性
- 返回值: 布尔值
```js
let obj = { a: 1, b: 2 }
obj.hasOwnProperty('a') // true
obj.hasOwnProperty('c') // false

let obj = Object.create({ c: 3},{
  a:{
      value:1
  },
  b:{
      value:2
  }
})
console.log(obj.hasOwnProperty('c')) // false
```
![](/javascript/basis/obj_1.png)

- 缺陷: 如果对象有一个自己的属性hasOwnProperty,则无法访问原型上的hasOwnProperty方法
- 解决方法
  - Object.prototype.hasOwnProperty.call
  - hasOwn
```js
let obj = {
  name:"张三",
  hasOwnProperty:"哈哈"
}
// {name: '张三', hasOwnProperty: '哈哈'}
obj.hasOwnProperty('name') // 报错 => Uncaught TypeError: obj.hasOwnProperty is not a function
Object.prototype.hasOwnProperty.call(obj,'name') // true
```

### isPrototypeOf() 判断一个对象是够在另一个对象的原型链上
> obj1.isPrototypeOf(obj2)
- 描述: 判断obj1是否在obj2的原型上

```js
let proto = Object.prototype // Object的原型对象
let obj = {}
proto.isPrototypeOf(obj) // true

let o = { c: 3 }
let obj = Object.create(o)
o.isPrototypeOf(obj) // true
```

### toString() 返回对象的字符串形式
```js
let obj = {}
obj.toString() // "[object, object]"
Object.prototype.toString.call([]) // '[object Array]'
```

### valueOf() 返回对象本身

### propertyIsEnumerable() 判断属性是否是该对象本身的可枚举属性
> obj.propertyIsEnumerable(prop)
```js
let obj = { a: 1,b : 2 }
Object.defineProperty(obj,'b',{
    enumerable:false
})
obj.propertyIsEnumerable('a') // true
obj.propertyIsEnumerable('b') // false
```

## 其他

### Object.create()与 new Object()区别


[前往=>](/javaScript/basis/object.html#object-create-创建新对象)

### new 关键字
[new关键字=>](/javaScript/basis/new.html)

---

[参考](https://blog.csdn.net/weixin_41030302/article/details/104376256)
[参考](https://juejin.cn/post/7051417338133872648)
[对象的扩展、密封、冻结](https://www.shuzhiduo.com/A/VGzlKmOdbq/)
