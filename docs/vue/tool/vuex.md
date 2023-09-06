# Vuex

## 1、安装与使用

```shell
yarn add vuex@3.4.0 || npm i vuex@3.4.0
```

在 src 路径下创建 store 文件夹，然后创建 index.js 文件

```js
import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {},
  getters: {},
  actions: {},
  mutations: {},
})

export default store
```

修改 main.js

```js
import Vue from "vue"
import App from "./App.vue"
import store from "./store" // 引入我们前面导出的store对象

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app")
```

## 2、State 公共数据源

**State 提供唯一的公共数据源，所有共享的数据都要统一放到 Store 的 State 中进行存储。**

```js
const store = new Vuex.Store({
  // 定义公共数据
  state: {
    count: 0,
  },
})
```

**访问 state 中的数据**

- ① **this.$store.state.全局数据名称**

```vue
<script>
export default {
  computed: {
    getCount() {
      return this.$store.state.count
    },
  },
  mounted() {
    console.log(this.getCount)
  },
}
</script>
```

- ② **mapState**

通过导入 mapState 函数,将需要使用的全局数据,映射为当前组件的 computed 计算属性

```vue
<script>
import { mapState } from "vuex" // 从vuex中导入mapState
export default {
  computed: {
    // 经过解构后，自动就添加到了计算属性中，此时就可以直接像访问计算属性一样访问它
    ...mapState(["count"]),
  },
  mounted() {
    console.log(this.count)
  },
}
</script>
```

赋值别名

```js
...mapState({ aliasName: "count" }), // 赋别名的话，这里接收对象，而不是数组
```

## 3、Getter

**Getter 用于对 Store 中的数据进行加工处理形成新的数据。**\
① Getter 可以对 Store 中已有的数据加工处理之后形成新的数据，类似 Vue 的计算属性。\
② Store 中数据发生变化，Getter 的数据也会跟着变化。

```js
// 定义Getter
const store = new Vuex.Store({
  state: {
    count: 0,
  },
  getters: {
    showNumber(state) {
      return "当前数量为" + state.count
    },
  },
})
```

**使用 getters**

- ① **this.$store.getters.名称**

```vue
<script>
export default {
  mounted() {
    // 使用getters
    console.log(this.$store.getters.showNumber)
  },
}
</script>
```

- ② **mapGetters**

```vue
<script>
import { mapGetters } from "vuex" // 从vuex中导入mapState
export default {
  computed: {
    ...mapState(["showNumber"]),
  },
  mounted() {
    console.log(this.showNumber)
  },
}
</script>
```

## 4、Mutation(同步修改状态)

**Mutation 用于变更 Store 中的数据。**\
① 只能通过 mutation 变更 Store 数据，不可以直接操作 Store 中的数据。\
② 通过这种方式虽然操作起来稍微繁琐一些，但是可以集中监控所有数据的变化。

```js
const store = new Vuex.Store({
  state: {
    count: 0,
  },
  mutations: {
    add(state) {
      state.count++
    },
    sub(state, payload) {
      state.count -= payload.step
    },
  },
})
```

**触发 mutations**

- ① **this.$store.commit('名称',参数)**
  - **mutations 函数只接受两个参数**
    - 第一个参数就是 state 状态
    - 第二个参数是在通过 commit 触发 mutations 函数时传递的载荷(Payload,其实就是自定义传参)

```vue
<script>
export default {
  methods: {
    handler1() {
      // 触发mutations
      this.$store.commit("add")
    },
    handler2() {
      // 可携带参数
      this.$store.commit("sub", { step: 5 })
    },
  },
}
</script>
```

- **mapMutations**

  通过 mapMutations 函数，将需要的 mutations 函数，映射为当前组件的 methods 方法

```vue
<script>
import { mapMutations } from "vuex"
export default {
  methods: {
    ...mapMutations(["add", "sub"]),
    handler1() {
      this.add()
      // this.$store.commit("add");
    },
    handler2() {
      this.sub({ step: 5 })
      // this.$store.commit("sub", { step: 5 });
    },
  },
}
</script>
```

## 5、Action(异步修改状态)

Action 用于处理异步任务。

如果通过异步操作变更数据，必须通过 Action，而不能使用 Mutation，但是**在 Action 中还是要通过触发 Mutation 的方式间接变更数据**。

```js
const store = new Vuex.Store({
  state: {
    count: 0,
  },
  mutations: {
    add(state) {
      state.count++
    },
    sub(state, payload) {
      state.count = state.count - payload.step
    },
  },
  // 定义Action
  actions: {
    // context 在一定程度上等同于store
    addAsync(context) {
      setTimeout(() => {
        context.commit("add")
      }, 1000)
    },
    subAsync(context, payload) {
      setTimeout(() => {
        context.commit("sub", payload)
      }, 1000)
    },
  },
})
```

**触发 actions**

在 actions 中 ，不能直接修改 state 中的数据；\
必须通过 context.commit() 触发某个 mutation 才行

- **this.$store.dispatch('名称',参数)**

```vue
<script>
export default {
  methods: {
    handler3() {
      this.$store.dispatch("addAsync")
    },
    handler4() {
      this.$store.dispatch("subAsync", { step: 5 })
    },
  },
}
</script>
```

