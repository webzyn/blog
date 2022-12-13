# 自定义指令 v-has

登录接口拿到按钮权限列表，存入本地缓存 LOGIN_USER_BUTTON_AUTH 中

**数据格式如下**

```JS
[
  {
    "id": "0062e261bc65e27e0a968dac67e16a3c",
    "sorDivide": null,
    "menuName": "标准拆分",
    "parentId": "afsd12",
    "parentIds": null,
    "displaySeq": 2,
    "href": "/standAutoSplit",
    "validFlag": 0,
    "creationTime": null,
    "modifyTime": null,
    "remarks": null,
    "children": null,
    "level": 2,
    "roleIds": null,
    "childMenuIds": null
  },
]

```

**自定义 v-has 指令的配置**

**在 utils 文件夹下，新建 hasPermission.js 文件，在 main.js 中注册**

```js
/**
 * 全局权限控制
 */
export const filterGlobalPermission = (el, binding, vnode) => {
  let permissionList = [];
  //在storage中获取权限数据 赋值给authList
  let authList = JSON.parse(
    localStorage.getItem("LOGIN_USER_BUTTON_AUTH") || "[]"
  );
  for (let auth of authList) {
    // 遍历authList并添加到新数组中
    permissionList.push(auth);
  }
  if (!permissionList.length) {
    // 当数组长度为0时 表示没有任何按钮权限 将按钮删除
    el.parentNode.removeChild(el);
    return;
  }
  let permissions = [];
  for (let item of permissionList) {
    // 遍历拥有的所有权限数组 将所有id传入新数组
    permissions.push(item.id);
  }
  if (!permissions.includes(binding.value)) {
    // 当v-has绑定的value值在数组id数组中不存在 也表示没有权限 删除按钮
    el.parentNode.removeChild(el);
  }
};
const hasPermission = {
  install(Vue, options) {
    // 这里的has就是指令名 v-has
    Vue.directive("has", {
      inserted: (el, binding, vnode) => {
        filterGlobalPermission(el, binding, vnode);
      },
    });
  },
};
export default hasPermission;
```

**main.js 中注册**

```js
import hasPermission from "@/utils/hasPermission";
Vue.use(hasPermission);
```

**在组件中使用**

```vue
<template>
  <div id="permission-demo">
    <el-button type="primary" @click="addPermission"> 添加按钮权限 </el-button>
    <el-button type="primary" @click="removePermission">
      删除按钮权限
    </el-button>
    <el-button v-has="'0062e261bc65e27e0a968dac67e16a3c'" type="primary">
      带权限控制的按钮
    </el-button>
  </div>
</template>

<script>
export default {
  name: "permissionDemo",
  data() {
    return {
      btnPermission: [
        {
          id: "0062e261bc65e27e0a968dac67e16a3c",
          sorDivide: null,
          menuName: "标准拆分",
          parentId: "afsd12",
          parentIds: null,
          displaySeq: 2,
          href: "/standAutoSplit",
          validFlag: 0,
          creationTime: null,
          modifyTime: null,
          remarks: null,
          children: null,
          level: 2,
          roleIds: null,
          childMenuIds: null,
        },
      ],
    };
  },
  methods: {
    addPermission() {
      // 权限一般在登录时存入缓存
      localStorage.setItem(
        "LOGIN_USER_BUTTON_AUTH",
        JSON.stringify(this.btnPermission)
      );
    },
    removePermission() {
      localStorage.setItem("LOGIN_USER_BUTTON_AUTH", JSON.stringify([]));
    },
  },
};
</script>

<style></style>
```

**效果如下**

首次进入没有权限

![](/vue/directive/has_1.png)

添加权限后

![](/vue/directive/has_2.png)

# Vue.prototype.$has

**在 utils 文件夹下，新建 has_prototype.js 文件，在 main.js 挂载在 Vue 原型**

```js
const has = (permissionId) => {
  let authList = JSON.parse(
    localStorage.getItem("LOGIN_USER_BUTTON_AUTH") || "[]"
  );
  // some方法:当数组中有一个值满足条件返回true 否则返回false
  let flag = authList.some((item) => item.id === permissionId);
  // let flag = false;
  // authList.forEach((item) => {
  //   if (item.id === permissionId) {
  //     flag = true;
  //   }
  // });
  return flag;
};
export default has;
```

**在 main.js 中挂载**

```js
import has from "@/utils/has_prototype";
Vue.prototype.$has = has;
```

**在组件中使用 效果与 v-has 一样**

```vue
<template>
  <div id="permission-demo">
    <el-button type="primary" @click="addPermission"> 添加按钮权限 </el-button>
    <el-button type="primary" @click="removePermission">
      删除按钮权限
    </el-button>
    <!-- 此处不同 -->
    <el-button v-if="$has('0062e261bc65e27e0a968dac67e16a3c')" type="primary">
      带权限控制的按钮
    </el-button>
  </div>
</template>

<script>
export default {
  name: "permissionDemo",
  data() {
    return {
      btnPermission: [
        {
          id: "0062e261bc65e27e0a968dac67e16a3c",
          sorDivide: null,
          menuName: "标准拆分",
          parentId: "afsd12",
          parentIds: null,
          displaySeq: 2,
          href: "/standAutoSplit",
          validFlag: 0,
          creationTime: null,
          modifyTime: null,
          remarks: null,
          children: null,
          level: 2,
          roleIds: null,
          childMenuIds: null,
        },
      ],
    };
  },
  methods: {
    addPermission() {
      localStorage.setItem(
        "LOGIN_USER_BUTTON_AUTH",
        JSON.stringify(this.btnPermission)
      );
    },
    removePermission() {
      localStorage.setItem("LOGIN_USER_BUTTON_AUTH", JSON.stringify([]));
    },
  },
};
</script>

<style scoped></style>
```

[参考文章](https://juejin.cn/post/6950482024368963597)

[自定义指令源码详解](https://www.cnblogs.com/greatdesert/p/11171785.html)
