# Web 开发模式

### 服务端渲染

服务器发送给客户端的 HTML 页面，是在服务器通过字符串的拼接动态生成的。因此客户端不需要使用 Ajax 额外请求页面的数据。

```js
app.get("/index.html", (req, res) => {
  const user = { name: "Bruce", age: 29 };
  const html = `<h1>username:${user.name}, age:${user.age}</h1>`;
  res.send(html);
});
```

优点:

- 前端耗时短。浏览器只需直接渲染页面，无需额外请求数据。
- 有利于 SEO。服务器响应的是完整的 HTML 页面内容，有利于爬虫爬取信息。

缺点:

- 占用服务器资源。服务器需要完成页面内容的拼接，若请求比较多，会对服务器造成一定访问压力。
- 不利于前后端分离，开发效率低。

### 前后端分离

前后端分离的开发模式，依赖于 Ajax 技术的广泛应用。后端只负责提供 API 接口，前端使用 Ajax 调用接口。

优点:

- 开发体验好。前端专业页面开发，后端专注接口开发。
- 用户体验好。页面局部刷新，无需重新请求页面。
- 减轻服务器的渲染压力。页面最终在浏览器里生成。

缺点:

不利于 SEO。完整的 HTML 页面在浏览器拼接完成，因此爬虫无法爬取页面的有效信息。Vue、React 等框架的 `SSR(server side render)`技术能解决 SEO 问题。

### 如何选择开发模式

- 企业级网站，主要功能是展示，没有复杂交互，且需要良好的 SEO，可考虑服务端渲染
- 后台管理项目，交互性强，无需考虑 SEO，可使用前后端分离
- 为同时兼顾首页渲染速度和前后端分离开发效率，可采用首屏服务器端渲染+其他页面前后端分离的开发模式

# 身份认证

身份认证(Authentication)又称“身份验证”、“鉴权”，是指**通过一定的手段，完成对用户身份的确认**。

- `服务端渲染`推荐使用 **Session 认证机制**
- `前后端分离`推荐使用 **JWT 认证机制**

## 1、Session 认证机制

### 1.1 Cookie

Cookie 是**存储在用户浏览器中的一段不超过 4KB 的字符串**。它由一个名称(Name)、一个值(Value)和其它几个用于控制 `Cookie 有效期`、`安全性`、`使用范围`的`可选属性`组成。

不同域名下的 Cookie 各自独立，每当客户端发起请求时，会**自动**把**当前域名下**所有**未过期的 Cookie** 一同发送到服务器。

**Cookie 的几大特性:**

- 自动发送
- 域名独立
- 过期时限
- 4KB 限制

**Cookie 在身份认证中的作用**

客户端第一次请求服务器的时候，服务器**通过响应头的形式**，向客户端发送一个身份认证的 Cookie，客户端会自动将 Cookie 保存在浏览器中。

随后，当客户端浏览器每次请求服务器的时候，浏览器会`自动`将身份认证相关的 Cookie，**通过请求头的形式**发送给服务器，服务器即可验明客户端的身份。

<img :src="$withBase('/nodejs/information_1.png')">

**Cookie 不具有安全性**

由于 Cookie 是存储在浏览器中的，而且**浏览器也提供了读写 Cookie 的 API**，因此**Cookie 很容易被伪造**，不具有安全性。因此不建议服务器将重要的隐私数据，通过 Cookie 的形式发送给浏览器。

**注意:千万不要使用 Cookie 存储重要且隐私的数据!比如用户的身份信息、密码等。**

### 1.2 Session 工作原理

<img :src="$withBase('/nodejs/information_2.png')">

### 1.3 在 Express 中使用 Session 认证

1. 安装 express-session 中间件

```sh
npm install express-session
```

2. 配置中间件

```js
// 导入session中间件
const session = require("express-session");

app.use(
  session({
    secret: "Keyboard cat", // secret 的值为任意字符串
    resave: false, // 固定写法
    saveUninitalized: true, // 固定写法
  })
);
```

3. 向 session 中存数据

中间件配置成功后，可通过 `req.session` 访问 session 对象，从而存储用户关键信息

```js
app.post("/api/login", (req, res) => {
  // 判断用户提交的登录信息是否正确
  if (req.body.username !== "admin" || req.body.password !== "000000") {
    return res.send({ status: 1, msg: "登录失败" });
  }
  // 登录成功
  req.session.user = req.body; // 将用户的信息,存储到Session中
  req.session.isLogin = true; // 将用户的登录状态,存储到Session中

  res.send({ status: 0, msg: "登录成功" });
});
```

4. 从 session 中取数据

可以直接从`req.session` 对象上获取之前存储的数据

```js
app.get("/api/username", (req, res) => {
  // 判断用户是否登录
  if (!req.session.isLogin) {
    return res.send({ status: 1, msg: "fail" });
  }
  res.send({ status: 0, msg: "success", username: req.session.user.username });
});
```

5. 清空 session

调用`req.session.destroy()`函数，即可清空服务器保存的 session 信息.

```js
// 退出登录的接口
app.post("/api/logout", (req, res) => {
  // 清空当前客户端的session信息
  req.session.destroy();
  res.send({ status: 0, msg: "退出登录成功" });
});
```

### 1.5 Session 认证的局限性

