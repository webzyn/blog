# 文件导出

- 通过前端重定向，使用浏览器自身导出功能。\
  直接使用后台的链接。通过 `window.localton.href` 或者 `window.open` 实现文件的导出。这种方式`只支持 get 请求`
  - window.localton.href 本页面下载
  ```js
  window.location.href =
    "/api/att/attFile/downloadFile?fileId=ATT_FILE_10_ltg1hc2fep6c3fsxuzjy"
  ```
  - window.open 打开新页面下载
  ```js
  window.open(
    "/api/att/attFile/downloadFile?fileId=ATT_FILE_10_ltg1hc2fep6c3fsxuzjy"
  )
  ```
- 后台将导出的文件以文件流的方式返回给前端，前端通过 blob 去解析，再动态创建 a 标签。

```js
this.$http._downloadFile('/api/att/attFile/downloadFile',{fileId:'ATT_FILE_10_ltg1hc2fep6c3fsxuzjy'},'get','1').then(res=>{
  console.log(res)
})

// 封装在 axios.js 文件 中
_downloadFile (url, params, method = 'get', fileName = '导出文件') {
  _axios({
    method,
    url,
    data: method !== 'get' ? params : {},
    params: method === 'get' ? params : {},
    responseType: 'blob'
  }).then(
    res => {
      const data = res.data
      // 兼容ie
      if (window.navigator.msSaveOrOpenBlob) {
        try {
          const blobObject = new Blob([data])
          window.navigator.msSaveOrOpenBlob(blobObject, fileName)
        } catch (e) {
          console.log(e)
        }
        return
      }
      // a标签实现下载
      // type为导出文件格式 例application/vnd.openxmlformats-officedocument.spreadsheetml.sheet 导出为xlsx格式
      let url = window.URL.createObjectURL(new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }))
      let a = document.createElement('a')
      a.style.display = 'none'
      a.href = url
      a.setAttribute('download', fileName)
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a);
      URL.revokeObjectURL(url); // 释放对象URL
  })
}
```
