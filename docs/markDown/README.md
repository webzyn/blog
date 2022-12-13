# markDown 语法

## vuepress 目录结构

```
.
├── docs
│   ├── .vuepress (可选的)
│   │   ├── components (可选的)
│   │   ├── theme (可选的)
│   │   │   └── Layout.vue
│   │   ├── public (可选的)
│   │   ├── styles (可选的)
│   │   │   ├── index.styl
│   │   │   └── palette.styl
│   │   ├── templates (可选的, 谨慎配置)
│   │   │   ├── dev.html
│   │   │   └── ssr.html
│   │   ├── config.js (可选的)
│   │   └── enhanceApp.js (可选的)
│   │
│   ├── README.md
│   ├── guide
│   │   └── README.md
│   └── config.md
│
└── package.json
```

::: warning 注意

请留意目录名的大写。
:::

- `docs/.vuepress`: 用于存放全局的配置、组件、静态资源等。
- `docs/.vuepress/components`: 该目录中的 Vue 组件将会被自动注册为全局组件。
- `docs/.vuepress/theme`: 用于存放本地主题。
- `docs/.vuepress/styles`: 用于存放样式相关的文件。
- `docs/.vuepress/styles/index.styl`: 将会被自动应用的全局样式文件，会生成在最终的 CSS 文件结尾，具有比默认样式更高的优先级。
- `docs/.vuepress/styles/palette.styl`: 用于重写默认颜色常量，或者设置新的 stylus 颜色常量。
- `docs/.vuepress/public`: 静态资源目录。
- `docs/.vuepress/templates`: 存储 HTML 模板文件。
- `docs/.vuepress/templates/dev.html`: 用于开发环境的 HTML 模板文件。
- `docs/.vuepress/templates/ssr.html`: 构建时基于 Vue SSR 的 HTML 模板文件。
- `docs/.vuepress/config.js`: 配置文件的入口文件，也可以是 YML 或 toml。
- `docs/.vuepress/enhanceApp.js`: 客户端应用的增强。

::: warning 注意

