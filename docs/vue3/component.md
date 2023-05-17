# 新组件

## 1.Fragment

- 在Vue2中: 组件必须有一个根标签
- 在Vue3中: 组件可以没有根标签, 内部会将多个标签包含在一个Fragment虚拟元素中
- 好处: 减少标签层级, 减小内存占用

## 2.Teleport

- 什么是Teleport？—— `Teleport` 是一种能够将我们的<strong style="color:#DD5145">组件html结构</strong>移动到指定位置的技术。

- 常用: 组件库中遮罩层使用

```html
<teleport to="移动位置(string | HTMLElement)"></teleport>

<teleport to="body" />
<teleport to="#some-id" />
<teleport to=".some-class" />
<teleport to="[data-teleport]" />
```

```vue
<template>
    <teleport to="body">
    <!--> 将包裹的元素放到body中 <-->
        <div v-if="isShow" class="mask">
            <div class="dialog">
                <h3>我是一个弹窗</h3>
                <button @click="isShow = false">关闭弹窗</button>
            </div>
        </div>
    </teleport>
</template>
```
## 3.Suspense

- 等待异步组件时渲染一些额外内容，让应用有更好的用户体验

- 使用步骤：

  - 异步引入组件 defineAsyncComponent
  - 使用```Suspense```包裹组件，并配置好```default``` 与 ```fallback```

    ```vue
    <template>
    	<div class="app">
    		<h3>我是App组件</h3>
    		<Suspense>
                <!-- 组件加载完成显示的内容 -->
    			<template v-slot:default>
    				<Child/>
    			</template>
                <!-- 组件未加载完成显示的内容 -->
    			<template v-slot:fallback>
    				<h3>加载中.....</h3>
    			</template>
    		</Suspense>
    	</div>
    </template>
    <script>
        // import Child from "./components/Child.vue" // 静态引入

        import {defineAsyncComponent} from 'vue'
        const Child = defineAsyncComponent(()=>import('./components/Child.vue')) // 异步引入组件

        export default {
            name: "App",
            components: {Child}
        }
    </script>
    ```

    ```vue
    <!-- 测试：可以调整网速，也可以让组件等待一段时间返回promise -->
    <!-- setup使用async、await必须搭配Suspense异步组件 -->
    <script>
    import {ref} from 'vue'
    export default {
        name: "Child",
        async setup(){
            let sum = ref(0)
            let p = new Promise((resolve,reject)=>{
                setTimeout(()=>{
                    resolve({sum})
                },3000)
            })
            return await p
        }
    }
    </script>
    ```