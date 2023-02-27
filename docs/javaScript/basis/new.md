# new 关键字

## 作用

- new关键字可以创建实例对象

## new关键字的执行过程
- 1. 首先创建了一个空对象
- 2. 给这个空对象设置原型,将`这个对象的隐式原型__proto__`设为`构造函数的显示原型prototype对象`
- 3. 将`构造函数的this指向这个对象`,并`执行这个构造函数`,为这个对象添加属性与方法
- 4. `判断构造函数的返回值`,如果是值类型,返回创建的对象,如果构造函数的返回值是引用类型,就返回这个引用类型的对象

## 代码实现
- 创建一个构造函数
```js
function Person(name,age){
  this.name = name;
  this.age = age;
  this.say = () => {
    console.log('我是',this.name)
  }
}
console.log(Person.prototype)
// constructor: ƒ Person(name,age), [[Prototype]]: Object

```
- 模拟new关键字
```js
function _new(Fn,...args){
  // 写法1
  let obj = {}; // 新建一个对象
  obj.__proto__ = Fn.prototype; // 给对象设置原型

  // 写法2
  // let obj = Object.create(null)
  // Object.setPrototypeOf(obj,Fn.prototype)

  // 写法3
  // let obj = Object.create(Fn.prototype)

  const FnRes = Fn.call(obj,...args) // 将构造函数this执行obj对象，并指向构造函数,返回值是构造函数的返回值
  return FnRes instanceof Object ? FnRes : obj // 判断构造函数的返回值 此处返回值为undefined,为基本类型,所有返回新建的对象
}

// 测试
let obj = _new(Person,'张三',22)
console.log(obj) // Person {name: '张三', age: 22, say: ƒ}
obj.say() // 我是 张三

obj.__proto__ === Person.prototype // true
```

