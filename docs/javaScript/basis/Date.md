# Date 对象

[[toc]]

## new Date() 实例化一个日期对象

- 1、直接通过 new Date()获取当前时间

```js
var time = new Date() // Mon Feb 20 2023 20:44:23 GMT+0800 (中国标准时间)
```

- 1、传一个数字表示毫秒数

```js
var time = new Date(2000)
console.log(time) // Thu Jan 01 1970 08:00:02 GMT+0800 (中国标准时间)
```

- 2、传两个数字(第一个表示年，第二个表示月份)

**注意：JS 中月份从 0 开始，0 表示 1 月，11 表示 12 月**

```js
var time = new Date(2019, 00)
console.log(time) // Tue Jan 01 2019 00:00:00 GMT+0800 (中国标准时间)
```

- 3、传递三个数字(分别表示年、月、日)

```js
var time = new Date(2019, 1, 20)
console.log(time) // Wed Feb 20 2019 00:00:00 GMT+0800 (中国标准时间)
```

- 4、传递六个数字(分别表示年、月、日、时、分、秒)

```js
var time = new Date(2020, 4, 20, 19, 20, 30)
console.log(time) // Wed May 20 2020 19:20:30 GMT+0800 (中国标准时间)
```

- 5、传递时间字符串

  - 完整时间字符串

  ```js
  var time = new Date("2022-05-20 10:10:10")
  console.log(time) // Fri May 20 2022 10:10:10 GMT+0800 (中国标准时间)
  var time2 = new Date("2022/05/20 10:10:10")
  console.log(time2) // Fri May 20 2022 10:10:10 GMT+0800 (中国标准时间)
  ```

  - 只写年月日,不写时分秒,且年月日用-拼接

    - 1）、如果月份是个位数，且前缀为 0 的情况下，得到的时间会多出 8 小时；

    - 2）、如果月份是两位数，但号数是个位数且前缀为 0 的话，得到的时间也会多出八小时。

  ```js
  // 得到的时间会多出八小时
  var time = new Date("2022-02-12") // Sat Feb 12 2022 08:00:00 GMT+0800 (中国标准时间)
  // 得到的时间 不 会多出八小时
  var time2 = new Date("2022-2-12") // Sat Feb 12 2022 00:00:00 GMT+0800 (中国标准时间)
  // 得到的时间会多出八小时
  var time3 = new Date("2022-12-02") // Fri Dec 02 2022 08:00:00 GMT+0800 (中国标准时间)
  // 得到的时间 不 会多出八小时
  var time4 = new Date("2022-12-2") // Fri Dec 02 2022 00:00:00 GMT+0800 (中国标准时间)
  ```

- 6、传入一个日期对象，表示复制时间对象

```js
var time1 = new Date("2022-05-20 13:14:15")
var time2 = new Date(time1)
console.log(time1) // Fri May 20 2022 13:14:15 GMT+0800 (中国标准时间)
console.log(time2) // Fri May 20 2022 13:14:15 GMT+0800 (中国标准时间)
```

## get 方法

### getFullYear() 获取当前年份

```js
var date = new Date()
console.log(date.getFullYear()) // 2023
```

### getMonth() 获取当前月份

**月份是从 0 开始的[0-11]**

```js
console.log(new Date().getMonth()) // 1 => 2月 => 月份是从0开始的
```

### getDate() 获取当前是几号

```js
console.log(new Date().getDate()) // 20
```

### getDay() 获取当前是周几

**周日是 0，周一至周六是 1-6**

```js
console.log(new Date().getDay()) // 1 => 周日是0，周一至周六是1-6
```

### getHours 获取当前的小时

```js
console.log(new Date().getHours()) // 21
```

### getMinutes() 获取分钟

```js
console.log(new Date().getMinutes()) // 9
```

### getSeconds() 获取秒数

```js
console.log(new Date().getSeconds()) // 44
```

### getMilliseconds() 获取毫秒数

```js
console.log(new Date().getMilliseconds()) // 802
```

### getTime() 获取时间戳

1970 年 1 月 1 日 00 时:00 分 至今的毫秒数

```js
console.log(new Date().getTime()) // 1676898898678
```

## set 方法

### setFullYear() 设置年份

```js
var date = new Date()
console.log(date) // Mon Feb 20 2023 21:18:42 GMT+0800 (中国标准时间)

date.setFullYear(2025)
console.log(date) // Thu Feb 20 2025 21:18:42 GMT+0800 (中国标准时间)
```

### setMonth() 设置月份

```js
var date = new Date()
console.log(date) // Mon Feb 20 2023 21:20:05 GMT+0800 (中国标准时间)

date.setMonth(6)
console.log(date) // Thu Jul 20 2023 21:20:05 GMT+0800 (中国标准时间)
```

### setDate() 设置几号

```js
var date = new Date()
console.log(date) // Mon Feb 20 2023 21:21:22 GMT+0800 (中国标准时间)

date.setDate(25)
console.log(date) // Sat Feb 25 2023 21:21:22 GMT+0800 (中国标准时间)
```

### setHours() 设置小时

```js
var date = new Date()
console.log(date) // Mon Feb 20 2023 21:22:31 GMT+0800 (中国标准时间)

date.setHours(23)
console.log(date) // Mon Feb 20 2023 23:22:31 GMT+0800 (中国标准时间)
```

### setMinutes() 设置分钟

```js
var date = new Date()
console.log(date) // Mon Feb 20 2023 21:23:44 GMT+0800 (中国标准时间)

date.setMinutes(55)
console.log(date) // Mon Feb 20 2023 21:55:44 GMT+0800 (中国标准时间)
```

### setSeconds() 设置秒

```js
var date = new Date()
console.log(date) // Mon Feb 20 2023 21:24:24 GMT+0800 (中国标准时间)

date.setSeconds(55)
console.log(date) // Mon Feb 20 2023 21:24:55 GMT+0800 (中国标准时间)
```

### setMilliseconds() 设置毫秒

```js
var date = new Date()
console.log(date) // Mon Feb 20 2023 21:25:08 GMT+0800 (中国标准时间)

date.setMilliseconds(55)
console.log(date) // Mon Feb 20 2023 21:25:08 GMT+0800 (中国标准时间)
```

### setTime() 设置时间戳

```js
var date = new Date()
console.log(date) // Mon Feb 20 2023 21:30:12 GMT+0800 (中国标准时间)
console.log(date.getTime()) // 1676899812411

date.setTime(1676800000000)
console.log(date) // Sun Feb 19 2023 17:46:40 GMT+0800 (中国标准时间)
```

## 日期格式化

```js
let now = new Date() // Mon Feb 20 2023 21:27:07 GMT+0800 (中国标准时间)

timeFormat(now) // '2023年02月20日 21:27:07 星期一'

function timeFormat(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var dte = date.getDate()
  var hours = date.getHours()
  var minutes = date.getMinutes()
  var seconds = date.getSeconds()
  var day = date.getDay()
  month < 10 && (month = "0" + month)
  hours < 10 && (hours = "0" + hours)
  minutes < 10 && (minutes = "0" + minutes)
  seconds < 10 && (seconds = "0" + seconds)
  var dayarr = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
  ]
  return (
    year +
    "年" +
    month +
    "月" +
    dte +
    "日 " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds +
    " " +
    dayarr[day]
  )
}
```
