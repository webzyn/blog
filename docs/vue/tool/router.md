# 路由原理

[[toc]]

## 理解路由

目前大部分前端应用都是`SPA单页面模式`,服务器上只有一个 index.html 静态文件，我们访问服务器时访问的都是这一个页面，在点击不同模块时，在页面渲染显示对应的内容，这个过程通过路由实现。

- hash 模式

在改变 URL 中 hash 部分时，通过 hashchange 监听事件，在 hash 改变时执行相应的回调函数，渲染响应的 UI 内容

- history 模式

主要依靠了 history 全局对象的 pushState 和 replaceState 方法，这两个方法都会改变页面 url，但是都不刷新页面。再通过 popstate 事件监听 url 的改变来执行相应的回调函数。但是 pushState 和 replaceState 并不会触发 popstate 事件，所以需要 对 pushState 和 replaceState 进行重写使它能够监听 url 的改变

history 模式在路由跳转后刷新页面会 404，因为服务器上只有一个 index.html 页面，跳转后的页面并不存在于服务器，需要后端进行配合配置 nginx，解决访问资源不存在的情况

## 代码

### hash 模式

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>hash模式</title>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      html,
      body {
        height: 100%;
      }
      #content {
        height: calc(100vh - 50px);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 3em;
      }
      #nav {
        height: 50px;
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        display: flex;
      }
      #nav a {
        width: 25%;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid black;
      }
      #nav a:not(:last-of-type) {
        border-right: none;
      }
    </style>
  </head>

  <body>
    <main id="content"></main>
    <nav id="nav">
      <a href="#/">首页</a>
      <a href="#/shop">商城</a>
      <a href="#/shopping-cart">购物车</a>
      <a href="#/mine">我的</a>
    </nav>
  </body>
  <script>
    class VueRouter {
      // 构造函数
      constructor(routes = []) {
        this.routes = routes // 路由映射
        this.currentHash = "" // 当前hash
        // 将refresh方法绑定到 当前实例
        // 如果不绑定 则绑定监听事件时这个this指向window，而window下没有refresh方法，则会报错
        this.refresh = this.refresh.bind(this)
        // 绑定 事件
        window.addEventListener("load", this.refresh)
        window.addEventListener("hashchange", this.refresh)
      }

      // hash 改变时 的回调函数
      refresh(event) {
        let newHash = "",
          oldHash = null
        // 获取当前 hash 和 旧的hash
        if (event.newURL) {
          oldHash = this.getUrlPath(event.oldURL || "")
          newHash = this.getUrlPath(event.newURL || "")
        } else {
          // 首次进入 监听到 load
          newHash = this.getUrlPath(window.location.hash)
        }
        // 赋值 当前hash 给实例
        this.currentHash = newHash
        // 渲染对应的UI
        this.matchComponent()
      }

      // 截取路径中的 hash 部分
      getUrlPath(url) {
        return url.indexOf("#") >= 0 ? url.slice(url.indexOf("#") + 1) : "/"
      }

      // 渲染函数
      matchComponent() {
        // 从路由列表 中找到 当前路由信息
        let curRoute = this.routes.find(
          (route) => route.path === this.currentHash
        )
        if (!curRoute) {
          // 当路由不存在时 设置路由为首页
          curRoute = this.routes.find((route) => route.path === "/")
        }
        // 将对应组件插入到页面
        document.querySelector("#content").innerHTML = curRoute.component
      }
    }

    // 测试
    const router = new VueRouter([
      {
        path: "/",
        name: "home",
        component: "<div>首页</div>",
      },
      {
        path: "/shop",
        name: "shop",
        component: "<div>商城</div>",
      },
      {
        path: "/shopping-cart",
        name: "shopping-cart",
        component: "<div>购物车</div>",
      },
      {
        path: "/mine",
        name: "mine",
        component: "<div>我的</div>",
      },
    ])
  </script>
</html>
```

<img :src="$withBase('/vue/tool/router_3.png')">
<img :src="$withBase('/vue/tool/router_1.png')">
<img :src="$withBase('/vue/tool/router_2.png')">

### history 模式

[参考](https://juejin.cn/post/7127143415879303204)
