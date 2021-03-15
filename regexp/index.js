// ES5构造函数1
// let reg = new RegExp('abc', 'i');
// console.log(reg);

// ES5构造函数2
// let reg2 = new RegExp(/abc/i);
// console.log(reg2);

// ES6构造函数
// let reg3 = new RegExp(/abc/ig, 'g');
// console.log(reg3);
// console.log(reg3.flags);

let str = 'baaaa_aaa_aa'
// y falg
// let reg4 = /a+/y;
// let reg5 = /a+/g;

// console.log(reg4.lastIndex = 1);
// console.log(reg4.exec(str));
// console.log(reg4.exec(str));
// console.log(reg4.exec(str));

// console.log(reg5.exec(str));
// console.log(reg5.exec(str));
// console.log(reg5.exec(str));

// s flag
// console.log(/foo.bar/.test('foo\nbar')); // false
// console.log(/foo.bar/s.test('foo\nbar')); // true

// dotAll 属性
// console.log(/foo.bar/s.dotAll); //true

// 只匹配%前面的数字 先行断言
// console.log(/\d+(?=%)/.test('100%_ada')); // true
// console.log(/\d+(?=%)/.test('100——%_ada')); // false


// 先行否定断言 匹配不在%前面的数字
// console.log(/\d+(?!%)/.exec('100%_ada'));
// console.log(/\d+(?!%)/.exec('that’s all 44% of them'));                // ["44"]

// 后行断言 匹配在$后面的数字
// console.log(/(?<=\$)\d+/g.exec('1234$123'));
// console.log(/(?<=\$)\d+/g.exec('$+123'));

// 后行否定断言 匹配不在$后面的数字
// console.log(/(?<!\$)\d+/g.exec('1234$12333'));
// console.log(/(?<!\$)\d+/g.exec('1234$_12333'));


// 具名组匹配
// const RE_DATE = /(\d{4})-(\d{2})-(\d{2})/;
// const matchObj = RE_DATE.exec('1999-12-31');
// console.log(matchObj);

// const RE_DATE = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;

// const matchObj = RE_DATE.exec('1999-12-31');
// console.log(matchObj);

// 具名组的引用
// let reg = /(?<word>[a-z]+)!\k<word>/g;
// console.log(reg.exec('abc!abcd')); // true


// matchAll

var regex = /t(e)(st(\d?))/g;
var string = 'test1test2test3';

// var matches = [];
// var match;
// while (match = regex.exec(string)) {
//   matches.push(match);
// }

// console.log(matches);

console.log(string.matchAll(regex));
for (const match of string.matchAll(regex)) {
    console.log(match);
}