module.exports = {
  base: "/blog/",
  // title: "学习笔记",
  title: "note",
  // description: "菜鸟进阶之路",
  themeConfig: {
    // 导航栏
    nav: [
      {
        text: "主页",
        link: "/",
      },
      {
        text: "javascript",
        link: "/javascript/",
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
      // {
      //   text: "题",
      //   link: "/algorithmic/",
      // },
    ],
    // 侧边栏
    // sidebar: "auto",
    sidebar: {
      "/markDown/": "auto",
      "/javascript/": [
        {
          title: "js",
          collapsable: false,
          children: [
            {
              title: "Array对象",
              path: "/javascript/basis/array",
            },
            {
              title: "Object对象",
              path: "/javascript/basis/object",
            },
            {
              title: "String对象",
              path: "/javascript/basis/string",
            },
            {
              title: "Math对象",
              path: "/javascript/basis/Math",
            },
            {
              title: "Date对象",
              path: "/javascript/basis/Date",
            },
            {
              title: "四种for循环",
              path: "/javascript/basis/for",
            },
            {
              title: "new关键字",
              path: "/javascript/basis/new",
            },
          ],
        },
        {
          title: "ES6",
          collapsable: false, //是否能收起来
          children: [
            {
              title: "Symbol",
              path: "/javascript/es6/Symbol",
            },
            {
              title: "set和map",
              path: "/javascript/es6/set_map",
            },
            {
              title: "set、array、map和object区别",
              path: "/javascript/es6/set_array_map_object",
            },
            {
              title: "Promise对象",
              path: "/javascript/es6/Promise",
            },
            {
              title: "Iterator遍历器",
              path: "/javascript/es6/Iterator",
            },
            {
              title: "for...of循环",
              path: "/javascript/es6/for...of",
            },
            {
              title: "Generator函数",
              path: "/javascript/es6/Generator",
            },
            {
              title: "async函数",
              path: "/javascript/es6/async_await",
            },
            {
              title: "Proxy",
              path: "/javascript/es6/Proxy",
            },
            {
              title: "Reflect",
              path: "/javascript/es6/Reflect",
            },
            // {
            //   title: "四种for循环",
            //   path: "/javascript/basis/for",
            // },
          ],
        },
        {
          title: "其他",
          collapsable: false,
          children: [
            { title: "Bolb", path: "/javascript/blob" },
            { title: "MIME类型", path: "/javascript/MIME" },
            { title: "树形结构模糊搜索", path: "/javascript/fuzzySearch" },
          ],
        },
      ],
      "/vue/": [
        {
          title: "组件相关",
          collapsable: false, //是否能收起来,
          children: [
            {
              title: "vue2组件传值",
              path: "/vue/components/correspondence",
            },
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
          title: "工具",
          collapsable: false, //是否能收起来,
          children: [
            {
              title: "Vuex",
              path: "/vue/vuex",
            },
            {
              title: "vue-router",
              path: "/vue/vueRouter",
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
      // "/algorithmic/": [
      //   {
      //     title: "题",
      //   },
      // ],
    },
  },
  markdown: {
    lineNumbers: true,
  },
}
