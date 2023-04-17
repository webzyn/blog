# axios 实例

[[toc]]

[axios 详解-推荐](https://blog.csdn.net/m0_65335111/article/details/127339110)

## 创建实例

> axios.create([config])

```js
const instance = axios.create({
  baseURL: "https://some-domain.com/api/",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
})
```

[config 配置](/axios/config)

## axios API

- axios(config)

```js

axios({
  method: 'post',
  url: '/user/12345',
  data: {
    name: 'zs',
  }
```

- axios(url[, config])

```js
// 默认发送 GET 请求
axios("/user/12345")
```

- axios.request(config)

```js
// 同上
```

- axios.get(url[, config])

```js
axios.get("/user?ID=12345")

axios.get("/user", {
  params: {
    ID: 12345,
  },
})
```

- axios.post(url[, data[, config]])

```js
axios.post("/user", {
  id: 12345,
})
```

- axios.head(url[, config])
- axios.delete(url[, config])
- axios.put(url[, data[, config]])
- axios.patch(url[, data[, config]])
