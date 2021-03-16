// function test (x = 10, y = 20) {
//     return x + y
// }
// console.log(test());

// function test2(x, x, y ) {
//     console.log(x, y);
// }
// function test3(x, x, y = 10 ) {
//     console.log(x);
// }
// console.log(test2(1,2,3));

// 函数参数的解构赋值
// function test ({x, y = 5} = {x: 1}) {
//     console.log(x, y) // 1, 5
// }
  
//   test ({x: 2, y :10})

/*
// 解构赋值和默认值的比较
function m1({x = 0, y = 0} = {}) {
    console.log([x, y]);
  }
  
  // 写法二
  function m2({x, y} = { x: 0, y: 0 }) {
    console.log([x, y]);
  }
  m1(); // [0, 0]
  m2(); // [0, 0]

  m1({x: 1}) // [1, 0]
  m2({x: 1}) // [1. undefined]

  m1({x: 1, y: 2}); // [ 1, 2 ]
  m2({x: 1, y: 2}); // [ 1, 2 ]

  m1({z: 1}); // [0, 0]
  m2({z: 1}); // [ undefined, undefined]
*/

// 默认值的位置
// function test(x, y =1, z) {
//     console.log(x, y, 2);
// }
// test(1, undefined,2)

/*
// length属性
function test(a, b, c) {
    console.log(0);
}
console.log(test.length);

function test2(a, b, c = 1) {
    console.log(0);
}
console.log(test2.length);

function test3(a, b = 1, d , c = 1, e, f= 1) {
    console.log(0);
}
console.log(test3.length);
*/

/*
// 作用域
var x = 1;
function test(x, y = x) {
    console.log(y); // 2
}
test(2);

var x = 1;
function test(x, y = x) {
    console.log(y); // 2
}
test();

// 声明之前访问
var x = 1;
function test(y = x, x) {
    console.log(y); // 2
}
test(undefined, 2);

var x = 1;
function foo(x, y = function() { x = 2; }) {
  var x = 3;
  y();
  console.log(x);
}

foo() // 3
x // 1

*/

// reset

// function test (...arr) {
//     console.log(arr);
// }
// test(1, 2, 3);

// 严格模式
// function doSomething(value = 070) {
//     'use strict';
//     return value;
// }

// function doSomethine() {
//     "use strict";
//     return function (value = 010) {
//         return value
//     }
// }

// name属性
// function test (...arr) {
//     console.log(arr);
// }
// console.log(test.name);

// let test = function () {
//     console.log(arr);
// }
// console.log(test.name);
// console.log(test.bind(this).name);

//箭头函数
// let test = (v) => v
// let test1 = function (v) {
//     return v;
// }
// console.log(test(1)); // 1
// console.log(test1(2)); // 2

// let test2 = (v1, v2) => {v1: v1, v2: v2} // 报错
// console.log(test(1));

let test1 = (v1, v2) => ({v1: v1, v2: v2})
console.log(test1(2,3));