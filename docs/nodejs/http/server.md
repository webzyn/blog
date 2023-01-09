# http 模块

`http 模块`是 Node.,js 官方提供的、用来`创建 web 服务器`的模块。通过 http 模块提供的 `http.createServer()`方法，就能方便的把一台普通的电脑，变成一台 Web 服务器，从而对外提供 Web 资源服务。

```js
const http = require("http");
```

服务器和普通电脑的`区别`在于，服务器上`安装了web服务器软件`，例如:lIS、Apache 等。通过安装这些服务器软件，就能把一台普通的电脑变成一台 web 服务器。

在 Node.js 中，我们`不需要使用`IIS、Apache 等这些`第三方web服务器软件`。因为我们可以基于 Nodejs 提供的 http 模块，`通过几行简单的代码，就能轻松的手写一个服务器软件`，从而对外提供 web 服务。

### 服务器相关概念

![](/nodejs/http/http_1.png)

![](/nodejs/http/http_2.png)

![](/nodejs/http/http_3.png)
