# for of 与 for in

**for in 可以遍历数组和对象 而 for or 只能遍历数组**

**在数组中 ，for in 遍历的是数组的键(索引) ， for of 遍历的是数组的值**

### 遍历数组

**for of**

```js
for (let i of ["a", "b", "c", "d"]) {
  console.log(i); // 输出 'a' 'b' 'c' 'd'
}
```

**for in**

```js
for (let i of ["a", "b", "c", "d"]) {
  console.log(i); // 输出 0 1 2 3
}
```

**对象数组**

**for of**

```js
var arr = [
  { name: "张三", age: 18 },
  { name: "李四", age: 24 },
  { name: "王五", age: 26 },
  { name: "赵六", age: 34 },
];
for (var item of arr) {
  console.log(item);
}
// 结果
// {name: '张三', age: 18}
// {name: '李四', age: 24}
// {name: '王五', age: 26}
// {name: '赵六', age: 34}
```

**for in**

```js
var arr = [
  { name: "张三", age: 18 },
  { name: "李四", age: 24 },
  { name: "王五", age: 26 },
  { name: "赵六", age: 34 },
];
for (var item in arr) {
  console.log(item);
}
// 输出
// 0
// 1
// 2
// 3
```

### 遍历对象

**for in**

```js
var user = {
  0: "张三",
  1: "李四",
  2: "王五",
  3: "赵六",
};

for (var key in user) {
  console.log(key, user[key]);
}
// 0 张三
// 1 李四
// 2 王五
// 3 赵六
```

**for of**

```js
var user = {
  0: "张三",
  1: "李四",
  2: "王五",
  3: "赵六",
};

for (var i of user) {
  console.log(i);
}

// 报错
//VM942:8 Uncaught TypeError: user is not iterable
```

[参考链接](http://www.lucklnk.com/godaddy/details/aid/934120534)
