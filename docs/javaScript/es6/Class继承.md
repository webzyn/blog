# Class 继承

[[toc]]

## 描述

- 通过`extends`关键字实现继承，让子类继承父类的属性和方法
- ES6 规定，子类必须在 `constructor()`方法中调用 `super()`，否则就会报错。这是因为<span style="color: red">子类自己的 this 对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，添加子类自己的实例属性和方法</span>。如果不调用 super()方法，子类就得不到自己的 this 对象。

```js{8-13}
class Parent {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}

class Son extends Parent {
  constructor(x, y, z) {
    super(x, y, z)
    this.z = z
  }
}

let p = new Parent("x", "y")
console.log(p) // Parent {x: 'x', y: 'y'}

let s = new Son("x", "y", "z")
console.log(s) // Son {x: 'x', y: 'y', z: 'z'}
```

- 如果子类没有定义`constructor()`方法，这个方法会默认添加，并且里面会调用`super()`

```js
class ColorPoint extends Point {}

// 等同于
class ColorPoint extends Point {
  constructor(...args) {
    super(...args)
  }
}
```

## 私有属性和私有方法的继承(不会被继承)

- 父类所有的属性和方法，<span style="color: red">除了私有的属性和方法</span>，都会被子类继承。

- 子类无法继承父类的私有属性，私有属性只能在定义它的 class 里面使用

```js
class Parent {
  #x = "x"
  #fn() {
    console.log(this.#x)
  }
}

class Son extends Parent {
  constructor() {
    super()
    console.log(this.#x) // 报错
    this.#fn() // 报错
  }
}
```

### 子类读写父类私有属性

```js{3-8,14,17,22}
class Parent {
  #x = "x"
  getX() {
    return this.#x
  }
  setX(value) {
    this.#x = value
  }
}

class Son extends Parent {
  constructor() {
    super()
    console.log(this.getX()) // x  调用从父类继承的方法
  }
  setParentX(value) {
    this.setX(value) // 调用从父类继承的方法
  }
}
let s = new Son()
s.setParentX("xxx")
console.log(s.getX()) // xxx
```

## 静态属性和静态方法的继承

- 父类的静态属性和静态方法，也会被子类继承。
- 静态属性是通过<span style="color: red">浅拷贝</span>实现继承的
  - 由于这种拷贝是`浅拷贝`，如果父类的静态属性的`值是一个对象`，那么子类的静态属性也会指向这个对象，因为浅拷贝只会`拷贝对象的内存地址`

```js{14-15,19,23}
class Parent {
  static f1 = 100
  static f2 = {
    foo: 50,
  }
  static fn() {
    console.log("hello")
  }
}

class Son extends Parent {
  constructor() {
    super()
    Son.f1--
    Son.f2.foo--
  }
}
let s = new Son()
// 属性值是基本类型， 不会影响父类
console.log(Parent.f1) // 100
console.log(Son.f1) // 99

// 属性值是引用类型，会影响父类， 因为内存地址相同
console.log(Parent.f2) // {foo: 49}
console.log(Son.f2) // {foo: 49}
```

## Object.getPrototypeOf() 从子类上获取父类

