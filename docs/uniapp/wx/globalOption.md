# 配置

## 全局配置

[https://developers.weixin.qq.com/miniprogram/dev/framework/config.html#%E5%85%A8%E5%B1%80%E9%85%8D%E7%BD%AE](https://developers.weixin.qq.com/miniprogram/dev/framework/config.html#%E5%85%A8%E5%B1%80%E9%85%8D%E7%BD%AE)

[https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html](https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html)

### 1. 全局配置文件 app.json

- 常用配置项
  - pages
    - 记录当前小程序所有页面的存放路径
  - window
    - 全局设置小程序窗口的外观
  - tabBar
    - 设置小程序底部的 tabBar 效果
  - style - 是否启用新版的组件样式

### 2. window

- 全局的默认窗口表现

[https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html#window](https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html#window)

<img :src="$withBase('/uniapp/wx/01.png')">

### 3. tabBar

- 底部 tab 栏的表现

[https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html#tabBar](https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html#tabBar)

<img :src="$withBase('/uniapp/wx/02.png')">
<img :src="$withBase('/uniapp/wx/03.png')">

## 页面配置

[https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/page.html](https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/page.html)

- 同全局配置中 window
- 注意:当页面配置与全局配置`冲突`时，根据`就近原则`，最终的效果以`页面配置`为准。
