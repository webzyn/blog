# Math 对象

[[toc]]

## 属性

### Math.PI (常数 π)。

```js
Math.PI // 3.141592653589793
```

### Math.E (常数 e)

```js
Math.E // 2.718281828459045
```

### Math.LN2 (2 的自然对数)。

```js
Math.LN2 // 0.6931471805599453
```

### Math.LN10 (10 的自然对数)。

```js
Math.LN10 // 2.302585092994046
```

### Math.LOG2E (以 2 为底的 e 的对数)。

```js
Math.LOG2E // 1.4426950408889634
```

### Math.LOG10E (以 10 为底的 e 的对数)。

```js
Math.LOG10E // 0.4342944819032518
```

### Math.SQRT1_2 (0.5 的平方根)。

```js
Math.SQRT1_2 // 0.7071067811865476
```

### Math.SQRT2 (2 的平方根)。

```js
Math.SQRT2 // 1.4142135623730951
```

## 方法

### Math.floor() 向下取整/下舍入

```js
Math.floor(3.2) // 3
Math.floor(-3.2) // -4
```

### Math.ceil() 向上取整/上舍入

```js
Math.ceil(3.2) // 4
Math.ceil(-3.2) // -3
```

### Math.round() 四舍五入

```js
Math.round(0.1) // 0
Math.round(0.5) // 1
Math.round(0.6) // 1

Math.round(-1.1) // -1
Math.round(-1.5) // -1
Math.round(-1.6) // -2
```

### Math.max() 求最大值

```js
Math.max(2, -1, 5) // 5
Math.max() // -Infinity
```

### Math.min() 求最小值

```js
Math.min(2, -1, 5) // -1
Math.min() // Infinity
```

### Math.random() 获取[0,1)内的随机数

Math.random()返回 0 到 1 之间的一个伪随机数，可能等于 0，但是一定小于 1。

```js
Math.random() // 0.7151307314634323
Math.random() // 0.10765575349280287
```

### Math.abs() 取绝对值

```js
Math.abs(1) // 1
Math.abs(-1) // 1
```

### Math.pow(x,y) 求 x 的 y 次方

```js
Math.pow(2, 2) // 4
Math.pow(2, 3) // 8
```

### Math.sqrt(x) 求 x 的平方根

Math.sqrt 方法返回参数值的平方根。如果参数是一个负值，则返回 NaN。

```js
Math.sqrt(4) // 2
Math.sqrt(-4) // NaN
```

### Math.log() 以 e 为底的自然对数值

```js
Math.log(Math.E) // 1
Math.log(10) // 2.302585092994046
```

### Math.exp() 常数 e 的参数次方

```js
Math.exp(1) // 2.718281828459045
Math.exp(3) // 20.085536923187668
```

## 三角函数方法

### Math.sin()：返回参数的正弦（参数为弧度值）

```js
Math.sin(0) // 0
Math.sin(Math.PI / 2) // 1
```

### Math.cos()：返回参数的余弦（参数为弧度值）

```js
Math.cos(0) // 1
```

### Math.tan()：返回参数的正切（参数为弧度值）

```js
Math.tan(0) // 0
```

### Math.asin()：返回参数的反正弦（返回值为弧度值）

```js
Math.asin(1) // 1.5707963267948966
```

### Math.acos()：返回参数的反余弦（返回值为弧度值）

```js
Math.acos(1) // 0
```

### Math.atan()：返回参数的反正切（返回值为弧度值）

```js
Math.atan(1) // 0.7853981633974483
```
