# 字符串方法

[[toc]]

## 查找

### 1. indexOf() 返回字符串中指定文本首次出现的索引

- 语法：string.indexOf(searchvalue[,start])
- 参数
  - searchvalue 必需值。规定需检索的字符串值。
  - start 可选的整数参数。规定在字符串中开始检索的位置。

```js
let str = "abcdabcd"
let res = str.indexOf("c") // 2
```

### 2. lastIndexOf() 返回指定文本在字符串中最后一次出现的索引

- 语法：string.lastIndexOf(searchvalue[,start])

```js
let str = "abcdabcd"
let res = str.lastIndexOf("c") // 6
```

### 3. search() 方法返回字符串, 或正则表达式中指定文本首次出现的索引

- 描述: search() 方法用于检索字符串中指定的子字符串，或检索与正则表达式相匹配的子字符串。返回与指定查找的字符串或者正则表达式相匹配的 String 对象起始位置。
- 语法：string.search(searchvalue)
- 参数
  - searchvalue 必须。查找的字符串或者正则表达式。

```js
// search与indexOf相识,区别就是不能指定查找位置
let str = "abcabc"
let res = str.search("b") // 1

let str = "abcabc"
let res = str.search(/ca/) // 2
```

### 4. (ES6)includes() 判断字符串是否包含指定的子字符串

-语法：string.includes(searchvalue[, start])

- 参数
  - searchvalue 必需值，要查找的字符串。
  - start 可选值，设置从那个位置开始查找，默认为 0。
- 返回值:布尔值

```js
let str = "Hello"
let s = str.includes("e")
console.log(s) //true
```

### 5.(ES6)startsWith() 判断参数字符串是否在原字符串的头部

-语法：string.startsWith(searchvalue[, start])

- 参数
  - searchvalue 必需值，要查找的字符串。
  - start 可选值，设置从那个位置开始查找，默认为 0。
- 返回值:布尔值

```js
"abc".startsWith("a") //true
"abc".startsWith("d") //false

'abcdefg'.startsWith('bcd'))	//false
'abcdefg'.startsWith('bcd',1))	//true
```

### 6.(ES6)endsWith() 判断参数字符串是否在原字符串的尾部

-语法：string.endsWith(searchvalue[, length])

- 参数
  - searchvalue 必需值，要查找的字符串。
  - length 可选值，表示 针对前 n 个字符
- 返回值:布尔值

```js
'abc'.endsWith('c') 	//true
'abc'.endsWith('bc') 	//true
'abc'.endsWith('a') 	//false
'abcdefg'.endsWith('def'))  //false
'abcdefg'.endsWith('def',6))    //true => 'def' 在 'abcdef'末尾
```

### 7. match() 在字符串中检索指定的值，或匹配一个或多个正则表达式

- **语法: str.match(searchValue) / str.match(regexp)**

- 返回值:返回一个`存放匹配结果的数组`
  - 如果 reg 具有全局标识 g 的话，就会`全局检索`
    - 如果没有找到匹配的文本就返回 null
    - 有匹配的文本就会返回一个存放匹配结果的数组，该数组`存放所有的匹配结果的数组`
  - 如果 reg 没有全局标识的话，只能`执行一次检索匹配`
    - 如果没有找到匹配的文本就返回 null
    - 否则它将返回一个数组，其中`存放了第一个匹配的字符串和其他相关的匹配信息`
      - groups：一个捕获组对象或 undefined（如果没有定义命名捕获组）
      - index：匹配的结果的开始索引位置
      - input：搜索的字符串

```js
var str = "1 push 2 pop 3 pop 4 push"

let reg1 = /\d+/g // 带有全局标识g
let reg2 = /\d+/ // 未带全局标识的

// 检索一个正则表达式的匹配
console.log(str.match(reg1)) // ['1','2','3','4']
console.log(str.match(reg2)) // ['1', index: 0, input: '1 push 2 pop 3 pop 4 push', groups: undefined]

// 检索一个字符串
console.log(str.match("push")) // ['push', index: 2, input: '1 push 2 pop 3 pop 4 push', groups: undefined]
console.log(str.match("shift")) // null
```

