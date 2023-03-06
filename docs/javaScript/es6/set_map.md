# Set和Map数据结构
[[toc]]
## Set基本用法 - Set结构 key===value
ES6 提供了新的数据结构 Set。它`类似于数组`，但是`成员的值都是唯一的`，没有重复的值
- 可直接通过new Set()生成Set数据结构，然后通过add方法添加成员
- 可通过new Set()，向构造函数添加参数生成Set结构
  - 参数：
    - 1. 可以是一个数组
    - 2. 具有 iterable 接口的其他数据结构
```js
// 通过add添加数据
const s = new Set()
let val = ['a','a','b','b','c','c']
val.forEach(i => s.add(i))
console.log(s) // Set(3) {'a', 'b', 'c'}

// 构造函数添加参数
// 1. 数组
const s1 = new Set([1,2,2,3,4,4,5])
console.log(s1) // Set(5) {1, 2, 3, 4, 5}
for(let i of s1){
  console.log(i)
} // 1 2 3 4 5

// 2. 字符串
const s2 = new Set('aabbcc')
console.log(s2) // Set(3) {'a', 'b', 'c'}
```
- 可用于`数组去重`以及`去除字符串的重复字符`
```js
[...new Set([1,2,2,3,3,4])] // [1, 2, 3, 4]

Array.from(new Set([1,2,2,3,3,4])) // [1, 2, 3, 4]

[...new Set('ababbc')].join('') // "abc"

// 注意 Set 认为两个NaN相等
const s = new Set([NaN,NaN])
console.log(s) // Set(1) {NaN}
```

## Set 实例的属性和方法
### Set.prototype.constructor 返回构造函数 - [[属性]]
- 默认就是`Set`函数

### Set.prototype.size 返回Set实例的成员总数 - [[属性]]
```js
const s2 = new Set('aabbcc')
console.log(s2) // Set(3) {'a', 'b', 'c'}
console.log(s2.size) // 3
```
### Set.prototype.add(value) 添加值,返回Set结构本身
- 添加某个值，返回 Set 结构本身，所有可以链式调用
```js
const s = new Set()

s.add(1).add(2).add(2)

console.log(s) // Set(2) {1, 2}
console.log(s.size) // 2
```
### Set.prototype.delete(value) 删除值，返回布尔值
- 删除某个值，返回一个布尔值，表示删除是否成功。
```js
const s = new Set([1,2,3,3,4])
console.log(s) // Set(4) {1, 2, 3, 4}

s.delete(2)

console.log(s) // Set(3) {1, 3, 4}
```

### Set.prototype.has(value) 判断该值是否为Set成员,返回布尔值
```js
const s = new Set([1,2,3,3,4])
console.log(s) // Set(4) {1, 2, 3, 4}

s.has(3) // true
```

### Set.prototype.clear() 清除所有成员，没有返回值
```js
const s = new Set([1,2,3,3,4])
console.log(s) // Set(4) {1, 2, 3, 4}

s.clear()

console.log(s) // {size: 0}
```
### Set.prototype.forEach() 使用回调函数遍历每个成员
- Set 结构的实例与数组一样，也拥有forEach方法，用于对每个成员执行某种操作，没有返回值
```js
let set = new Set([1, 4, 9]);
set.forEach((item, key) => console.log(key + ' : ' + item))
// 1 : 1
// 4 : 4
// 9 : 9
```

### Set.prototype.keys() 返回键名的遍历器
**注意: Set的遍历顺序就是插入顺序**
- Set结构没有键名，只有键值，所以keys()和values()方法行为一致
```js
let set = new Set(['red', 'green', 'blue']);

set.keys() // SetIterator {'red', 'green', 'blue'}

for (let item of set.keys()) {
  console.log(item);
}
// red
// green
// blue

Set.prototype.values === Set.prototype.values // true
```

### Set.prototype.values() 返回键值的遍历器
**注意: Set的遍历顺序就是插入顺序**
- Set结构没有键名，只有键值，所以keys()和values()方法行为一致
```js
let set = new Set(['red', 'green', 'blue']);

set.values() // SetIterator {'red', 'green', 'blue'}

for (let item of set.values()) {
  console.log(item);
}
// red
// green
// blue
```

### Set.prototype.entries() 返回键值对的遍历器
**注意: Set的遍历顺序就是插入顺序**
```js
let set = new Set(['red', 'green', 'blue']);

set.entries() // SetIterator {'red' => 'red', 'green' => 'green', 'blue' => 'blue'}

for (let item of set.entries()) {
  console.log(item);
}
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]
```

