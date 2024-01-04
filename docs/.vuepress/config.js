module.exports = {
  base: '/blog/',
  // title: "学习笔记",
  title: 'note',
  // description: "菜鸟进阶之路",
  themeConfig: {
    // 导航栏
    nav: [
      {
        text: '主页',
        link: '/'
      },
      {
        text: 'javascript',
        link: '/javascript/'
      },
      {
        text: 'css',
        link: '/css/'
      },
      {
        text: 'Vue',
        link: '/vue/'
      },
      {
        text: 'Vue3',
        link: '/vue3/'
      },
      {
        text: 'React',
        link: '/React/'
      },
      {
        text:'webpack',
        link:'/webpack/'
      },
      {
        text: 'echarts',
        link: '/echarts/'
      },
      {
        text: 'axios',
        link: '/axios/'
      },
      {
        text: 'uniapp',
        link: '/uniapp/wx/wxml'
      },
      {
        text: 'nodejs',
        link: '/nodejs/fs'
      },
      // {
      //   text: "webpack",
      //   link: "/webpack/",
      // },
      {
        text: 'MySQL',
        link: '/mysql/mysql'
      },
      {
        text: 'markDown',
        link: '/markDown/'
      },
      {
        text: 'git',
        link: '/git/'
      },
      {
        text: '面试',
        link: '/interview/'
      }
      // {
      //   text: "题",
      //   link: "/algorithmic/",
      // },
    ],
    // 侧边栏
    // sidebar: "auto",
    sidebar: {
      '/markDown/': 'auto',
      '/git/': 'auto',
      '/javascript/': [
        {
          title: 'js',
          collapsable: false,
          children: [
            {
              title: 'Array对象',
              path: '/javascript/basis/array'
            },
            {
              title: 'Object对象',
              path: '/javascript/basis/object'
            },
            {
              title: 'String对象',
              path: '/javascript/basis/string'
            },
            {
              title: 'Math对象',
              path: '/javascript/basis/Math'
            },
            {
              title: 'Date对象',
              path: '/javascript/basis/Date'
            },
            {
              title: '四种for循环',
              path: '/javascript/basis/for'
            },
            {
              title: 'new关键字',
              path: '/javascript/basis/new'
            },
            {
              title: '构造函数',
              path: '/javascript/basis/构造函数'
            }
            // {
            //   title: "构造函数继承",
            //   path: "/javascript/basis/构造函数继承",
            // },
          ]
        },
        {
          title: 'ES6',
          collapsable: false, //是否能收起来
          children: [
            {
              title: 'Symbol',
              path: '/javascript/es6/Symbol'
            },
            {
              title: 'set和map',
              path: '/javascript/es6/set_map'
            },
            {
              title: 'set、array、map和object区别',
              path: '/javascript/es6/set_array_map_object'
            },
            {
              title: 'Promise对象',
              path: '/javascript/es6/Promise'
            },
            {
              title: 'Iterator遍历器',
              path: '/javascript/es6/Iterator'
            },
            {
              title: 'for...of循环',
              path: '/javascript/es6/for...of'
            },
            {
              title: 'Generator函数',
              path: '/javascript/es6/Generator'
            },
            {
              title: 'async函数',
              path: '/javascript/es6/async_await'
            },
            {
              title: 'Proxy',
              path: '/javascript/es6/Proxy'
            },
            {
              title: 'Reflect',
              path: '/javascript/es6/Reflect'
            },
            {
              title: 'Class语法',
              path: '/javascript/es6/Class'
            },
            {
              title: 'Class继承',
              path: '/javascript/es6/Class继承'
            }
            // {
            //   title: "四种for循环",
            //   path: "/javascript/basis/for",
            // },
          ]
        },
        {
          title: '其他',
          collapsable: false,
          children: [
            { title: 'Bolb', path: '/javascript/blob' },
            { title: 'MIME类型', path: '/javascript/MIME' },
            { title: '树形结构模糊搜索', path: '/javascript/fuzzySearch' }
          ]
        }
      ],
      '/css/': 'auto',
      '/vue/': [
        {
          title: '基础',
          collapsable: false,
          children: [
            {
              title: '指令',
              path: '/vue/basis/directive'
            },
            {
              title: 'watch和$watch',
              path: '/vue/basis/watch'
            },
            {
              title: 'set和delete',
              path: '/vue/basis/set_delete'
            }
          ]
        },
        {
          title: '组件相关',
          collapsable: false, //是否能收起来,
          children: [
            {
              title: 'vue2组件传值',
              path: '/vue/components/correspondence'
            },
            {
              title: 'slot插槽',
              path: '/vue/components/slot'
            },
            {
              title: 'v-model父子组件间数据双向绑定',
              path: '/vue/components/vModel'
            },
            {
              title: '.sync父子组件间数据双向绑定',
              path: '/vue/components/sync'
            }
          ]
        },
        {
          title: '内置组件',
          collapsable: false,
          children: [
            {
              title: 'component',
              path: '/vue/builtIn/comp'
            },
            {
              title: 'keep-alive',
              path: '/vue/builtIn/keep-alive'
            }
          ]
        },
        {
          title: '工具',
          collapsable: false, //是否能收起来,
          children: [
            {
              title: 'Vuex',
              path: '/vue/tool/vuex'
            },
            {
              title: 'vue-router',
              path: '/vue/tool/vueRouter'
            },
            {
              title: '路由原理',
              path: '/vue/tool/router'
            }
          ]
        },
        {
          title: '原理',
          collapsable: false,
          children: [
            {
              title: '原理',
              path: '/vue/theory/'
            }
          ]
        },
        {
          title: '其他',
          collapsable: false, //是否能收起来,
          children: [
            {
              title: '自定义指令directive',
              path: '/vue/other/directive'
            },
            {
              title: 'v-has和$has(权限按钮判断)',
              path: '/vue/other/v-has'
            },
            {
              title: 'Vue.use和Vue.prototype.$xx区别',
              path: '/vue/other/use'
            }
          ]
        },
        {
          title: '案例',
          collapsable: false,
          children: [
            {
              title: '自定义指令',
              path: '/vue/case/directive'
            },
            {
              title: '页面更新问题',
              path: '/vue/case/pageUpdate'
            },
            {
              title: 'transition',
              path: '/vue/case/transition'
            }
          ]
        }
      ],
      '/vue3/': [
        { title: 'vue3', path: '/vue3/' },
        { title: '常用 Composition API', path: '/vue3/composition' },
        { title: '其他 Composition API', path: '/vue3/otherComposition' },
        { title: '新的组件', path: '/vue3/component' },
        { title: '其他', path: '/vue3/other' }
      ],
      '/React/': [
        { title: 'react入门', path: '/React/' },
        { title: 'jsx语法', path: '/React/jsx' },
        { title: 'react面向组件编程', path: '/React/component' },
        { title: '组件相关扩展', path: '/React/extend.md' },
        { title: 'React Hooks', path: '/React/Hooks' },
        { title: 'react脚手架', path: '/React/scaffold' },
        { title: 'react网络请求', path: '/React/network' },
        { title: 'react router 5', path: '/React/router5.md' },
        { title: 'react router 6', path: '/React/router6.md' },
        { title: 'redux', path: '/React/redux.md' },
        { title: 'react-redux', path: '/React/react-redux.md' },
        { title: 'redux-toolkit', path: '/React/redux-toolkit.md' },
        { title: 'react+ts', path: '/React/react-ts.md' },
        { title: '其他', path: '/React/other.md' }
      ],
      '/webpack/': [
        { title: '概念', path: '/webpack/' },
        { title: '自定义react-webpack', path: '/webpack/my-react-webpack' },
        { title: '自定义vue-webpack', path: '/webpack/my-vue-webpack' },
      ],
      '/echarts/': [
        { title: 'echarts使用', path: '/echarts/' },
        { title: 'option配置项', path: '/echarts/option', collapsable: false },
        {
          title: 'option.series',
          collapsable: false, //是否能收起来
          children: [
            {
              title: 'bar柱状图',
              path: '/echarts/series/bar'
            },
            {
              title: 'pie饼图',
              path: '/echarts/series/pie'
            },
            {
              title: 'line折线图',
              path: '/echarts/series/line'
            },
            {
              title: 'scatter/dot散点图',
              path: '/echarts/series/dot'
            },
            {
              title: 'effectScatter涟漪特效散点图',
              path: '/echarts/series/effectScatter'
            },
            {
              title: 'tree树图',
              path: '/echarts/series/tree'
            }
          ]
        }
      ],
      '/axios/': [
        { title: 'axios', path: '/axios/' },
        { title: 'axios实例', path: '/axios/instance' },
        { title: 'config配置项', path: '/axios/config' },
        { title: 'axios拦截器', path: '/axios/interceptors' },
        { title: 'axios封装', path: '/axios/axios封装' },
        { title: '文件导出', path: '/axios/file' }
      ],
      '/uniapp/': [
        {
          title: 'wx',
          children: [
            { title: 'wxml', path: '/uniapp/wx/wxml' },
            { title: '全局配置与页面配置', path: '/uniapp/wx/globalOption' },
            { title: '网络请求', path: '/uniapp/wx/request' },
            { title: '页面导航', path: '/uniapp/wx/navigation' },
            { title: '页面事件', path: '/uniapp/wx/pageEvent' },
            { title: '生命周期', path: '/uniapp/wx/lifeCycle' },
            { title: 'wxs', path: '/uniapp/wx/wxs' },
            { title: '自定义组件', path: '/uniapp/wx/components' },
            { title: 'API Promise化', path: '/uniapp/wx/apiPromise' },
            { title: '全局数据共享', path: '/uniapp/wx/store' },
            { title: '分包', path: '/uniapp/wx/subpackage' },
            { title: '自定义tabbar', path: '/uniapp/wx/custom-tabbar' }
          ]
        }
      ],
      '/nodejs/': [
        {
          title: 'nodejs基础',
          children: [
            { title: 'fs模块', path: '/nodejs/fs' },
            { title: '__dirname文件所处的目录', path: '/nodejs/__dirname' },
            { title: 'path模块', path: '/nodejs/path' },
            {
              title: 'http模块',
              collapsable: false, //是否能收起来,
              children: [
                {
                  title: '服务器相关概念',
                  path: '/nodejs/http/server'
                },
                {
                  title: '创建web服务器',
                  path: '/nodejs/http/createServer'
                }
              ]
            },
            { title: 'querystring模块', path: '/nodejs/querystring' },
            {
              title: 'Nodejs模块化',
              path: '/nodejs/模块化/module'
            }
          ]
        },
        {
          title: 'express框架',
          collapsable: false, //是否能收起来,
          children: [
            {
              title: 'Express基本使用',
              path: '/nodejs/express/express'
            },
            {
              title: 'Express中的路由',
              path: '/nodejs/express/route'
            },
            {
              title: '中间件',
              path: '/nodejs/express/Middleware'
            },
            {
              title: 'CORS',
              path: '/nodejs/express/port'
            }
          ]
        },
        {
          title: 'mysql模块',
          path: '/nodejs/mysql'
        },
        {
          title: '身份认证',
          path: '/nodejs/information'
        }
      ],
      '/mysql/': [
        {
          title: '数据库基本概念',
          path: '/mysql/mysql'
        }
      ]
      // "/algorithmic/": [
      //   {
      //     title: "题",
      //   },
      // ],
    }
  },
  markdown: {
    lineNumbers: true
  }
}
