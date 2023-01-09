# tree 树图

[树图 前往 echarts 官网](https://echarts.apache.org/zh/option.html#series-tree)

**option.series.type = tree**

```vue
<template>
  <div class="tree" ref="tree"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  name: "tree_1",
  data() {
    return {
      treeData: [
        {
          name: "tree1",
          value: 1,
          children: [
            {
              name: "tree2",
              value: 2,
              children: [
                {
                  name: "tree4",
                  value: 4,
                },
                {
                  name: "tree5",
                  value: 5,
                },
              ],
            },
            {
              name: "tree3",
              value: 3,
              children: [
                {
                  name: "tree6",
                  value: 6,
                },
                {
                  name: "tree7",
                  value: 7,
                },
              ],
            },
          ],
        },
      ],
    };
  },
  mounted() {
    this.tree();
  },
  methods: {
    tree() {
      var myChart = echarts.init(this.$refs.tree);
      var option = {
        title: {
          text: "树图",
        },

        tooltip: {
          trigger: "item",
          formatter: "{b} : {c}",
        },
        series: {
          type: "tree",
          data: this.treeData,
          label: {
            position: "top",
          },
        },
      };
      myChart.setOption(option);
      window.onresize = function () {
        myChart.resize();
      };
    },
  },
};
</script>

<style>
.tree {
  width: 100%;
  height: 100%;
}
</style>
```

![](/echarts/tree_1.png)

```js
//树图的布局，有 正交 和 径向 两种
// 'orthogonal' 正交布局 就是我们通常所说的 水平 和 垂直 方向
// 'radial' 径向布局 是指以根节点为圆心，每一层节点为环，一层层向外发散绘制而成的布局
layout: "radial",
```

![](/echarts/tree_2.png)

```js
//树图的布局，有 正交 和 径向 两种
// 'orthogonal' 正交布局 就是我们通常所说的 水平 和 垂直 方向
// 'radial' 径向布局 是指以根节点为圆心，每一层节点为环，一层层向外发散绘制而成的布局
layout: "orthogonal",

//树图中 正交布局 的方向 , layout = 'orthogonal' 时，该配置项才生效
// 'LR'从左到右 'RL'从右到左 'TB'从上到下 'BT'从下到上
orient: "TB",
```

![](/echarts/tree_3.png)

```js
layout: "orthogonal",
//树图在 正交布局 下，边的形状
// curve 曲线 polyline 折线
edgeShape: "polyline",

// 正交布局下当边的形状是折线时，子树中折线段分叉的位置。 edgeShape = 'polyline' 生效
edgeForkPosition: "50%",
```

![](/echarts/tree_4.png)

```js
// 是否开启鼠标缩放和平移漫游 'scale'开启缩放 'move'开启平移 true都开启
roam: true,

// 子树折叠和展开的交互
expandAndCollapse: true,

// 树图初始展开的层级（深度）
// 根节点是第 0 层，然后是第 1 层、第 2 层，...
// 设置为 -1 或者 null 或者 undefined，所有节点都将展开
initialTreeDepth: 2,
```

![](/echarts/tree_5.png)

```js
// 叶子节点的特殊配置
leaves: {
  // 叶子节点所对应的文本标签的样式
  label: {
    formatter: "叶子节点",
  },
  // 叶子节点的样式
  itemStyle: {},
  // 叶子节点高亮状态的配置
  emphasis: {},
  // 叶子节点淡出状态的配置
  blur: {},
  // 叶子节点选中状态的配置
  select: {},
```

![](/echarts/tree_6.png)
