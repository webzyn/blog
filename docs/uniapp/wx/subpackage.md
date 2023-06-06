# 分包

[[toc]]

## 1.概念

### 1.1 什么是分包

分包指的是把一个<span style="color: red">完整的小程序项目</span>，按照需求<span style="color: red">划分为不同的子包</span>，在构建时打包成不同的分包，用户在使用时<span style="color: red">按需进行加载</span>。

### 1.2 分包的好处

对小程序进行分包的好处主要有以下两点:

- 可以<span style="color: red">优化小程序首次启动的下载时间</span>
- 在<span style="color: red">多团队共同开发</span>时可以更好的<span style="color: red">解耦协作</span>

### 1.3 分包前项目的构成

分包前，小程序项目中<span style="color: red">所有的页面</span>和<span style="color: red">资源</span>都被打包到了一起，导致整个<span style="color: red">项目体积过大</span>，影响小程序<span style="color: red">首次启动的下载时间</span>。

<img :src="$withBase('/uniapp/wx/10.png')">

### 1.4 分包后项目的构成

分包后，小程序项目由 <span style="color: red">1 个主包</span>+<span style="color: red">多个分包</span>组成:

- 主包:一般只包含项目的<span style="color: red">启动页面</span>或 <span style="color: red">TabBar 页面</span>、以及所有分包都需要用到的一些<span style="color: red">公共资源</span>
- 分包:只包含和当前分包有关的页面和私有资源

<img :src="$withBase('/uniapp/wx/11.png')">

### 1.5 分包的加载规则

- ① 在小程序启动时，默认会<span style="color: red">下载主包</span>并<span style="color: red">启动主包内页面</span>
  - tabBar 页面需要放到主包中
- ② 当用户进入分包内某个页面时，<span style="color: red">客户端会把对应分包下载下来</span>，下载完成后再进行展示
  - 非 tabBar 页面可以按照功能的不同，划分为不同的分包之后，进行按需下载

### 1.6 分包的体积限制

目前，小程序分包的大小有以下两个限制:

- 整个小程序所有分包大小不超过 <span style="color: red">16M</span>（主包＋所有分包)
- 单个分包/主包大小不能超过 <span style="color: red">2M</span>

## 2. 使用分包

### 2.1 配置方法

- 在 app.json 的 subpackages 节点声明分包的结构

<img :src="$withBase('/uniapp/wx/12.png')">

<div style="display: flex;justify-content: space-around;">
  <img :src="$withBase('/uniapp/wx/13.png')">
  <img :src="$withBase('/uniapp/wx/14.png')">
</div>

### 2.2 打包原则

- ① 小程序会按 <span style="color: red">subpackages</span> 的配置进行分包，subpackages 之外的目录将被打包到主包中
- ② 主包也可以有自己的 pages(即最外层的 pages 字段)
- ③ tabBar 页面必须在主包内
- ④ 分包之间不能互相嵌套

### 2.3 引用原则

- ① 主包<span style="color: red">无法引用</span>分包内的私有资源
- ② 分包之间不<span style="color: red">能相互引用</span>私有资源
- ③ 分包<span style="color: red">可以引用</span>主包内的公共资源

<img :src="$withBase('/uniapp/wx/11.png')">

## 3. 独立分包

### 3.1.什么是独立分包

独立分包<span style="color: red">本质上也是分包</span>，只不过它比较特殊，<span style="color: red">可以独立于主包和其他分包而单独运行</span>。

<img :src="$withBase('/uniapp/wx/15.png')">

### 3.2 独立分包和普通分包的区别

最主要的区别:<span style="color: red">是否依赖于主包才能运行</span>

- 普通分包必须依赖于主包才能运行
- 独立分包可以在不下载主包的情况下，独立运行

### 3.3 独立分包的应用场景

开发者可以按需，将某些<span style="color: red">具有一定功能独立性的页面</span>配置到<span style="color: red">独立分包</span>中。原因如下:

- 当小程序从普通的分包页面启动时，需要首先下载主包
- 而独立分包<span style="color: red">不依赖主包</span>即可运行，<span style="color: red">可以很大程度上提升分包页面的启动速度</span>

注意:一个小程序中可以有多个独立分包。

### 3.4 独立分包的配置方法

通过 independent 声明独立分包

<img :src="$withBase('/uniapp/wx/16.png')">

<div style="display: flex;justify-content: space-around;">
  <img :src="$withBase('/uniapp/wx/13.png')">
  <img :src="$withBase('/uniapp/wx/17.png')">
</div>

### 3.5 引用原则

独立分包和普通分包以及主包之间，是相互隔绝的，不能相互引用彼此的资源!例如:

- 主包<span style="color: red">无法引用</span>独立分包内的私有资源
- 独立分包之间，<span style="color: red">不能相互引用</span>私有资源
- 独立分包和普通分包之间，<span style="color: red">不能相互引用</span>私有资源
- <span style="color: red">特别注意:</span>独立分包中不能引用主包内的公共资源

## 4. 分包预下载

分包预下载指的是:在进入小程序的某个页面时，<span style="color: red">由框架自动预下载可能需要的分包</span>，从而提升进入后续分包页面时的启动速度。

### 4.1 配置分包的预下载

<span style="color: red">预下载分包的行为，会在进入指定的页面时触发</span>。在 app.json 中，使用<span style="color: red">preloadRule</span>节点定义分包的预下载规则，示例代码如下:

<img :src="$withBase('/uniapp/wx/18.png')">

```json
{
  "pages": [
    "pages/home/home",
    "pages/message/message",
    "pages/contact/contact"
  ],
  "preloadRule": {
    "pages/contact/contact": {
      "packages": ["p1"],
      "network": "all"
    }
  },
  "subPackages": [
    {
      "root": "pkgA",
      "name": "p1",
      "pages": ["pages/cat/cat", "pages/dog/dog"]
    },
    {
      "root": "pkgB",
      "name": "p2",
      "pages": ["pages/apple/apple"],
      "independent": true
    }
  ]
}
```

### 4.3 分包预下载的限制

同一个分包中的页面享有<span style="color: red">共同的预下载大小限额 2M</span>

<img :src="$withBase('/uniapp/wx/19.png')">
