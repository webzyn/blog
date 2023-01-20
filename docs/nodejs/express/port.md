# 编写接口

## 1. GET 请求

```js
// app.js
const express = require("express");
const apiRouter = require("./apiRouter");
const app = express();

app.use("/api", apiRouter);

app.listen(81);

// apiRouter.js
const express = require("express");
const router = express.Router();

router.get("/get", (req, res) => {
  // 通过 req.query 获取客户端通过查询字符串,发送到服务器的数据
  const query = req.query;
  // 调用 res.send() 方法, 想客户端响应处理的结果
  res.send({
    status: 0, // 0 表示处理成功 1 表示处理失败
    msg: "GET 请求成功", // 状态的描述
    data: query, // 需要响应到客户端的数据
  });
});

module.exports = router;
```

## 2. POST 请求

```js
const express = require("express");
const apiRouter = require("./apiRouter");
const app = express();
// 配置解析表单数据的中间件
app.use(express.urlencoded({ extended: false }));
app.use("/api", apiRouter);
app.listen(81);

// apiRouter.js
const express = require("express");
const router = express.Router();
router.post("/post", (req, res) => {
  // 通过 req.body获取请求体中包含的url-encoded格式的数据
  const body = req.body;
  // 调用 res.send()方法,向客户端响应结果
  res.send({
    status: 0,
    msg: "post请求成功",
    data: body,
  });
});
module.exports = router;
```

## 3. CORS 跨域资源共享

① **CORS**

② **JSONP**

### 3.1 使用 cors 中间件解决跨域问题

![](/nodejs/express/port_2.png)

### 3.2 什么是 CORS

![](/nodejs/express/port_3.png)

### 3.3 CORS 响应头部

---

**3.3.1 Access-Control-Allow-Origin**

```js
Access-Control-Allow-Origin : <origin> | *
  origin 参数: 指定允许访问该资源的外域URL
```

```js
//只允许来自http://cat.cn的请求
res.setHeader("Access-Control-Allow-Origin", "http://cat.cn");

//允许来自任何域的请求
res.setHeader("Access-Control-Allow-Origin", "*");
```

---

**3.3.2 Access-Control-Allow-Headers**

![](/nodejs/express/port_4.png)

```js
//允许客户端额外向服务器发送Content-Type 请求头和X-Custom-Header 请求头
//注意:多个请求头之间使用英文的逗号进行分割
res.setHeader("Access-Control-Allow-Headers", "Content-Ttype,X-Custom-Header");
```

---

**3.3.3 Access-Control-Allow-Methods**

![](/nodejs/express/port_5.png)

```js
//只允许POST、GET、DELETE、HEAD请求方法
res.setHeader( 'Access-Control-Allow-Methods '，'POST，GET，DELETE，HEAD')
//允许所有的 HTTP请求方法
res.setHeader( ' Access-Control-Allow-Methods', '*')

```

### 3.4 CORS 请求的分类

客户端在请求 CORS 接口时，根据**请求方式**和**请求头**的不同，可以将 CORS 的请求分为**两大类**

① 简单请求

② 预检请求

---

**3.4.1 简单请求**

![](/nodejs/express/port_6.png)

---

**3.4.2 预检请求**

![](/nodejs/express/port_7.png)

---

**3.4.3 简单请求和预检请求的区别**

![](/nodejs/express/port_8.png)

## 4. JSONP 接口

![](/nodejs/express/port_9.png)

### 4.1 JSONP 接口注意事项

如果项目中**已经配置了 CORS** 跨域资源共享，为了**防止冲突，必须在配置 CORS 中间件之前声明 JSONP 的接口**。否则 JSONP 接口会被处理成开启了 CORS 的接口。

### 4.2 实现 JSONP 接口的步骤

![](/nodejs/express/port_10.png)

```js
// 必须在配置 cors 中间件之前,配置 JSONP 接口
app.get("/api/jsonp", (req, res) => {
  // TODO 定义 JSONP 接口的具体实现接口
  // 1. 得到函数的名称
  const funcName = req.query.callback;
  // 2. 定义要发送到客户端的数据对象
  const data = { name: "张三", age: 22 };
  // 3. 拼接处一个函数的调用
  const scriptSrc = `${funcName}(${JSON.stringify(data)})`;
  // 4. 把拼接的字符串,响应给客户端
  res.send(scriptSrc);
});
```