- **mapActions**

通过导入的 mapActions 函数，将需要的 actions 函数，映射为当前组件的 methods 方法:

```vue
<script>
import { mapActions } from "vuex"
export default {
  methods: {
    ...mapActions(["addAsync", "subAsync"]),
    handler3() {
      this.addAsync()
      // this.$store.dispatch("addAsync");
    },
    handler4() {
      this.subAsync({ step: 5 })
      // this.$store.dispatch("subAsync", { step: 5 });
    },
  },
}
</script>
```

## 6、按属性进行拆分

新建四个文件，分别是 state.js、getters.js、mutations.js、actions.js\
<img :src="$withBase('/vue/vuex_1.png')">

```js
// index.js
import Vue from "vue"
import Vuex from "vuex"
import state from "./state"
import getters from "./getters"
import mutations from "./mutations"
import actions from "./actions"

Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
})

export default store
```

```js
// state.js
export default {
  count: 0,
}
```

```js
// getters.js
export default {
  showNumber(state) {
    return "当前数量为" + state.count
  },
}
```

```js
// mutations.js
export default {
  add(state) {
    state.count++
  },
  sub(state, payload) {
    state.count = state.count - payload.step
  },
}
```

```js
// actions.js
export default {
  addAsync(context) {
    setTimeout(() => {
      context.commit("add")
    }, 1000)
  },
  subAsync(context, payload) {
    setTimeout(() => {
      context.commit("sub", payload)
    }, 1000)
  },
}
```

## 7、按模块进行拆分

- src/store/`index.js`

```js
import Vue from "vue"
import Vuex from "vuex"

import app from "./modules/app"
import user from "./modules/user"
import getters from "./getters"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user,
  },
  state: {},
  mutations: {},
  actions: {},
  getters,
})
```

- src/store/`mutation-types`

```js
// 存放常量
export const TITLE = "TITLE"
```

- src/store/`modules/app.js`

```js
import Vue from "vue"
import { TITLE } from "@/store/mutation-types"
import { getAction } from "@/api/manage"

const app = {
  // namespaced: true, 使其成为带命名空间的模块。保证在变量名一样的时候，添加一个父级名拼接
  // 数据源
  state: {
    title: "",
  },
  getters: {
    test: () => "test",
  },
  // 同步
  mutations: {
    SET_TITLE(state, title) {
      // 存放到本地
      Vue.ls.set(TITLE, title)
      state.title = title
    },
  },
  // 异步
  actions: {
    setTitle({ commit }, payload) {
      const defaultTitle = "CBTA教学资源平台"
      return new Promise((resolve, reject) => {
        getAction("/setting/settings/backendTitle")
          .then((res) => {
            if (res.success) {
              const title = res.message
              commit("SET_TITLE", title)
              resolve(res)
            } else {
              commit("SET_TITLE", defaultTitle)
              reject(res)
            }
          })
          .catch((e) => {
            commit("SET_TITLE", defaultTitle)
            reject(e)
          })
      })
    },
  },
}

export default app
```

- src/store/`getters.js`

```js
import Vue from "vue"
import { TITLE } from "@/store/mutation-types"

const getters = {
  title: (state) => {
    // 从本地取出状态保存到state中
    state.app.title = Vue.ls.get(TITLE)
    return state.app.title
  },
}

export default getters
```

- 使用 state

```vue
<script>
// 不开启命名空间
export default {
  computed: {
    ...mapState({
      title: (state) => state.app.title,
    }),
  },
  mounted() {
    // 法2
    console.log(this.$store.state.app.title)
  },
}

// 开启命名空间
export default {
  computed: {
    ...mapState("app", ["title"]),
  }
}
</script>
```

- 使用 getters

  - 挂载在全局的 getters
    - `...mapGetters(['title'])`
    - `this.$store.getters.title`
  - 模块中的 getters

    ```vue
    <script>
    // app.js模块不开启命名空间
    export default {
      computed: {
        ...mapGetters(['test'])
      },
      mounted(){
        console.log(this.$store.getters.test)
      }
    }

    // app.js模块开启命名空间
    export default {
      computed: {
        ...mapGetters(['app/test']),
        ...mapGetters('app',['test'])
      },
      mounted(){
        console.log(this['app/test'])
        console.log(this.test)

        console.log(this.$store.getters['app/test'])
      }
    }
    </script>
    ```

- 使用 mutation

```vue
<script>
// app.js模块不开启命名空间
export default {
  methods: {
    ...mapMutations(['SET_TITLE'])
  },
  mounted(){
    this.$store.commit('SET_TITLE')
  }
}

// app.js模块开启命名空间
export default {
  methods: {
    ...mapMutations('app', ['SET_TITLE'])
  },
  mounted(){
    this.$store.commit('app/SET_TITLE')
  }
}
</script>
```

- 使用 action

```vue
<script>
// app.js模块不开启命名空间
export default {
  methods: {
    ...mapActions(['setTitle'])
  },
  mounted(){
    this.$store.dispacth('setTitle')
  }
}

// app.js模块开启命名空间
export default {
  methods: {
    ...mapActions('app',['setTitle'])
  },
  mounted(){
    this.$store.dispacth('app/setTitle')
  }
}
</script>
```
