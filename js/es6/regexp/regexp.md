# Regexp

## 构造函数RegExp()
### ES5
在ES5中，通过RegExp构造函数创建正则表达式的方式有两种
#### 第一：RegExp(str, flag)
```js
let reg = new RegExp('abc', 'i'); 
// reg => /abc/i

```
#### 第二：RegExp(reg)
这种方式原则上不允许有第二个参数，否则会报错
```js
let reg = new RegExp(/abc/i);
// reg => /abc/i
```
### ES6
在ES6中对上面的第二种方法做了修改,可以为其指定第二个参数，且第二个参数会替代第一个参数中的flag
#### RegExp(/abc/i, flag)
```js
let reg = new RegExp(/abc/ig, 'g');
// reg => /abc/g
```

## 修饰符和属性

#### flag y(黏连修饰符)

y黏连修饰符和g的作用相同，都是用于全局匹配的，那么为什么有了flag **g**后，还会出现一个flag **y**呢，这是因为y的作用和g的作用还是有区别的，g在全局搜索的时候，只要字符串中有匹配的即可，但是y必须是从**第一个字符开始匹配上**才可以

```js
let str = baaaa_aaa_aa

let reg = /a+/g;
let reg2 = /a+/y;

reg.exec(str) // [ 'aaaa', index: 1, input: 'baaaa_aaa_aa', groups: undefined ]
reg.exec(str) // [ 'aaa', index: 6, input: 'baaaa_aaa_aa', groups: undefined ]
reg.exec(str) // [ 'aa', index: 10, input: 'baaaa_aaa_aa', groups: undefined ]

// 使用y修饰符返回的是null，这是因str的第一个字符是b，并不符合正则表达式，所以返回null，如果
reg2.exec(str) // null 

```

下面我们通过修改lastIndex来试一下

```js
let str = baaaa_aaa_aa;
let reg2 = /a+/y;
reg2.lastIndex = 1 ; // 匹配的时候从2开始匹配
reg2.exec(str) // [ 'aaaa', index: 1, input: 'baaaa_aaa_aa', groups: undefined ]
reg2.exec(str) // null
```

实际上**y修饰符就相当于自带^(以..开头)标志符的**

#### flag s(任意字符 | dotAll)

在正则中我们通过**点(.)**来表示任意字符，但是有些字符是**.**不能表示的，一个是四个字节的UTF-16字符，可以使用u解决，另外一个就是行终止符(\r, \n)

```js
/foo.bar/.test('foo\nbar') // false 
```

那么如何使用.代表任意字符呢，这时我们就会用到**falg s**

```js
/foo.bar/s.test('foo\nbar') // true
```

#### dotAll 属性

表示当前是否处于dotAll模式

```js
/foo.bar/s.dotAll // true
```



#### sticky 属性

用于表示正则中是否使用了y修饰符

```js
/abc+/y.sticky // true
```



#### flags属性

我们可以通过RegExp的实例的**flags属性**来访问当前正则的修饰符
```js
let reg = new RegExp(/abc/ig, 'g');
reg.flags // g
```
### lastIndex属性

lastIndex属性是为了指定下次匹配从哪个字符开始，默认是0

```js
let reg = new RegExp(/abc/ig, 'g');
reg.lastIndex = 1 
```

## 断言

### 先行断言(?=)

指x必须在y之前才能匹配

#### 语法

`/x(?=y)/`

case: 如果想匹配%前面的数字，则通过以下方式，必须是**紧跟在**%前面的数字

```js
/\d+(?=%)/.test('100%_ada'); // true
/\d+(?=%)/.test('100——%_ada'); // false 
```

### 先行否定断言(?!)

指x不在y之前才能匹配（x不**紧跟**在y的前面即可）

#### 语法

`/x(?!y)/`

case: 只匹配不在%前面的数字