- Session 认证机制需要配合 Cookie 才能实现。由于 Cookie 默认不支持跨域访问，所以，当涉及到前端跨域请求后端接口的时候，需要做很多额外的配置，才能实现跨域 Session 认证。
- 当前端请求后端接口不存在跨域问题的时候，推荐使用 Session 身份认证机制。
- 当前端需要跨域请求后端接口的时候，不推荐使用 Session 身份认证机制，推荐使用 JWT 认证机制

## 2、JWT 认证机制

JWT(JSON Web Token)是目`前最流行`的**跨域认证解决方案**

### 2.1 JWT 工作原理

用户的信息通过 Token 字符串的形式，保存在客户端浏览器中。服务器通过还原 Token 字符串的形式来认证用户的身份。

<img :src="$withBase('/nodejs/information_3.png')">

### 2.2 JWT 的组成部分

JWT 通常由三部分组成，分别是 **Header**(头部)、**Payload**(有效荷载)、**Signature** (签名)。\
三者之间使用英文的“.”分隔

```
Header.Payload.Signature

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsInVzZXJuYW1lIjoiQnJ1Y2UiLCJwYXNzd29yZCI6IiIsIm5pY2tuYW1lIjoiaGVsbG8iLCJlbWFpbCI6InNjdXRAcXEuY29tIiwidXNlcl9waWMiOiIiLCJpYXQiOjE2NDE4NjU3MzEsImV4cCI6MTY0MTkwMTczMX0.bmqzAkNSZgD8IZxRGGyVlVwGl7EGMtWitvjGD-a5U5c
```

- Payload 是**真正的用户信息**，是用户信息经过加密后生成的字符串
- Header 和 Signature 是**安全性相关**部分，保证 Token 安全性

### 2.3 JWT 使用方式

- 客户端收到服务器返回的 JWT 之后，通常会将它储存在**localStorage**或**sessionStorage**中。
- 此后，客户端每次与服务器通信，都要带上这个 JWT 的字符串，从而进行身份认证。推荐的做法是**把 JWT 放在 HTTP 请求头的 Authorization 字段中**

```
Authorization: Bearer <token>
```

### 2.4 在 Express 中使用 JWT

1. 安装 JWT 相关的包

```sh
npm install jsonwebtoken express-jwt@5.3.3
```

- jsonwebtoken 用于**生成 JWT 字符串**
- express-jwt 用于**将 JWT 字符串解析还原成 JSON 对象**

2. 导入 JWT 相关的包

```js
const jwt = require("jsonwebtoken");
const expressJWT = require("express-jwt");
```

3. 定义 secret 密钥

- 为**保证 JWT 字符串的安全性**，防止其在网络传输过程中被破解，需定义用于`加密`和`解密`的 secret 密钥
- 生成 JWT 字符串时，使用 secret 密钥对用户的信息`进行加密`，得到加密好的 JWT 字符串
- 把 JWT 字符串解析还原成 JSON 对象时，需要使用 secret 密钥`进行解密`

```js
// secret密匙的本质就是一个字符串 可以是任意字符串
const secretKey = "i am secretKey";
```

4. 在登录成功后生成 JWT 字符串

- 调用`jsonwebtoken`包提供的**sign()**方法，将用户的信息加密成 JWT 字符串，响应给客户端

**jwt.sign()**
参数：用户信息对象、加密密钥、配置对象-其中 expiresIn 表示 token 有效期

```js
app.post("/api/login", (req, res) => {
  // ... 省略登录失败的代码
  // 用户登录成功后,生成 JWT 字符串,通过 token 属性响应给客户端
  res.send({
    status: 200,
    message: "登录成功",
    // 尽量不保存敏感信息，因此只有用户名，没有密码
    token: jwt.sign({ username: req.body.username }, secretKey, {
      expiresIn: "10h",
    }),
  });
});
```

5. 将 JWT 字符串还原为 JSON 对象

- 客户端每次在访问那些有权限接口的时候，都需要`主动`通过请求头中的 `Authorization` 字段，将 Token 字符串发送到服务器进行身份认证。
- 服务器可以通过 express-jwt 这个中间件，自动将客户端发送过来的 Token 解析还原成 JSON 对象:

```js
// 使用 app.use()注册中间件
// unless({ path: [/^\/api\//] }) 指定哪些接口无需访问权限
app.use(expressJWT({ secret: secretKey }).unless({ path: [/^\/api\//] }));
```

6. 获取用户信息

- 当 express-jwt 中间件配置成功后，即可在那些有权限的接口中，使用 `req.user` 对象，来访问从 JWT 字符串中解析出来的用户信息(通过 jwt.sign()加密的用户信息对象)

```js
// 这是一个有权限的API接口
app.get("/admin/getinfo", (req, res) => {
  console.log(req.user);
  res.send({
    status: 200,
    message: "获取信息成功",
    data: req.user,
  });
});
```

7. 捕获解析 JWT 失败后产生的错误

- 当使用 express-jwt 解析 Token 字符串时，如果客户端发送过来的 Token 字符串**过期**或**不合法**，会产生一个**解析失败的错误**，影响项目的正常运行
- 通过 Express 的错误中间件，捕获这个错误并进行相关的处理

```js
app.use((err, req, res, next) => {
  // token解析失败导致的错误
  if (err.name === "UnauthorizedError") {
    return res.send({ status: 401, message: "无效的token" });
  }
  // 其它原因的错误
  res.send({ status: 500, message: "未知错误" });
});
```
