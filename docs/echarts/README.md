# eharts 基本使用

**引入 echarts**

```
npm install echarts --save || yarn echarts --save
```

**组件中使用**

```vue
<template>
  <div ref="bar" class="bar"></div>
</template>

<script>
// 使用echarts
import * as echarts from "echarts";

export default {
  name: "bar",
  mounted() {
    this.bar();
  },
  methods: {
    // 初始化
    var myChart = echarts.init(this.$refs.bar);

    // 指定图表的配置项和数据
    var option = {}

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

    //监听图表容器的大小并改变图表大小
    window.onresize = function () {
      myChart.resize();
    };
  },
};
</script>

<style scoped>
.bar {
  padding: 0px !important;
  margin-top: 50px;
  width: 100%;
  height: 440px;
}
</style>
```
