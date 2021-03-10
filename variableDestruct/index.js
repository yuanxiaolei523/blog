// let [a, b, c] = [1,2,3]
// console.log(a,b,c);

// 解构数组
// let [head, ...tail] = [1, 2, 3, 4];
// console.log(head, tail);

// 非正常解构
let [a, [b], d] = [1, [2, 3], 4];
console.log(a, b, d); // 1 2 4