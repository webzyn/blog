# express

[Express 官网](https://www.expressjs.com.cn/)

## 1. 什么是 Express

官方给出的概念:Express 是基于`Node.js 平台`，`快速、开放、极简的Web开发框架`。

通俗的理解: Express 的作用和 Node.,js 内置的 http 模块类似，是**专门用来创建 Web 服务器**的。

Express 的`本质`:就是一个 npm 上的第三方包，提供了快速创建 Web 服务器的便捷方法。

## 2. Express 基本使用

### 2.1 安装

```
npm i express@4.17.1
```

## 3 创建基本的 Web 服务器

```js
// 1. 导入 express
const express = require("express");
// 2. 创建 Web 服务器
const app = express();

// 3. 调用 app.listen(端口号, 启动成功后的回调函数) 启动服务器
app.listen(80, () => {
  console.log("Express server running at http://127.0.0.1");
});
```

### 3.1 监听 GET 请求

通过 **app.get()** 方法，可以监听客户端的 GET 请求

```js
//参数1∶客户端请求的URL地址
//参数2:请求对应的处理函数
//req:请求对象(包含了与请求相关的属性与方法)
//res:响应对象(包含了与响应相关的属性与方法)
app.get("请求URL", function (req, res) {
  /*处理函数*/
});
```

### 3.2 监听 POST 请求

通过 **app.post()** 方法，可以监听客户端的 POST 请求

```js
//参数1∶客户端请求的URL地址
//参数2:请求对应的处理函数
//req:请求对象(包含了与请求相关的属性与方法)
//res:响应对象(包含了与响应相关的属性与方法)
app.post("请求URL", function (req, res) {
  /*处理函数*/
});
```

### 3.3 把内容响应给客户端

通过 **res.send()** 方法，可以把处理好的内容，发送给客户端

```js
app.get("/user", (req, res) => {
  // 调用express提供的res.send()方法 向客户端发送JSON 对象
  res.send({ name: "zs ", age: 20, gender: "男" });
});

app.post("/user", (req, res) => {
  // 调用express提供的res.send()方法 向客户端发送文本字符串
  res.send("请求成功");
});
```

### 3.4 获取 URL 中携带的查询参数

通过 **req.query** 对象，可以访问到客户端通过查询字符串的形式，发送到服务器的参数

```js
app.get("/", (req, res) => {
  // req.query默认是一个空对象
  // 客户端使用 ?name=zs&age=20 这种查询字符串形式，发送到服务器的参数,
  // 可以通过req.query对象访问到，例如:
  // req.query.name // req.query.age
  console.log(req.query);
});
```

### 3.5 获取 URL 中的动态参数

通过 **req.params** 对象，可以访问到 URL 中，通过:匹配到的`动态参数`

```js
// URL地址中，可以通过 :参数名 的形式，匹配动态参数值
app.get("/user/:id", (req, res) => {
  // req.params 默认是一个空对象
  // 里面存放着通过 : 动态匹配到的参数值
  console.log(req.params);
});
```

例:

![](/nodejs/express/express_2.png)![](/nodejs/express/express_1.png)

## 4. 托管静态资源

### 4.1 express.static()

![](/nodejs/express/express_3.png)

### 4.2 托管多个静态资源目录

![](/nodejs/express/express_4.png)

### 4.3 挂载路径前缀

![](/nodejs/express/express_5.png)