- [Object.getPrototypeOf()获取原型对象](/javascript/basis/object.html#object-getprototypeof-返回指定对象的原型对象)

```js
class Parent {}

class Son extends Parent {}

console.log(Object.getPrototypeOf(Son)) // class Parent {}
console.log(Object.getPrototypeOf(Son) === Parent) // true
```

## super 关键字

- `super`这个关键字，既可以当作函数使用，也可以当作对象使用。

### 5.1 super 作为函数调用

- super 作为函数调用时，<span style="color: red">代表父类的构造函数</span>

- 作用

  - 调用 super()的作用是<span style="color: red">形成子类的 this 对象</span>，<span style="color: red">把父类的实例属性和方法放到这个 this 对象上面</span>。
  - 子类在调用`super()`之前，是没有`this`对象的，任何对 `this` 的操作都要放在 `super()`的后面

```js
// ----------错误写法------------
class Parent {}
class Son extends Parent {
  constructor() {} // 没有调用super() 报错
}
let s = new Son() // 报错

// ----------正确写法-----------
class Parent {}
class Son extends Parent {
  constructor() {
    super()
  }
}
let s = new Son()
```

- `super()`相当于 <span style="color: red">Parent.prototype.constructor.call(this)</span>（在子类的 this 上运行父类的构造函数）
  - super 虽然代表了父类的构造函数，但是因为返回的是子类的 this（即子类的实例对象），所以 <span style="color: red">super 内部的 this 代表子类的实例</span>，而不是父类的实例

```js{12,13}
class Parent {
  constructor() {
    console.log(this)
  }
}

class Son extends Parent {
  constructor() {
    super()
  }
}
let p = new Parent() // Parent {}  => this指向Parent的实例
let s = new Son() // Son {}  =>  this指向Son的实例
```

- super()在子类构造方法中执行时， <span style="color: red">子类的属性和方法还没有绑定到 this</span>，所以如果存在`同名属性`，此时`拿到的是父类的属性`

```js{11,15}
class Parent {
  name = "Parent"
  constructor() {
    console.log(this.name)
  }
}

class Son extends Parent {
  constructor() {
    super()
    // 此时属性name还未绑定到子类实例，所以使用的是父类的name属性
    this.name = "Son"
  }
}
let s = new Son() // Parent
```

### 5.2 super 作为对象

#### 5.2.1 super 作为对象时，在普通方法中，指向父类的原型对象

- super 作为对象时，在普通方法中，指向父类的原型对象

- super 指向 Parent.prototype
- super.xxx 相当于 Parent.prototype.xxx

```js{16}
class Parent {
  constructor() {
    this.pName = "pName"
  }
  p() {
    return "p"
  }
}
Parent.prototype.par = "par"

class Son extends Parent {
  constructor() {
    super()
    console.log(super.p()) // p
    console.log(super.par) // par
    //  pName是Parent的实例属性，super只能在原型对象找，所以返回undefined
    console.log(super.pName) // undefined
  }
}
let s = new Son() // Parent
```

- 在<span style="color: red">子类普通方法</span>中通过 super 调用父类的方法时，<span style="color: red">方法内部的 this 指向当前的子类实例</span>

```js{16-18}
class Parent {
  constructor() {
    this.name = "我是Parent的实例属性"
  }
  sayName() {
    console.log(this.name)
  }
}

class Son extends Parent {
  constructor() {
    super()
    this.name = "我是Son的实例属性"
  }
  print() {
    // 方法sayName内部的 this 指向当前的子类实例
    super.sayName() // 我是Son的实例属性
    this.sayName() // 我是Son的实例属性
  }
}

let s = new Son()
s.print()
```

- 由于 this 指向子类实例，所以如果通过 super 对某个属性赋值，这时 super 就是 this，赋值的属性会变成子类实例的属性
  - <span style="color: red">super 赋值 子类实例， 读取父类原型对象</span>

```js{8-9}
class Parent {}
Parent.prototype.x = 1

class Son extends Parent {
  constructor() {
    super()
    this.x = 2
    super.x = 3 // 等同于对this.x赋值为3
    console.log(super.x) // 1  => 读取的是 Parent.prototype.x
    console.log(this.x) // 3
  }
}

let s = new Son()
```

#### 5.2.2 super 作为对象时，在静态方法中，指向父类

- super 作为对象，用在静态方法之中，这时 super 将指向<span style="color: red">父类</span>，而不是父类的原型对象

```js{9,12}
class Parent {
  static fn() {
    console.log(1)
  }
}

class Son extends Parent {
  static sayMine() {
    super.fn()
  }
}
Son.sayMine() // 调用子类sayMine静态方法，方法内部super指向父类Parent，相当于Parent.fn()
```

- 在子类的静态方法中通过 super 调用父类的方法时，<span style="color: red">方法内部的 this 指向当前的子类</span>，而不是子类的实例

```js{12-14,16-17,19-20}
class Parent {
  static x = 1
  static fn() {
    console.log(Parent === this)
    console.log(Son === this)
    console.log(this.x)
  }
}

class Son extends Parent {
  static x = 2
  static sayMine() {
    super.fn()
  }
}
// 父类直接调用静态方法， this指向父类本身
Parent.fn() // true  false  1

// 子类通过super调用父类静态方法， this指向子类自己
Son.sayMine() // false true   2
```

[阮一峰 ES6](https://es6.ruanyifeng.com/#docs/class-extends)
