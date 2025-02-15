[2215. 找出两数组的不同](https://doocs.github.io/leetcode/#/solution/2200-2299/2215.Find%20the%20Difference%20of%20Two%20Arrays/README)



## mergedArray

```js
var a = ['a', 'b', 'c'];
var b = ['c', 1,  2];

var mergedArray = [...new Set([...a, ...b])];

console.log(mergedArray); // ['a', 'b', 'c', 1, 2]

```

```js
var a = ['a', 'b', 'c'];
var b = ['c', 1,  2];

var mergedArray = Array.from(new Set(a.concat(b)));

console.log(mergedArray); // ['a', 'b', 'c', 1, 2]
```
