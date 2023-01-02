# 柱状图

[柱状图 前往 echarts 官网](https://echarts.apache.org/zh/option.html#series-bar)

## 常用配置项

**option.series.type = bar**

```js
var option = {
  series: [
    {
      name: "legend1",
      type: "bar",
      data: [25, 10, 16, 30, 30, 25],

      colorBy: "series",
    },
    {
      //系列名称，用于tooltip的显示，legend 的图例筛选
      name: "legend",

      // 设为柱状图
      type: "bar",

      //系列中的数据内容数组
      data: [5, 20, 36, 10, 10, 20],

      // 从调色盘 option.color 中取色的策略
      colorBy: "data",
      // 'series':按照系列分配调色盘中的颜色，同一系列中的所有数据都是用相同的颜色
      // 'data'：按照数据项分配调色盘中的颜色，每个数据项都使用不同的颜色

      //柱条的背景色
      showBackground: true, //是否显示柱条的背景色
      //每一个柱条的背景样式
      backgroundStyle: {
        color: "#abcdef", // 柱条颜色
        borderWidth: 1, //柱条的描边宽度
        borderColor: "#1890ff", //柱条的描边颜色
        borderType: "dashed", //柱条的描边类型 'dashed', 'dotted' 'solid'
        borderRadius: [15, 15, 0, 0], //柱条圆角半径
      },

      // 柱条上文本标签
      label: {
        show: true,
        // 标签内容格式器
        formatter: (params) => {
          // return "系列名seriesType :" + params.seriesType;
          // return "seriesIndex :" + params.seriesIndex;
          // return "系列名seriesName :" + params.seriesName;
          // return "name :" + params.name;
          // return "dataIndex :" + params.dataIndex;
          // return "data :" + params.data;
          // return "value :" + params.value;
          return params.name + ":" + params.value;
        },
        color: "#000",
      },

      //柱条样式
      itemStyle: {
        // color: "auto", //柱条的颜色。 默认从全局调色盘 option.color 获取颜色 (设置这个属性colorBy会失效)
        borderWidth: 1, //柱条的描边宽度
        borderColor: "#fff",
      },
    },
  ],
};
```

![](/echarts/bar_1.png)

**_stack: string_**

数据堆叠，同个类目轴上系列配置相同的 stack 值后，后一个系列的值会在前一个系列的值上相加。
值自取，需要堆叠的取同一个值

## 案例

```vue
<template>
  <div ref="bar2" class="bar"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "bar2",
  data() {
    return {
      data: {
        month: [
          "2022-07",
          "2022-08",
          "2022-09",
          "2022-10",
          "2022-11",
          "2022-12",
        ],
        addition: [4, 10, 11, 0, 0, 0],
        research: [4, 6, 7, 0, 0, 0],
        end: [1, 4, 4, 0, 0, 0],
      },
    };
  },
  methods: {
    bar() {
      var myChart = echarts.init(this.$refs.bar2);
      var option = {
        title: {
          // 标题
          text: "各月份项目开展情况",
          left: "5%",
        },
        color: ["#FB6969", "#4497FD", "#3BD0AE"],
        tooltip: {
          //提示框组件
          trigger: "axis", //触发类型
          axisPointer: {
            //坐标轴指示器
            type: "line",
          },
        },
        legend: {
          // 图例组件
          data: ["新增项目", "在研项目", "完结"],
          bottom: 10,
          icon: "circle", //显示圆形
          textStyle: {
            //文字颜色
            color: "#979CA3",
          },
        },
        // 图的定位配置
        grid: {
          containLabel: true,
          left: "3%",
          right: "4%",
          bottom: "9%",
        },
        xAxis: {
          //x轴
          type: "category",
          data: this.data.month,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: "#979CA3",
          },
        },
        yAxis: {
          axisLine: {
            show: true,
            lineStyle: {
              color: "#f3f3f3",
            },
          },
          axisLabel: {
            color: "#979ca3",
          },
        },
        series: [
          {
            name: "完结",
            type: "bar",
            data: this.data.end,
            stack: "ad",
            barWidth: 40,
            label: {
              //柱形中间文字
              show: true,
              color: "#fff",
            },
          },
          {
            name: "新增项目",
            type: "bar",
            data: this.data.addition,
            // 数据堆叠，同个类目轴上系列配置相同的stack值后，
            // 后一个系列的值会在前一个系列的值上相加。
            stack: "ad",
            barWidth: 40,
            label: {
              show: true,
              color: "#fff",
            },
          },
          {
            name: "在研项目",
            type: "bar",
            data: this.data.research,
            stack: "ad",
            barWidth: 40,
            label: {
              show: true,
              color: "#fff",
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
  mounted() {
    this.bar();
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

![](/echarts/bar_2.png)

[柱状图 具体配置](https://echarts.apache.org/zh/option.html#series-bar)
