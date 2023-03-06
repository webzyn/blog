# Symbol类型

[[toc]]
Symbol是ES6中引入的一种新的基本数据类型，用于表示一个独一无二的值。它是JavaScript中的第七种数据类型，与undefined、null、Number（数值）、String（字符串）、Boolean（布尔值）、Object（对象）并列。

## 创建Symbol

```js
let s = Symbol()

console.log(s) // Symbol()
typeof s // "symbol"
```
`Symbol()`函数前不能使用`new`命令,因为 Symbol 是一个原始类型的值，不是对象。Symbol是一种`类似于字符串的数据类型`,所有也不能添加属性。以下写法不正确
```js
conse s = new Symbol() // Uncaught SyntaxError: Unexpected identifier 's'
```
## Symbol的描述
`Symbol()`函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述。这主要是为了在控制台显示，或者转为字符串时，比较容易区分。
```js
// 有参数的情况
let s1 = Symbol('foo');
let s2 = Symbol('bar');

s1 // Symbol(foo)
s2 // Symbol(bar)

s1.toString() // "Symbol(foo)"
s2.toString() // "Symbol(bar)"

s1 === s2 // false

// 没有参数的情况
let s1 = Symbol();
let s2 = Symbol();

s1 === s2 // false
```

### * Symbol.prototype.description 返回Symbol值的描述
- ES2019 提供了一个 Symbol 值的`实例属性`description，直接返回 Symbol 值的描述
```js
const s = Symbol('foo')

console.log(s.description) // 'foo'
```
## Symbol 作为属性名
- 注意: Symbol 值作为对象属性名时，不能用点运算符。
- Symbol 值作为属性名时，该属性是公开属性，不是私有属性。
```js
let mySymbol = Symbol();

// 第一种写法
let a = {};
a[mySymbol] = 'Hello!'; // symbol必须放在方括号[]中，否则是将字符串'mySymbol'作为属性名, 而不是Symbol

// 第二种写法
let a = {
  [mySymbol]: 'Hello!'
};

// 第三种写法
let a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });

// 以上写法都得到同样结果
a[mySymbol] // "Hello!"

a.mySymbol // undefined => 使用.运算符是找属性名为字符串的属性
```

### * Symbol 值作为属性名的遍历 Object.getOwnPropertySymbols()/Reflect.ownKeys()
- Symbol值作为属性名，**不会**被`for...in`、`for...of`遍历
- 也**不能**被`Object.keys()`、`Object.getOwnPropertyNames()`、`JSON.stringify()`返回
- **可以**通过`Object.getOwnPropertySymbols()`获取对象所有的Symbol属性名
- `Reflect.ownKeys()`方法可以返回所有类型的键名，包括常规键名和 Symbol 键名。
```js
const obj = {}
// 添加普通属性
obj.name = '张三'
// 添加symbol类型属性
const foo = Symbol('foo')
obj[foo] = '我是foo'
obj[Symbol('bar')] = '我是bar'

console.log(obj) // {name: '张三', Symbol(foo): '我是foo', Symbol(bar): '我是bar'}

for(let i in obj){
  console.log(i)
} // name => symbo类型属性名无法遍历
Object.keys(obj) // ['name']
Object.getOwnPropertyNames(obj) // ['name']
JSON.stringify(obj) // '{"name":"张三"}'

Object.getOwnPropertySymbols(obj) //  [Symbol(foo), Symbol(bar)]

Reflect.ownKeys(obj) // ['name', Symbol(foo), Symbol(bar)]
```
## 方法
### Symbol.for() 重新使用同一个Symbol值

