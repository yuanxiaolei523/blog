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
   function test2(x, x, y ) {
       console.log(x); 
   }
   // 报错
   function test3(x, x, y = 10 ) {
       console.log(x);
   }
   ```

3. 参数默认值是惰性求值的