### Set.prototypep[Symbol.iterator] Set结构默认遍历器接口
- Set结构的`实例默认可遍历`，它的`默认遍历器生成函数就是它的values方法`
- Set.prototypep[Symbol.iterator] === Set.prototype.values === Set.prototype.keys
```js
let set = new Set(['red', 'green', 'blue']);

for(let i of set){
  console.log(i)
}
// red
// green
// blue

Set.prototype[Symbol.iterator] === Set.prototype.values // true
Set.prototype.values === Set.prototype.values // true
Set.prototype[Symbol.iterator] === Set.prototype.keys // true
```

## WeakSet 基本用法
WeakSet 结构与 Set 类似，也是不重复的值的集合。
- 与Set的区别
  - WeakSet 的成员**只能是对象**，而不能是其他类型的值
  - **WeakSet 内部成员不计入垃圾回收机制。内部成员的个数，取决于垃圾回收机制有没有运行，运行前后成员个数很可能不一样**
  - WeakSet 不可遍历(第二条引起)
  - WeakMap 无法清空(不支持clear方法)

WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，**如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中**

```js
const ws = new WeakSet()
```
- 参数:
 - 1. 可以是一个数组(数组成员只能是对象)
 - 2. 具有 iterable 接口的其他数据结构
```js
const a = [[1,2], [3,4]]
const ws = new WeakSet(a)

console.log(ws) // WeakSet {[1, 2], [3, 4]}
// 其中 数组 [1,2]和[3,4] 作为WeakSet的成员

// 基本类型 1 和 2 不能作为 WeakSet 的成员
const b = new WeakSet([1, 2]) // VM68:1 Uncaught TypeError: Invalid value used in weak set
```
## WeakSet 方法
### WeakSet.prototype.add(value) 向WeakSet实例添加一个新成员
```js
const ws = new WeakSet()
let arr = [1, 2];
let obj = { a: 1, b: 2 }
ws.add(arr).add(obj)

console.log(ws) // { { a: 1, b: 2 } , [1, 2] }
```
### WeakSet.prototype.delete(value) 删除成员
```js
let arr = [1, 2];
let obj = { a: 1, b: 2 }
const ws = new WeakSet([arr, obj]);

ws.delete(obj)

console.log(ws) // { [1, 2] }
```
### WeakSet.prototype.has(value) 判断值是否存在WeakSet中,返回布尔值
```js
let arr = [1, 2];
let obj = { a: 1, b: 2 }
const ws = new WeakSet([arr, obj]);

ws.has(arr) // true
```
- WeakSet 不能遍历，是因为成员都是弱引用，随时可能消失，遍历机制无法保证成员的存在，很可能刚刚遍历结束，成员就取不到了。

- WeakSet 的一个用处，是储存 DOM 节点，而不用担心这些节点从文档移除时，会引发内存泄漏。

## Map 基本用法
- 对象与Map
  - 对象Object本质上是键值对集合，但是只能用字符串当作"键"（字符串-值）
  - Map 类似于 对象，也是`键值对集合`，"键"不限于字符串，各种类型的值(包括对象)都可以当作键（值-值）
- 使用
  - 通过new Map()生成实例,然后通过set方法添加成员
  - 通过new Map()，直接添加参数生成实例
    - 参数
      - 1. 可以是一个数组(数组成员是键值对的数组)
      - 2. 具有 iterable 接口的其他数据结构
```js
// 一、通过set方法
const m = new Map();
const o = { a: 1 }
m.set(o,'值1')

console.log(m) // Map(1) { { a: 1} => '值1' } 
// key是对象o 

// 二、构造函数添加参数
const map = new Map([
  ['name','张三'],
  ['age', 23]
])
console.log(map) // Map(2) {'name' => '张三', 'age' => 23}
```
## Map 实例的属性和方法
### Map.prorotype.size 返回成员总数
```js
const map = new Map([[1,true], ['a', 99]])
console.log(map) // Map(2) {1 => true, 'a' => 99}

console.log(map.size) // 2
```
### Map.prototype.set(key,value) 添加或替换成员，返回整个Map结构
- set方法设置键名key对应的键值为value，然后返回整个 Map 结构。`如果key已经有值，则键值会被更新，否则就新生成该键。`
```js
const map = new Map();
map.set('foo',6);
map.set('bar',true);
map.set(undefined, '我是值');
map.set(NaN, 'NaN');
map.set(NaN, '666'); // Map 认为NaN是一个值,所有替换 
console.log(map) // Map(4) {'foo' => 6, 'bar' => true, undefined => '我是值', NaN => '666'}

// set方法返回当前Map对象，所有可以链式调用
const map = new Map().set(1,'a').set(2,'b');
console.log(map) // Map(2) {1 => 'a', 2 => 'b'}
```

### Map.prototype.get(key) 读取key对应的键值
- get方法读取key对应的键值，如果找不到key，返回undefined。
```js
let obj = { a: 1 }
let arr = [1, 2]
const m = new Map().set(obj,'我是obj').set(arr,'我是arr')

m.get(obj) // '我是obj'
```

