# 生命周期

- 应用生命周期

  - 小程序从启动 -> 运行 -> 销毁的过程

- 页面生命周期
  - 小程序中，每个页面的加载 -> 渲染 -> 销毁的过程

## 生命周期函数

### 应用的生命周期函数

小程序从启动 -> 运行 -→ 销毁期间依次调用的那些函数页面的生命周期函数

[https://developers.weixin.qq.com/miniprogram/dev/reference/api/App.html#onLaunch-Object-object](https://developers.weixin.qq.com/miniprogram/dev/reference/api/App.html#onLaunch-Object-object)

- **onLaunch** 小程序初始化完成时触发，全局只触发一次

- **onShow** 小程序启动，或从后台进入前台显示时触发

- **onHide** 小程序从前台进入后台时触发

```js
App({
  onLaunch: function (options) {},
  onShow: function (options) {},
  onHide: function () {},
})
```

### 页面的生命周期函数

小程序中，每个页面从加载 -→ 渲染 -→ 销毁期间依次调用的那些函数

[https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html#onLoad-Object-query](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html#onLoad-Object-query)

- **onLoad** 监听页面加载，一个页面只调用一次
- **onShow** 监听页面显示
- **onReady** 监听页面初次渲染完成
- **onHide** 监听页面隐藏
- **onUnload** 监听页面卸载，一个页面只调用一次
- **onRouteDone** 路由动画完成时触发
