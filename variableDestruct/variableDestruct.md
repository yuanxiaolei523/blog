# 变量的解构赋值

## 定义
ES6允许按照一定的模式，从数组和对象中提取值，对变量进行赋值，这被称为解构
## 基本用法
### 数组
数组的解构赋值是按照**次序**排列的
```js
let [a, b, c] = [1,2,3]
console.log(a,b,c); // 1 2 3

let [head, ...tail] = [1, 2, 3, 4];
console.log(head, tail);// 1 [ 2, 3, 4 ]

let [x, y, ...z] = ['a'];
x // "a"
y // undefined
z // []
```
#### 默认值
```js
let [foo = true] = [];
foo // true

let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'

```

### set
对于set我们也可以使用解构来进行赋值
```js
let [x, y, z] = new Set(['a', 'b', 'c']);
console.log(x, y , z); // a b c
```
### 对象
而对象的解构赋值，变量必须与属性同名，才能取到正确的值
#### 简单的解构赋值
```js
let { bar, foo } = { foo: 'aaa', bar: 'bbb' }; => let {bar: bar, foo: foo} = { foo: 'aaa', bar: 'bbb' }
foo // "aaa"
bar // "bbb"
```
**如果解构失败，则变量的值为undefined**
#### 异名变量解构赋值
如果想要对异名变量进行解构赋值，则需要使用一下这种形式
```js
let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"
// 这里我们对baz进行了赋值
// 对象的解构赋值先找到同名的属性，然后将其值赋值给等号左边:后面的变量
```

#### 嵌套结构解构赋值
```js
let {p: [{x}, {y}]} = {p: [{x:3}, {y: 2}]}
console.log(x, y); // 3 2
> 注意：此时的p并不会被赋值，他只是一个模式，此时访问p会报错，如果想对p赋值，则可以通过以下这种方式
let {p, p: [{x}, {y}]} = {p: [{x:3}, {y: 2}]}
```
#### 另类的嵌套结构赋值
```js
let obj = {};
let arr = [];

({foo: obj.name, boz: arr[0]} = { foo: 123, boz: true}) // 注意这里的括号
console.log(obj, arr);
```
#### 默认值
默认值生效的条件是，对象的属性值**严格等于**undefined。

```js
let {x = 3} = {};
console.log(x); // 3

var { message: msg = 'Something went wrong' } = {}; // msg => Something went wrong

```
#### 注意

1. 如果解构模式是嵌套的对象，而且**子对象**所在的**父属性**不存在，那么将会报错。
2. 注意，对象的解构赋值可以取到继承的属性。

### 字符串

字符串也可以解构赋值。这是因为此时字符串被转换成了一个**类似数组**的对象。

```js
let str = 'hello';
let [a, b, c, d, e] = str;
log(a, b, c, d, e) //h e l l o
```



### 数值和布尔类型

解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。



### null和undefined的解构赋值

因为null和undefined都不能转换成对象，所以对null和undefined进行解构赋值都会报错



### 函数参数的解构赋值

```js
function add ([x, y]) {
  return x + y
}
add([1,2]) // 3

案例二
[[1,2], [3, 4]].map((a, b) => a + b)
```

#### 函数参数解构赋值的默认值

```
function move({x = 0, y = 1} = {}) {
    console.log(x + y);
}
move({x: 2})
```

特殊情况

```js
function move({x, y} = { x: 0, y: 0 }) {
  return [x, y];
}

move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, undefined]
move({}); // [undefined, undefined]
move(); // [0, 0]
这种是在move的参数指定默认值，如果我们传递了参数{x:3}的话，那么move里面就相当于move({x, y} = {x: 3}), 那么x=3，y=undefined
```



## 注意

1. 如果左边是数组的形式，右边是非数组(不可遍历的解构)，那么将会报错

2. ES6 内部使用严格相等运算符（===），判断一个位置是否有值。所以，只有当一个数组成员严格等于undefined，默认值才会生效。

3. 如果默认值是一个表达式，那么这个表达式是**惰性求值**的，即只有在用到的时候，才会求值。

4. 默认值可以引用解构赋值的其他变量，但该变量必须已经声明。

5. 如果对一个已经声明的变量已经结构赋值，此时一定要注意

   ```
   let x;
   {x} = {x: 3} // 报错
   ```

   js引擎会将{x}理解成一个代码块，所以会有语法错误，所以解决方法就是，不将{至于行首，避免js引擎将其识别为代码块即可，使用()包裹一下就行

6. 由于数组本质是特殊的对象，因此可以对数组进行对象属性的解构

   ```js
   let arr = [1, 2, 3]
   let {0: first} = arr;
   console.log(first) // 1
   ```
7. 尽量不要再模式中使用圆括号
   1. 变量声明语句 let [(x)] = [1]
   2. 赋值语句的模式 ([x]) = [1]
   3. 函数参数 function ([(z)])
8. 可以使用圆括号的情况
   1. 赋值语句的非模式部分[(b)] = 3