```js
const str = "Hello JavaScript"
str.match() // [""]
str.match(/JS/) // null
str.match(/JavaScript/g) // ["JavaScript"]
str.match(/JavaScript/) // [0: "JavaScript", groups: undefined, index: 6, input: "Hello JavaScript"]
str.match(/(?<J>Java)(?<S>Script)/) // [0: "JavaScript", 1: "Java", 2: "Script", groups: { J: "Java", S: "Script" }, index: 6, input: "Hello JavaScript"]
```

### 8. matchAll() 返回一个包含所有匹配正则表达式的结果及其分组捕获组的迭代器

- **语法: str.matchAll(searchValue) / str.matchAll(regexp)**
- 返回值：一个迭代器，可以使用 for…of…，数组新增的扩展符(…)或 Array.from()实现功能

**注意: 正则表达式必须设置为 g (全局模式)否则会报错**

```js
const str = "hello javascript hello css"

// 匹配正则
let iter = str.matchAll(/hello/g) // => RegExpStringIterator {}
for (i of iter) {
  console.log(i)
}
// ['hello', index: 0, input: 'hello javascript hello css', groups: undefined]
// ['hello', index: 17, input: 'hello javascript hello css', groups: undefined]

// 匹配字符串
let iter2 = str.matchAll("hello") // => RegExpStringIterator {}
console.log(...iter2)
// ['hello', index: 0, input: 'hello javascript hello css', groups: undefined]
// ['hello', index: 17, input: 'hello javascript hello css', groups: undefined]
```