### Map.prototype.has(key) 判断某个键是否在Map结构中，返回布尔值
- has方法返回一个布尔值，表示某个键是否在当前 Map 对象之中
```js
const m = new Map().set(undefined, 'hah').set(1, 1)
console.log(m) // Map(2) {undefined => 'hah', 1 => 1}

m.has(undefined) // true
m.has(1) // true
m.has('a') // false
```
### Map.prototype.delete(key) 删除某个键，返回布尔值
- delete方法删除某个键，返回true。如果删除失败，返回false。
```js
const m = new Map();
m.set(undefined, 'nah');
m.has(undefined)     // true

m.delete(undefined)
m.has(undefined)       // false
```
### Map.prototype.clear() 清除所有成员，没有返回值
- clear方法清除所有成员，没有返回值
```js
let map = new Map();
map.set('foo', true);
map.set('bar', false);

map.size // 2
map.clear()
map.size // 0
```

### Map.prototype.forEach() 遍历 Map 的所有成员
- Map 的forEach方法，与数组的forEach方法类似，也可以实现遍历
```js
const map = new Map([
  ['F', 'no'],
  ['T',  'yes'],
]);

map.forEach(function(value, key, map) {
  console.log("Key: %s, Value: %s", key, value);
});
// Key: F, Value: no
// Key: T, Value: yes
```

### Map.prototype.keys() 返回键名的遍历器
- Map 的遍历顺序就是插入顺序
```js
const map = new Map([
  ['F', 'no'],
  ['T',  'yes'],
]);
map.keys() // MapIterator {'F', 'T'}

for (let key of map.keys()) {
  console.log(key);
}
// "F"
// "T"
```

### Map.prototype.values() 返回键值的遍历器
- Map 的遍历顺序就是插入顺序
```js
const map = new Map([
  ['F', 'no'],
  ['T',  'yes'],
]);
map.values() // MapIterator {'no', 'yes'}

for (let value of map.values()) {
  console.log(value);
}
// "no"
// "yes"
```
### Map.prototype.entries() 返回所有成员的遍历器
- Map 的遍历顺序就是插入顺序
```js
const map = new Map([
  ['F', 'no'],
  ['T',  'yes'],
]);
map.entries() // MapIterator {'F' => 'no', 'T' => 'yes'}

for (let item of map.entries()) {
  console.log(item ,item[0], item[1]);
}
// ['F', 'no'] "F" "no"
// ['T', 'yes'] "T" "yes"
```
### Map.prototpye[Symbol.iterator] Map结构默认遍历器

- Map结构的`默认遍历器就是entries`方法
- Map.prototype[Symbol.iterator] === Map.prototype.entries
```js
Map.prototype[Symbol.iterator] === Map.prototype.entries // true

const map = new Map([
  ['F', 'no'],
  ['T',  'yes'],
]);

for (let [key, value] of map) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"

// 等同于
for (let [key, value] of map.entries()) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"
```

## WeakMap

WeakMap结构与Map结构类似，也是用于生成键值对的集合
- 与Map区别
  - WeakMap**只接受对象作为键名(null除外)**，不接受其他类型的值作为键名
  - **WeakMap的键名所指向的对象，不计入垃圾回收机制。内部成员的个数，取决于垃圾回收机制有没有运行，运行前后成员个数很可能不一样**
  - WeakMap 不可遍历(第二条引起)
  - WeakMap 无法清空(不支持clear方法)

**WeakMap 的键名所引用的对象是`弱引用`，其他位置对该对象的`引用一旦消除`，该对象占用的内存就会被垃圾回收机制释放。`WeakMap 保存的这个键值对，也会自动消失`**

- 注意，WeakMap 弱引用的只是键名，而不是键值。键值依然是正常引用。

## WeakMap 方法
### Map.prototype.get() 读取key对应的键值
```js
let obj = { a: 1 };
let arr = ['a', 'b']
const vm = new WeakMap([[obj, 1], [arr, 2]])
console.log(vm) // WeakMap {{ a: 1 } => 1, ['a', 'b'] => 2}

vm.get(arr) // 2
```
### Map.prototype.set() 添加或替换成员
```js
let obj = { a: 1 };
let arr = ['a', 'b']
const vm = new WeakMap()
vm.set(obj, 1).set(arr, 2)

console.log(vm) // WeakMap {{ a: 1 } => 1, ['a', 'b'] => 2}
```
### Map.prototype.has() 判断某个键是否存在
```js
let obj = { a: 1 };
let arr = ['a', 'b']
const vm = new WeakMap([[obj, 1], [arr, 2]])

vm.has(obj) // true
```
### Map.prototype.delete() 删除某个键
```js
let obj = { a: 1 };
let arr = ['a', 'b']
const vm = new WeakMap([[obj, 1], [arr, 2]])

vm.delete(obj) // true
console.log(vm) // WeakMap { ['a', 'b'] => 2}
```
