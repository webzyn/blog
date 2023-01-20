module.exports = {
  base: "/blog/",
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
        link: "/nodejs/fs",
      },
      {
        text: "MySQL",
        link: "/mysql/mysql",
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
        {
          title: "组件相关",
          collapsable: false, //是否能收起来,
          children: [
            {
              title: "slot插槽",
              path: "/vue/components/slot",
            },
            {
              title: "v-model父子组件间数据双向绑定",
              path: "/vue/components/vModel",
            },
            {
              title: ".sync父子组件间数据双向绑定",
              path: "/vue/components/sync",
            },
          ],
        },
        {
          title: "其他",
          collapsable: false, //是否能收起来,
          children: [
            {
              title: "自定义指令directive",
              path: "/vue/other/directive",
            },
            {
              title: "v-has和$has(权限按钮判断)",
              path: "/vue/other/v-has",
            },
            {
              title: "Vue.use和Vue.prototype.$xx区别",
              path: "/vue/other/use",
            },
          ],
        },
      ],
      "/echarts/": [
        { title: "echarts使用", path: "/echarts/" },
        { title: "option配置项", path: "/echarts/option", collapsable: false },
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
        {
          title: "nodejs基础",
          children: [
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
            { title: "querystring模块", path: "/nodejs/querystring" },
            {
              title: "Nodejs模块化",
              path: "/nodejs/模块化/module",
            },
          ],
        },
        {
          title: "express框架",
          collapsable: false, //是否能收起来,
          children: [
            {
              title: "Express基本使用",
              path: "/nodejs/express/express",
            },
            {
              title: "Express中的路由",
              path: "/nodejs/express/route",
            },
            {
              title: "中间件",
              path: "/nodejs/express/Middleware",
            },
            {
              title: "CORS",
              path: "/nodejs/express/port",
            },
          ],
        },
        {
          title: "mysql模块",
          path: "/nodejs/mysql",
        },
        {
          title: "身份认证",
          path: "/nodejs/information",
        },
      ],
      "/mysql/": [
        {
          title: "数据库基本概念",
          path: "/mysql/mysql",
        },
      ],
    },
  },
  markdown: {
    lineNumbers: true,
  },
};
