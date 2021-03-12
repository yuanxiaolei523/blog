let str ='123';
// 字符串的遍历
// for (let i of str) {
//     console.log(i);
// }

// for(let i = 0; i < str.length; i++) {
//     console.log(str[i]);
// }

// for (const key in str) {
//     console.log(key);
// }

// 标签模板
// let a = 10;
// let b = 20;
// function add(x, y ,z) {
//     return [x, y ,z]
// }
// // tag`Hello ${ a + b } world ${ a * b }`;
// console.log(add`${ a + b }Hello  world ${ a * b }`);
// console.log(add`abc`);

// raw
// console.log(String.raw`hi\n`); //hi\n

// includes 
// console.log('123'.includes('12'));

//startsWith，endsWith
// console.log(str.startsWith(12), str.endsWith('tr')); // true false

// repeat()
// console.log(str.repeat(3)); // 123123123
// console.log(str.repeat(3.9)); // 123123123

//padStart(length, str), padEnd()
console.log('123'.padStart(-2, 'length')); // l123
console.log('123'.padEnd(4, 'length')); // 123l