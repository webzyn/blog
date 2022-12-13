# Vue.use 和 Vue.prototype.$xx 区别

### Vue.use

官方对 Vue.use() 方法的说明：通过全局方法 Vue.use() 使用插件，[Vue.use 会自动阻止多次注册相同插件]()，它需要在你调用 new Vue() 启动应用之前完成，**Vue.use() 方法至少传入一个参数，该参数类型必须是 Object 或 Function**，如果是 Object 那么这个 Object 需要定义一个 install 方法，如果是 Function 那么这个函数就被当做 install 方法。[在 Vue.use() 执行时 install 会默认执行]()，当 install 执行时第一个参数就是 Vue，其他参数是 Vue.use() 执行时传入的其他参数。就是说[使用它之后调用的是该组件的 install 方法]()。

[第一种: 参数类型为 Object]()

```js
// utils => hasPermission.js
const filterGlobalPermission = (el, binding) => {
  // 逻辑...
};
const install = function (Vue) {
  Vue.directive("has", {
    inserted: (el, binding, vnode) => {
      filterGlobalPermission(el, binding, vnode);
    },
  });
};
export default {
  install, // 对象中必须有一个install方法
};
```

[第二种:参数类型为 Function]()

```js
// utils => hasPermission.js
const filterGlobalPermission = (el, binding) => {
  // 逻辑...
};
const install = function (Vue) {
  Vue.directive("has", {
    inserted: (el, binding, vnode) => {
      filterGlobalPermission(el, binding, vnode);
    },
  });
};
export default install; //此处函数名可以是自定义 因为Vue.use的参数是函数时，函数会被当做install方法
```

---

```js
// main.js
import Vue from "vue";
import App from "./App.vue";

import hasPermission from "@/utils/hasPermission";
Vue.use(hasPermission);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
```

### Vue.prototype.$xx

在 Vue 原型对象中添加一个属性或方法

```js
// utils => has_prototype.js
const has = (permissionId) => {
  let authList = JSON.parse(
    localStorage.getItem("LOGIN_USER_BUTTON_AUTH") || "[]"
  );
  let flag = authList.some((item) => item.id === permissionId);
  return flag;
};
export default has;
```

```js
// main.js
import has from "@/utils/has_prototype";
Vue.prototype.$has = has;
//在全局注册这个方法，然后在之后的文件中都可以通过$axios直接来使用axios
Vue.prototype.$axis = axis;
```

[参考链接](https://juejin.cn/post/6844903876458446856)
[参考链接](https://juejin.cn/post/7138216381283205128)
