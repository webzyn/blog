# Bold

`Blob（Binary Large Object）表示二进制类型的大对象。`在数据库管理系统中，将二进制数据存储为一个单一个体的集合。Blob 通常是影像、声音或多媒体文件。**在 JavaScript 中 Blob 类型的对象表示不可变的类似文件对象的原始数据**。

以下是一个 Blob 对象
<img :src="$withBase('/javascript/Blob_1.png')">

`Blob` 由一个可选的字符串 `type`（通常是 [MIME 类型](./MIME.html)）和 `blobParts` 组成：
<img :src="$withBase('/javascript/Blob_2.jpg')">

## 1、Blob 构造函数

```
var aBlob = new Blob(blobParts, options);
```

参数如下:

- blobParts：它是一个由 ArrayBuffer，ArrayBufferView，Blob，DOMString 等对象构成的数组。DOMStrings 会被编码为 UTF-8。
- options：一个可选的对象，包含以下两个属性：
  - type —— 默认值为 `""`，它代表了将会被放入到 blob 中的数组内容的 `MIME 类型`。
  - endings —— 默认值为 "transparent"，**用于指定包含行结束符 \n 的字符串如何被写入**。它是以下两个值中的一个："`native`"，代表行结束符会被更改为适合宿主操作系统文件系统的换行符，或者 "`transparent`"，代表会保持 blob 中保存的结束符不变。

```
例:
var b = new Blob(["我是文字"], {
  type: "text/plain",
});

console.log(b);
```

### 1.1 属性

- size（只读）：表示 Blob 对象中所包含数据的大小（以字节为单位）。
- type（只读）：一个字符串，表明该 Blob 对象所包含数据的 MIME 类型。如果类型未知，则该值为空字符串。

### 2.2 方法

- slice([start[, end[, contentType]]])：返回一个新的 Blob 对象，包含了源 Blob 对象中指定范围内的数据。
- stream()：返回一个能读取 blob 内容的 ReadableStream。
- text()：返回一个 Promise 对象且包含 blob 所有内容的 UTF-8 格式的 USVString。
- arrayBuffer()：返回一个 Promise 对象且包含 blob 所有内容的二进制格式的 ArrayBuffer。

&emsp;&emsp;这里我们需要注意的是，**`Blob` 对象是不可改变的**。我们不能直接在一个 Blob 中更改数据，但是我们可以对一个 Blob 进行分割，从其中创建新的 Blob 对象，将它们混合到一个新的 Blob 中。这种行为类似于 JavaScript 字符串：我们无法更改字符串中的字符，但可以创建新的更正后的字符串。

## 2、Blob 使用场景

### 2.1 Blob 用作 URL

Blob 可以很容易的作为 `<a>`、`<img>` 或其他标签的 URL，多亏了 `type` 属性，我们也可以上传/下载 `Blob` 对象。

`Blob URL/Object URL` 是一种伪协议，允许 Blob 和 File 对象用作图像，下载二进制数据链接等的 URL 源。

**在浏览器中，可以通过`URL.createObjectURL(Blob对象)`；创建一个唯一的 http 格式的 url 路径,其形式为 `blob:<origin>/<uuid>` ，在 img 的 src 中使用该路径即可 通过这个 URL，可以获取到所指定文件的完整内容**

示例:

`blob:http://10.0.3.35:9090/a17bc608-7c65-4572-ac23-f69a590ae869`

在不需要这些对象 URL 的时候，通过调用**window.URL.revokeObjectURL()**方法来释放他们所占用的内容

```js
const url = window.URL.createObjectURL(data); //将blob转化为URL
window.URL.revokeObjectURL(url);
```

### 2.2 从后端调用接口返回 Blob 数据

**需要加上请求字段 `responseType: 'blob'`**

```js
// 例 :
methods:{
  processNum () {
    axios.request({
      url: '/api/lawss/activiti/getImg?_t=' + new Date().getTime(),
      responseType: 'blob', //设置返回数据的类型
      method: 'get',
      params: {
        prcNum: this.$route.query.prcNum
      }
    }).then(res => {
      this.processStep = window.URL.createObjectURL(res.data)
      console.log(res.data)
      console.log(this.processStep)
    })
  },
},
mounted () {
  this.processNum()
  this.processTable()
}
```

**返回的数据 res.data**

<img :src="$withBase('/javascript/Blob_1.png')">

**生成的 url => this.processStep**

`blob:http://10.0.3.35:9090/28f1fb06-c413-4d55-8f6e-045c84c02e96`

```html
<!-- 在标签中可直接使用该url -->
<img :src="processStep" class="process-img" />
```

**responseType 取值范围**

| 值          | 数据类型                                          |
| ----------- | ------------------------------------------------- |
| ""          | DOMString (这个是默认类型)                        |
| arraybuffer | ArrayBuffer 对象                                  |
| blob        | Blob 对象                                         |
| document    | Document 对象                                     |
| json        | JS 对象 ， 解析得到的从服务器返回来的 JSON 字符串 |
| text        | DOMString                                         |

```
http://t.zoukankan.com/lidelin-p-9831920.html
```

[参考文章 1](https://zhuanlan.zhihu.com/p/500199997)
[参考文章 2](http://www.cppcns.com/wangluo/javascript/465251.html)
[参考文章 3](https://blog.csdn.net/qq_43654065/article/details/120306927)
