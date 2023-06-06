# API Promise 化

默认情况下，小程序官方提供的<span style="color: red">异步 API</span> 都是<span style="color: red">基于回调函数</span>实现的。

缺点: 容易造成<span style="color: red">回调地狱</span>的问题，代码的<span style="color: red">可读性、维护性</span>差!

## 1.什么是 API Promise 化

<span style="color: red">APl Promise 化</span>，指的是<span style="color: red">通过额外的配置</span>，将官方提供的、基于回调函数的异步 API，<span style="color: red">升级改造为基于 Promise 的异步 API</span>，从而提高代码的可读性、维护性，避免回调地狱的问题。

## 2.实现 API Promise 化

在小程序中，实现 APl Promise 化主要依赖于 <span style="color: red">miniprogram-api-promise</span> 这个第三方的 npm 包。

[https://blog.csdn.net/weixin_52203618/article/details/127151519](https://blog.csdn.net/weixin_52203618/article/details/127151519)

- ① 初始化仓库
  - 在项目空白处右键，点击`在外部终端窗口中打开`,执行 `npm init -y`
- ② 安装 npm 包
  - 执行 `npm install --save miniprogram-api-promise@1.0.4`
- ③ 删除 miniprogram_npm 文件夹
- ④ 构建 npm
  - 左上角工具，构建 npm

<span style="color: red">每次装包 ,都需要删除 miniprogram_npm 文件夹并重新构建 npm</span>

```js
//在小程序入口文件中(app.js)，只需调用一次 promisifyAll()方法
//即可实现异步API的 Promise 化
import { promisifyAll } from "miniprogram-api-promise"

const wxp = (wx.p = {})
// promisify all wx's api
promisifyAll(wx, wxp)
App({})
```

```js
// pages/home/home.js
Page({
  async getInfo() {
    const { data } = await wx.p.request({
      method: "GET",
      url: "https://applet-base-api-t.itheima.net/api/get",
      data: {
        name: "zs",
        age: 20,
      },
    })
    console.log(data)
  },
})
```
