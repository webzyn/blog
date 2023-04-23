# component 动态组件

<img :src="$withBase('/vue/builtIn/1.png')">
<img :src="$withBase('/vue/builtIn/2.png')">

- 父组件

```vue
<template>
  <div class="main">
    <!-- 模拟tab页 -->
    <div class="top">
      <el-button
        v-for="item in tabs"
        :key="item.name"
        :type="item.name === active ? 'primary' : 'info'"
        @click="activeChange(item)"
        >{{ item.title }}</el-button
      >
    </div>
    <!-- 动态渲染组件 -->
    <div class="content">
      <component :is="active"></component>
    </div>
  </div>
</template>

<script>
import backlog from "./components/backlog.vue"
import news from "./components/news.vue"
import replied from "./components/replied.vue"
export default {
  name: "comp",
  components: {
    backlog,
    news,
    replied,
  },
  data() {
    return {
      active: "news",
    }
  },
  computed: {
    tabs() {
      let list = [
        {
          title: "待办",
          name: "backlog", // name必须是已注册组件名，以便切换组件
          permission: "b53e6722b33a37c0fa2d87a9b06cca40",
        },
        {
          title: "已办",
          name: "replied",
        },
        {
          title: "新建",
          name: "news",
        },
      ]
      return list // 可以依据permission做个权限判断
    },
  },
  methods: {
    activeChange(item) {
      // 切换动态组件
      this.active = item.name
    },
  },
}
</script>

<style scoped>
.main {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
</style>
```

- 子组件 1

```vue
<template>
  <div class="main">待办</div>
</template>

<script>
export default {
  name: "backlog",
  data() {
    return {}
  },
}
</script>

<style scoped>
.main {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
</style>
```

- 子组件 2

```vue
<template>
  <div class="main">已办</div>
</template>

<script>
export default {
  name: "replied",
  data() {
    return {}
  },
}
</script>

<style scoped>
.main {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
</style>
```

- 子组件 3

```vue
<template>
  <div class="main">
    <h2>新建</h2>
    <div class="list">
      <ul>
        <li v-for="(item, index) in list" :key="item">
          {{ index }} : {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
let list = ["a", "b", "c"]
export default {
  name: "news",
  data() {
    return {
      list: [],
    }
  },
  mounted() {
    // 每次切换都会走生命周期
    setTimeout(() => {
      this.list = list
    }, 1500)
  },
}
</script>

<style scoped>
.main {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
</style>
```
