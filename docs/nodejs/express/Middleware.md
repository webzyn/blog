# 中间件

## 1. 中间件的概念

### 1.1. 什么是中间件

中间件(Middleware) , 特指`业务流程`的**中间处理环节**

### 1.2.现实生活中的例子

<img :src="$withBase('/nodejs/express/middleware_1.png')">

### 1.3. Express 中间件的调用流程

<img :src="$withBase('/nodejs/express/middleware_2.png')">

### 1.4. Express 中间件的格式

<img :src="$withBase('/nodejs/express/middleware_3.png')">

### 1.5 next 函数的作用

<img :src="$withBase('/nodejs/express/middleware_4.png')">

## 2. Express 中间件的使用

### 2.1 定义中间件函数

```js
// 常量 mw 所指向的就是一个中间件函数
const mw = function (req, res, next) {
  console.log("这是一个最简单的中间件函数");
  // 注意 : 在当前中间件的业务处理完毕后, 必须调用next()函数
  //        表示把流转关系交给下一个中间件或路由
  next();
};
```

### 2.2 全局生效的中间件

客户端发起的**任何请求**，到达服务器之后，**都会触发的中间件**，叫做全局生效的中间件。

通过调用 app.use(中间件函数)，即可定义一个全局生效的中间件

```js
const mw = function (req, res, next) {
  console.log("这是一个最简单的中间件函数");
  next();
};

// 将 mw 注册为 全局生效的中间件
app.use(mw);
```

### 2.3 定义全局中间件的简化形式

```js
// 全局生效的中间件
app.use(function (req, res, next) {
  console.log("这是一个最简单的中间件函数");
  next();
});
app.use((req, res, next) => {
  console.log("这是一个最简单的中间件函数");
  next();
});
```

### 2.4 中间件的作用

<img :src="$withBase('/nodejs/express/middleware_5.png')">

### 2.5 定义多个全局中间件

可以使用 app.use()**连续定义多个**全局中间件。客户端请求到达服务器之后，会按照中间件**定义的先后顺序**依次进行

```js
const express = require("express");
const app = express();

// 定义第一个全局中间件
app.use((req, res, next) => {
  console.log("调用了第一个全局中间件");
  next();
});

// 定义第二个全局中间件
app.use((req, res, next) => {
  console.log("调用了第二个全局中间件");
  next();
});

// 定义一个路由
app.get("/user", (req, res) => {
  res.send("User page");
});

app.listen(81);
```

### 2.6 局部生效的中间件

**不使用**`app.use()`定义的中间件, 叫做**局部生效的中间件**

```js
const express = require("express");
const app = express();

// 定义中间件函数
const mw1 = (req, res, next) => {
  console.log("调用了局部生效的中间件");
  next();
};

// mw1 这个中间件只在当前路由中生效
app.get("/", mw1, (req, res) => {
  res.send("Home page");
});
app.get("/user", (req, res) => {
  res.send("User page");
});

app.listen(81);
```

### 2.7 定义多个局部中间件

```js
// 方法1
app.get("/", mw1, mw2, (req, res) => {
  res.send("Home page");
});
// 方法2
app.get("/", [mw1, mw2], (req, res) => {
  res.send("Home page");
});
```

### 2.8 中间件的 5 个使用注意事项

<img :src="$withBase('/nodejs/express/middleware_6.png')">

## 3. 中间件的分类

<img :src="$withBase('/nodejs/express/middleware_7.png')">

### 3.1 应用级别的中间件

通过`app.use()`或 `app.get()`或 `app.post()`，**绑定到 app 实例上的中间件**，叫做应用级别的中间件

```js
// 应用级别的中间件(全局中间件)
app.use((req, res, next) => {
  next();
});

// 应用级别的中间件(局部中间件)
app.get("/", mw1, (req, res) => {
  res.send("Home page");
});
```

### 3.2 路由级别的中间件

绑定到**express.Router()**实例上的中间件，叫做路由级别的中间件。它的用法和应用级别中间件没有任何区别。

只不过，**应用级别中间件是绑定到 app 实例上，路由级别中间件绑定到 router 实例上**，代码示例如下:

```js
const app = express()
const router = express.Router()

// 路由级别的中间件
router.use(function(req, res, next)=>{
  next()
})

app.use(router)
```

### 3.3 错误级别的中间件

