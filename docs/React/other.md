# 其他

## 渲染包含换行符\n 的字符串

- 使用 React 中的 `dangerouslySetInnerHTML` 属性

```jsx
function MyComponent() {
  const text = '那些喜欢听到循环播放的歌\n\n感谢收听'

  return (
    <div>
      <span dangerouslySetInnerHTML={{ __html: text.replace(/\n/g, '<br>') }} />
    </div>
  )
}
```
