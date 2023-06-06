# 1. 页面事件

## 1.1 下拉刷新事件

- 手指在屏幕上`下拉滑动`,从而`重新加载页面数据`

### 1.1.1 启用下拉刷新

- ① 全局开启下拉刷新
  - 在 app.json 的 window 节点中，将 enablePullDownRefresh 设置为 true
- ② 局部开启下拉刷新
  - 在页面的.json 配置文件中，将 enablePullDownRefresh 设置为 true

### 1.1.2 配置下拉刷新窗口的样式

- 在全局或页面的.json 配置文件中，通过 `backgroundColor` 和 `backgroundTextStyle` 来配置下拉刷新窗口的样式，其中:
  - `backgroundColor` 用来配置下拉刷新`窗口的背景颜色`，仅支持 16 进制的颜色值
  - `backgroundTextStyle` 用来配置下拉刷新 `loading` 的样式，仅支持 dark 和 light

### 1.1.3 监听页面的下拉刷新事件

[https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html#%E5%8F%82%E6%95%B0](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html#%E5%8F%82%E6%95%B0)

- 在页面的.js 文件中，通过`onPullDownRefresh()`函数即可监听当前页面的下拉刷新事件。

### 1.1.4 停止下拉刷新的效果

[https://developers.weixin.qq.com/miniprogram/dev/api/ui/pull-down-refresh/wx.stopPullDownRefresh.html#onPullDownRefresh](https://developers.weixin.qq.com/miniprogram/dev/api/ui/pull-down-refresh/wx.stopPullDownRefresh.html#onPullDownRefresh)

- 当处理完下拉刷新后，下拉刷新的 loading 效果会一直显示，`不会主动消失`，所以需要手动隐藏 loading 效果。此时，调用 `wx.stopPullDownRefresh()`可以停止当前页面的下拉刷新。示例

```js
Page({
  onPullDownRefresh() {
    console.log("下拉了")
    this.setData({
      count: 0,
    })
    wx.stopPullDownRefresh()
  },
})
```

## 1.2 上拉触底

- 通过手指在屏幕上的`上拉滑动`操作，从而`加载更多数据`的行为

### 1.2.1 监听页面的上拉触底事件

[https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html#onReachBottom](https://developers.weixin.qq.com/miniprogram/dev/reference/api/Page.html#onReachBottom)

- 在页面的.js 文件中，通过 `onReachBottom()`函数即可监听当前页面的上拉触底事件

### 1.2.2 配置上拉触底距离

- 可以在 `app.json 的 window` 选项中或`页面配置`中设置触发距离 `onReachBottomDistance`
