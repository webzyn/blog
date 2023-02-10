# option 常用配置项

<img :src="$withBase('/echarts/1.png')">

## title 标题

```js
var option = {
  title: {
    show: true,
    text: "标题",
    textStyle: {}, // 主标题样式
    left: "5%",
    link: "pie", //主标题文本超链接
    // 指定窗口打开主标题超链接
    target: "blank", // 新窗口打开
    subtext: "副标题",
    subtextStyle: {}, //副标题样式
    sublink: "/fullCalendar",
    subtarget: "self", // 当前窗口打开
    // 略...
  },
  // ...
};

// link : http://localhost:8081/echarts/bar => http://localhost:8081/echarts/pie

// sublink : http://localhost:8081/echarts/bar => http://localhost:8081/fullCalendar
```

<img :src="$withBase('/echarts/title_1.png')">

[title 其他配置项](https://echarts.apache.org/zh/option.html#title)

## grid

**containLabel: grid 区域是否包含坐标轴的刻度标签**

```js
var option = {
  grid: {
    show: true,
    containLabel: false,
    top: "20%",
    right: "10%",
  },
  // ...
};
```

<img :src="$withBase('/echarts/grid_1.png')">

```js
var option = {
  grid: {
    show: true,
    containLabel: true,
    backgroundColor: "yellow",
    borderColor: "red",
    top: "20%",
    right: "10%",
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowBlur: 10,
    shadowOffsetX: -10,
    shadowOffsetY: -10,
  },
};
```

[grid 其他配置](https://echarts.apache.org/zh/option.html#grid)

<img :src="$withBase('/echarts/grid_2.png')">

## tooltip 提示框组件

```js
var option = {
  tooltip: {
    show: true,
    trigger: "axis", //触发类型
    axisPointer: {
      //坐标轴指示器
      type: "line",
    },
    // 提示框样式
    backgroundColor: "rgba(50,50,50,0.7)",
    borderColor: "#333",
    borderWidth: 0,
    padding: 5,
    textStyle: {}, // 提示框文本样式
  },
};
```

**formatter**

提示框浮层内容格式器，支持字符串模板和回调函数两种形式
[formatter 具体写法](https://echarts.apache.org/zh/option.html#tooltip.formatter)

---

> **trigger: "item" || "axis" || "none"**

- item:数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用
- axis:坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用
- none:什么都不触发

---

> > **axisPointer 坐标轴指示器配置项**

> type

- 'line' 直线指示器

- 'shadow' 阴影指示器

- 'none' 无指示器

- 'cross' 十字准星指示器。其实是种简写，表示启用两个正交的轴的 axisPointer。

<img :src="$withBase('/echarts/tooltip_1.png')">
<img :src="$withBase('/echarts/tooltip_2.png')">
<img :src="$withBase('/echarts/tooltip_3.png')">

[tooltip 其他配置](https://echarts.apache.org/zh/option.html#tooltip)

## legend 图例组件

```js
var option = {
  legend: {
    // 图例的数据数组
    data: ["新增项目", "在研项目", "完结"],

    // 图例组件在容器的位置
    // left: "auto",
    right: "auto",
    top: "auto",
    bottom: 10,

    // 图例组件的宽高
    width: "auto",
    height: "auto",

    // 图例列表的布局朝向
    orient: "horizontal", //horizontal横向  vertical纵向

    // 图例标记与文字的布局方向
    align: "auto", //left图例在文字左边 right图例在文字右边

    padding: 5, //图例内边距

    itemGap: 10, //图例每项之间的间隔

    // 图例标记样式
    itemWidth: 10, // 图例标记宽
    itemHeight: 10, // 图例标记高
    itemStyle: {}, // 图例标记样式
    icon: "circle", //图例标记的icon 显示圆形

    lineStyle: {}, // 图例标记 中 线的样式(用于折线图)

    formatter: "{name}", //格式化图例文本

    //图例公共文本样式
    textStyle: {
      color: "#979CA3",
    },

    // 控制选中图例状态
    selectedMode: true, //图例选择的模式，控制是否可以通过点击图例改变系列的显示状态
    selected: {
      //图例选中状态表
      新增项目: true,
      在研项目: true,
      完结: false,
    },
  },
};
```

<img :src="$withBase('/echarts/legend_1.png')">

[legend 其他配置](https://echarts.apache.org/zh/option.html#legend)

## xAxis x 轴

```js
var option = {
  xAxis: {
    type: "category", //坐标轴类型
    //类目数据type:category时生效
    data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
    name: "产品", //坐标轴名称

    //坐标轴轴线
    axisLine: {
      show: true,
      symbol: ["none", "arrow"], //轴线的箭头
      symbolSize: [4, 6], //箭头的大小
      symbolOffset: 5, //箭头的偏移
    },

    //坐标轴刻度
    axisTick: {
      show: true,
      alignWithLabel: true, //刻度线和标签对齐
    },

    //坐标轴刻度标签
    axisLabel: {
      show: true,
    },

    //坐标轴在 grid 区域中的分隔线。
    splitLine: {
      show: true,
    },

    //坐标轴在 grid 区域中的分隔区域
    splitArea: {
      show: true,
      areaStyle: {
        color: ["rgba(250,250,250,0.3)", "rgba(200,200,200,0.3)"],
      },
    },

    //坐标轴指示器 覆盖tooltip.axisPointer配置(x轴)
    axisPointer: {
      show: true,
      // type: "shadow",//指示器类型
      // snap: true,//坐标轴指示器是否自动吸附到点上。默认自动判断。
    },
  },
};
```

<img :src="$withBase('/echarts/xAxis_1.png')">
[xAxis 具体配置](https://echarts.apache.org/zh/option.html#xAxis)

## yAxis y 轴

yAxis 同 xAxis
[yAxis 具体配置](https://echarts.apache.org/zh/option.html#yAxis)

## series

type 不同 则 series 不同

各种 type 类型:

[bar-柱状图](/echarts/series/bar.md)

[series 具体配置](https://echarts.apache.org/zh/option.html#series)
