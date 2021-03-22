# function

## function的默认值

### ES6之前

ES6之前不能直接为函数的参数赋默认值，只能通过下面这种变通的方法来进行

```js
function test (x, y) {
    x = x || 10;
    y = y || 20;
    return x + y
}
console.log(test());j
```

但是这种方法会有缺点，如果x或者y赋值了false或者''等值为falsy的时，会直接读取默认值了，虽然我们可以通过判断x是否为undefined来解决，但是我们还是不希望写这些烦杂的代码

### ES6

ES6之后，可以直接为函数的形参赋默认值了

```js
function test (x = 10, y = 20) {
    return x + y
}
console.log(test());
```

#### 优点

1. 阅读者可以立即知道哪些参数是可以省略的
2. 有利于将来的代码优化，即使彻底拿掉这个参数也不会报错

### 注意

1. 函数的参数是默认声明的，不能再函数体内使用let或者const再次声明

2. 使用参数默认值时，函数不能有同名参数

   ```js
   // 不报错
   function test2(x, x, y ) {// 后面的会将前面的参数覆盖
       console.log(x, y);  // 2, 3
   }
   // 报错
   function test3(x, x, y = 10 ) {
       console.log(x);
   }
   ```

3. 参数默认值是惰性求值的

### 与解构赋值结合使用

#### 对象的解构赋值

```js
function test ({x, y=5}) {
	console.log(x, y) // 1,2 
}
test ({x: 1, y: 2})
test ({x: 1}) // 1, 5
foo() // TypeError: Cannot read property 'x' of undefined
```

上面我们可以看到，不给test传参的时候，就会报错，这时我们可以通过默认值的解构赋值来解决

#### 函数参数默认值的解构赋值

```js
function test ({x, y = 5} = {x: 1}) {
  console.log(x, y) // 1, 5
}

test () // 1, 5
test ({x: 2, y :10}) // 2, 10
```

#### test

问：以下两种写法有什么不同

```js
// 写法一
function m1({x = 0, y = 0} = {}) {
  return [x, y];
}

// 写法二
function m2({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}
```

答：第一种方式是对变量进行的解构赋值，当你调用函数的时候，如果不传值，或者传入一个对象，对象内没有x、y属性，那么x、y也会有默认值，第二种式对函数的形参设置默认值，第二种如果你调用函数，不传值的时候，x、y会有默认值，当传入值的时候，x、y就是undefined了
```js
  m1(); // [0, 0]
  m2(); // [0, 0]

  m1({x: 1}) // [1, 0]
  m2({x: 1}) // [1. undefined]

  m1({x: 1, y: 2}); // [ 1, 2 ]
  m2({x: 1, y: 2}); // [ 1, 2 ]

  m1({z: 1}); // [0, 0]
  m2({z: 1}); // [ undefined, undefined ]
```
### 参数默认值的位置
通常情况下。定义了默认值的参数，都应该是函数的尾参数
```js
function test(x, y =1, z) {
    console.log(x, y, 2);
}
test(1, undefined, 2)
```
如果定义了默认值的参数，不是尾参数，那么想给第三个参数赋值、第二值使用默认值的时候，就必须需要给第二个参数设置为**undefined**，否则会报错，**null**也不行

### length属性
#### 没有指定参数的默认值的情况
如果没有指定函数参数的默认值时，函数的length属性表明的是函数参数的个数
```js
function test(a, b, c) {
    console.log(0);
}
console.log(test.length); // 3
```
#### 具有默认值的参数是尾参数的情况
如果指定了函数参数的默认值时，那么函数的length属性表明的就是没有指定默认值的参数的个数
```js
function test2(a, b, c = 1) {
    console.log(0);
}
console.log(test2.length); // 2
```

#### 具有默认值的参数不是尾参数的情况
此时length属性只会计算具有默认值的参数之前的参数的个数了
```js
function test3(a, b = 1, d , c = 1) {
    console.log(0);
}
console.log(test3.length); // 1
```
### 作用域
一旦设置了参数的默认值时，在函数进行声明初始化时，参数会形成一个**单独**的作用域，等初始化结束，这个作用域就会消失

```js
var x = 1;
function test(x, y = x) {
    console.log(y); // 2
}
test(2); 
```
因为在y之前已经声明了x了，所以此时调用函数的时候会形成一个单独的作用域，在这个作用域里y=x，取得就是形参x

```js
var x = 1;
function test(y = x) {
    let x = 3;
    console.log(y, x); // 1
}
test();
```
因为在函数的单独的形参作用域中没有声明x，所以会去父级作用域中寻找，此时找到x = 1

在函数形参中，如果在**声明之前去访问，会报错**
```js
var x = 1;
function test(y = x, x) {
    console.log(y);
}
test(undefined, 2); // ReferenceError: x is not defined
```

#### case

**case1:**

