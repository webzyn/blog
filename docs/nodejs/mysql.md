# mysql 模块

mysql 模块是托管于 npm 上的第三方模块。它提供了在 Node.js 项目中连接和操作 MySQL 数据库的能力。

## 1. 安装

```
npm install mysql
```

## 2. 配置

在使用 mysql 模块操作 MySQL 数据库之前，**必须先对 mysql 模块进行必要的配置**

```js
// 1．导入mysql模块
const mysql = require( " mysql')
// 2．建文与MySQL 数据库的连接
const db = mysql.createPool({
  host: '127.0.0.1',    //数据库的IP地址
  user: 'root',         //登录数据库的账号
  password: 'admin123'，//登录数据库的密码
  database: 'my_db_01'  //指定要操作哪个数据库
})
```

## 3. 测试 mysql 模块是否正常工作

调用 db.query()函数，指定要执行的 SQL 语句，通过回调函数拿到执行的结果:

```js
//检测mysql模块能否正常工作
db.query("SELECT 1", (err, results) => {
  if (err) return console.log(err.message);
  //只要能打印出[ RowDataPacket { '1':1}]的结果，就证明数据库连接正常
  console.log(results);
});
```

## 4. 操作 MySQL 数据库

### 4.1 查询数据

```js
// 查询users表中所有的数据
const sqlStr = "select * from users";
db.query(sqlStr, (err, result) => {
  // 查询数据失败
  if (err) return console.log(err.message);
  // 查询数据成功
  console.log(result);
});
```

如果执行的是 select 查询语句，则 result 是数组

### 4.2 插入数据

**方法一**

```js
// 向users表中新增一条数据
// 1．要插入到users表中的数据对象
const user = { username: "Spider-Man", password: "pcc321" };
// 2．定义待执行的SQL语句，其中英文的?表示占位符
const sqlStr = "INSERT INTO users (username,password) VALUES (?,?)";
// 3．使用数组的形式，依次为?占位符指定具体的值
db.query(sqlStr, [user.username, user.password], (err, results) => {
  if (err) return console.log(err.message); //失败
  if (results.affectedRows === 1) console.log("插入数据成功"); //成功
});
```

如果执行的是 insert into 语句，则 result 是一个对象\
可以通过 affectedRows 属性来判断是否插入数据成功

**方法二**

```js
const user = { username: "Spider-Man2", password: "pcc4321" };
// 定义待执行的SQL语句
const sqlStr = "insert into users set ?";
// 执行SQL语句
db.query(sqlStr, user, (err, result) => {
  if (err) return console.log("执行SQL失败", err.message);
  if (result.affectedRows === 1) console.log("插入数据成功");
});
```

### 4.3 更新数据

**方法一**

```js
const user = { id: 5, username: "aaa", password: "000" };
// 定义SQL语句
const sqlStr = "update users set username=?,password=? where id=?";
// 执行SQL语句
db.query(sqlStr, [user.username, user.password, user.id], (err, result) => {
  if (err) return console.log(err);
  if (result.affectedRows === 1) console.log("更新成功");
});
```

执行了 update 语句后,执行的结果是一个对象,可以通过 affectedRows 判断是否更新成功

**方法二**

```js
// 1．要更新的数据对象
const user = { id: 5, username: "aaaaa", password: "00000" };
// 2．要执行的SQL语句
const sqlStr = "update users set ? where id=?";
// 3．调用db.query()执行SQL语句的同时，使用数组依次为占位符指定具体的值
db.query(sqlStr, [user, user.id], (err, results) => {
  if (err) return console.log(err.message); //失败
  if (result.affectedRows === 1) console.log("更新数据成功"); // 成功
});
```

### 4.4 删除数据

删除数据时，推荐根据 id 这个唯一标识来删除对应的数据

```js
// 1．要执行的SQL语句
const sqlStr = "DELETE FROM users WHERE id=?";
// 2．调用db.query()执行SQL语句的同时，为占位符指定具体的值
db.query(sq1Str, 4, (err, results) => {
  if (err) return console.log(err.message); //失败
  if (results.affectedRows === 1) {
    console.log("删除数据成功!");
  } //l成功
});
```

执行 delete 语句后,results 是一个对象，包含一个 affectedRows 属性

如果 SQL 语句中有多个占位符，则必须使用数组为每个占位符指定具体的值\
如果 SQL 语句中只有一个占位符，则可以省略数组

### 4.5 标记删除

使用 DELETE 语句，会把真正的把数据从表中删除掉。为了保险起见，**推荐使用标记删除**的形式，来**模拟删除的动作**.\
所谓的标记删除，就是在表中设置类似于 status 这样的**状态字段**，来**标记**当前这条数据是否被删除。\
当用户执行了删除的动作时，我们并没有执行 DELETE 语句把数据删除掉，而是执行了 UPDATE 语句，将这条数据对应的 status 字段标记为删除即可。

```js
//标记删除:使用UPDATE语句替代 DELETE语句;只更新数据的状态，并没有真正删除
const sqlStr = "update users set status=? where id=?";
db.query(sqlStr, [1, 5], (err, results) => {
  if (err) return console.log(err.message);
  if (results.affectedRows === 1) console.log("标记删除成功");
});
```
