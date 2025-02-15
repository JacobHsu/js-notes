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

## 陣列方法

在 JavaScript 中，`filter`、`find`、`map` 和 `forEach` 都是常見的陣列方法，但它們的用途和回傳值有所不同：

| 方法     | 主要用途 | 回傳值 | 是否改變原陣列 |
|----------|---------|-------|--------------|
| `filter`  | 篩選符合條件的元素 | **新的陣列 (包含符合條件的元素)** | 否 |
| `find`    | 尋找符合條件的**第一個**元素 | **找到的元素 (或 `undefined`)** | 否 |
| `map`     | 轉換陣列中的每個元素 | **新的陣列 (每個元素都經過轉換)** | 否 |
| `forEach` | 迭代陣列並執行指定函式 | **無回傳值 (`undefined`)** | 否 |

## 詳細說明與範例

### 1. `filter` (篩選)
`filter` 會根據回呼函式的條件，回傳一個**新的陣列**，包含所有符合條件的元素。

```js
const numbers = [1, 2, 3, 4, 5, 6];
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log(evenNumbers); // [2, 4, 6]
```

### 2. `find` (尋找第一個符合條件的元素)
`find` 會回傳第一個符合條件的元素，找不到則回傳 `undefined`。

```js
const numbers = [1, 2, 3, 4, 5, 6];
const firstEven = numbers.find(num => num % 2 === 0);
console.log(firstEven); // 2
```

### 3. `map` (轉換)
`map` 會建立一個**新陣列**，且每個元素都會經過回呼函式的轉換。

```js
const numbers = [1, 2, 3, 4, 5];
const squaredNumbers = numbers.map(num => num * num);
console.log(squaredNumbers); // [1, 4, 9, 16, 25]
```

### 4. `forEach` (遍歷)
`forEach` 只是遍歷陣列的每個元素，**沒有回傳值 (`undefined`)**，通常用來執行副作用（例如輸出或修改外部變數）。

```js
const numbers = [1, 2, 3, 4, 5];
numbers.forEach(num => console.log(num * 2));
// 2
// 4
// 6
// 8
// 10
```

### 什麼時候用哪個方法？
- **`filter`**：當你需要取得**符合條件的多個元素**（回傳一個新陣列）。
- **`find`**：當你只需要**找到第一個符合條件的元素**（回傳單個值）。
- **`map`**：當你需要對陣列的**每個元素進行轉換**並回傳新陣列。
- **`forEach`**：當你只是**遍歷陣列**並執行操作（如 console.log），但不需要回傳新陣列。

這些方法都不會改變原陣列 (`forEach` 例外，若對物件陣列做變更，仍可能影響原陣列)，記住這點可以幫助你選擇適合的陣列方法！ 🚀
