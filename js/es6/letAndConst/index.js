// {
//     console.log(name, 'inner');
//     let name = 'zhangsan';
// }
// console.log(name);

// 作用域死区
// var temp = 123;
// if (true) {
//     temp = '456';
//     let temp;
// }

// 重复声明
// let name = 'di';
// let name = 'di2';
// console.log(name);

// 块级作用域
// (function (i) {
//     // var i2 = i;
//     console.log(i);
// })(1)
// {
//     let i = 0
//     console.log(i);
// }

// {
//     function getName (name) {
//         console.log(name);
//     }
//     getName('123')
// }

// const
const a = [];
// a.push(12)
a = [12]
console.log(a);