# 网络请求

- 小程序对`数据接口的请求`的`限制`
  - 只能请求`HTTPS`类型的接口
  - 必须将`接口的域名`添加到`信任列表`中

[https://developers.weixin.qq.com/miniprogram/dev/api/network/request/wx.request.html](https://developers.weixin.qq.com/miniprogram/dev/api/network/request/wx.request.html)

## get 请求

```js
wx.request({
  url: "https://www.escook.cn/api/get",
  method: "GET",
  data: {
    name: "zs",
    age: 20,
  },
  success: (res) => {
    console.log(res.data)
  },
})
```

## post 请求

```js
wx.request({
  url: "https://www.escook.cn/api/post",
  method: "POST",
  data: {
    name: "zs",
    age: 20,
  },
  success: (res) => {
    console.log(res.data)
  },
})
```