```js
/\d+(?!%)/.exec('100%_ada') // [ '10', index: 0, input: '100%_ada', groups: undefined ]
/\d+(?!%)/.exec('that’s all 44% of them') // [ '4',index: 11,input: 'that’s all 44% of them',groups: undefined ]
```

可以看出，只有%号前面的**第一个字符**不会被匹配

### 后行断言

x必须在y之后才匹配,必须紧邻

#### 语法

`/(?<=y)x/ `

Case： 匹配在$符号后面的数字

```js
/(?<=\$)\d+/.exec('$+123'); // null 
/(?<=\$)\d+/.exec('$123'); // [ '123', index: 5, input: '1234$123', groups: undefined ]
```

### 后行否定断言

x不在y之后才匹配（不**紧跟**在y后面就可以匹配）

#### 语法

`/(?<!y)x/`

Case: 匹配不在$符号后面的数字

```js
console.log(/(?<!\$)\d+/g.exec('1234$12333')); // [ '1234', index: 0, input: '1234$12333', groups: undefined ]
console.log(/(?<!\$)\d+/g.exec('1234$_12333')); // [ '1234', index: 0, input: '1234$_12333', groups: undefined ]
```

## 具名组匹配( ?<组名> )

在ES2018引入了具名组匹配**?<组名>**

正则表达式可以使用()进行组匹配

```js
const RE_DATE = /(\d{4})-(\d{2})-(\d{2})/;

const matchObj = RE_DATE.exec('1999-12-31');
const year = matchObj[1]; // 1999
const month = matchObj[2]; // 12
const day = matchObj[3]; // 31
```

组匹配的一个问题是，每一组的匹配含义不容易看出来，而且只能用数字序号（比如`matchObj[1]`）引用，要是组的顺序变了，引用的时候就必须修改序号。

```javascript
const RE_DATE = /(?<year>\d{4}-(?<month>\d{2})-(?<day>\d{2}))/

const matchObj = RE_DATE.exec('1999-12-31');
matchObj.groups.year; // "1999"
matchObj.groups.month; // "12"
matchObj.groups.day; // "31"
```

通过具名组匹配，在使用exec方法执行之后，可以在groups属性内拿到这些组名

如果具名组没有匹配，则对应的groups对象的属性会是undefined

### 引用具名组

我们可以通过**\k<组名>**来引用具名组

```js
let reg = /(?<word>[a-z]+)!\k<word>/;
console.log(reg.test('abc!abc')); // true
```

## MatchAll

如果一个正则表达式在字符串里面有多个匹配，现在一般使用`g`修饰符或`y`修饰符，在循环里面逐一取出。

```js

var regex = /t(e)(st(\d?))/g;
var string = 'test1test2test3';

var matches = [];
var match;
while (match = regex.exec(string)) {
  matches.push(match);
}

console.log(matches);
/*
[ [ 'test1',
    'e',
    'st1',
    '1',
    index: 0,
    input: 'test1test2test3',
    groups: undefined ],
  [ 'test2',
    'e',
    'st2',
    '2',
    index: 5,
    input: 'test1test2test3',
    groups: undefined ],
  [ 'test3',
    'e',
    'st3',
    '3',
    index: 10,
    input: 'test1test2test3',
    groups: undefined ] ]
*/
```

[ES2020](https://github.com/tc39/proposal-string-matchall) 增加了`String.prototype.matchAll()`方法，可以一次性取出所有匹配。不过，它返回的是一个遍历器（Iterator），而不是数组。

```js
for (const match of string.matchAll(regex)) {
    console.log(match);
}
```

### 遍历器转数组的方法

```js
[...string.matchAll(regex)]
// 方式2
Array.from(string.matchAll(regex))
```



## 注意

1. replaceAll第一个参数为正则和字符串下的不同点

   ```js
   let string = 'test1test2';
   string.replaceAll('est', 'hi') // "thi1thi2"
   // 
   string.replaceAll(/est/, 'hi') // 报错，第一个参数必须使用g修饰符
   ```

   