# nodejs 模块化

### 一、nodejs 中模块的分类

Node.js 中根据模块来源的不同，将模块分为了 3 大类，分别是:

- `内置模块`(内置模块是由 Node.js 官方提供的，例如 fs、path、http 等)
- `自定义模块`(用户创建的每个 js 文件，都是自定义模块)
- `第三方模块`(`由第三方开发出来的模块`，并非官方提供的内置模块，也不是用户创建的自定义模块，使用前需要先下载)

### 二、模块作用域

和函数作用域类似，在自定义模块中定义的`变量、方法`等成员，`只能在当前模块内被访问`，这种`模块级别的访问限制`，叫做`模块作用域`。

### 三、加载模块

使用强大的`require()`方法，可以加载需要的内置模块、用户自定义模块、第三方模块进行使用。

```js
// 1. 加载内置模块
const fs = require("fs");

// 2. 加载用户的自定义模块
const custom = require("./custom.js");

// 3. 加载第三方模块
const moment = require("moment");
```

**注意**:使用 require()方法加载其它模块时，会执行被加载模块中的代码。

### 四、向外共享模块作用域中的成员

#### 4.1 module 对象

在每个.js 自定义模块中都有一个 module 对象，它里面`存储了和当前模块有关的信息`

```js
console.log(module);

Module {
  id: '.',
  path: 'E:\\blog\\nodejs-study\\模块化',
  exports: {},
  parent: null,
  filename: 'E:\\blog\\nodejs-study\\模块化\\module.js',
  loaded: false,
  children: [],
  paths: [
    'E:\\blog\\nodejs-study\\模块化\\node_modules',
    'E:\\blog\\nodejs-study\\node_modules',
    'E:\\blog\\node_modules',
    'E:\\node_modules'
  ]
}
```

#### 4.2 module.export 对象

在自定义模块中，可以使用`module.exports`对象，将模块内的成员共享出去，供外界使用。
外界用`require()`方法导入自定义模块时，得到的就是 module.exports 所指向的对象。

**在一个自定义模块中,默认情况下 module.expirt = {}**

```js
// 1.js
const age = 20;
module.exports.username = "张三";
module.exports.sayHello = function () {
  console.log("hello");
};
module.exports.age = age;

// 2.js
const m = require("./1");
console.log(m); //{ username: '张三', sayHello: [Function (anonymous)], age: 20 }
```

**注意: 使用 require()方法导入模块时，导入的结果，`永远以module.exports指向的对象为准`。**

```js
// 1.js
// 向空对象{}中添加属性和方法
const age = 20;
module.exports.username = "张三";
module.exports.sayHello = function () {
  console.log("hello");
};
module.exports.age = age;

// 让module.exports 指向一个全新的对象
module.exports = {
  name: "李四",
  sayHi() {
    console.log("Hi");
  },
};
// 2.js
const m = require("./1");
console.log(m); //{ name: '李四', sayHi: [Function: sayHi] }
```

#### 4.3 exports 对象

由于 module.exports 单词写起来比较复杂，为了简化向外共享成员的代码，Node 提供了`exports` 对象。`默认情况下，exports和module.exports 指向同一个对象`。最终共享的结果，还是以 module.exports 指向的对象为准。

```js
console.log(exports === module.exports); // true
```

```js
// 1.js
exports.username = "张三";
exports.sayHello = function () {
  console.log("hello");
};
exports.age = 20;

// 2.js
const m = require("./1");
console.log(m); //{ username: '张三', sayHello: [Function (anonymous)], age: 20 }
```

**最终向外共享的结果 永远都是 module.exports 所指向的对象**

```js
// 1.js
//最终向外共享的结果 永远都是 module.exports 所指向的对象
module.exports = {
  gender: "男",
  age: 18,
};

exports = {
  username: "张三",
};

// 2.js
const m = require("./1");
console.log(m); //{ gender: '男', age: 18 }
```

### 五、Node.js 中的模块化规范

<img :src="$withBase('/nodejs/CommonJS.png')">
