# axios

[[toc]]

## 1、axios 常用参数

```js
axios ({
  method: 'get', // 请求方式，默认get
  baseURL: '/demo', // 将自动加在url前面，除非url是绝对URL
  url: '/query', // 请求接口
  params: {}, // 将与请求一起发送的URL参数
  data: {}, // 作为请求主体发送的数据
  headers: {'X-Requested-With': 'XMLHttpRequest'}, // 自定义的请求头
  timeout: 1000, // 请求超时毫秒数
  withCredentials: default, // 跨域请求时是否需要使用凭证，默认false
  maxContentLength: 1000, // 允许的响应内容最大字节数
})
```

## 2、data 与 params 的区别

- params：将与请求一起发送的 URL 参数

  - 常用于'get'请求
  - 必须是一个无格式对象（plain object）或 URLSearchParams 对象
  - 后端对应采用@RequestParam 接收，对应 chrome 的 Query String Parameters

- data：作为请求主体被发送的数据
  - 只适用于'put'、'post'、'patch'类型的请求
  - 在没有设置 transformRequest 时，data 类型必须是 string、plain object、ArrayBufferView、URLSearchParams 之一
  - 后端对应采用@RequestBody 接收，对应 chrome 的 Request Payload

```js
// 若接收参数既有@RequestBody又有@RequestParam
axios.request({
  url: "/find?name=ww",
  data: {
    pass: "a123",
  },
  method: "post",
})
```

## 3、Content-Type

- get 请求
  GET 请求不存在请求实体部分，键值对参数放置在 URL 尾部。因此请求头`不需要设置 Content-Type` 字段，设置了也不会去使用

- post 请求

  - **application/x-www-form-urlencoded**(post 默认编码格式)
    - 提交的数据按照 key1=val1&key2=val2 的方式进行编码，key 和 val 都进行了 URL 转码。

  ```js
  axios.post(
    "http://127.0.0.1:1000/post_2",
    {
      user: "ls",
      pass: "abc",
    },
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }
  )
  ```

  <img :src="$withBase('/axios/axios_13.png')">
  <img :src="$withBase('/axios/axios_14.png')">

  - **application/json** (axios 默认编码格式)
    - 使用 application/json 这个 Content-Type 作为响应头，用来告诉服务端消息主体是序列化后的 JSON 字符串

  ```js
  // axios.post 默认 Content-Type 为 application/json
  axios.post("http://127.0.0.1:1000/post_1", {
    user: "zs",
    pass: "111",
  })
  ```

  <img :src="$withBase('/axios/axios_11.png')">
  <img :src="$withBase('/axios/axios_12.png')">

  - **multipart/form-data** - 既可以上传键值对，也可以上传文件。 - 当上传的字段是文件时，会有 Content-Type 来表名文件类型；content-disposition，用来说明字段的一些信息

  ```js
  // 发送formData格式
  let formData = (data) => {
    let _formData = new FormData()
    for (let i in data) {
      _formData.append(i, data[i])
    }
    return _formData
  }

  let _formData = formData({
    user: "ls",
    pass: "abc",
  })
  axios.post("http://127.0.0.1:1000/postFormData", _formData)
  // Content-Type 会自动设置为 multipart/form-data
  ```

    <img :src="$withBase('/axios/axios_9.png')">
    <img :src="$withBase('/axios/axios_10.png')">

[请求体编码](https://axios-http.com/zh/docs/urlencoded)

## 4、api

### 4.1 get 请求

- axios.get

  - query 参数拼在 url 后面

  ```js
  axios.get("http://127.0.0.1:1000/get_1?user=zzz&pass=123")
  ```

  - query 参数放在 params

  ```js
  axios.get("http://127.0.0.1:1000/get_1", {
    params: {
      user: "zs",
      pass: "123",
    },
  })
  ```

- axios.request

  - query 参数拼在 url 后面

  ```js
  axios.request({
    url: "http://127.0.0.1:1000/get_1?user=ls&pass=abc",
    method: "get",
  })
  ```

  - query 参数放在 params

  ```js
  axios.request({
    url: "http://127.0.0.1:1000/get_1",
    method: "get",
    params: {
      user: "ls",
      pass: "abc",
    },
  })
  ```

<img :src="$withBase('/axios/axios_1.png')">
<img :src="$withBase('/axios/axios_2.png')">

- 后台接口

```js
const express = require("express")
const app = express()

app.get("/get_1", (req, res) => {
  //允许来自任何域的请求
  res.setHeader("Access-Control-Allow-Origin", "*")

  // 通过 req.query 获取客户端通过查询字符串,发送到服务器的数据
  const query = req.query

  res.send({
    code: 200,
    message: "请求成功",
    data: query,
  })
})

app.listen(1000)
```

### 4.2 post 请求

post 请求 `Content-Type` 类型默认为 `application/x-www-from-urlencoded`

axios 会将 Content-Type 类型处理为为 `application/json`，后端需要接收 json 类型

[前往](https://blog.csdn.net/weixin_62277266/article/details/128603267)

**请求体 body 传参**

- axios.post

```js
axios.post("http://127.0.0.1:1000/post_1", {
  user: "zs",
  pass: "111",
})
```

- axios.request

```js
axios.request({
  url: "http://127.0.0.1:1000/post_1",
  method: "post",
  data: {
    user: "ls",
    pass: "abc",
  },
})
```

<img :src="$withBase('/axios/axios_3.png')">

<img :src="$withBase('/axios/axios_4.png')"><img :src="$withBase('/axios/axios_5.png')">

**结合两种传参**

- axios.post

```js
axios.post("http://127.0.0.1:1000/post_2?name=ls", {
  user: "ls",
  pass: "abc",
})
```

- axios.request

```js
axios.request({
  url: "http://127.0.0.1:1000/post_2",
  method: "post",
  params: {
    name: "ls",
  },
  data: {
    user: "ls",
    pass: "abc",
  },
})
```

<img :src="$withBase('/axios/axios_6.png')">

<img :src="$withBase('/axios/axios_7.png')"><img :src="$withBase('/axios/axios_8.png')">

- 接口

```js
// 解决跨域的中间件
const cors = require("cors")
app.use(cors())
// 配置解析表单数据的中间件
// app.use(express.urlencoded({ extended: false })) // 没有实现解析
var bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json()) // 接收axios post的请求体

app.post("/post_1", (req, res) => {
  // 通过 req.body获取请求体中包含的url-encoded格式的数据
  const body = req.body

  res.send({
    code: 200,
    message: "请求成功",
    data: body,
  })
})

app.post("/post_2", (req, res) => {
  const query = req.query
  const body = req.body
  res.send({
    code: 200,
    message: "请求成功",
    data: {
      query,
      body,
    },
  })
})
```

[前往官网](https://axios-http.com/zh/docs/intro)
