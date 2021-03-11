// let [a, b, c] = [1,2,3]
// console.log(a,b,c);

// 解构数组
// let [head, ...tail] = [1, 2, 3, 4];
// console.log(head, tail);

// 非正常解构
// let [a, [b], d] = [1, [2, 3], 4];
// console.log(a, b, d); // 1 2 4

// 解构对象
// let {foo, baz} = {foo: 123, baz: 234}
// console.log(foo, baz);

// 嵌套结构的解构赋值
// let {p: [{x}, {y}]} = {p: [{x:3}, {y : 2}]}
// console.log( x, y);

// let obj = {};
// let arr = [];

// ({foo: obj.name, boz: arr[0]} = { foo: 123, boz: true})
// console.log(obj, arr);

// 默认值
// let {x = 3} = {};
// console.log(x);

// 对象解构赋值数组
// let arr = [1, 2, 3]
// let {0: first} = arr;
// console.log(first) // 1

// 字符串的解构赋值
// let str = 'hello';
// let [a, b, c, d, e] = str;
// console.log(a, b, c, d, e) 

// 函数参数的解构赋值
// function add ([x, y]) {
//     return x + y
// }
// console.log(add([1,2])); // 3

// 函数参数的解构赋值默认值
// function move({x = 0, y = 1} = {}) {
//     console.log(x + y);
// }
// move({x: 2})


// 假的函数参数的解构赋值默认值
function move({x, y} = { x: 0, y: 0 }) {
    return [x, y];
  }
  
  move({x: 3, y: 8}); // [3, 8]
  move({x: 3}); // [3, undefined]
  move({}); // [undefined, undefined]
  move(); // [0, 0]