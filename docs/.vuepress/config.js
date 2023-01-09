module.exports = {
  base: "./",
  title: "学习笔记",
  // description: "菜鸟进阶之路",
  themeConfig: {
    // 导航栏
    nav: [
      {
        text: "主页",
        link: "/",
      },
      {
        text: "javaScript",
        link: "/javaScript/",
      },
      {
        text: "Vue",
        link: "/vue/",
      },
      {
        text: "echarts",
        link: "/echarts/",
      },
      {
        text: "uniapp",
        link: "/uniapp/",
      },
      {
        text: "nodejs",
        link: "/nodejs/",
      },
      {
        text: "markDown语法",
        link: "/markDown/",
      },
      {
        text: "面试",
        link: "/interview/",
      },
    ],
    // 侧边栏
    // sidebar: "auto",
    sidebar: {
      "/markDown/": "auto",
      "/javaScript/": [
        { title: "Bolb", path: "/javaScript/blob" },
        { title: "MIME类型", path: "/javaScript/MIME" },
        { title: "树形结构模糊搜索", path: "/javaScript/fuzzySearch" },
        {
          title: "ES6",
          collapsable: false, //是否能收起来
          children: [
            {
              title: "for of 与 for in",
              path: "/javaScript/es6/forof_forin",
            },
          ],
        },
      ],
      "/vue/": [
        ["directive", "自定义指令directive"],
        ["v-has", "v-has和$has(权限按钮判断)"],
        ["use", "Vue.use和Vue.prototype.$xx"],
      ],
      "/echarts/": [
        { title: "echarts使用", path: "/echarts/" },
        { title: "option配置项", path: "/echarts/option" },
        {
          title: "option.series",
          collapsable: false, //是否能收起来
          children: [
            {
              title: "bar柱状图",
              path: "/echarts/series/bar",
            },
            {
              title: "pie饼图",
              path: "/echarts/series/pie",
            },
            {
              title: "line折线图",
              path: "/echarts/series/line",
            },
            {
              title: "scatter/dot散点图",
              path: "/echarts/series/dot",
            },
            {
              title: "effectScatter涟漪特效散点图",
              path: "/echarts/series/effectScatter",
            },
            {
              title: "tree树图",
              path: "/echarts/series/tree",
            },
          ],
        },
      ],
      "/nodejs/": [
        { title: "fs模块", path: "/nodejs/fs" },
        { title: "__dirname文件所处的目录", path: "/nodejs/__dirname" },
        { title: "path模块", path: "/nodejs/path" },
        {
          title: "http模块",
          collapsable: false, //是否能收起来,
          children: [
            {
              title: "服务器相关概念",
              path: "/nodejs/http/server",
            },
            {
              title: "创建web服务器",
              path: "/nodejs/http/createServer",
            },
          ],
        },
      ],
    },
  },
  markdown: {
    lineNumbers: true,
  },
};
