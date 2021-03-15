// function test (x = 10, y = 20) {
//     return x + y
// }
// console.log(test());

function test2(x, x, y ) {
    console.log(x);
}
function test3(x, x, y = 10 ) {
    console.log(x);
}
console.log(test3(1,2,3));