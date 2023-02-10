# Express 中的路由

在 Express 中，路由指的是**客户端的请求**与**服务器处理函数**之间的**映射关系**。

Express 中的路由分 3 部分组成，分别是**请求的类型**、**请求的 URL 地址**、**处理函数**

```js
app.METHOD(PATH, HANDLER);
```

例:

```js
//匹配 GET 请求，且请求 URL 为 /
app.get('/', function (req,res) {
  res.send("Hello world!')
})
//匹配 POST 请求，且请求 URL 为 /
app.post('/', function (req, res) {
  res.send('Got a POST request')
})

```

**路由的匹配过程**

<img :src="$withBase('/nodejs/express/express_6.png')">

## 路由的使用

### 1. 最简单的用法

在 Express 中使用路由最简单的方式，就是把路由挂载到 app 上

```js
const express = require('express')
//创建web服务器，命名为 app
const app = express()

//挂载路由
app.get('/', (req,res) => { res.send('Hello world.') })
app.post('/', (req,res) => { res.send('Post Request.') })

//启动web服务器
app.listen(80，()=> { console.log('server running at http:1/127.0.0.1') })
```

### 2. app.route()

为路由路径创建可链接的路由

```js
app
  .route("/book")
  .get(function (req, res) {
    res.send("Get a random book");
  })
  .post(function (req, res) {
    res.send("Add a book");
  })
  .put(function (req, res) {
    res.send("Update the book");
  });
```

### 3. 模块化路由(express.Router)

<img :src="$withBase('/nodejs/express/express_7.png')">

```js
// app.js
const express = require("express");
const app = express();

// 导入路由模块
var router = require("./router");
// 注册路由模块
app.use(router); // app.use() 注册全局中间件

app.listen(80);

// router.js
// 1. 导入 express
const express = require("express");
// 2. 创建路由对象
const router = express.Router();
// 3. 挂载具体的路由
router.get("/user/list", (req, res) => {
  res.send("Get user list");
});
router.post("/user/add", (req, res) => {
  res.send("Post user add");
});
// 4. 向外导出路由对象
module.exports = router;
```

<img :src="$withBase('/nodejs/express/express_8.png')">

### 4. 为路由模块添加路由前缀

类似于托管静态资源时,为静态资源统一挂载访问前缀一样,路由模块添加前缀的方式也非常简单

```js
// 导入路由模块
var router = require("./router");
// 使用app.use() 注册路由模块 , 并添加统一的访问前缀 /api
app.use("/api", router); // app.use() 注册全局中间件
```

<img :src="$withBase('/nodejs/express/express_9.png')">