错误级别中间件的**作用**:专门用来捕获整个项目中发生的异常错误，从而防止项目异常崩溃的问题。

**格式**∶ 错误级别中间件的 function 处理函数中，**必须有 4 个形参**，形参顺序从前到后，分别是(**err**, req, res, next)。

```js
const express = require("express");
const app = express();

// 1. 定义路由
app.get("/", (req, res) => {
  //1.1 人为制造的错误
  throw new Error("服务器内部发生了错误");
  res.send("Home page"); // 改行代码不会执行
});

// 2. 定义错误级别的中间件,捕获整个项目的异常错误,从而防止程序的崩溃
app.use((err, req, res, next) => {
  console.log("发生了错误" + err.message);
  res.send("Error:" + err.message);
});

app.listen(81);
```

**注意: 错误级别的中间件, 必须注册到所有路由之后**

### 3.4 Express 内置的中间件

<img :src="$withBase('/nodejs/express/middleware_8.png')">

```js
//配置解析 application/json 格式数据的内置中间件
app.use(express.json());
//配置解析 applicationlx-ww-form-urlencoded 格式数据的内置中间件
app.use(express.urlencoded({ extended: false }));
```

```js
const express = require("express");
const app = express();

// 注意: 除了错误级别的中间件, 其他的中间件, 必须在路由之前进行配置
// 通过 express.json() 这个中间件, 解析表单中的 JSON 格式的数据
app.use(express.json());
// 通过 express.urlencoded() 这个中间件, 解析表单中的 url-encoded 格式的数据
app.use(express.urlencoded({ extended: false }));

app.post("/user", (req, res) => {
  // 在服务器 可以使用 req.body 这个属性, 来接受客户端发送过来的请求体数据
  // 默认情况下, 如果不配置解析 表单数据 的中间件, 则 req.body 默认等于 undefined
  res.send(req.body);
});

app.post("/book", (req, res) => {
  // 在服务器端 可以使用 req.body 来获取JSON 格式的 表单数据 和 url-encoded 格式的数据
  res.send(req.body);
});

app.listen(81);
```

<img :src="$withBase('/nodejs/express/middleware_9.png')">
<img :src="$withBase('/nodejs/express/middleware_10.png')">

### 3.5 第三方的中间件

<img :src="$withBase('/nodejs/express/middleware_11.png')">

```js
const express = require("express");
const app = express();
// 1. 导入解析表单数据的中间件 body-parser
const parser = require("body-parser");
// 2. 使用 app.use() 注册中间件
app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());

app.post("/user", (req, res) => {
  // 如果没有配置任何解析 表单数据 的中间件, 则 req.body 默认等于 undefined
  console.log(req.body);
  res.send(req.body);
});

app.listen(81);
```

## 4. 自定义中间件

### 4.1 手动模拟一个类似于 express.urlencoded 这样的中间件，来解析 POST 提交到服务器的表单数据

<img :src="$withBase('/nodejs/express/middleware_12.png')">

```js
// bodyParser.js
// 4. 导入 querystring 模块
const qs = require("querystring");

// TODO 这是解析表单数据的中间件
const bodyParser = (req, res, next) => {
  // TODO 定义中间件具体的逻辑
  // 1. 定义变量, 用来存储客户端发送过来的请求体数据
  let str = "";
  // 2. 监听 req 的 data 事件 , 来获取客户端发送到服务器的数据
  //  数据量比较大时,若无法一次发送完毕,则客户端会把数据切割后分批发送到服务器
  //  所以data事件可能触发多次 , 每次获取完整数据的一部分
  req.on("data", (chunk) => {
    str += chunk;
  });
  // 3.  监听 req 的 end 事件, 当请求体数据接收完毕后, 会自动触发 req 的 end 事件
  req.on("end", () => {
    // 在str中存放的是完成的请求体数据
    // console.log(str);
    // 5. 把字符串格式的请求体数据, 解析为对象格式
    const body = qs.parse(str);
    // console.log(body);
    // 6. 将解析出来的数据对象挂载为req.body
    req.body = body;
    next();
  });
};

module.exports = bodyParser;
```

```js
// app.js
const express = require("express");
const app = express();

const customParser = require("./bodyParser");
app.use(customParser);

app.post("/user", (req, res) => {
  res.send(req.body);
});

app.listen(81);
```

<img :src="$withBase('/nodejs/express/middleware_13.png')">
