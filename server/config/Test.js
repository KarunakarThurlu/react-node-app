
//Finding common objects in two JSON Arraays
let one = [{ a: 1, b: 2 }, { a: 2, b: 2 }];
let two = [{ a: 1, b: 2 }, { a: 2, b: 2 }, { a: 1, b: 4 }];

let result = one.filter(x=>x.a==2);

console.log(result);


