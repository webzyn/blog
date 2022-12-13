module.exports = {
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
        text: "uniapp",
        link: "/uniapp/",
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
      // "/javaScript/": [
      //   ["", "Bolb"],
      //   ["MIME", "MIME类型"],
      //   ["fuzzySearch", "树形结构模糊搜索"],
      // ],
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
    },
  },
  markdown: {
    lineNumbers: true,
  },
};
