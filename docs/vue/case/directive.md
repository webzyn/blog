### 1、实现可拖拽宽度的 el-dialog 的自定义指令 v-dragDialogWidth

- 拖拽 el-dialog 右边框，使其可拉宽宽度

```js
// src/common/dragDialogWidth/index.js
import Vue from 'vue'

const dragDialogWidth = {
  bind(el, binding, vnode) {
    const dragDom = el.querySelector('.el-dialog')
    // 容器初始宽度
    const initWidth = Number(dragDom.style.width.replace('px', ''))

    // 添加可拖拽对象
    const lineEl = document.createElement('div')
    lineEl.style =
      'width: 5px; background: inherit; height: 100%; position: absolute; right: 0; top: 0; bottom: 0; margin: auto; z-index: 1; cursor: w-resize;'

    lineEl.addEventListener(
      'mousedown',
      ee => {
        // ee 鼠标按下时的事件对象
        // 拖动时容器初始宽度
        const initDragDomWidth = Number(dragDom.style.width.replace('px', ''))
        document.onmousemove = function (e) {
          // e 鼠标拖动时的事件对象
          e.preventDefault() // 移动时禁用默认事件
          // ee.clientX 鼠标按下时指针距离可视区最左边的距离
          // e.clientX 鼠标拖动时指针距离可视区最左边的距离
          // 向右拖动1px，容器宽度需要增加2px，需要*2
          const x = (e.clientX - ee.clientX) * 2 + initDragDomWidth

          if (e.clientX >= window.innerWidth * 0.9) {
            // 鼠标拖动到可视区最右边时，容器宽度为可视区宽度,防止拖出可视区
            // window.innerWidth 可视区域宽度
            // 当鼠标移动到可视宽度的90%时，鼠标距离最右边为10%，所以容器距离最右边为10%，容器距离左边也为10%，所以需要减去20%
            dragDom.style.width = `${window.innerWidth * 0.8}px`
          } else if (x <= initWidth) {
            // 设置最小宽度
            dragDom.style.width = `${initWidth}px`
          } else {
            dragDom.style.width = `${x}px`
          }
        }
        document.onmouseup = function (e) {
          document.onmousemove = null
          document.onmouseup = null
        }
      },
      false
    )
    dragDom.appendChild(lineEl)
  },
  update(el, binding, vnode) {
    Vue.nextTick(() => {
      // 设置el-upload上传组件拖拽容器宽度
      const elUploadDom = el.querySelector('.el-upload')
      const elUploadDraggerDom = el.querySelector('.el-upload-dragger')

      if (elUploadDom && elUploadDraggerDom) {
        elUploadDom.style.width = '100%'
        elUploadDraggerDom.style.width = '100%'
      }
    })
  }
}

const install = function (Vue) {
  Vue.directive('dragDialogWidth', dragDialogWidth)
}

export default install

// main.js
import dragDialogWidth from '@/common/dragDialogWidth'
Vue.use(dragDialogWidth)
```
