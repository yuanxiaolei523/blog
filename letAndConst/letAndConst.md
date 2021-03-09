# let and const
## let
### 基本用法
`let name = 'zhangsan'`
### 特点
1. let生命的变量只在当前代码块内有效
```
{
    let name = 'zhangsan';
}
console.log(name); //ReferenceError: name is not defined
```
2. 不存在变量提升
```
{
    console.log(name, 'inner'); // ReferenceError: name is not defined
    let name = 'zhangsan';
}
```
3. 暂时性死区
只要在当前作用域内声明了该变量，那么该变量就不会受外部作用的影响，只会受当前作用域的影响
```
var temp = 123;
if (true) {
    temp = '456'; //ReferenceError: temp is not defined
    let temp; 
}

案例2
typeof x;// ReferenceError: x is not defined
let x ;
```
> 注： 在没有let和const之前，typeof是一个安全的操作，但是有了let、const之后，这个操作就不安全了，在使用let或者const声明变量之前使用typeof、instanceof会报错

4. 相同作用域下不允许重复声明（let目前浏览器的控制台内可以重复声明）
```
let name = 'di';
let name = 'di2';
console.log(name);
```
5. 块级作用域
使用let和const声明的变量都是自带块级作用域的
案例：用于计数的循环变量泄露为全局变量。
## const
const声明一个只读的常量。一旦声明，常量的值就不能改变。

### 基本用法
`const name = 'zhangsan'`
### 特点
const包括let的所有特点，除此之外，const还多了一条特点
1. 使用const声明的变量，其值不能再次修改
2. **使用const声明的变量，在声明时必须初始化**
### 注意
1. 使用const声明的变量, 并不是变量的值不能改变,而是变量指向的那个内存地址所保存的数据不得改动(引用类型)
```
案例1
const a = [];
a.push(12) // [12]

案例2
const a = [];
a = [12] // TypeError: Assignment to constant variable.
```
## 块级作用域
只要有**{}**， 在es6的环境中就可以被认为是块级作用域
### 基本用法
### 特点
1. 函数可以声明在块级作用域
```
{
    function getName (name) {
        console.log(name);
    }
    getName('123')
}
```
2. 函数声明类似于var，即会提升到全局作用域或函数作用域的头部。(只存在于es6的环境中)
3. 函数声明还会提升到所在的块级作用域的头部。(只存在于es6的环境中)
4. 块级作用域内部，优先使用函数表达式。(只存在于es6的环境中)
注意： 
```
案例1
if (true) let x = 1; // Uncaught SyntaxError: Lexical declaration cannot appear in a single-statement context

案例2
'use strict';
if (true)
  function f() {} // Uncaught SyntaxError: 严格模式下，函数只能声明在当前作用域的顶层或者内部
```

## 其他
1. 冻结对象 Object.freeze()
```
const foo = Object.freeze({});

// 常规模式时，下面一行不起作用；
// 严格模式时，该行会报错
foo.prop = 123;

```