# dot 散点图

[散点图 前往 echarts 官网](https://echarts.apache.org/zh/option.html#series-scatter)

**option.series.type = scatter**

```js
var option = {
  title: {
    text: "dot",
  },
  xAxis: {
    data: ["低危", "中危", "高危", "超危"],
  },
  yAxis: {},
  legend: {
    top: "3%",
    right: "15%",
  },
  series: [
    {
      type: "scatter",
      name: "漏洞",
      data: [4, 11, 4, 16],
      // symbolSize: (value) => value * 2,
      symbolSize: (value) => Math.sqrt(Math.sqrt(value)) * 20,

      //高亮的图形和标签样式
      emphasis: {
        focus: "series",
        label: {
          show: true,
          position: "top",
          formatter: "{a}:{c}",
        },
      },
    },
    {
      type: "scatter",
      name: "事件",
      data: [3, 6, 0, 2],

      // 标记的大小
      // value 为 data 中的数据值
      symbolSize: (value) => Math.sqrt(Math.sqrt(value)) * 20,

      //高亮的图形和标签样式
      emphasis: {
        focus: "series",
        label: {
          show: true,
          position: "top",
          formatter: "{a}:{c}",
        },
      },
    },
  ],
};
```

![](/echarts/dot_1.png)

---

## 完整代码案例

```vue
<template>
  <div class="dot" ref="dot"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "dot_1",
  data() {
    return {
      opsChartVo: {
        opsBugChart: {
          lowLevelCount: 4,
          mediumLevelCount: 11,
          hignLevelCount: 4,
          superLevelCount: 2,
        },
        opsEventChart: {
          lowLevelCount: 3,
          mediumLevelCount: 6,
          hignLevelCount: 0,
          superLevelCount: 2,
        },
      },
      opsBugChart: [],
      opsEventChart: [],
    };
  },
  mounted() {
    for (let i in this.opsChartVo.opsBugChart) {
      this.opsBugChart.push(this.opsChartVo.opsBugChart[i]);
    }
    for (let i in this.opsChartVo.opsEventChart) {
      this.opsEventChart.push(this.opsChartVo.opsEventChart[i]);
    }
    this.dot();
  },
  methods: {
    dot() {
      var myChart = echarts.init(this.$refs.dot);
      var option = {
        title: {
          text: "dot",
        },
        xAxis: {
          data: ["低危", "中危", "高危", "超危"],
        },
        yAxis: {},
        legend: {
          top: "3%",
          right: "15%",
        },
        series: [
          {
            type: "scatter",
            name: "漏洞",
            data: this.opsBugChart,
            // symbolSize: (value) => value * 2,
            symbolSize: (value) => Math.sqrt(Math.sqrt(value)) * 20,

            //高亮的图形和标签样式
            emphasis: {
              focus: "series",
              label: {
                show: true,
                position: "top",
                formatter: "{a}:{c}",
              },
            },
          },
          {
            type: "scatter",
            name: "事件",
            data: this.opsEventChart,

            // 标记的大小
            // value 为 data 中的数据值
            symbolSize: (value) => Math.sqrt(Math.sqrt(value)) * 20,

            //高亮的图形和标签样式
            emphasis: {
              focus: "series",
              label: {
                show: true,
                position: "top",
                formatter: "{a}:{c}",
              },
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
