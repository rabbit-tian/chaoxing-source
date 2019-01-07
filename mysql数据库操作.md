## 数据库操作

·首先要登陆数据库服务器： mysql -u(账号：root) -p(密码)

### 创建数据库

```mysql
---创建数据库
create database sqlName;
---创建带字符集的数据库
create database sqlName character set utf8;
---创建带字符集和校对规则的数据库
create database sqlName character set utf8 collate utf8_bin;
```



### 查看数据库

```mysql
--查看数据库创建方法
show create database sqlName;

--查看所有数据库
show databases;
```



### 修改数据库

```mysql
---修改数据库字符集
alter database sqlName character set utf8
```



### 删除数据库

```mysql
drop database sqlName;
```



### 其他数据库操作

```mysql
---切换数据库
use sqlname;

---查看当前正在使用的数据库
select database();
```



## 表的操作



### 创建表

```mysql
create table 表名{
	列名 列的类型 约束,
	列名1 列的类型 约束
}
列的类型
int char varchar double float boolean date time datetime timestamp text blob

列的约束:
	主键约束： primary key
	唯一约束： unique
	非空约束:  not null
---例子
create table student{
	id int primary key,
	name varchar(30),
	age int
}

```



### 查看表

```mysql
---查看所有表
show tables;
---查看表的创建过程
show create table student;
---查看表的结构
desc student;
```



### 修改表

```mysql
---添加列
alter table student add chengji int not null;
---修改列
alter table student modify age int;
---修改列名
alter table student change chengji cj varchar(2);
---删除列
alter table student drop cj;
---修改表名(rename)
rename table student to human
---修改表的字符集
alter table human character set gbk;
```



### 删除表

```mysql
drop table human;
```





## 操作表中数据



### 插入数据

```mysql
---插入单条
insert into student(id,name,age) values(1,"张三",13);
insert into student values(1,"张三",13);

---批量插入
insert into student values(1,"张三",13),(2,"张三",13),(3,"张三",13)
```



### 删除数据

```mysql
---删除单条数据
delete from student where id=1;
---删除表中所有数据
delete from student;

delete: DML 一条一条删除表中数据
truncate: DDL 先删除表再重建表
	关于那条执行效率高：具体要看表中的数据量
		数据少： delete
		数据多: truncate
```



### 更新数据

```mysql
---修改单个数据
update student set name="李四" where id=1

---修改所有数据
update student set name="李四"
```



### 查询



#### 简单查询

```mysql
---格式
select [distinct] [*] [列名，列名2] from 表名 [where 条件 ]
distinct :去除重复的数据

---简单查询
---查询所有的数据
	select * from student;
---查询列的数据
	select id,name from student
--去掉重复的值
select distinct name from student
```



#### 别名查询

```mysql
---别名查询 as , as可以省略
--表别名
select s.id,s.name from student as s
--列别名
select name as 名字 from student
```



#### 运算查询

```mysql
-- + - * /
select *,age*1.5 from student
```



#### 条件查询

```mysql

---where 后条件写法
	---关系运算符  > >= < <= = != <>
	<> : 不等于
	!= : 不等于
	
	---查询大于24岁的学生
	select * from student where age > 24;
	
	---查询10到24岁之间的 and
	select * from student where age > 10 and age < 24
	select * from student where age between 10 and 24
	
	---或者
	select * from student where age < 10 or age > 24

```



#### 模糊查询

```mysql
---like 关键字
	_:代表一个字符
	%:代表多个字符
---查询带李字的名字
select * from student where name like '%李%';

---查询第二个字是四的名字
select * from student where name like '_四%'

----in在某个范围中取值
select * from student where id in (1,2,3);
```



#### 排序查询

```mysql
---order by 关键字
	asc: ascend 升序(默认)
	desc : descend 降序
	
---默认
select * from student order by id;
---升序
select * from student order by id asc;
---降序
select * from student order by id desc;
```



#### 聚合函数

```mysql
sum()求和
avg()平均数
count()统计数量
max()最大值
min()最小值

---求和
select sum(age) from student; 
---其他参考以上

--注意: where 条件后面不能接聚合函数

--查出年级大于平均年级的所有商品
--子查询
	select * from student where age > (select avg(age) from student);
```



#### 分组

```mysql
---group by
---根据年级分组
select age,count(*) from student group by age;

---having 关键字 可以接聚合函数 出现分组之后
select age,count(*) from student group by age having avg(age) > 20;
```

