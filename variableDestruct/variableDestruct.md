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
```js
let { bar, foo } = { foo: 'aaa', bar: 'bbb' };
foo // "aaa"
bar // "bbb"
```
**如果解构失败，则变量的值为undefined**

如果想要对异名变量进行解构赋值，则需要使用一下这种形式
```js
let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"
 这里我们对baz进行了赋值
```
## 注意
1. 如果左边是数组的形式，右边是非数组(不可遍历的解构)，那么将会报错
2. ES6 内部使用严格相等运算符（===），判断一个位置是否有值。所以，只有当一个数组成员严格等于undefined，默认值才会生效。
3. 如果默认值是一个表达式，那么这个表达式是**惰性求值**的，即只有在用到的时候，才会求值。
4. 默认值可以引用解构赋值的其他变量，但该变量必须已经声明。
