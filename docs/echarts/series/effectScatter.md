# effectScatter 涟漪特效散点(气泡)图

[涟漪特效散点(气泡)图 前往 echarts 官网](https://echarts.apache.org/zh/option.html#series-effectScatter)

**option.series.type = effectScatter**

```vue
<template>
  <div class="dot" ref="dot"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "effectScatter_1",
  data() {
    return {};
  },
  mounted() {
    this.effectScatter();
  },
  methods: {
    effectScatter() {
      var myChart = echarts.init(this.$refs.dot);
      var option = {
        title: {
          text: "带有涟漪特效动画的散点（气泡）图",
        },
        xAxis: {
          data: ["x1", "x2", "x3", "x4", "x5"],
          axisTick: { alignWithLabel: true },
        },
        yAxis: {},
        series: [
          {
            type: "effectScatter",
            data: [73, 65, 12, 89, 53],

            symbolSize: (val) => Math.sqrt(Math.sqrt(val)) * 20,

            // 特效类型，目前只支持涟漪特效'ripple'
            effectType: "ripple",

            // 配置何时显示特效
            // 'render' 绘制完成后显示特效。 'emphasis' 高亮（hover）的时候显示特效。
            showEffectOn: "render",

            // 涟漪特效相关配置
            rippleEffect: {
              color: "pink", //涟漪的颜色，默认为散点的颜色
              number: 5, // 波纹的数量
              period: 4, // 动画的周期，秒数 数字越大越慢
              scale: 2.5, // 动画中波纹的最大缩放比例 值为1没有波纹
              brushType: "fill", // 波纹的绘制方式，可选 'stroke' 和 'fill'
            },
          },
        ],
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
.dot {
  width: 100%;
  height: 100%;
}
</style>
```

![](/echarts/effectScatter_1.png)
