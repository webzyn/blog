# set、array、map 和 object 区别

- 1. **Set**
  - Set 是值的集合，值是唯一的，不能有重复的值。并且 Set 没有 key，Set 的 key 和 value 相等
  - 原型上有 add、delete、has、clear 这四个操作成员的方法
  - 原型上还有 keys()、values()、entries()和 forEach()这四个遍历方法，由于 Set 没有 key，所有他的 keys()和 values()返回的遍历器相等。
  - Set 默认的遍历器是 values()方法
- 2. **WeakSet**
  - WeakSet 与 Set 类似，也是不重复的值
  - 区别就是 WeakSet 的成员只能是对象，Set 的值可以是任意类型
  - WeakSet 中的对象都是弱引用，如果其他对象没有引用 WeakSet 中的值，那么会被垃圾回收机制回收，不用考虑该对象是否还在 WeakSet 中，所以 WeakSet 中的值是不确定的
  - 因为 WeakSet 的值不固定，所以 WeakSet 不能进行遍历
  - WeakSet 无法清空，所以不支持 clear()方法，只有 add、delete、has 这三个方法
- 3. **Map**
  - Map 是键值对的集合，Map 的键可以是任意类型的值(包括对象),Object 是键值对集合，而 Map 可以说是值-值得集合，他的 key 是具有唯一性的。
  - 原型上有 set、get、has、delete、clear 这五个操作成员的方法
  - Map 的遍历方法与 Set 一样，keys()、values()、entries()以及 forEach()
  - Map 默认的遍历器是 entries()方法
- 4. **WeakMap**
  - WeakMap 结构和 Map 结构类似，也是键值对的集合
  - WeakMap 的键只能是除 null 以外的对象
  - WeakMap 的键名所指向的对象也是弱类型，所以其他对象对该对象的引用消除，那么会被垃圾回收机制回收，所以 WeakMap 的成员也是不确定的
  - 因为 WeakMap 的值不确定，所以不能进行遍历
  - WeakMap 无法清空，不支持 clear 方法，只有 set、get、has、delete 这四个方法

### Set 和 Array

- 1. Set 的值是唯一的，数组的值可以重复
- 2. 数组通过 length 获取长度，Set 通过 size 获取成员的个数
- 3. 数组通过索引取值，Set 没有索引，只能通过遍历取值

### Map 和 Object

- 1. 对象的键只能是字符串和 Symbol 类型，Map 的键可以是任意类型
- 2. 对象没有长度，Map 可以通过 size 属性获取成员个数
- 3. Map 可以使用 for...of 和 forEach 进行遍历，Object 自身没有迭代器，索引不能遍历，需要通过 Object.keys()、Object.values()或 Object.entries()生成遍历器才能进行遍历
