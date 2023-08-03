# css

## flex 布局下文本溢出显示省略号

<img :src="$withBase('/css/1.png')">

```html
<div class="box">
  <div class="left">
    <div class="text">
      文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本文本
    </div>
  </div>
  <div class="right"></div>
</div>
```

```css
.box {
  width: 200px;
  height: 100px;
  border: 1px solid red;
  display: flex;
  .left {
    flex: 1;
    width: 0; /* 重要 */
    .text {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
  .right {
    width: 100px;
    height: 100px;
    background-color: green;
  }
}
```

## 文本溢出显示省略号

### 单行文本

```css
text-overflow: ellipsis;
white-space: nowrap;
overflow: hidden;
```

### 多行文本

```css
display: -webkit-box;
/*! autoprefixer: off */
-webkit-box-orient: vertical;
/* autoprefixer: on */
-webkit-line-clamp: 3;
overflow: hidden;
```

## 纯数字文本无法换行

```css
word-break: break-all;
```
