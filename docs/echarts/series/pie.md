# pie 饼图

[饼图 前往 echarts 官网](https://echarts.apache.org/zh/option.html#series-pie)

## 常用配置项

**option.series.type = pie**

```js
var option = {
  title: {
    text: "状态统计",
    top: "3%",
    left: "5%",
  },
  color: ["#25C4A0", "#F5A31B"],
  legend: {
    icon: "circle",
    bottom: "5%",
  },
  tooltip: {
    show: true,
    formatter: "{a} <br /> {b} : {c} ({d}%)",
  },
  series: [
    {
      type: "pie",

      // 系列名称
      name: "进行中数量",

      // 饼图上的文本标签
      label: {
        // 标签的位置 'outside' 扇区外部  'inside'|'inner' 扇区内部 'center'饼图中心
        position: "inside",
        // 标签内容格式器 支持字符串模板和回调函数
        formatter: "{d}%",
        // 文本标签旋转 boolean number=> -90->90
        rotate: true,
        // ...
      },

      // 选中模式的配置
      selectedMode: "single",
      // 选中扇区的偏移距离
      selectedOffset: 20,

      // 扇区是否是顺时针排布
      clockwise: true,
      // 扇区起始角度
      startAngle: 90,
      // 最小的扇区角度（0 ~ 360）
      minAngle: 0,
      // 小于这个角度（0 ~ 360）的扇区，不显示标签（label 和 labelLine）
      minShowLabelAngle: 5,

      // 系列中的数据内容数组
      data: [
        {
          name: "已完成",
          value: 9,
        },
        {
          name: "进行中",
          value: 19,
        },
      ],
    },
  ];
}
```

<img :src="$withBase('/echarts/pie_1.png')">

```js
series: [
  {
    type: "pie",

    // 系列名称
    name: "进行中数量",

    // 选中模式的配置
    selectedMode: "single",
    // 选中扇区的偏移距离
    selectedOffset: 20,

    // 扇区是否是顺时针排布
    clockwise: true,
    // 扇区起始角度
    startAngle: 90,
    // 最小的扇区角度（0 ~ 360）
    minAngle: 0,
    // 小于这个角度（0 ~ 360）的扇区，不显示标签（label 和 labelLine）
    minShowLabelAngle: 5,

    // 系列中的数据内容数组
    data: [
      {
        name: "已完成",
        value: 9,
      },
      {
        name: "进行中",
        value: 19,
      },
    ],

    // ---------------新属性---------------

    //南丁格尔图
    //'radius' 扇区圆心角展现数据的百分比，半径展现数据的大小。
    //'area' 所有扇区圆心角相同，仅通过半径展现数据大小。
    roseType: "radius",

    // 饼图上的文本标签
    label: {
      // 标签的位置 'outside' 扇区外部  'inside'|'inner' 扇区内部 'center'饼图中心
      position: "outside",
      // 标签内容格式器 支持字符串模板和回调函数
      formatter: "{d}%",
      // 文本标签旋转 boolean number=> -90->90
      rotate: true,
      // ...
    },
    // 标签视觉引导线
    labelLine: {
      show: true,
    },

    // 图形(扇形)样式
    itemStyle: {
      // borderColor: "blue",
    },
    // 高亮状态的扇区和标签样式
    emphasis: {},
    // 淡出状态的扇区和标签样式。开启 emphasis.focus 后有效
    blue: {},
    // 选中状态的扇区和标签样式。开启 selectedMode 后有效。
    select: {},

    // radius: [45, 100], //中间挖空
  },
],
```

<img :src="$withBase('/echarts/pie_2.png')">

```js
//饼图的中心（圆心）坐标
center: ["50%", "50%"],

// 饼图的半径
radius: [45, 100],
```

<img :src="$withBase('/echarts/pie_3.png')">

## 完整代码

```vue
<template>
  <div ref="pie" class="pie"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "pie1",
  data() {
    return {
      pieData: {
        completion: [
          {
            name: "已完成",
            value: 9,
          },
          {
            name: "进行中",
            value: 19,
          },
        ],
        overdue: [
          {
            name: "超期",
            value: 17,
          },
          {
            name: "正常",
            value: 16,
          },
        ],
      },
    };
  },
  methods: {
    pie() {
      var myChart = echarts.init(this.$refs.pie);

      var option = {
        title: {
          text: "状态统计",
          top: "3%",
          left: "5%",
        },
        color: ["#25C4A0", "#F5A31B"],
        legend: {
          icon: "circle",
          bottom: "5%",
        },
        tooltip: {
          show: true,
          formatter: "{a} <br /> {b} : {c} ({d}%)",
        },
        series: [
          {
            type: "pie",

            // 系列名称
            name: "进行中数量",

            // 选中模式的配置
            selectedMode: "single",
            // 选中扇区的偏移距离
            selectedOffset: 20,

            // 扇区是否是顺时针排布
            clockwise: true,
            // 扇区起始角度
            startAngle: 90,
            // 最小的扇区角度（0 ~ 360）
            minAngle: 0,
            // 小于这个角度（0 ~ 360）的扇区，不显示标签（label 和 labelLine）
            minShowLabelAngle: 5,

            // 系列中的数据内容数组
            data: this.pieData.completion,

            //南丁格尔图
            //'radius' 扇区圆心角展现数据的百分比，半径展现数据的大小。
            //'area' 所有扇区圆心角相同，仅通过半径展现数据大小。
            // roseType: "radius",

            // 饼图上的文本标签
            label: {
              // 标签的位置 'outside' 扇区外部  'inside'|'inner' 扇区内部 'center'饼图中心
              position: "outside",
              // 标签内容格式器 支持字符串模板和回调函数
              formatter: "{d}%",
              // 文本标签旋转 boolean number=> -90->90
              rotate: true,
              // ...
            },
            // 标签视觉引导线
            labelLine: {
              show: true,
            },

            // 图形(扇形)样式
            itemStyle: {
              // borderColor: "blue",
            },
            // 高亮状态的扇区和标签样式
            emphasis: {},
            // 淡出状态的扇区和标签样式。开启 emphasis.focus 后有效
            blue: {},
            // 选中状态的扇区和标签样式。开启 selectedMode 后有效。
            select: {},

            // ---------------新属性---------------

            //饼图的中心（圆心）坐标
            center: ["50%", "50%"],

            // 饼图的半径
            radius: [45, 100],
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
    this.pie();
  },
};
</script>

<style scoped>
.pie {
  padding: 0px !important;
  width: 100%;
  height: 440px;
}
</style>
```

---

[饼图 具体配置](https://echarts.apache.org/zh/option.html#series-pie)
