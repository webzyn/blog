# querystring 模块

**解析请求体数据**

Node,js 内置了一个**querystring**模块，**专门用来处理查询字符串**。通过这个模块提供的**parse()**函数，可以轻松把查询字符串，解析成对象的格式。示例代码如下:

```js
// 导入 querystring 模块
const qs = require("querystring");

const str = "name=男&age=22&gender=22";

// 调用 qs.parse() 方法, 把查询字符串解析为对象
const body = qs.parse(str);

console.log(body); //{ name: '男', age: '22', gender: '22' }
```

![](/nodejs/express/port_1.png)
