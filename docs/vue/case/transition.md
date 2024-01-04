# transition 动画

- 鼠标移入，弹框逐渐显示，箭头旋转

<img :src="$withBase('/vue/case/3.png')">
<img :src="$withBase('/vue/case/4.png')">

```vue
<template>
  <div>
    <div class="search-content" @mouseenter="setShowAllSearch(true)" @mouseleave="setShowAllSearch(false)">
      <!-- 按钮，其余略 -->
      <i class="icon el-icon-arrow-down" :class="{ 'icon-arrow': showAllSearch }"></i>

      <transition name="fade">
        <el-card class="box-card" v-show="showAllSearch">
          <!-- 弹框 -->
        </el-card>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showAllSearch: false
    }
  },
  methods: {
    setShowAllSearch(flag) {
      this.showAllSearch = flag
    }
  }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

/* 箭头样式 */
.el-icon-arrow-down {
  transition: transform 0.5s;
}
.icon-arrow {
  transform: rotate(180deg);
}

.search-content {
  position: relative;
  background-color: #fff;
  height: 100%;
  width: 31%;
  border-radius: 24px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid transparent;
}
.box-card {
  position: absolute;
  width: 100%;
  left: 0;
  top: 50px;
  border-radius: 24px;
  border-top: 2px solid transparent;
  z-index: 99;
}
</style>
```
