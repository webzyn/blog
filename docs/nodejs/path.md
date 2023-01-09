# path 模块

path 模块是 Node.,js 官方提供的、用来`处理路径`的模块。它提供了一系列的方法和属性，用来满足用户对路径的处理需求。

## 1、path.join()路径拼接

用来`将多个路径片段拼接成一个完整的路径字符串`

```js
const path = require("path");
const pathStr = path.join("/a", "b/c", "../", "/d", "e"); // \a\b\d\e

const pathStr2 = path.join(__dirname, "./file/1.txt"); // 当前文件所处目录\file\1.txt
```

**fs 模块结合 path 模块**

```js
fs.readFile(
  path.join(__dirname, "file/1.txt"),
  "utf-8",
  function (err, dataStr) {
    if (err) {
      return console.log(err.message);
    }
    console.log(dataStr);
  }
);
```

## 2、path.basename()获取文件名

用来`从路径字符串中，将文件名解析出来`

```js
path.basename(path[,ext])
```

- path `string`必选参数，表示一个路径的字符串
- ext `string`可选参数，表示`文件扩展名`
- 返回: `string`表示路径中的最后一部分

```js
const path = require("path");
const fpath = "/a/b/c/index.html";
const fullName = path.basename(fpath); //index.html

const nameOutExt = path.basename(fpath, ".html"); //index
```

## 3、path.extname()获取文件扩展名

```js
const path = require("path");
const fpath = "/a/b/c/index.html";

const fext = path.extname(fpath); //.html
```

## 4、path.dirname()获取目录名

```js
const path = require("path");
const fpath = "/a/b/c/index.html";

const dir = path.dirname(fpath); // \a\b\c
```

## 5、path.isAbsolute()判断是否是绝对路径

```js
const path = require("path");
const fpath = "/a/b/c/index.html";
const fpath2 = "./a/b/c/index.html";

const flag = path.isAbsolute(fpath); //true
const flag2 = path.isAbsolute(fpath2); //false
```

## 6、path.resolvce()拼接为绝对路径

**将一系列路径或路径段解析为绝对路径**

```js
//返回执行入口的路径(当前工作目录的绝对路径) 相当于__dirname
const p1 = path.resolve(); //E:\blog\nodejs-study
const flag = path.resolve() === __dirname; //true

//当前工作目录的绝对路径 拼接 './index.js'
const p2 = path.resolve("./index.js"); //E:\blog\nodejs-study\index.js

// 同上
const p3 = path.resolve(__dirname, "./index.js"); //E:\blog\nodejs-study\index.js

// /index.js是绝对路径
const p4 = path.resolve("/index.js"); // E:\index.js

const p5 = path.resolve("file/", "index.js"); // E:\blog\nodejs-study\file\index.js
```
