# axios 封装

## 思路

- 优化配置，设置默认配置项（responseType、跨域携带- cookie、token、超时设置）
- 统一设置请求头
- 根据环境设置 baseURL
- 通过 Axios 方法直接发起请求
- 添加请求拦截器
- 添加响应拦截器
- 导出 Promise 对象
- 封装 Post 方法，精简 post 请求方式
- 封装 Get 方法，精简 get 请求方式
- 请求成功，配置业务状态码
- 全局的 loading 配置

## 代码

```js
// axios.js文件
import axios from "axios" // 导入axios
import router from "@/router" // 导入路由
import { notification, message } from "ant-design-vue" // 导入组件库

// 开发环境配置
const devIp = "localhost"
const devInterfacePORT = "10086"
const devUrl = "http://" + devIp + ":" + devInterfacePORT + "/api/"
// 生产环境配置
const prodIp = "10.10.10.46"
const prodInterfacePORT = "4202"
const prodUrl = "http://" + prodIp + ":" + prodInterfacePORT + "/api/"

// 创建axios实例
const service = axios.create({
  // 根据定义的环境状态，切换不同的 baseURL 开发环境使用代理, 生产环境可以直接使用域名全拼
  baseURL: process.env.NODE_ENV === "production" ? prodUrl : "",
})

// 自定义实例默认值
service.defaults.timeout = 60000
service.defaults.headers["Content-type"] = "application/json"

// 设置请求拦截
service.interceptors.request.use(
  (config) => {
    // token一般存放在vuex中，这里直接使用本地存储模拟
    const token =
      localStorage.getItem("userinfo") && localStorage.getItem("userinfo").token
    if (token) {
      config.headers.token = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error.response)
  }
)

// 设置响应拦截
service.interceptors.response.use(
  (response) => {
    if (response.data.code !== 200) {
      // 错误处理
      message.error(response.data.message)
      return Promise.reject(response)
    } else {
      if (response.config.url === "/user/account_login") {
        // 存放token
        localStorage.setItem("userinfo", response.data.data)
        message.success("登录成功")
      }
      // 将真实数据从 axios返回的数据中剥离出来
      return response.data.data
    }
  },
  (error) => {
    // 错误处理
    if (error.response.status === 401) {
      notification.warning({
        message: "警告",
        description: "没有权限,请重新登录",
      })
      router.replace("/login")
    }
    if (error.code === "ERR_NETWORK") {
      message.warning("网络发生错误！")
    }
    return Promise.reject(error.response)
  }
)

export default service
```

- 两种管理接口方法

  - 第一种：封装 get、post 方法，接口路径放在页面

  ```js
  // 还是在 axios.js 文件

  // 代码略 ...
  // 响应拦截器
  axios.interceptors.response.use(function (response) {
    /*...*/
  })
  function post(url, data, config = {}) {
    return new Promise((resolve, reject) => {
      let _this = config._this || false // vue实例
      let _loading = config._loading || false // loading,需要传字符串
      let _showTips = config._showTips === undefined ? true : config._showTips // 默认有提示
      if (_this) {
        // 开启loading
        _this[_loading] = true
      }
      service
        .post(url + "?" + new Date().getTime(), data)
        .then((res) => {
          if (_this && _loading) {
            // 关闭loading
            _this._loading = false
          }
          if (res.data.ok !== undefined && _showTips) {
            let type = res.data.ok ? "success" : "warning"
            if (_this && res.data.message !== "" && res.data.message !== null) {
              message[type](res.data.message)
            }
          }
          resolve(res)
        })
        .catch((e) => {
          if (_this && _loading) {
            _this[_loading] = false
          }
          reject(e)
        })
    })
  }

  function get(url, params, config = {}) {
    return new Promise((resolve, reject) => {
      let _this = config._this || false
      let loading = config._loading || false
      if (_this) {
        _this[_loading] = true
      }

      service
        .get(url + "?_t=" + new Date().getTime(), {
          params,
        })
        .then((res) => {
          if (_this && _loading) {
            _this[_loading] = false
          }
          if (res.data.ok !== undefined && _showTips) {
            let type = res.data.ok ? "success" : "warning"
            if (_this && res.data.message !== "" && res.data.message !== null) {
              message[type](res.data.message)
            }
          }
          resolve(res)
        })
        .catch((e) => {
          if (_this && _loading) {
            _this[_loading] = false
          }
          reject(e)
        })
    })
  }

  let formData = (data) => {
    let _formData = new FormData()
    for (let i in data) {
      _formData.append(i, data[i])
    }
    return _formData
  }

  // 传参formData格式
  function postData(url, data, config = {}) {
    return new Promise((resolve, reject) => {
      var _formData = formData(data)

      let _this = config._this || false // vue实例
      let _loading = config._loading || false // loading,需要传字符串
      let _showTips = config._showTips === undefined ? true : config._showTips // 默认有提示
      if (_this) {
        // 开启loading
        _this[_loading] = true
      }
      service
        .post(url + "?" + new Date().getTime(), _formData)
        .then((res) => {
          if (_this && _loading) {
            // 关闭loading
            _this._loading = false
          }
          if (res.data.ok !== undefined && _showTips) {
            let type = res.data.ok ? "success" : "warning"
            if (_this && res.data.message !== "" && res.data.message !== null) {
              message[type](res.data.message)
            }
          }
          resolve(res)
        })
        .catch((e) => {
          if (_this && _loading) {
            _this[_loading] = false
          }
          reject(e)
        })
    })
  }

  export default { service }
  ```

  - 第二种: 创建 api.js 文件，统一管理接口

  ```js
  // api.js文件 (统一管理接口)

  // 引入自定义axios实例
  import { service } from "@/api/axios"

  // 使用时只需要引入该方法
  export const login = (data) => service.post("/user/account_login", data)
  ```