- 描述: `接受一个字符串作为参数`，然后搜索有没有以该参数作为名称的 Symbol 值。如果有，就返回这个 Symbol 值，否则就新建一个以该字符串为名称的 Symbol 值，并将其`注册到全局`。
```js
let s1 = Symbol.for('foo');
let s2 = Symbol.for('foo');
s1 === s2 // true
```
**Symbol.for()与Symbol()区别**
- `Symbol.for()`会被登记在全局环境中供搜索,`Symbol()`不会
- `Symbol.for()`不会每次调用就返回一个新的 Symbol 类型的值,`Symbol()`每次调用返回新的Symbol值
```js
Symbol.for("bar") === Symbol.for("bar")// true
Symbol("bar") === Symbol("bar") // false
```
### Symbol.keyFor() 返回已登记的Symbol类型值的key
- 登记: 参考上面Symbol.for()与Symbol()区别
- 其实就是返回通过Symbol.for()方法创建的[Symbol值的描述](/javaScript/es6/Symbol.html#symbol的描述)

```js
// 通过Symbol.for()登记在全局环境
let s1 = Symbol.for("foo");
Symbol.keyFor(s1) // "foo"

// Symbol()方法不会登记在全局环境
let s2 = Symbol("foo");
Symbol.keyFor(s2) // undefined
```

## 内置的Symbol值
### Symbol.hasInstance 指向内部方法，对象使用instanceof时自动调用该方法
对象的`Symbol.hasInstance属性`，指向一个`内部方法`。使用instanceof运算符时，会调用这个方法。比如，`foo instanceof Foo`在语言内部，实际调用的是`Foo[Symbol.hasInstance](foo)`。
- 可以在类中定义，如下实例
```js
class MyClass {
  [Symbol.hasInstance](foo) {
    return foo instanceof Array;
  }
}

[1, 2, 3] instanceof new MyClass() // true

// 代码解析
// new MyClass 
// 这个类中定义的[Symbol.hasInstance]此方法不是静态方法，需要创建实例才能调用

// [1, 2, 3] instanceof new MyClass()
// 将[1,2,3]作为参数foo ， 然后自动调用实例的[Symbol.hasInstance]方法

// return foo instanceof Array
// 将foo作为Array内部方法[Symbol.hasInstance]的参数，然后调用Array内部方法[Symbol.hasInstance]
```
例子
```js
class Even {
  // 给类Even添加一个静态方法, 直接通过Even[Symbol.hasInstance]调用
  static [Symbol.hasInstance](obj) {
    // 判断是不是偶数
    return Number(obj) % 2 === 0;
  }
}
2 instanceof Even // true
// 解释: 将2作为参数obj，然后自动调用Even[Symbol.hasInstance]方法

// 等同于
const Even2 = {
  [Symbol.hasInstance](obj) {
    return Number(obj) % 2 === 0;
  }
};
10 instanceof Even2 // true
// 直接调用 对象Even2上的方法

// 等同于
class Even3 {
  [Symbol.hasInstance](obj) {
    return Number(obj) % 2 === 0;
  }
}
let even3 = new Even3() // 创建实例
30 instanceof even3 // 调用实例的方法
```

### Symbol.isConcatSpreadable 对象用于Array.prototype.concat()时是否可以展开
对象的`Symbol.isConcatSpreadable`属性等于一个布尔值，表示该对象用于`Array.prototype.concat()`时，是否可以展开

- **用于数组时**
  - Symbol.isConcatSpreadable**默认为undefined,表示可以展开**。设为true时也可以展开
  - 值设为false时，表示不能展开
- **用于类数组对象时**
  - Symbol.isConcatSpreadable**默认为undefined,表示不能展开**。设为true可以展开
  - 设为false也不能展开
```js
// 一、用于对象
let arr1 = ['a','b']
let arr2 = ['c','d']
let arr3 = ['e','f']

// 默认值
console.log(arr1[Symbol.isConcatSpeadable]) // undefined => 默认值
arr1.concat(arr2,arr3) // ['a', 'b', 'c', 'd', 'e', 'f']

// 设为true时
arr1[Symbol.isConcatSpeadable] = true
arr1.concat(arr2,arr3) // ['a', 'b', 'c', 'd', 'e', 'f']

// arr1 设为false时
arr1[Symbol.isConcatSpreadable] = false
arr1.concat(arr2,arr3) // [Array(2), 'c', 'd', 'e', 'f']
// [['a', 'b', undefined: true, Symbol(Symbol.isConcatSpreadable): false], 'c', 'd', 'e', 'f']

// arr2 设为false
arr2[Symbol.isConcatSpreadable] = false
arr1.concat(arr2,arr3)// [Array(2), Array(2), 'e', 'f']

// 二、用于类数组
let arr = ['a', 'b'];
let obj = {length: 2, 0: 'c', 1: 'd'};

// 默认为undefined 表示不展开 与false一致
arr.concat(obj) // ['a', 'b', {0: 'c', 1: 'd', length: 2}] 

// 设为true时
obj[Symbol.isConcatSpreadable] = true 
arr.concat(obj) // ['a', 'b', 'c', 'd']
```
- `Symbol.isConcatSpreadable属性`也可以定义在类里面
```js
class A1 extends Array {
  constructor(args) {
    super(args);
    this[Symbol.isConcatSpreadable] = true;
  }
}
class A2 extends Array {
  constructor(args) {
    super(args);
  }
  get [Symbol.isConcatSpreadable] () {
    return false;
  }
}
let a1 = new A1();
a1[0] = 3;
a1[1] = 4;
let a2 = new A2();
a2[0] = 5;
a2[1] = 6;
[1, 2].concat(a1).concat(a2)
// [1, 2, 3, 4, [5, 6]]
```
注意，Symbol.isConcatSpreadable的位置差异，`A1是定义在实例上`，`A2是定义在类本身`，效果相同。

### Symbol.species(待)

### Symbol.match