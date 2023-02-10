# MySQL 基本概念

数据库(database)是用来**组织、存储和管理**数据的仓库。

**DataType 数据类型**

① **int** 证书\
② **varchar(len)** 字符串\
③ **tinyint(1)** 布尔值

**字段的特殊标识**

① PK (Primary Key) **主键、唯一标识**\
② NN (Not Null) **值不允许为空**\
③ UQ (Unique) **值唯一**\
④ AI (Auto Increment) **值自动增长**

## 1 SQL

SQL(英文全称: Structured Query Language)是`结构化查询语言`，专门用来**访问和处理数据库**的编程语言。能够让我们`以编程的形式，操作数据库里面的数据`。

三个关键点:\
① SQL 是一门`数据库编程语言`\
② 使用 SQL 语言编写出来的代码，叫做 `SQL 语句`\
③ SQL 语言`只能在关系型数据库中使用`（例如 MySQL、Oracle、SQL Server)。非关系型数据库（例如 Mongodb)不支持 SQL 语言

### 1.1 SELECT 语句

SELECT 语句用于从表中**查询数据**。执行的结果被存储在一个**结果表**中（称为`结果集`)

```sql
-- 这是注释
-- 从 FROM指定的【表中】，查询出【所有的】数据。* 表示【所有列】
SELECT * FROM 表名称

-- 从FROM指定的【表中】，查询出指定列名称(字段)的数据。
SELECT 列名称 FROM 表名称
```

注意:SQL 语句中的关键字对大小写不敏感。SELECT 等效于 select，FROM 等效于 from。

### 1.2 INSERT INTO 语句

**INSERT INTO**语句用于`向数据表中`**插入新的数据行**

```sql
-- 向指定的表中，插入如下几列数据，列的值通过values ——指定
-- 注意: 列和值要——对应，多个列和多个值之间，使用英文的逗号分隔
INSERT INTO 表名(列1，列2,... ) VALUES (值1，值2,... . )
```

### 1.3 UPDATA 语句

`Update`语句用于**修改表中的数据**。

```sql
-- 1. 用 UPDATE 指定要更新哪个表中的数据
-- 2. 用 SET 指定列对应的新值
-- 3. 用 WHERE 指定更新的条件
UPDATE 表名称 SET 列名称 = 新值 WHERE 列名称 = 某值
UPDATE 表名称 SET 列名称1=新值1,列名称2=新值2 WHERE 列名称 = 某值
```

### 1.4 DELETE 语句

```sql
-- 从指定的表中，根据 WHERE 条件，删除对应的数据行
DELETE FROM 表名称 WHERE 列名称=值
```

### 1.5 WHERE 子句

WHERE 子句用于`限定选择的标准`。在**SELECT、UPDATE、DELETE**语句中，皆可使用 WHERE 子句来限定选择的标准

```sql
--查询语句中的 WHERE条件
SELECT 列名称 FROM 表名称 WHERE 列 运算符 值
--更新语句中的WHERE条件
UPDATE 表名称 SET 列=新值 wHERE 列 运算符 值
-- 删除语句中的 WHERE条件
DELETE FROM 表名称 WHERE 列 运算符 值
```

### 1.6 可在 WHERE 子句中使用的运算符

| 操作符   | 描述         |
| -------- | ------------ |
| =        | 等于         |
| <> 或 != | 不等于       |
| >        | 大于         |
| <        | 小于         |
| >=       | 大于等于     |
| <=       | 小于等于     |
| BETWEEN  | 在某个范围内 |
| LIKE     | 搜索某种模式 |

### 1.7 AND 和 OR 运算符

AND 和 OR 可在 `WHERE 子语句`中`把两个或多个条件结合起来`。\
AND 表示**必须同时满足多个条件**，相当于 JavaScript 中的&&运算符，例如 if (a !== 10 && a !== 20)
OR 表示**只要满足任意一个条件**即可，相当于 JavaScript 中的运算符，例如 if(a !== 10| la !== 20)

```sql
-- 查询显示所有状态为0并且id小于等于3的用户
select * from users where status=0 and id<3
```

<img :src="$withBase('/mysql/mysql_1.png')">

```sql
-- 使用OR来显示所有状态为1 或username为 zs的用户
select * from users where status=1 or username='zs'
```

<img :src="$withBase('/mysql/mysql_2.png')">

### 1.9 ORDER BY 子句

ORDER BY 语句用于`根据指定的列`**对结果集进行排序**。\
ORDER BY 语句**默认**按照**升序**对记录进行排序,关键字**ASC**。\
如果您希望按照**降序**对记录进行排序，可以使用**DESC**关键字。

```sql
-- 对users表中的数据 按照 status 字段进行升序排序
select * from users order by status
select * from users order by status asc
```

<img :src="$withBase('/mysql/mysql_3.png')">

```sql
-- 对users表中的数据 按照 id 字段进行降序排序
select * from users order by id desc
```

<img :src="$withBase('/mysql/mysql_4.png')">

---

**ORDER BY 多重排序**

```sql
-- 对users标中的数据，先按照status进行降序排序，再按照username字母的顺序进行升序排序
select * from users order by status desc,username asc
```

<img :src="$withBase('/mysql/mysql_5.png')">

### 1.10 COUNT(\*)函数

COUNT(\*)函数用于返回查询结果的**总数据条数**

```sql
select count(*) from 表名称
```

### 1.11 使用 AS 为列设置别名

```sql
select username as uname,password as pwd from users
```

<img :src="$withBase('/mysql/mysql_6.png')">