[参考](https://blog.csdn.net/weixin_54012475/article/details/113038328)

## 截取字符

### 1. charAt() 截取指定位置字符

- 语法: str.charAt(index)

```js
let str = "abcabc"
let res = str.charAt(2) // 'c'
```

### 2. charCodeAt() 指定位置字符的 unicode 编码

```js
var str = "HELLO WORLD"
str.charCodeAt(0) // 返回 72
```

## 截取字符/字符串

### 1. slice() 截取字符串的某部分

- 语法: str.slice(start[,end])
- 参数:
  - start: 起始索引（开始位置）
  - end: 终止索引（结束位置）
  - 如果省略第二个参数，则该方法将裁剪字符串的剩余部分

```js
let str = "abcabc"
let res1 = str.slice(2, 4) // 'ca'
let res2 = str.slice(2) // 'cabc'
let res3 = str.slice(2, -1) // 'cab'
```

### 2. substring() 截取字符串的某部分

- 描述: 与 slice 基本一致
- 区别:
  - 结束索引不能为负,会自动修正为 0
  - 结束索引<开始索引时,会自动调整位置

```js
let str = "abcabc"
let res1 = str.substring(2, 4) // 'ca'
let res2 = str.substring(2) // 'cabc'
let res3 = str.substring(2, -2) // 'ab' 结束位置修正为0,且0<2,互换位置，取[0,2)
let res4 = str.substring(5, 2) // 'cab' 2<5,互换位置，取[2,5)
```

### 3. substr() 截取字符串的某部分

- 语法: str.substr(start[,length])
- 参数:
  - start: 起始索引（开始位置）
  - length: 截取字符的个数
  - 如果省略第二个参数，则该方法将裁剪字符串的剩余部分

```js
let str = "abcabc"
let res1 = str.substring(1, 3) // 'bca' 取[1,3]
let res2 = str.substring(1) // 'bcabc'
let res3 = str.substring(-3, 2) // 'ab' 取[3,4]
```

## 替换字符串内容

### 1. replace() 在字符串中用一些字符替换另一些字符(或一个与正则表达式匹配的子串)

**只替换首次查找到的字符串**

- 语法：string.replace(searchvalue,newvalue)
- 参数:
  - searchvalue 必须。规定子字符串或要替换的模式的 RegExp 对象。
  - newvalue 必需。一个字符串值。规定了替换文本或生成替换文本的函数。

```js
let str = "abcdabcd"
let res = str.replace("bc", "12") // 'a12dabcd'

// 正则
let res2 = str.replace(/bc/, "12") // 'a12dabcd'
let res3 = str.replace(/bc/g, "12") // 'a12da12d' 全局查找:g 忽略大小写:i
```

### 2. replaceAll()

**替换所有匹配到的子字符串**

```js
let str = "abcdabcd"
let res = str.replaceAll("bc", "12") // 'a12da12d'

let res2 = str.replaceAll(/bc/g, "12") // 'a12da12d'

// replaceAll 正则替换必须使用 g 关键字全局替换,否则报错
let res3 = str.replaceAll(/bc/, "12")
// Uncaught TypeError: String.prototype.replaceAll called with a non-global RegExp argument
```

## 拼接多个字符串

### 1. concat()

- 语法：string.concat(string1, string2, …, stringX)

```js
let str = "Hello"
let str2 = "World"
let s = str.concat(str2) //HelloWorld
let s2 = str.concat(" ", str2) //Hello World
```

## 赋值字符串并返回新字符串

### repeat()

- 语法：string.repeat(count)
- count 必需，设置要复制的次数。

```js
let str = "Hello"
let s = str.repeat(2)
console.log(s) //HelloHello
```

## 改变大小写

### 1. toUpperCase() 变为大写

```js
var text1 = "Hello World!"
var text2 = text1.toUpperCase() //
```

### 2. toLowerCase() 变为小写

```js
var str = "Hello World!"
var res = text1.toLowerCase() // 'hello world!'
```

## 删除字符串两端的空格

### 1.trim() 删除字符串的空格

中间的空格不会被去掉

```js
let str = "    Hello   "
let s = str.trim()
console.log(str) //    Hello
console.log(s) //Hello
```

### 2.trimEnd() / trimRight() 删除字符串末尾的空格

`trimEnd`别名`trimRight`，两个方法相同

```js
let str = "       Hello World!        "
let res = str.trimEnd()
console.log(res) // '       Hello World!'
console.log(str) // '       Hello World!        ' 原字符不改变
```

### 3.trimStart() / trimLeft() 删除字符串开头的空格

`trimStart`别名`trimLeft`，两个方法相同

```js
let str = "       Hello World!        "
let res = str.trimStart()
console.log(res) // 'Hello World!        '
console.log(str) // '       Hello World!        ' 原字符不改变
```

## 字符串补全长度

### 1. (ES8) padStart() 头部补全

- 语法: array.padStart(length[,str])
- 参数
  - length: 用来指定字符串的最小长度
  - str: 用来补全的字符串。默认使用空格补全长度
- 返回值: 新字符串

```js
let s = "a"
let s2 = s.padStart(10, "b") // 'bbbbbbbbba'
let s5 = "a".padStart(10) // '         a'

// 如果原字符串的长度，等于或大于指定的最小长度，则返回原字符串
let s3 = "xxx".padStart(2, "ab") // 'xxx'
// 如果用来补全的字符串与原字符串，两者的长度之和超过了指定的最小长度，则会截去超出位数的补全字符串
let s4 = "abc".padStart(10, "0123456789") // '0123456abc'
```

### 2. (ES8) padEnd() 尾部补全

```js
let s = "a"
let s2 = s.padEnd(10, "b") // 'abbbbbbbbb'

let s3 = "xxx".padEnd(2, "ab") // 'xxx'
let s4 = "abc".padEnd(10, "0123456789") // 'abc0123456'
```

## 把字符串转换为数组

### split()

- 参数:需要一个字符串作为参数,根据字符串拆分为数组

```js
let text = "ab,c,d|ef"
let arr1 = text.split() // ['ab,c,d|ef']
let arr2 = text.split(",") // ['ab', 'c', 'd|ef']
let arr3 = text.split("|") // ['ab,c,d', 'ef']
let arr4 = text.split("c") // ['ab,', ',d|ef']
```

## 其他方法

### 1. valueOf() 返回字符串本身

- JavaScript 中的 valueOf() 方法用于返回指定对象的原始值，若对象没有原始值，则将返回对象本身。通常由 JavaScript 内部调用，而不是在代码中显式调用。
- 默认情况下，valueOf 方法由 Object 后面的每个对象继承。 每个内置的核心对象都会覆盖此方法以返回适当的值。
- JavaScript 的许多内置对象都重写了该函数，以实现更适合自身的功能需要。因此，不同类型对象的 valueOf() 方法的返回值和返回值类型均可能不同。

```js
let res = "abcde".valueOf() // 'abcde'
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

[参考 1](https://juejin.cn/post/6844904085859074061)
[参考 2](https://www.pudn.com/news/62457f0ed25bb70c32026b00.html)
[参考 3](https://blog.csdn.net/weixin_46389390/article/details/124483692)
[参考 4](https://blog.csdn.net/weixin_44247511/article/details/120881792)
