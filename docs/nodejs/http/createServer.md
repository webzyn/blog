# 创建 web 服务器

- 导入 http 模块
- 创建 web 服务器实例
- 为服务器实例绑定 request 事件，监听客户端的请求
- 启动服务器

```js
// 步骤1 导入http模块
const http = require("http");

// 步骤2 调用 http.createServer() 方法 , 创建 web 服务器实例
const server = http.createServer();

// 步骤3 使用服务器实例的 .on() 方法,为服务器绑定一个request事件
server.on("request", function (req, res) {
  // 只要有客户端请求这个服务器,就会触发request事件,从而调用这个事件处理函数
  console.log("Someone visit our web server.");
});

// 步骤4 调用服务器实例的 .listen(端口号,cb回调) 方法,即可启动 web 服务器
server.listen(9090, function () {
  console.log("server running at http://127.0.0.1:9090");
});
```

## req 请求对象

只要服务器接收到了客户端的请求，就会调用通过 server.on()为服务器绑定的 request 事件处理函数。
如果想在事件处理函数中，`访问与客户端相关的数据或属性`，可以使用如下的方式:

```js
server.on("request", (req, res) => {
  // req是请求对象，它包含了与客户端相关的数据和属性，例如
  // req.url 是客户端请求的 URL地址
  const url = req.url;
  // req.method 是客户端的 method请求类型
  const method = req.method;
  const str = `Your request url is ${url}，and request method is ${method}`;
  console.log(str);
});
```

## res 响应对象

在服务器的 request 事件处理函数中，`访问与服务器相关的数据或属性`

### res.end() 向客户端发送指定的内容，并结束这次请求的处理过程

```js
server.on("request", (req, res) => {
  // res 是响应对象，它包含了与服务器相关的数据和属性，例如:
  // 要发送到客户端的字符串
  const str = `Your request url is ${req.url}，and request method is ${req.method}`;

  // res.end()方法的作用: 向客户端发送指定的内容，并结束这次请求的处理过程
  res.end(str);
});
```

### res.setHeader 设置响应头

```js
server.on("request", (req, res) => {
  //发送的内容包含中文
  const str = `您请求的url 地址是${req.url}，请求的method类型是 ${req.method}`;
  //为了防止中文显示乱码的问题，需要设置响应头Content-Type 的值为 text/html; charset=utf-8
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  //把包含中文的内容，响应给客户端
  res.end(str);
});
```
