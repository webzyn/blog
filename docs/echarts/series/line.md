# line 折线图

[折线图 前往 echarts 官网](https://echarts.apache.org/zh/option.html#series-line)

## 常用配置项

**option.series.type = line**

```js
var option = {
  title: {
    text: "line",
  },
  legend: {
    data: ["实际时效", "操作时效"],
    bottom: "3%",
    icon: "circle",
  },
  xAxis: {
    type: "category",
    data: [
      "漏洞验证",
      "漏洞定级",
      "方案制定与验证",
      "方案实施",
      "有效性验证",
      "达标判断",
    ],
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
  },
  yAxis: {},
  series: [
    {
      type: "line",
      name: "实际时效",
      data: [11, 0, 16, 12, 0, 0],

      // 标记的图形 折线图的折点
      symbol: "rect", //标记类型
      symbolSize: 10, //标记的大小
      symbolRotate: 0, //标记的旋转角度
      symbolOffset: [0, 0], //标记相对于原本位置的偏移
      showSymbol: true, //是否显示 symbol,

      // 折线拐点标志的样式
      itemStyle: {
        color: "red",
        borderWidth: 5,
        borderColor: "#ccc",
        // borderType: "dotted",
      },
    },
    {
      type: "line",
      name: "操作时效",
      data: [2, 1, 2, null, 2, 1],

      //是否连接空数据
      connectNulls: false,
      //是否是阶梯线图
      step: true,

      //图形上的文本标签
      label: {
        show: true,
        formatter: "label:{c}",
      },
      // 折线端点的标签。
      endLabel: {
        show: true,
        formatter: "endLabel:{c}",
      },
      // 标签的视觉引导线配置
      labelLine: {},
      // 标签的统一布局配置。
      labelLayout: {},
    },
  ],
};
```

<img :src="$withBase('/echarts/line_1.png')">

---

> -

```js
showSymbol: false,//是否显示 symbol
// 线条样式
lineStyle: {
  width: 20,
  cap: "round",
  join: "round",
},
```

<img :src="$withBase('/echarts/line_2.png')">

---

> -

```js
// 区域填充样式。设置后显示成区域面积图
areaStyle: {
  color: {
    type: "linear",
    x: 0,
    y: 0,
    x2: 0,
    y2: 1,
    colorStops: [
      {
        offset: 0,
        color: "#fff", // 0% 处的颜色
      },
      {
        offset: 1,
        color: "blue", // 100% 处的颜色
      },
    ],
    global: false, // 缺省为 false
  },
  origin: "end", // 图形区域的起始位置
  //'auto' 填充坐标轴轴线到数据间的区域（默认值）
  //'start' 填充坐标轴底部（非 inverse 情况是最小值）到数据间的区域
  //'end' 填充坐标轴顶部（非 inverse 情况是最大值）到数据间的区域
  //number 填充指定数值到数据间的区域（从 v5.3.2 开始支持）
}
```

<img :src="$withBase('/echarts/line_3.png')">
<img :src="$withBase('/echarts/line_4.png')">

---

> -

```js
// 是否平滑曲线显示
smooth: true,
// 折线平滑后是否在一个维度上保持单调性，可以设置成'x', 'y'来指明是在 x 轴或者 y 轴上保持单调性
smoothMonotone: "x",
```

<img :src="$withBase('/echarts/line_5.png')">
<img :src="$withBase('/echarts/line_6.png')">
<img :src="$withBase('/echarts/line_7.png')">

---

> -

```js
// 图表标注
markPoint: {
  data: [
    {
      name: "最大值",
      type: "max",
    },
    {
      name: "最小值",
      type: "min",
    },
    {
      name: "平均值",
      type: "average",
    },
  ],
},
// 图表标线
markLine: {
  data: [
    { name: "平均线", type: "average" },
    {
      name: "最小值",
      type: "min",
    },
    {
      name: "最大值",
      type: "max",
    },
  ],
},
//图表标域
markArea: {
  data: [
    [
      {
        name: "平均值到最大值",
        type: "average",
      },
      {
        type: "max",
      },
    ],
  ],
}
```

<img :src="$withBase('/echarts/line_8.png')">

[折线图 其他配置](https://echarts.apache.org/zh/option.html#series-line)
