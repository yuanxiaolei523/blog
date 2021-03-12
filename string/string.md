# String
## string的遍历
1. for...of
```js
// 字符串的遍历
for (let i of 'str') {
    console.log(i); // s t r
}
```

2. for 循环
```js
for(let i = 0; i < str.length; i++) {
    console.log(str[i]); // s t r
}
```

3. for...in
```js
for(let i in str) {
    console.log(i); // 0 1 2
}
```
> 注意： for...in(只能遍历具有iteration接口的)遍历的是key，for...of遍历的是value

## 模板字符串
```js
let name = 's'
let str = `str ${name}` // str s
```
## 标签模板
```js
function add (x) {
    return x;
}

add`y` // [y]
function add (x, y, z) {
    return [x, y, z]; // [['', 'Hello  world ', ''], 10+20, 10 * 20]
}
console.log(add`${ a + b }Hello  world ${ a * b }`); // [ [ '', 'Hello  world ', '' ], 30, 200 ]
```
> 注意：使用模板标签之后，函数的第一个参数是一个数组，该数组的成员是模板字符串中没有发生变量替换的部分，也就是说，变量替换只会发生在第一个(没有就是'')和第二个(Hello  world )成员之间、第二个(Hello  world )和第三个('')成员之间，tag函数的其他参数，都是模板字符串各个变量被替换后的值

## 新增方法
### fromCodePoint
用于从 Unicode 码点返回对应字符
#### 和ES5的fromCharCode的区别
fromCharCode 不能识别码点大于0xFFFF的字符。
### raw
返回一个将/转义后的字符串(即在/前面在加一个/)
`String.raw`hi\n` // "hi\n" 其实真正返回的是"hi\\n"`


String.raw()方法的第一个参数是一个对象，它的raw属性等同于原始的模板字符串解析后得到的数组。
```js
// `foo${1 + 2}bar`
 ==> String.raw({raw: [foo, bar]}, 1 + 2)
```
### codePointAt
返回某个字符的码点

### includes
判断某个字符串是否在另外一个字符串中
`'123'.includes('12')   // true`
### startsWith，endsWith
判断参数字符串是否在字符串的开头或者结尾
`console.log(str.startsWith('s'), str.endsWith('tr')); // true true`
**注意**：一定要注意字符串是数字的情况
```js
let str = '123'
str.startsWith(12) // true 
``` 
### repeat(n)
将原字符串重复n次，如果参数是小数的情况下，会被**下取整**,是负数或者Infinity，会报错。如果是0至-1之间的数，那么就当-0(即0)计算
```js
'x'.repeat(3) // 'xxx'
```
### padStart(length, str), padEnd()
ES2017 引入了字符串补全长度的功能。如果某个字符串不够指定长度，会在头部或尾部补全。padStart()用于头部补全，padEnd()用于尾部补全。
#### 参数
1. length：是补全字符串后最大的有效长度，如果该长度比原先字符串的长度小，则该方法相当于不执行
2. str：用于补全字符串的子字符串，如果省略，则用空格补全
```js
'123'.padStart(4, 'length');// l123
'123'.padEnd(4, 'length'); // 123l

```

### trimStart()，trimEnd() 
ES2019 对字符串实例新增了trimStart()和trimEnd()这两个方法。它们的行为与trim()一致，trimStart()消除字符串头部的空格，trimEnd()消除尾部的空格。它们**返回的都是新字符串**，不会修改原始字符串。
```js
const s = '  abc  ';
s.trim() // "abc"
s.trimStart() // "abc  "
s.trimEnd() // "  abc"
```
### matchAll

### replaceAll
ES2021 引入了replaceAll()方法，可以一次性替换所有匹配。
```js
'aabbcc'.replaceAll('b', '_')
// 'aa__cc'
```
#### 参数
1. 子字符串
2. 要替换的字符串，但是有一些特殊的字符
    1. $&：表示匹配的子字符串。
    `'abbc'.replaceAll('b', '$&')// 'abbc'`
    2. $` 表示匹配结果之前的字符串
    ```'abbc'.replaceAll('b', '$`') // 'aaabc'```
    3. $' 表示匹配结果之后的字符串
    ```js
        'abbc'.replaceAll('b', `$'`)
        // 'abccc'
    ```
    4. $1 表示正则表达式的第一个组匹配，指代`ab` $2 表示正则表达式的第二个组匹配，指代`bc`
    ```js
        // $1 表示正则表达式的第一个组匹配，指代`ab`
        // $2 表示正则表达式的第二个组匹配，指代`bc`
        'abbc'.replaceAll(/(ab)(bc)/g, '$2$1')
        // 'bcab'

    ```