```js
var x = 1;
function foo(x, y = function() { x = 2; }) {
  var x = 3;
  y();
  console.log(x);
}

foo() // 3
x // 1
```
**解释**
首先函数外层声明一个变量x，然后执行foo，foo执行过程中，其形参会形成一个单独的作用域,此时作用域为空{}，然后此时形参x进入作用域
{let x = undefined;},之后将y push进作用域内，此时作用域内就是下面这个样子了
{
    let x = undefined;
    let y = function () {
        x = 2
    }
}
所以可以看出，y内访问的x其实是当前作用域内的形参x
后续在foo内声明了变量x并赋值为3，执行y之后，将形参的x变为2了，console.log(x) 打印的是foo内声明的x，所以其值为3,至于外层的x，压根没有做改变，所以其值还是1

**case2**
```js
var x = 1;
function foo(x, y = function() { x = 2; }) {
  x = 3;
  y();
  console.log(x);
}

foo() // 2
x // 1
```
**解释**
这个和上面那个不同的是，foo内没有再次声明变量x了，所以此时对x进行赋值，其实修改的是形参x，然后又调用y，又把x赋值成2了，然后console.log(x)打印的还是形参x，所以结果是2，至于外层的x，没有做过任何修改
## 注意点：
1. 函数的参数实际上可以理解为是以let声明的变量，重复声明还是会报错的

## reset参数
ES6引入了reset参数，用于获取函数的多余参数，这样就不需要arguments对象了，reset参数搭配的变量就是一个数组，将改函数多余的参数放进去
```js
function test (...arr) {
    console.log(arr);
}

test(1, 2, 3);// [ 1, 2, 3 ]
```
## 严格模式
ES2016 做了一点修改，规定只要**函数参数**使用了默认值、解构赋值、或者扩展运算符，那么**函数内部**就不能显式设定为严格模式，否则会报错。
**原因:**函数内部的严格模式，同时适用于函数体和函数参数。但是，函数执行的时候，先执行函数参数，然后再执行函数体。这样就有一个不合理的地方，只有从函数体之中，才能知道参数是否应该以严格模式执行，但是参数却应该先于函数体执行。
```js
function doSomething(value = 070) {
  'use strict';
  return value;
}
```
上面的函数执行会报错（SyntaxError: Illegal 'use strict' directive in function with non-simple parameter list），这是因为函数的参数是以0开头的(八进制)，但是严格模式下已经禁止八进制以0开头了，所以会报错

### 解决方法
1. 全局的严格模式
2. 通过函数内部返回匿名函数的方式
```js
function doSomethine() {
    "use strict";
    return function (value = 010) {
        return value
    }
}
```
执行函数的时候报错：0不能用于严格模式中

## name属性
ES6中将name属性写入了标准，通过name属性我们可以得知当前函数的名字
```js
function test (...arr) {
    console.log(arr);
} 
console.log(test.name); // test

let test = function () {
    console.log(arr);
}
console.log(test.name);// test
```
与ES5不同的是，ES5中如果将一个匿名函数赋值给一个变量，那么他的name属性为空，但是es6中可以正常返回
### 使用Function构造函数返回的实例
使用Function构造函数返回的实例的name属性，其值是匿名的
(new Function).name // "anonymous"

### 使用bind函数之后的name属性
使用bind函数之后的name属性，其值会在函数名前加上bound
```js
let test = function () {
}
console.log(test.bind(this).name);// bound test
```
## 箭头函数
ES6中支持箭头函数了
```js
let test = v => v

let test1 = function (v) {
    return v;
}
console.log(test(1)); // 1
console.log(test1(2)); // 2
```
上面这两种方式等同
如果当前箭头函数**不需要参数或者需要多个参数**，则可以使用一个圆括号代表参数部分
```js
let test = () => 1
```

如果箭头函数的函数体超过一条语句，则需要使用大括号将它们括起来，并且使用return语句返回。
```js
let test = (v1, v2) => {
    console.log(v1, v2);
    return v1 + v2;
}
```
使用箭头函数返回一个对象
```js
let test2 = (v1, v2) => {v1: v1, v2: v2}
```
这种会直接报错，因为js会将{}当做代码块，所以上述代码会直接报错，所以如果在箭头函数中返回一个对象，需要在外面加一层();
```js
let test2 = (v1, v2) => ({v1: v1, v2: v2})// { v1: 2, v2: 3 }

```
### 优点
1. 使得函数看起来更加简洁
2. 简化回调函数

### 注意：
1. 箭头函数内没有this，或者箭头函数的this是定义时所在的对象，不是使用时所在的对象(不能使用call、apply、bind)
2. 箭头函数内不能使用arguments
3. 箭头函数不可以当做构造函数(不能使用new.target)
4. 箭头函数不能使用yield命令
### 不适应场合
1. 定义对象内部的函数时
2. 动态this