当你想要去自定义 `templates/ssr.html` 或 `templates/dev.html` 时，最好基于 [默认的模板文件](https://github.com/vuejs/vuepress/blob/master/packages/%40vuepress/core/lib/client/index.dev.html)来修改，否则可能会导致构建出错。
:::

## 1、基本语法

### 1.1 分级标题

```
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题

```

### 1.2 字体设置斜体、粗体、删除线

```
这里显示正文
_这里显示的是斜体_
**这里显示的文字是加粗了**
**_这里的文字是倾斜加粗的_**
~~这里的文字是加下划线的~~

```

显示效果\
这里显示正文
_这里显示的是斜体_
**这里显示的文字是加粗了**
**_这里的文字是倾斜加粗的_**
~~这里的文字是加下划线的~~

### 1.3 换行

```
\ 一个反斜杠就行
```

### 1.4 链接

(1) 插入本地图片链接

```
![图片描述](图片路径)       加图片描述
![](图片路径)             图片描述可以不写

```

效果\
![我是图片描述](/hero.webp)

（2）插入互联网图片\
注：图片描述与插入本地图片一样，描述可以不写。

写法：

```
![图片描述]（图片网络路径）

```

![我是蜡笔小新](https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.520touxiang.com%2Fuploads%2Fallimg%2F2017080703%2Fcrsv3bxjx2b.jpg&refer=http%3A%2F%2Fwww.520touxiang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1673098397&t=2491881c66f54eb9487108f9b5c9c81e)

(3)文字链接

```
[这是一个链接](http://www.baidu.com/ "这是title")
[这是没有 title 的链接](http://www.baidu.com/)
```

[这是一个链接](http://www.baidu.com/ "这是title")
[这是没有 title 的链接](http://www.baidu.com/)

### 1.5 代码块

```
前面三个 ` 后面三个 ` 将代码包裹起来
```

### 1.6 分割线

```
分割线: *** 或者 --- 或 * * * 或 ***** 或 - - - 或 -----------------
```

如下所示

---

### 1.7 普通符号

(1)基本使用

```
要使用普通符号 只需要在前面加上 \
如: \* \-
```

\* \-

### 1.8 引用

```
在被引用的文本前加上 > 符号 以及一个空格就可以了
如: > 引用
```

> 引用

(2)多层引用

```
如:
> > > 三层

> > 两层

> 一层
```

> > > 三层

> > 两层

> 一层

### 1.9 列表

(1) 无序列表 使用 星号\*，加号+，减号- 表示无序列表

```
* 无序列表
+ 无序列表
- 无序列表
```

- 无序列表

* 无序列表

- 无序列表

(2)有序列表 有序列表则使用数字接着一个英文句点： 注意：英文句点后面一定要有一个空格，起到缩进的作用

```
好像和普通文字没啥区别
1. 有序列表
2. 有序列表
3. 有序列表
```

1. 有序列表
2. 有序列表
3. 有序列表

### 1.10 表格

(1)极简模式

```
水果名称| 价格 |  数量
- | - | -
香蕉 | $1 | 5 |
苹果 | $1 | 6 |
草莓 | $1 | 7 |
```

| 水果名称 | 价格 | 数量 |
| -------- | ---- | ---- |
| 香蕉     | $1   | 5    |
| 苹果     | $1   | 6    |
| 草莓     | $1   | 7    |

(2)简单方法

```
name | 111 | 222 | 333 | 444
:- | :-: | :-: | :-: | -:
aaa | bbb | ccc | ddd | eee
fff | ggg| hhh | iii | 000

```

| name | 111 | 222 | 333 | 444 |
| :--- | :-: | :-: | :-: | --: |
| aaa  | bbb | ccc | ddd | eee |
| fff  | ggg | hhh | iii | 000 |

(3)原生方法

```
name | 111 | 222 | 333 | 444
:-: | :-: | :-: | :-: | :-:
aaa | bbb | ccc | ddd | eee|
fff | ggg| hhh | iii | 000|
```

| name | 111 | 222 | 333 | 444 |
| :--: | :-: | :-: | :-: | :-: |
| aaa  | bbb | ccc | ddd | eee |
| fff  | ggg | hhh | iii | 000 |

### 1.11 反斜杠

```
利用反斜杠来插入一些在语法中有其它意义的符号
\   反斜线
`   反引号
*   星号
_   底线
{}  花括号
[]  方括号
()  括弧
#   井字号
+   加号
-   减号
.   英文句点
!   惊叹号
```

\\
\` \*
\_
\{}
\[]
\()
\#
\+
\-
\.
\!

## 2、 Markdoem 扩展

### 2.1 内部链接

```
文件结构

docs
|-  .vuepress
    |-  README.md
|-  interview
    |-  README.md
|-  javaScript
    |-  README.md
|-  markDown
    |-  README.md   当前文件
|-  uniapp
    |-  README.md
|-  vue
    |-  README.md
```

```
[Home](/) <!-- 跳转到根部的 README.md -->
[markDown](/markDown/)  <!-- 跳转到 markDown 文件夹的 markDown.html 即 README.md-->
[前往顶部](./#_1、基本语法) <!-- 跳转到 当前页 的特定标题位置 -->
[前往 vue 页](/vue/README.md)     <!-- 具体文件可以使用 .md 结尾（推荐） -->
[前往 javaScript 页](../javaScript/README.md)     <!-- 也可以是相对路劲 -->
[前往 uniapp 页](../uniapp/index.html)    <!-- 也可以用 .html -->
```

[Home](/)

[markDown](/markDown/)

[前往顶部](./#_1、基本语法)

[前往 vue 页](/vue/README.md)

[前往 javaScript 页](../javaScript/README.md)

[前往 uniapp 页](../uniapp/index.html)

### 2.2 Emoji

```
:tada: :100:
```

:tada: :100:

你可以在[这个列表](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.json)找到所有可用的 Emoji。

### 2.3 目录

**输入**

```
[[toc]]
```

**输出**

[[toc]]

### 2.4 自定义容器

```
::: tip
这是一个提示
:::

::: warning
这是一个警告
:::

::: danger
这是一个危险警告
:::

::: details
这是一个详情块，在 IE / Edge 中不生效
:::
```

::: tip
这是一个提示
:::

::: warning
这是一个警告
:::

::: danger
这是一个危险警告
:::

::: details
这是一个详情块，在 IE / Edge 中不生效
:::

**参考:**

- [vuepress-plugin-container](https://vuepress-community.netlify.app/zh/plugins/container/#%E6%BC%94%E7%A4%BA)

### 2.5 代码块中的语法高亮

**输入**

````
此处包裹以下代码使用了四个`
```js
export default {
  name: "MyComponent",
  // ...
};
```
````

**输出**

```js
export default {
  name: "MyComponent",
  // ...
};
```

**输入**

````
``` html
<ul>
  <li
    v-for="todo in todos"
    :key="todo.id"
  >
    {{ todo.text }}
  </li>
</ul>
```
````

**输出**

```html
<ul>
  <li v-for="todo in todos" :key="todo.id">{{ todo.text }}</li>
</ul>
```

在 Prism 的网站上查看 [合法的语言列表](https://prismjs.com/#languages-list)

### 2.6 代码块中的行高亮

**输入**

````
``` js {4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```
````

**输出**

```js {4}
export default {
  data() {
    return {
      msg: "Highlighted!",
    };
  },
};
```

除了单行以外，你也可指定多行，行数区间，或是两者都指定。

- 行数区间: 例如 {5-8}, {3-10}, {10-17}
- 多个单行: 例如 {4,7,9}
- 行数区间与多个单行: 例如 {4,7-13,16,23-27,40}

**输入**

````
``` js{1,4,6-7}
export default { // Highlighted
  data () {
    return {
      msg: `Highlighted!
      This line isn't highlighted,
      but this and the next 2 are.`,
      motd: 'VuePress is awesome',
      lorem: 'ipsum',
    }
  }
}
```
````

**输出**

```js{1,4,6-7}
export default { // Highlighted
  data () {
    return {
      msg: `Highlighted!
      This line isn't highlighted,
      but this and the next 2 are.`,
      motd: 'VuePress is awesome',
      lorem: 'ipsum',
    }
  }
}
```

### 2.7 行号

通过配置来为每个代码块显示行号：(我未成功实现)

```js
module.exports = {
  markdown: {
    lineNumbers: true,
  },
};
```
