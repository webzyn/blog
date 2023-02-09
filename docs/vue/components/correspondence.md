# vue2 组件间传值

vue2 组件传值的方法：

- 父子通信
  - 父传子 [props](#props)
  - 子传父 [$emit](#emit) 或 [props+callback](#props-callback)
- 兄弟通信
  - [EventBus](#eventbus) ($emit/$on)
  - [$emit+props](#emit-props)
- vue 的状态管理器，存储的数据是响应式
  - [Vuex](/vue/vuex.md)
- 多级组件嵌套
  - [$attrs/$listeners/inheritAttrs](#attrs-listeners)
- 注入依赖
  - [provide/inject](#provide-inject)
- 组件访问
  - [$parent](#parent-children-refs)
  - [$children](#parent-children-refs)
  - [$refs](#parent-children-refs)

### 一、父组件向子组件传值

#### props

父组件通过属性的方式向子组件传值，子组件通过 props 来接收

- 在父组件的子组件标签中绑定自定义属性

```vue
<!-- 父组件 -->
<template>
  <user-detail :myName="name" />
</template>

<script>
import userDetail from "./userDetail.vue";
export default {
  data() {
    return {
      name: "zyn",
    };
  },
  components: { UserDetail },
};
</script>
```

- 在子组件中使用 props（可以是数组也可以是对象）接收即可。可以传多个属性。

```vue
<!-- 子组件 -->
<template>
  <div>我的名字:{{ myName }}</div>
</template>

<script>
export default {
  props: ["myName"],
  // props: {
  //   myName: String, //指定类型
  // },
  // props: { myName: [String, Number] } // 多个可能的类型
  // props: {
  //   myName: {
  //     type: String,
  //     required: true, //必填
  //   },
  //  childMsg: {
  //     type: Array,
  //     default: () => [], // default指定默认值
  //  },
  // },
};
</script>
```

### 二、子组件向父组件传值

#### $emit

- 1、子组件绑定一个事件，通过 this.$emit() 来触发

在子组件中绑定一个事件，并给这个事件定义一个函数

```vue
<!-- 子组件 -->
<template>
  <button @click="changeParentName">改变父组件的name</button>
</template>

<script>
export default {
  methods: {
    //子组件的事件
    changeParentName: function () {
      this.$emit("handleChange", "Jack"); // 触发父组件中handleChange事件并传参Jack
      // 注：此处事件名称与父组件中绑定的事件名称要一致
    },
  },
};
</script>
```

在父组件中定义并绑定 handleChange 事件

```vue
<!-- 父组件 -->
<template>
  <child @handleChange="changeName"></child>
</template>

<script>
import child from "./child.vue";
export default {
  data() {
    return {
      name: "zyn",
    };
  },
  methods: {
    changeName(val) {
      this.name = val;
    },
  },
};
</script>
```

---

---

#### props/callback

- 2、父组件通过 props 向子组件传递回调函数,在子组件调用该回调函数并传参

```vue
<!-- 父组件 -->
<template>
  <div>
    <div>我的名字:"{{ name }}"</div>
    <child :callback="changeName"></child>
  </div>
</template>

<script>
import child from "./child.vue";
export default {
  components: { child },
  data() {
    return {
      name: "zyn",
    };
  },
  methods: {
    changeName(val) {
      this.name = val;
    },
  },
};
</script>
```

```vue
<!-- 子组件 -->
<template>
  <button @click="onChange">改变父组件的name</button>
</template>

<script>
export default {
  props: {
    // 通过props接收回调函数
    callback: {
      type: Function,
      required: true,
    },
  },
  methods: {
    onChange() {
      this.callback("jack");
    },
  },
};
</script>
```

---

#### $parent/$children/$refs

- 3、通过 $parent / $children 或 $refs 访问组件实例

这两种都是直接得到组件实例，使用后可以直接调用组件的方法或访问数据

```vue
<!-- 子组件 -->
<template>
  <div>{{ title }}</div>
</template>

<script>
export default {
  data() {
    return {
      title: "我是子组件的数据",
    };
  },
  methods: {
    sayChild() {
      console.log("我是子组件的方法");
    },
  },
  created() {
    // 通过 $parent 来访问父组件
    console.log(this.$parent.data); // 我是父组件的数据
    this.$parent.sayParent(); // 我是父组件的方法
  },
};
</script>
```

```vue
<!-- 父组件 -->
<template>
  <child ref="childRef" />
</template>

<script>
import child from "./child.vue";
export default {
  components: { child },
  created() {
    // 通过 $ref 来访问子组件
    console.log(this.$refs.childRef.title); // 我是子组件的数据
    this.$refs.childRef.sayChild(); //我是子组件的方法

    // 通过 $children 访问子组件 this.$children是一个数组需要正确选择组件
    console.log(this.$children[0].title); // 我是子组件的数据
    this.$children[0].sayChild(); // 我是子组件的方法
  },
  data() {
    return {
      data: "我是父组件的数据",
    };
  },
  methods: {
    sayParent() {
      console.log("我是父组件的方法");
    },
  },
};
</script>
```

#### $attrs/$listeners

- 4、$attrs/$listeners

  - **inheritAttrs**

  ```vue
  <!-- 父组件 -->
  <template>
    <div class="parent">
      <child-component aaa="1111"></child-component>
    </div>
  </template>
  <script>
  import ChildComponent from "./child-component";
  export default {
    components: {
      ChildComponent,
    },
  };
  </script>
  ```

  ```vue
  <!-- 子组件 -->
  <template>
    <div class="child">子组件</div>
  </template>
  <script>
  export default {
    inheritAttrs: true,
    mounted() {
      console.log("this.$attrs", this.$attrs);
    },
  };
  </script>
  ```

  ![](/vue/components/props_7.png)

  **总结:**\
  1.当设置 inheritAttrs: true（默认）时，子组件的顶层标签元素中（本例子的 div 元素）会渲染出父组件传递过来的属性(本例子的 aaa="1111")。\
  2.当设置 inheritAttrs: false 时，子组件的顶层标签元素中（本例子的 div 元素）不会渲染出父组件传递过来的属性(本例子的 aaa="1111")。\
  3.不管 inheritAttrs 为 true 或者 false，子组件中都能通过$attrs 属性获取到父组件中传递过来的属性
  ![](/vue/components/props_8.png)

  - **$attrs**

    - **官方描述**: 包含了父作用域中不作为 prop 被识别 (且获取) 的 attribute 绑定 (`class` 和 `style` 除外)。当一个组件没有声明任何 prop 时，这里会包含所有父作用域的绑定 (`class` 和 `style` 除外)，并且可以通过 `v-bind="$attrs"` 传入内部组件——在创建高级别的组件时非常有用。

    - **个人理解**: 接收除了 props 声明外的所有绑定属性（class、style 除外)

  - **$listeners**

    - **官方描述**: 包含了父作用域中的 (不含 `.native` 修饰器的) `v-on` 事件监听器。它可以通过 `v-on="$listeners"` 传入内部组件——在创建更高层次的组件时非常有用。

    - **个人理解**: 接收除了带有.native 事件修饰符的所有事件监听器

![](/vue/components/props_5.png)

在很多开发情况下，我们只是想把组件 A 的数据传给组件 C，如果用 props 来进行组件通信的话，虽然可以实现，但是代码可读性上不强，且难维护。

![](/vue/components/props_6.png)

```vue
<!-- 组件A -->
<template>
  <div class="box">
    <div style="margin: 50px; border: 5px solid blue">
      <h1>$attrs/$listeners</h1>
      <p>组件A</p>
      <h3>foo:{{ foo }}</h3>
      <h3>foo2:{{ foo2 }}</h3>
      <h3>bar:{{ bar }}</h3>
      <h3>bar2:{{ bar2 }}</h3>
      <comB
        :foo="foo"
        :bar="bar"
        :foo2="foo2"
        :bar2="bar2"
        @changeFoo="changeFoo"
      ></comB>
    </div>
  </div>
</template>

<script>
import comB from "./comB.vue";
export default {
  components: { comB },
  inheritAttrs: true, // 当设为false时，在标签上的属性会隐藏
  data() {
    return {
      foo: "foo",
      bar: "bar",
      foo2: "foo2",
      bar2: "bar2",
    };
  },
  methods: {
    changeFoo(val) {
      this.foo = val;
      this.foo2 = val;
    },
  },
};
</script>
```

```vue
<!-- 组件B -->
<template>
  <div style="margin: 50px; border: 5px dashed greenyellow">
    <h3>组件B</h3>
    <p>props: foo: {{ foo }}</p>
    <p>$attrs: '{{ $attrs }}'</p>
    <comC v-bind="$attrs" v-on="$listeners"></comC>
  </div>
</template>

<script>
import comC from "./comC.vue";
export default {
  components: { comC },
  props: ["foo"],
  created() {
    console.log("b组件", this.$attrs);
  },
};
</script>
```

```vue
<!-- 组件C -->
<template>
  <div style="margin: 50px; border: 2px SOLID red; min-height: 100px">
    <h3>组件C</h3>
    <p>props: bar: {{ bar }}</p>
    <p>$attrs: {{ $attrs }}</p>
    <comD v-bind="$attrs" v-on="$listeners"></comD>
  </div>
</template>

<script>
import comD from "./comD.vue";
export default {
  props: ["bar"],
  inheritAttrs: false,
  components: { comD },
  created() {
    console.log("c组件", this.$attrs);
  },
};
</script>
```

```vue
<!-- 组件D -->
<template>
  <div style="margin: 50px; border: 2px solid red; min-height: 100px">
    <h3>组件D</h3>
    <p>props: foo2: {{ foo2 }}</p>
    <p>$attrs: {{ $attrs }}</p>
    <button @click="changeFoo">修改foo</button>
  </div>
</template>

<script>
export default {
  props: ["foo2"],
  inheritAttrs: false,
  created() {
    console.log("d组件", this.$attrs);
  },
  methods: {
    changeFoo() {
      this.$emit("changeFoo", "new foo");
    },
  },
};
</script>
```

![](/vue/components/props_9.png)

### 三、兄弟组件之间传值

#### $emit/props

- 1、通过 $emit 和 props 结合的方式

在父组件中给要传值的两个兄弟组件都绑定要传的变量，并定义事件

```vue
<!-- 父组件 -->
<template>
  <div>
    <div>父组件name:"{{ name }}"</div>
    <son1 @changeName="changeName" :my-name="name"></son1>
    <son2 @changeName="changeName" :my-name="name"></son2>
  </div>
</template>

<script>
import son1 from "./child_1.vue";
import son2 from "./child_2.vue";
export default {
  name: "ParentEle3",
  components: {
    son1,
    son2,
  },
  data() {
    return {
      name: "zyn",
    };
  },
  methods: {
    changeName(val) {
      this.name = val;
    },
  },
};
</script>
```

```vue
<!-- 子组件1 -->
<template>
  <div>
    <p>子组件1:{{ myName }}</p>
    <button @click="changeName">子组件1修改姓名</button>
  </div>
</template>

<script>
export default {
  name: "SonEle2",
  props: ["myName"],

  methods: {
    changeName() {
      this.$emit("changeName", "组件1修改为:Lily"); // 触发事件并传值
    },
  },
};
</script>
```

```vue
<!-- 子组件2 -->
<template>
  <div>
    <p>子组件2:{{ myName }}</p>
    <button @click="changeName">子组件2修改姓名</button>
  </div>
</template>

<script>
export default {
  name: "SonEle2",
  props: ["myName"],

  methods: {
    changeName() {
      this.$emit("changeName", "组件2修改为:Jone"); // 触发事件并传值
    },
  },
};
</script>
```

![](/vue/components/props_1.png)
![](/vue/components/props_2.png)

---

#### EventBUS

- 2、EventBUS(任意组件间传值)

创建一个 EventBus.js 文件，并暴露一个 vue 实例

```js
// EventBus.js
import Vue from "Vue";
export default new Vue();
```

在要传值的文件里导入这个空 vue 实例，绑定事件并通过 $emit 触发事件函数

```vue
<template>
  <div>
    <p>组件A: {{ name }}</p>
    <button @click="changeName">修改姓名</button>
  </div>
</template>

<script>
import EventBus from "@/common/EventBus";

export default {
  data() {
    return {
      name: "John",
    };
  },

  methods: {
    changeName() {
      this.name = "Lily";
      // 触发自定义事件
      EventBus.$emit("editName", this.name);
    },
  },
};
</script>
```

在接收传值的组件中也导入 vue 实例，通过 $on 监听回调，回调函数接收所有触发事件时传入的参数

```vue
<template>
  <div>
    <p>组件B: {{ name }}</p>
  </div>
</template>

<script>
import EventBus from "@/common/EventBus";
export default {
  data() {
    return {
      name: "zyn",
    };
  },
  created() {
    // 监听自定义事件
    EventBus.$on("editName", (val) => {
      this.name = val;
    });
  },
};
</script>
```

![](/vue/components/props_3.png)
![](/vue/components/props_4.png)

---

#### Vuex

- 3、vuex

[前往 Vuex](/vue/vuex.md)

### 四、多层父子组件通信

#### provide/inject

- 1、provide/inject

在父组件中通过 provider 来提供变量，然后在子组件中通过 inject 来注入变量，不管组件层级有多深，在父组件生效的生命周期内，这个变量就一直有效。

```vue
<!-- 父/爷组件 -->
<script>
export default {
  provide: {
    // 将 name 这个变量提供给它的所有子组件。
    name: "Jack",
  },
};
</script>
```

```vue
<!-- 子组件 -->
<template>
  <div>
    <p>inject组件: {{ name }}</p>
  </div>
</template>

<script>
export default {
  inject: ["name"], // 注入了从父组件中提供的name变量
};
</script>
```

注：provide 和 inject 绑定并不是可响应的。即父组件的 name 变化后，子组件不会跟着变。

**实现 provide 和 inject 数据响应**

优化方法 1:\
provide 传递祖先组件的实例，然后在子孙组件中注入依赖，这样就可以在后代组件中直接修改祖先组件的实例的属性

```vue
<!-- 父组件 -->
<template>
  <div>
    <button @click="changeName">修改姓名</button>
    <child-b />
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "Jack",
    };
  },
  //此处不同
  provide() {
    return {
      parentObj: this, //提供祖先组件的实例
    };
  },
  methods: {
    changeName() {
      this.name = "Lily";
    },
  },
};
</script>
```

```vue
<!-- 子组件 -->
<template>
  <div>
    <p>inject组件: {{ parentObj.name }}</p>
  </div>
</template>

<script>
export default {
  inject: {
    parentObj: {
      default: () => ({}),
    },
  }, // 或者 inject: ["parentObj"],
};
</script>
```

优化方法 2:\
使用 Vue.observable

`Vue.observable()`让一个对象可响应。Vue 内部会用它来处理 data 函数返回的对象。
返回的对象可以直接用于`渲染函数methods`和`计算属性computed`内，并且会在发生变更时触发相应的更新

```vue
<!-- 父组件 -->
<template>
  <div>
    <div>父组件name:{{ name }}</div>
    <child-c />
  </div>
</template>

<script>
import Vue from "vue";
// 创建state对象，使用observable 让 state 对象可响应
const state = Vue.observable({
  name: "observable",
});
export default {
  data() {
    return {
      name: state.name,
    };
  },
  provide() {
    return {
      state, // 传递响应式数据
    };
  },
};
</script>
```

```vue
<!-- 子组件 -->
<template>
  <div>
    <p>子组件: {{ name }}</p>
    <button @click="fetchInfo">子组件修改name</button>
  </div>
</template>

<script>
export default {
  name: "ComponentInject",
  inject: ["state"],
  computed: {
    name() {
      return this.state.name;
    },
  },
  methods: {
    fetchInfo() {
      this.state.name = "子组件修改name成功";
    },
  },
};
</script>
```

[参考 1](https://www.cnblogs.com/cheyunhua/p/16179610.html)
[参考 2](https://xie.infoq.cn/article/77c1cee30be9b03c47e1f5b5f)
