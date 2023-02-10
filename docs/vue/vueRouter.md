# vue-router

## 1、路由组件标签

- `<router-link></router-link>` : 该标签是已经内置全局的组件, 它会被渲染成一个`<a>`标签
  - [属性配置](https://v3.router.vuejs.org/zh/api/#to)
- `<router-view></router-view>` : 该标签会根据当前的路径, 动态渲染出相对应的组件

## 2、动态路由匹配

我们经常需要把某种模式匹配到的所有路由，全都映射到同个组件。例如，我们有一个 User 组件，对于所有 ID 各不相同的用户，都要使用这个组件来渲染。那么，我们可以在 vue-router 的路由路径中使用“动态路径参数”(dynamic segment) 来达到这个效果：

```js
const routes = [
  {
    path: "/user/:id", // 动态路径参数 以冒号开头
    name: "user",
    component: (resolve) => require(["@/components/user.vue"], resolve),
  },
  {
    path: "/foo/:id/post/:post_id", // 设置多个动态路径
    name: "foo",
    component: () => import("@/components/foo.vue"),
  },
];
```

**跳转方式**

- `<router-link></router-link>标签跳转`

```html
<!-- 路由跳转到http://localhost:8080/#/user/a -->
<router-link to="/user/a">to User</router-link>

<!-- 跳转到http://localhost:8080/#/foo/a/post/b -->
<router-link to="/foo/a/post/b">to foo</router-link>
```

- `$router.push()`跳转

```js
methods:{
  toUser() {
    // 跳转到http://localhost:8080/#/user/c
    this.$router.push({
      name: "user",
      params: {
        id: "c",
      },
    });
  },
  toFoo() {
    // 跳转到 http://localhost:8080/#/foo/a/post/b
      this.$router.push({
        name: "foo",
        params: {
          id: "a",
          post_id: "b",
          zzz_id: "c",
        },
      });
    },
}
```

一个“路径参数”使用冒号 : 标记。匹配到路由时，参数会被设置到`this.$route.params`
![](/vue/vueRouter/router_1.png)
![](/vue/vueRouter/router_2.png)

### 路由参数变化后 响应

当使用路由参数时，例如从 `/user/a` 导航到 `/user/b`，**原来的组件实例会被复用。**\
组件复用后导致**组件的生命周期钩子不会再被调用**

**解决方法**

- **watch (监测变化) $route 对象**

```vue
<script>
export default {
  watch: {
    $route(to, from) {
      // 对路由变化作出响应...
    },
  },
};
</script>
```

- **beforeRouteUpdate 导航守卫**

```vue
<script>
export default {
  // 参数to 和 from 与watch参数一致
  beforeRouteUpdate(to, from, next) {
    // 对路由变化作出响应...
    next();
  },
};
</script>
```

## 3、编程式导航

### 3.1 router.push

当点击 `<router-link>` 时，`router.push(...)`方法会在内部调用，所以说，点击 `<router-link :to="...">` 等同于调用 `router.push(...)`

```js
// 字符串
router.push("home");

// 对象
router.push({ path: "home" });

// 命名的路由
router.push({ name: "user", params: { userId: "123" } });

// 带查询参数，变成 /register?plan=private
router.push({ path: "register", query: { plan: "private" } });

// 错误传参方式
// params 会被忽略 在register页面params为{}
router.push({ path: "register", params: { plan: "private" } });
```

### 3.2 router.replace

跟 `router.push` 很像，唯一的不同就是，它不会向 history 添加新记录，而是跟它的方法名一样 —— 替换掉当前的 history 记录\
`router.replace(...)`相当于`<router-link :to="..." replace>`

### 3.3 router.go

在 history 记录中向前或者后退多少步，类似 `window.history.go(n)`

```js
// 在浏览器记录中前进一步，等同于 history.forward()
router.go(1);

// 后退一步记录，等同于 history.back()
router.go(-1);

// 前进 3 步记录
router.go(3);
```

## 4、重定向和别名

### 4.1 重定向

```js
const router = new VueRouter({
  routes: [
    { path: "/a", redirect: "/b" },
    { path: "/aa", redirect: { name: "foo" } },
    // 动态返回重定向目标
    {
      path: "/a",
      redirect: (to) => {
        // 方法接收 目标路由 作为参数
        // return 重定向的 字符串路径/路径对象
      },
    },
  ],
});
```

### 别名

```js
const router = new VueRouter({
  routes: [{ path: "/a", component: A, alias: "/b" }],
});
```

## 5、路由组件传参

- 1.props 值为对象

```js
// 路由
{
  name: "zzz",
  path: "detail",
  component: Detail,
  // props对象中所有的key-value的组合最终都会通过props传给Detail组件
  props: {
    id: "888",
    title: "你好啊",
  },
}
```

```vue
<template>
  <div>
    <ul>
      <li>接收的id为{{ id }}</li>
      <li>接收的title为{{ title }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Detail",
  // 接收组件传递来的数据
  props: ["id", "title"],
};
</script>
```

- 2. props 值为布尔值 true

```js
// 路由
{
  path: "/register",
  name: "register",
  component: (resolve) =>
    require(["@/components/router-demo/register"], resolve),
    // 第二种写法：props值为布尔值，布尔值为true，则把路由收到的所有params参数通过props传给Detail组件
  props: true,
}
```

```js
// 传递params参数
toRegister() {
  this.$router.push({
    name: "register",
    params: {
      msg: "123",
    },
  });
},
```

```vue
<template>
  <div>register:{{ msg }}</div>
</template>

<script>
export default {
  name: "register-a",
  // 组件内部使用props接收参数
  props: ["msg"],
};
</script>
```

- 3. props 值为函数

```js
{
  name: 'zzz',
  path:'detail',
  component: Detail,
  // 第三种写法：props值为函数，该函数返回的对象中每一组key-value都会通过props传给Detail组件
  // props函数会自动调用并提供一个$route参数 可以通过$route来获取想要的数据传递给组件
  props($route) {
    return {
      id: $route.params.id,
      title: $route.params.title,
      // 还可以返回一些别的数据
      a: 1,
      b: "hello"
    }
  }
}
```

```vue
<template>
  <div>
    <ul>
      <li>接收的id为{{ id }}</li>
      <li>接收的title为{{ title }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Detail",
  // 接收组件传递的参数
  props: ["id", "title", "a", "b"],
};
</script>
```

## 6、导航守卫

路由守卫分为三种：全局路由守卫、独享路由守卫以及组件内路由守卫

- 全局路由守卫

  - beforeEach 全局前置守卫
  - beforeResolve 全局解析守卫
  - afterEach 全局后置钩子

- 路由独享守卫

  - beforeEnter

- 组件内路由守卫
  - beforeRouteEnter
  - beforeRouteUpdate
  - beforeRouteLeave

### 6.1 全局守卫

#### 6.1.1 beforeEach 全局前置守卫

- `to`: Route: 即将要进入的目标
- `from`: Route: 当前导航正要离开的路由
- `next`: Function: 钩子函数，里面定义参数，确认下一步路由要做什么
  - next(): 进行管道中的下一个钩子
  - next(false): 中断当前的导航
  - next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址
  - next(error): (2.4.0+) 如果传入 next 的参数是一个 Error 实例，则导航会被终止且该错误会被传递给 `router.onError()` 注册过的回调。

```js
const router = new VueRouter({ ... })

router.beforeEach((to, from, next) => {
  // ...
  next()
})
```

#### 6.1.2 beforeResolve 全局解析守卫

在导航被确认之前，同时**在所有组件内守卫和异步路由组件被解析之后**，解析守卫就被调用

```js
router.beforeResolve((to, from, next) => {
  // ...
  next();
});
```

#### 6.1.3 afterEach 全局后置钩子

路由导航的最后一步,所以`不需要next()`

```js
router.afterEach((to, from) => {
  // ...
});
```

### 6.2 路由独享守卫

```js
const router = new VueRouter({
  routes: [
    {
      path: "/foo",
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      },
    },
  ],
});
```

### 6.3 组件内守卫

- beforeRouteEnter 进入组件前被调用
- beforeRouteUpdate 组件被复用时调用
- beforeRouteLeave 离开组件前被调用

```vue
<script>
export default {
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  },
};
</script>
```

**`在beforeRouteEnter`不能访问`this`**，可以通过传一个回调给 `next` 来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数

```js
beforeRouteEnter (to, from, next) {
  next(vm => {
    // 通过 `vm` 访问组件实例
  })
}
```

`beforeRouteUpdate`和`beforeRouteLeave`可以正常访问`this`

_**注意**: beforeRouteEnter 是支持给 next 传递回调的唯一守卫_

### 执行顺序

首次进入：beforeEach -> beforeEnter -> beforeRouteEnter -> beforeResolve -> afterEach

组件复用跳转: beforeEach -> beforeRouteUpdate -> beforeResolve -> afterEach

不同路由跳转: beforeRouteLeave -> beforeEach -> beforeEnter -> beforeRouteEnter -> beforeResolve -> afterEach

## 7、路由元信息

[路由元信息](https://v3.router.vuejs.org/zh/guide/advanced/meta.html)

## 8、过渡动效

[前往官网](https://v3.router.vuejs.org/zh/guide/advanced/transitions.html#%E8%BF%87%E6%B8%A1%E5%8A%A8%E6%95%88)

## 9、数据获取

[数据获取](https://v3.router.vuejs.org/zh/guide/advanced/data-fetching.html#%E5%AF%BC%E8%88%AA%E5%AE%8C%E6%88%90%E5%90%8E%E8%8E%B7%E5%8F%96%E6%95%B0%E6%8D%AE)

## 10、滚动行为

[滚动行为](https://v3.router.vuejs.org/zh/guide/advanced/scroll-behavior.html#%E6%BB%9A%E5%8A%A8%E8%A1%8C%E4%B8%BA)

## 11、路由懒加载

[路由懒加载](https://v3.router.vuejs.org/zh/guide/advanced/lazy-loading.html#%E8%B7%AF%E7%94%B1%E6%87%92%E5%8A%A0%E8%BD%BD)

## 12、导航故障

[导航故障](https://v3.router.vuejs.org/zh/guide/advanced/navigation-failures.html#%E5%AF%BC%E8%88%AA%E6%95%85%E9%9A%9C)
