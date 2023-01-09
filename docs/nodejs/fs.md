# fs 模块

## 1、读取指定文件中的内容

### 1. fs.readFile()

```js
fs.readFile(path[,options],callback)
```

- 参数 1:必选, 字符串 ,表示文件的路径
- 参数 2:可选, 表示以什么编码格式来读取文件 一般为 utf8
- 参数 3:必选, 文件读取完成后, 通过回调函数拿到读取的结果

```js
// 导入fs模块
const fs = require("fs");

fs.readFile("./file/2.txt", "utf-8", function (err, dataStr) {
  //   -- 回调函数 res:失败的结果 dataStr:成功的结果
  //   -- 读取成功则 err 为 null
  //   -- 读取失败则 err 为 错误对象,dataStr 值为 undefined
  if (err) {
    // 失败err
    return console.log("err", err);
  }
  console.log("dataStr", dataStr); // dataStr 我是1.txt中的内容
});
```

## 2、向指定文件写入内容

### 1.fs.readFile()

```js
fs.writeFile(file, data[, options],callback)
```

- 参数 1∶ 必选参数，需要指定一个文件路径的字符串，表示文件的存放路径。
- 参数 2: 必选参数，表示要写入的内容。
- 参数 3: 可选参数，表示以什么格式写入文件内容，默认值是 utf8。
- 参数 4: 必选参数，文件写入完成后的回调函数。

```js
const fs = require("fs");

fs.writeFile("./file/2.txt", "我是写入2.txt的文本", "utf-8", function (err) {
  // 写入成功则 err 为 null
  // 写入失败则 err 为 错误对象
  console.log("err", err);
  if (err) {
    return console.log("文件写入失败" + err.message);
  }
  console.log("文件写入成功");
});
```

## 3、路径动态拼接 \_\_dirname

### \_\_dirname 当前文件所处的目录

```js
console.log(__dirname); // E:\blog\nodejs-study
console.log(__dirname + "/file/3.txt"); // E:\blog\nodejs-study\file\3.txt
```
