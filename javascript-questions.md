
[JavaScript 文法問題](https://github.com/lydiahallie/javascript-questions/blob/master/zh-CN/README-zh_CN.md)


---

###### 1. 將會輸出什麽內容？

```javascript
function sayHi() {
  console.log(name)
  console.log(age)
  var name = 'Lydia'
  let age = 21
}

sayHi()
```

- A: `Lydia` 和 `undefined`
- B: `Lydia` 和 `ReferenceError`
- C: `ReferenceError` 和 `21`
- D: `undefined` 和 `ReferenceError`

<details><summary><b>答案</b></summary>
<p>

#### 答案：D

在函式內部，我們首先透過 `var` 關鍵字宣告了 `name` 變數。這表示變數被提升了（記憶體位置在建立時期就被設置好了），直到程式執行到定義變數的那行之前，預設值都是 `undefined`。因為當我們印出 `name` 變數時，還沒有執行到定義變數的那一行程式碼，因此變數的值保持為 `undefined`。

透過 `let` 和 `const` 關鍵字宣告的變數也會提升，但是和 `var` 不同，它們不會被<i>初始化</i>，在我們初始化之前是不能訪問它們的，這個行為被稱之為暫時性死區。當我們嘗試在初始化之前訪問它們時，JavaScript 將會抛出一個 `ReferenceError` 錯誤。

</p>
</details>

---

###### 2. 將會輸出什麽內容？

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1)
}

for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1)
}
```

- A: `0 1 2` 和 `0 1 2`
- B: `0 1 2` 和 `3 3 3`
- C: `3 3 3` 和 `0 1 2`

<details><summary><b>答案</b></summary>
<p>

#### 答案：C

由於 JavaScript 的事件佇列（Event Queue），`setTimeout` 的 `callback` 會在*遍歷結束後*才執行。因為在第一個迴圈中，遍歷 `i` 是透過 `var` 關鍵字宣告的，`var` 屬於 Function scope（需要用 `function() {}` 才能將值鎖在作用域裡面）
，所以 `for` 迴圈會造成變數外流，變成全域變數。在遍歷過程中，我們透過一元運算子 `++` 來遞增 `i` 的值。當 `setTimeout` 的 `callback` 執行的時候，`i` 的值等於 3。

在第二個迴圈中，遍歷 `i` 是透過 `let` 關鍵字宣告的：透過 `let` 和 `const` 關鍵字的變數擁有塊級作用域（指的是任何在 `{}` 中的内容）。在每次的遍歷過程中，`i` 都有一個新值，每次遍歷時 `i` 值的作用域都在迴圈内。

</p>
</details>

---

###### 3. 將會輸出什麽內容？

```javascript
const shape = {
  radius: 10,
  diameter() {
    return this.radius * 2
  },
  perimeter: () => 2 * Math.PI * this.radius
}

shape.diameter()
shape.perimeter()
```

- A: `20` and `62.83185307179586`
- B: `20` and `NaN`
- C: `20` and `63`
- D: `NaN` and `63`

<details><summary><b>答案</b></summary>
<p>

#### 答案 B

注意 `diameter` 的值是一個一般的函式，但是 `perimeter` 的值是一個箭頭函式。

對於箭頭函式，`this` 關鍵字指向的是它當前周圍作用域，這個行為和一般函式不同。這表示當我們呼叫 `perimeter` 時，`this` 不是指向 `shape` 物件，而是它的周圍作用域（在範例中是 `window`）。

在 `window` 中沒有 `radius` 這個屬性，因此回傳 `undefined`。

</p>
</details>

---

###### 4. 將會輸出什麽內容？

```javascript
+true;
!"Lydia";
```

- A: `1` and `false`
- B: `false` and `NaN`
- C: `false` and `false`

<details><summary><b>答案</b></summary>
<p>

#### 答案：A

一元運算子加號 `+`，嘗試將 boolean 布林值型別轉為 number 數字型別。`true` 轉為 number 數字型別的話為 `1`，`false` 爲 `0`。

字串型別 `'Lydia'` 是一個真值，我們實際上問的題目是：「這個真值的相反會是什麼？」，真值的相反，將得到 `false`。

</p>

</details>

---

###### 5. 哪一個是正確的描述？

```javascript
const bird = {
  size: 'small'
}

const mouse = {
  name: 'Mickey',
  small: true
}
```

- A: `mouse.bird.size`是無效的
- B: `mouse[bird.size]`是無效的
- C: `mouse[bird["size"]]`是無效的
- D: 以上三個選項都是有效的

<details><summary><b>答案</b></summary>
<p>

#### 答案：A

在 JavaScript 中，所有物件的 keys 都是字串型別（除非是 Symbol 物件）。儘管我們或許不會定義它們為字串，但它們在底層總會被轉換爲字串。

當我們使用中括號時（[]），JavaScript 會解譯語句。它首先看到中括號的第一個開始處 `[` 並繼續往下直到找到結束的中括號 `]`。只有這樣，它才能計算語句的值。

`mouse[bird.size]`：首先計算 `bird.size`，這會得到 `small`。`mouse["small"]` 得到 `true`。

使用點的語法的時候，上面這一切都不會發生。`mouse` 沒有 `bird` 這個 key，這就表示 `mouse.bird` 是 `undefined`。然後當我們使用點語法 `mouse.bird.size` 時，因為 `mouse.bird` 是 `undefined`，這也就變成了我們實際的語句是 `undefined.size`，而此行為是無效的，並會抛出一個錯誤 `Cannot read property "size" of undefined`。

</p>
</details>

---

###### 6. 將會輸出什麽內容？

```javascript
let c = { greeting: 'Hey!' }
let d

d = c
c.greeting = 'Hello'
console.log(d.greeting)
```

- A: `Hello`
- B: `undefined`
- C: `ReferenceError`
- D: `TypeError`

<details><summary><b>答案</b></summary>
<p>

#### 答案：A

在 JavaScript 中，當設定兩個物件彼此相等時，它們會經由*引用（reference）*進行互動。

首先，變數 `c` 的值是一個物件。接下来，我們將 `d` 分配了一個和 `c` 物件相同的引用。

<img src="https://i.imgur.com/ko5k0fs.png" width="200">

因此當我們改變其中一個物件時，其實是改變了所有的物件的同一個引用的內容。

</p>
</details>

---

###### 7. 將會輸出什麽內容？

```javascript
let a = 3
let b = new Number(3)
let c = 3

console.log(a == b)
console.log(a === b)
console.log(b === c)
```

- A: `true` `false` `true`
- B: `false` `false` `true`
- C: `true` `false` `false`
- D: `false` `true` `true`

<details><summary><b>答案</b></summary>
<p>

#### 答案：C

`new Number()` 是一個内建的函式建構子。它雖然看起來像是個 number，但它實際上並非真正的 number：它有一堆額外的功能，而且它是一個物件。

當我們使用 `==` 運算子的時候，它只會檢查兩者是否擁有有相同的*值*。因為它們的值都是 `3`，因此回傳 `true`。

然後，當我們使用 `===` 運算子時，兩者的值以及*型別*都必須是相同的。`new Number()` 是一個物件型別而不是 number（一般型別），因此回傳 `false`。

</p>
</details>

---

###### 8. 將會輸出什麽內容？

```javascript
class Chameleon {
  static colorChange(newColor) {
    this.newColor = newColor
    return this.newColor
  }

  constructor({ newColor = 'green' } = {}) {
    this.newColor = newColor
  }
}

const freddie = new Chameleon({ newColor: 'purple' })
freddie.colorChange('orange')
```

- A: `orange`
- B: `purple`
- C: `green`
- D: `TypeError`

<details><summary><b>答案</b></summary>
<p>

#### 答案：D

`colorChange` 是一個靜態方法。靜態方法被設計爲只能被創造它們的建構子使用（也就是 `Chameleon` 中的 `constructor`），並且不能傳遞給實例。因為 `freddie` 是一個實例，而靜態方法不能被實例使用，因此會抛出 `TypeError` 錯誤。

</p>
</details>

---

###### 9. 將會輸出什麽內容？

```javascript
let greeting
greetign = {} // 手殘打錯變數名稱！
console.log(greetign)
```

- A: `{}`
- B: `ReferenceError: greetign is not defined`
- C: `undefined`

<details><summary><b>答案</b></summary>
<p>

#### 答案：A

程式碼印出了一個物件，這是因為我們在全域物件上建立了一個空物件！當我們將 `greeting` 寫錯成 `greetign` 時，JS 解譯器實際上將它視爲 `global.greetign = {}`（或者在瀏覽器中視為 `window.greetign = {}`）。

為了避免這個狀況，我們可以使用 `"use strict"`，來確保當你宣告變數時，必須賦值。

</p>
</details>

---

###### 10. 當我們這麼做時，會發生什麼事？

```javascript
function bark() {
  console.log('Woof!')
}

bark.animal = 'dog'
```

- A: 正常運作！
- B: `SyntaxError`. 你不能透過這種方式在函式中新增屬性。
- C: `undefined`
- D: `ReferenceError`

<details><summary><b>答案</b></summary>
<p>

#### 答案：A

這在 JavaScript 中是可以的，因爲函式是物件！（除了基本型別之外其他都是物件）

函式是一個特殊的物件，函式是一個擁有屬性的物件，屬性也可被使用、呼叫的。

</p>
</details>

---

###### 11. 將會輸出什麽內容？

```javascript
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

const member = new Person("Lydia", "Hallie");
Person.getFullName = function () {
  return `${this.firstName} ${this.lastName}`;
}

console.log(member.getFullName());
```

- A: `TypeError`
- B: `SyntaxError`
- C: `Lydia Hallie`
- D: `undefined` `undefined`

<details><summary><b>答案</b></summary>
<p>

#### 答案：A

你可以為一般物件新增屬性，但建構函式（constructor）無法透過上面的方式來新增屬性。若你想一次性在所有實例上都新增某個屬性，要使用原型的方式。因此本例中，使用以下的方式：

```js
Person.prototype.getFullName = function () {
  return `${this.firstName} ${this.lastName}`;
}
```

這樣一來，`member.getFullName()` 就能有效。這樣做有什麼好處？假設我們真的能如題將這個方法新增到建構函式本身，並不是每個 `Person` 實例都需要這個方法，但每個實例卻仍然擁有該属性，代表著這將佔據每個實例的記憶體，造成大量的記憶體空間因此浪費掉了。相反，如果我們只將它新增在原型中，那麼它只存在記憶體中的一個位置，而所有實例都可以使用它！

</p>
</details>

---

###### 12. 將會輸出什麽內容？

```javascript
function Person(firstName, lastName) {
  this.firstName = firstName
  this.lastName = lastName
}

const lydia = new Person('Lydia', 'Hallie')
const sarah = Person('Sarah', 'Smith')

console.log(lydia)
console.log(sarah)
```

- A: `Person {firstName: "Lydia", lastName: "Hallie"}` and `undefined`
- B: `Person {firstName: "Lydia", lastName: "Hallie"}` and `Person {firstName: "Sarah", lastName: "Smith"}`
- C: `Person {firstName: "Lydia", lastName: "Hallie"}` and `{}`
- D:`Person {firstName: "Lydia", lastName: "Hallie"}` and `ReferenceError`

<details><summary><b>答案</b></summary>
<p>

#### 答案：A

對 `sarah` 而言，我們沒有使用 `new` 關鍵字。當使用 `new` 時，`this` 引用我們建立的空物件。沒有使用 `new` 的時候，`this` 引用的是**全域物件**（global object）。

我們會說 `this.firstName` 等於 `"Sarah"`，而 `this.lastName` 等於 `"Smith"`。實際上我們做的是，定義了 `global.firstName = 'Sarah'` 和 `global.lastName = 'Smith'`。而 `sarah` 本身是 `undefined`，因為 `Person` 這個函式本身並沒有回傳值。

</p>
</details>

---

###### 13. 事件傳播的三個階段分別是？

- A: Target > Capturing > Bubbling
- B: Bubbling > Target > Capturing
- C: Target > Bubbling > Capturing
- D: Capturing > Target > Bubbling

<details><summary><b>答案</b></summary>
<p>

#### 答案：D

先捕獲，再冒泡！在**捕獲**（capturing）階段中，事件從祖先元素向下傳播到目標元素。當事件到達**目標**（target）元素後，**冒泡**（bubbling）才開始。

<img src="https://i.imgur.com/N18oRgd.png" width="200">

</p>
</details>

---

###### 14. 所有物件都有原型。

- A: true
- B: false

<details><summary><b>答案</b></summary>
<p>

#### 答案：B

除了**基本物件**（base object，使用 `new` 關鍵字建立的物件）以外，所有物件都有原型。基本物件可以使用一些方法和属性，比如 `.toString`，這就是為什麼你可以使用內建的 JavaScript 方法！所有這類在原型上的方法都是可被使用的。雖然 JavaScript 不能直接在物件上找到這些方法，但 JavaScript 會沿著原型鍊找到它們，以便使用。

</p>
</details>

---

###### 15. 將會輸出什麽內容？

```javascript
function sum(a, b) {
  return a + b
}

sum(1, '2')
```

- A: `NaN`
- B: `TypeError`
- C: `"12"`
- D: `3`

<details><summary><b>答案</b></summary>
<p>

#### 答案：C

JavaScript 是一個**動態型別語言**：我們不指定變數的型別。值可以在你不知道的情况下自動轉換成另一種型別，稱為**隱含式轉型**（implicit type coercion）。**Coercion** 是指將一種型別轉換成另一種型別。

在此範例中，JavaScript 將數字型別 `1` 轉換為字串型別，以便函式能回傳一個有意義的值。數字型別（`1`）和字串型別（`'2'`）相加的時候，該數字會被視為字串。我們也能連接不同的字串，比如 `"Hello" + "World"`，而此例是 `"1" + "2"`，它將回傳 `"12"`。

</p>
</details>

###### 16. 將會輸出什麽內容？

```javascript
let number = 0;
console.log(number++);
console.log(++number);
console.log(number);
```

- A: `1` `1` `2`
- B: `1` `2` `2`
- C: `0` `2` `2`
- D: `0` `1` `2`

<details><summary><b>答案</b></summary>
<p>

#### 答案：C

一元運算子 `++` 加在變數後方：

1. 回傳值 (這個值是 `0`)
2. 新增值 (變數 `number` 的值現在是 `1`)

一元運算子 `++` 加在變數前方：

1. 新增值 (變數 `number` 的值現在是 `2`)
2. 回傳值 (這個值是 `2`)

因此答案是 `0 2 2`.

</p>
</details>

---

###### 17. 將會輸出什麽內容？

```javascript
function getPersonInfo(one, two, three) {
  console.log(one);
  console.log(two);
  console.log(three);
}

const person = 'Lydia';
const age = 21;

getPersonInfo`${person} is ${age} years old`;
```

- A: `"Lydia"` `21` `["", " is ", " years old"]`
- B: `["", " is ", " years old"]` `"Lydia"` `21`
- C: `"Lydia"` `["", " is ", " years old"]` `21`

<details><summary><b>答案</b></summary>
<p>

#### 答案：B

若你使用標籤樣板字面值（Tagged template literals），第一個參數的值永遠會是一個裝載字串的陣列，函式中的剩下的參數會取得表達式中傳進的變數（`person`、`age`）的值（`'Lydia'`、`21`）！

</p>
</details>

---

###### 18. 將會輸出什麽內容？

```javascript
function checkAge(data) {
  if (data === { age: 18 }) {
    console.log('You are an adult!');
  } else if (data == { age: 18 }) {
    console.log('You are still an adult.');
  } else {
    console.log(`Hmm.. You don't have an age I guess`);
  }
}

checkAge({ age: 18 });
```

- A: `You are an adult!`
- B: `You are still an adult.`
- C: `Hmm.. You don't have an age I guess`

<details><summary><b>答案</b></summary>
<p>

#### 答案：C

驗證相等，一般型別只比較「值」，物件型別則是比較他們的「參考」。JavaScript 會確認不同物件的參考是否指向同一個記憶體位置。

題目中，我們比較的兩個物件擁有不同的記憶體位置：一個物件是作為參數傳遞的物件，它的記憶體位置與另一個拿來判斷是否相等的物件並不相同。

這就是 `{ age: 18 } === { age: 18 }` 與 `{ age: 18 } == { age: 18 }` 會回傳 `false` 的原因。

</p>
</details>

---

###### 19. 將會輸出什麽內容？

```javascript
function getAge(...args) {
  console.log(typeof args);
}

getAge(21);
```

- A: `"number"`
- B: `"array"`
- C: `"object"`
- D: `"NaN"`

<details><summary><b>答案</b></summary>
<p>

#### 答案：C

其餘參數（`...args`）會蒐集傳進來剩下來未使用的參數，成為一個「陣列」。陣列的型別是「物件」，所以透過 `typeof args` 將會回傳該值的型別，將是 `"object"`。

</p>
</details>

---

###### 20. 將會輸出什麽內容？

```javascript
function getAge() {
  'use strict';
  age = 21;
  console.log(age);
}

getAge();
```

- A: `21`
- B: `undefined`
- C: `ReferenceError`
- D: `TypeError`

<details><summary><b>答案</b></summary>
<p>

#### 答案：C

`"use strict"` 可以避免妳意外地宣告全區域變數。使用 `"use strict"` 時，我們若沒有宣告 `age` 這個變數，就直接賦值的話，會拋出 `ReferenceError`，若沒有使用 `"use strict"`，屬性 `age` 就會新增到全域物件上（瀏覽器上的全域物件是 `window`）。

</p>
</details>

---

###### 21. `sum` 的值會是？

```javascript
const sum = eval('10*10+5');
```

- A: `105`
- B: `"105"`
- C: `TypeError`
- D: `"10*10+5"`

<details><summary><b>答案</b></summary>
<p>

#### 答案：A

`eval` 會去執行傳進去的「字串」。如果該字串是一個表達式，如題目中的程式碼，那麼 `eval` 會自動執行該表達式 `10 * 10 + 5`，所以答案會是 `105`。

</p>
</details>

---

###### 22. cool_secret 這個資料儲存在瀏覽器，存活時間有多久？

```javascript
sessionStorage.setItem('cool_secret', 123);
```

- A: 永遠都可以，資料不會不見。
- B: 使用者關閉頁籤後，資料才會失效。
- C: 使用者要關閉一整個瀏覽器，資料才會失效，單純關閉資料不會造成資料消失。
- D: 使用者關閉電腦後。

<details><summary><b>答案</b></summary>
<p>

#### 答案：B

儲存在 `sessionStorage` 的資料會在使用者「關閉頁籤」後消失。

若是使用 `localStorage` 來儲存資料的話，資料則會永遠存在瀏覽器端，直到觸發了 `localStorage.clear()` 才可以清除資料。

</p>
</details>

---

###### 23. 將會輸出什麽內容？

```javascript
var num = 8;
var num = 10;

console.log(num);
```

- A: `8`
- B: `10`
- C: `SyntaxError`
- D: `ReferenceError`

<details><summary><b>答案</b></summary>
<p>

#### 答案：B

使用 `var` 關鍵字重複宣告的變數，該值會以最新賦予的值作為它的「值」。這件事情在 `let` or `const` 不會發生，因為這兩個關鍵字所宣告的變數作用域是塊級作用域（block-scoped）。

</p>
</details>

---

###### 24. 將會輸出什麽內容？

```javascript
const obj = { 1: 'a', 2: 'b', 3: 'c' };
const set = new Set([1, 2, 3, 4, 5]);

obj.hasOwnProperty('1');
obj.hasOwnProperty(1);
set.has('1');
set.has(1);
```

- A: `false` `true` `false` `true`
- B: `false` `true` `true` `true`
- C: `true` `true` `false` `true`
- D: `true` `true` `true` `true`

<details><summary><b>答案</b></summary>
<p>

#### 答案：C

除了 `Symbol` 以外的物件的 `key` 在底層都是字串類別，即使你建立該物件屬性時，並不是以字串來建立的，所以 `obj.hasOwnProperty('1')` 會回傳 `true`。不過 `set` 不是這樣的規則，在題目中的 `set` 並沒有字串 `'1'` 這個屬性名稱，所以 `set.has('1')` 會回傳 `false`，不過是有數字類別 `1` 的屬性值，`set.has(1)` 將會回傳 `true`。

</p>
</details>

---

###### 25. 將會輸出什麽內容？

```javascript
const obj = { a: 'one', b: 'two', a: 'three' };
console.log(obj);
```

- A: `{ a: "one", b: "two" }`
- B: `{ b: "two", a: "three" }`
- C: `{ a: "three", b: "two" }`
- D: `SyntaxError`

<details><summary><b>答案</b></summary>
<p>

#### 答案：C

若物件中的屬性有重複名稱者，第一個屬性會保持它的位置，但值會被最後一個重複屬性名稱的值給取代。

</p>
</details>

---

###### 26. JavaScript 在全域執行環境為你做了兩件事：全域物件和 this 關鍵字。

- A: true
- B: false
- C: it depends

<details><summary><b>答案</b></summary>
<p>

#### 答案：A

基本执行上下文是全局执行上下文：它是代码中随处可访问的内容。
基底的執行環境是全域的：代表它在程式碼中，可被隨處使用。

</p>
</details>

---

###### 27. 將會輸出什麽內容？

```javascript
for (let i = 1; i < 5; i++) {
  if (i === 3) continue;
  console.log(i);
}
```

- A: `1` `2`
- B: `1` `2` `3`
- C: `1` `2` `4`
- D: `1` `3` `4`

<details><summary><b>答案</b></summary>
<p>

#### 答案：C

當 `if` 條件成立時會回傳 `true`，執行 `continue` 語句，代表忽略本次迭代（`console.log(i)`）。

</p>
</details>

---

###### 28. 將會輸出什麽內容？

```javascript
String.prototype.giveLydiaPizza = () => {
  return 'Just give Lydia pizza already!';
};

const name = 'Lydia';

console.log(name.giveLydiaPizza())
```

- A: `"Just give Lydia pizza already!"`
- B: `TypeError: not a function`
- C: `SyntaxError`
- D: `undefined`

<details><summary><b>答案</b></summary>
<p>

#### 答案：A

`String` 是內建的建構函式，我們可以向它新增属性。我只是在它的原型中加上一個方法。基本型別字串被自動轉換成字串物件，由字串原型函式生成。因此，所有 string（string 物件）都可以使用 `giveLydiaPizza` 方法！

</p>
</details>

---

###### 29. 將會輸出什麽內容？

```javascript
const a = {};
const b = { key: 'b' };
const c = { key: 'c' };

a[b] = 123;
a[c] = 456;

console.log(a[b]);
```

- A: `123`
- B: `456`
- C: `undefined`
- D: `ReferenceError`

<details><summary><b>答案</b></summary>
<p>

#### 答案：B

物件的 key 自動轉為字串型別。我們正嘗試將物件 `b` 的 key 設為物件 `a` 的 key，其值爲 `123`。

然而，當物件「字串化」，它會變成 `"[object Object]"`。所以這裡的意思是，`a["[object Object]"] = 123`。然後，我們又再做了一次一樣的事情，`c` 也是隱式的物件字串化，所以，`a["[object Object]"] = 456`。

最後，我們輸出 `a[b]`，也就是 `a["[object Object]"]`。之前剛賦值爲 `456`，將回傳 `456`。

</p>
</details>

---

###### 30. 將會輸出什麽內容？

```javascript
const foo = () => console.log('First');
const bar = () => setTimeout(() => console.log('Second'));
const baz = () => console.log('Third');

bar();
foo();
baz();
```

- A: `First` `Second` `Third`
- B: `First` `Third` `Second`
- C: `Second` `First` `Third`
- D: `Second` `Third` `First`

<details><summary><b>答案</b></summary>
<p>

#### 答案：B

我們有一個 `setTimeout` 函式，首先呼叫它。然而，它的執行順序是最後執行的。

因為在瀏覽器中，我們除了有執行引擎，還有一個 `WebAPI`。`WebAPI` 提供了 `setTimeout` 函式，也包含其他的，例如 DOM。

在『callback』推送到 `WebAPI` 後，`setTimeout` 函式本身（不是回呼函式）將從堆疊（`stack`）中彈出。

<img src="https://i.imgur.com/X5wsHOg.png" width="200">

現在，`foo` 被呼叫，印出 `"First"`。

<img src="https://i.imgur.com/Pvc0dGq.png" width="200">

`foo` 從堆疊中彈出，`baz` 被呼叫，印出 `"Third"`。

<img src="https://i.imgur.com/WhA2bCP.png" width="200">

WebAPI 不能隨時向堆疊内新增内容。相反，它會將回呼函式彈到名爲『`queue`』的地方。

<img src="https://i.imgur.com/NSnDZmU.png" width="200">

這就是事件迴圈（`Event Loop`）的流程，了解**事件迴圈**堆疊與任務佇列的運作模式。如果堆疊是空的，它接受任務佇列上的第一个元素，推入堆疊中。

<img src="https://i.imgur.com/uyiScAI.png" width="200">

`bar` 被呼叫，印出 `"Second"`，然後它被彈出堆疊。

</p>
</details>

---

###### 31. 點擊按鈕時，event.target 指的是哪個元件？

```html
<div onclick="console.log('first div')">
  <div onclick="console.log('second div')">
    <button onclick="console.log('button')">
      Click!
    </button>
  </div>
</div>
```

- A: 第一層的 `div`
- B: 第二層的 `div`
- C: `button` 本身
- D: 一個包含此巢狀元件的陣列。

<details><summary><b>答案</b></summary>
<p>

#### 答案：C

產生事件 (event) 的元件即為此事件的 target，您可以透過 `event.stopPropagation` 來停止事件的冒泡 (bubbling)

</p>
</details>

---

###### 32. 點擊標籤 p(paragraph) 時，將會輸出什麼內容？

```html
<div onclick="console.log('div')">
  <p onclick="console.log('p')">
    Click here!
  </p>
</div>
```

- A: `p` `div`
- B: `div` `p`
- C: `p`
- D: `div`

<details><summary><b>答案</b></summary>
<p>

#### 答案：A

輸出內容是 `p` 及 `div`。在事件傳播 (event propagation) 期間，分為三個階段：捕獲 (capturing)，目標 (target) 和冒泡 (bubbling)。
預設情況下，事件處理 (event handlers) 在冒泡階段執行（除非您將 useCapture 設置為 true)。它從巢狀元素的最深層向外層。

</p>
</details>

---

###### 33. 將會輸出什麽內容？

```javascript
const person = { name: 'Lydia' };

function sayHi(age) {
  return `${this.name} is ${age}`;
}

console.log(sayHi.call(person, 21));
console.log(sayHi.bind(person, 21));
```

- A: `undefined is 21` `Lydia is 21`
- B: `function` `function`
- C: `Lydia is 21` `Lydia is 21`
- D: `Lydia is 21` `function`

<details><summary><b>答案</b></summary>
<p>

#### 答案：D

通過 `.call` 及 `.bind`，我們可以將想要 `this` 關鍵字引用的物件傳遞給它。
然而，`.call` 會 _立即執行_! `.bind.` 則是會回傳一份函式 (function) 的 _複製_ 且不會立即執行。

</p>
</details>

---

###### 34. 將會輸出什麽內容？

```javascript
function sayHi() {
  return (() => 0)();
}

console.log(typeof sayHi());
```

- A: `"object"`
- B: `"number"`
- C: `"function"`
- D: `"undefined"`

<details><summary><b>答案</b></summary>
<p>

#### 答案：B

`sayHi` 函數會回傳立即執行函式表示式 (IIFE）的回傳值。該函數回傳類型為 `"number"` 的 `0`。
FYI: JS 只有 7 種原生類型 (type) : `null`, `undefined`, `boolean`, `number`, `string`, `object`, `symbol`, 和 `bigint`. `"function"` 不是一種類型而是物件。

</p>
</details>

---

###### 35. 下列項目哪些是 falsy？

```javascript
0;
new Number(0);
('');
(' ');
new Boolean(false);
undefined;
```

- A: `0`, `''`, `undefined`
- B: `0`, `new Number(0)`, `''`, `new Boolean(false)`, `undefined`
- C: `0`, `''`, `new Boolean(false)`, `undefined`
- D: All of them are falsy

<details><summary><b>答案</b></summary>
<p>

#### 答案：A

只有八個值是 falsy

- `undefined`
- `null`
- `NaN`
- `false`
- `''` (空字串)
- `0`
- `-0`
- `0n` (BigInt(0))

函式建構式 (Function constructors) 如 `new Number` 和 `new Boolean` 都為 truthy。

</p>
</details>

---

###### 36. 將會輸出什麽內容？

```javascript
console.log(typeof typeof 1);
```

- A: `"number"`
- B: `"string"`
- C: `"object"`
- D: `"undefined"`

<details><summary><b>答案</b></summary>
<p>

#### 答案：B

`typeof 1` 回傳 `"number"`
`typeof "number"` 回傳 `"string"`

</p>
</details>

---

###### 37. 將會輸出什麽內容？

```javascript
const numbers = [1, 2, 3];
numbers[10] = 11;
console.log(numbers);
```

- A: `[1, 2, 3, 7 x null, 11]`
- B: `[1, 2, 3, 11]`
- C: `[1, 2, 3, 7 x empty, 11]`
- D: `SyntaxError`

<details><summary><b>答案</b></summary>
<p>

#### 答案：C

當您設置的元素其位置大過陣列長度時，JavaScript 會建立一個叫做 "empty slots" 的物件，它們的值實際上為 `undefined`。

但您會看到類似的輸出內容 : `[1, 2, 3, 7 x empty, 11]`。實際執行環境會使其輸出內容略微不同 (瀏覽器，node... 等)

</p>
</details>

---

###### 38. 將會輸出什麽內容？

```javascript
(() => {
  let x, y;
  try {
    throw new Error();
  } catch (x) {
    (x = 1), (y = 2);
    console.log(x);
  }
  console.log(x);
  console.log(y);
})();
```

- A: `1` `undefined` `2`
- B: `undefined` `undefined` `undefined`
- C: `1` `1` `2`
- D: `1` `undefined` `undefined`

<details><summary><b>答案</b></summary>
<p>

#### 答案：A

程式中的 `catch` 區塊捕獲了一個例外情況且賦殖予 argument `x`。這個 `x` 是在區塊內產生的，其有效範圍只在區塊內 (block-scoped)，它跟 `console.log` 中所傳入的 `x` 並不是同一個。

接著我們將此區塊變數 `x` 設置為等於 `1`，並設置變數 `y` 的值，現在我們 console.log 區塊變數 `x`，無意外地它輸出 `1`。

而在 `catch` 區塊之外的 `x` 仍然是 `undefined` 且 `y` 是 `2`。因此當我們想在 `catch` 區塊之外使用 `console.log（x)` 時，它回傳 `undefined`，而 `y` 回傳 `2`。

</p>
</details>

---

###### 39. 關於 JavaScript 的敘述何者正確？

- A: JavaScript 的世界中不是 primitive 就是 object
- B: JavaScript 的世界中不是 function 就是 object
- C: JavaScript 的世界中只有 object
- D: JavaScript 的世界中不是 number 就是 object

<details><summary><b>答案</b></summary>
<p>

#### 答案：A

JavaScript 只有 primitive types 和 objects.

而 Primitive types 包含 `boolean`, `null`, `undefined`, `bigint`, `number`, `string`, 和 `symbol`.

Primitive 不同於 object 的是它沒有任何的屬性 (properties) 和方法 (methods); 沒有方法的情況下為何 `'foo'.toUpperCase()` (string) 是輸出 `'FOO'` 而不是 `TypeError` ?
這是因為當您嘗試訪問 primitive types (例如字串) 的屬性或方法時，JavaScript 會使用其中一個 wrapper classes 包裝該 primitive type。

例如使用了 `String` 包裝 primitive type `string`，接著在 expression 被 evaluates 後拋棄該包裝。所有 primitives 除了 `null` 和 `undefined` 外都是遵循此行為。

</p>
</details>

---

###### 40. 將會輸出什麽內容？

```javascript
[[0, 1], [2, 3]].reduce(
  (acc, cur) => {
    return acc.concat(cur);
  },
  [1, 2],
);
```

- A: `[0, 1, 2, 3, 1, 2]`
- B: `[6, 1, 2]`
- C: `[1, 2, 0, 1, 2, 3]`
- D: `[1, 2, 6]`

<details><summary><b>答案</b></summary>
<p>

#### 答案：C

`[1, 2]` 為初始值，同時也是第一個 `acc`。在第一輪中，`acc` 是 `[1,2]` 且 `cur` 是 `[0, 1]`，兩陣列連接後的結果是 `[1, 2, 0, 1]`。

接著 `[1, 2, 0, 1]` 是 `acc` 且 `[2, 3]` 是 `cur`，兩陣列連接後的結果是 `[1, 2, 0, 1, 2, 3]`。

</p>
</details>

---

###### 41. 將會輸出什麽內容？

```javascript
!!null;
!!'';
!!1;
```

- A: `false` `true` `false`
- B: `false` `false` `true`
- C: `false` `true` `true`
- D: `true` `true` `false`

<details><summary><b>答案</b></summary>
<p>

#### 答案：B

`null` 是 falsy. `!null` 回傳 `true`. `!true` 回傳 `false`.

`""` 是 falsy. `!""` 回傳 `true`. `!true` 回傳 `false`.

`1` 是 truthy. `!1` 回傳 `false`. `!false` 回傳 `true`.

</p>
</details>

---

###### 42. 在瀏覽器中 `setInterval` 方法會回傳什麼？

```javascript
setInterval(() => console.log('Hi'), 1000);
```

- A: 一個唯一的 id
- B: 指定的毫秒數
- C: 被傳遞的函式
- D: `undefined`

<details><summary><b>答案</b></summary>
<p>

#### 答案：A

會回傳一個唯一的 id，並可用於 `clearInterval()` 以清除該 interval。

</p>
</details>

---

###### 43. 將會回傳何種結果？

```javascript
[...'Lydia'];
```

- A: `["L", "y", "d", "i", "a"]`
- B: `["Lydia"]`
- C: `[[], "Lydia"]`
- D: `[["L", "y", "d", "i", "a"]]`

<details><summary><b>答案</b></summary>
<p>

#### 答案：A

字串 (string) 類別是可以被迭代的 (iterable)，展開運算子 (spread operator) 將可迭代的字元 (character) 映射 (map) 置一個元素 (element) 上。

</p>
</details>

---

###### 44. 將會輸出什麽內容？

```javascript
function* generator(i) {
  yield i;
  yield i * 2;
}

const gen = generator(10);

console.log(gen.next().value);
console.log(gen.next().value);
```

- A: `[0, 10], [10, 20]`
- B: `20, 20`
- C: `10, 20`
- D: `0, 10 and 10, 20`

<details><summary><b>答案</b></summary>
<p>

#### 答案：C

一般函式不能在被呼叫後中途停止。但是，generator 可以在中途 "停止" 且之後可以從停止的位置繼續執行。
每當一個 generator 函式遇到一個 `yield` 關鍵字時，該函式就會產生其後指定的值。請注意，在這種情況下，generator 函式不是 _return_ 值，而是 _yields_ 值。

首先，我們使用等於 "10" 的 "i" 初始化 generator 函式。我們使用 "next（)" 方法呼叫 generator 函式。第一次呼叫 generator 函式時， "i" 等於 "10"。
它遇到第一個 `yield` 關鍵字：它產生 `i` 的值。現在，generator 已 "暫停"，並且記錄了 "10"。

然後，我們使用 `next（）` 方法再次呼叫該函式。它將從先前停止的地方繼續，仍然是 "i" 等於 "10"。現在，它遇到下一個 `yield` 關鍵字，並產生 `i * 2`。 
"i" 等於 "10"，因此回傳 "10 * 2"，即 "20"。故結果為 10、20。

</p>
</details>

---

###### 45. 將會回傳何種結果？

```javascript
const firstPromise = new Promise((res, rej) => {
  setTimeout(res, 500, 'one');
});

const secondPromise = new Promise((res, rej) => {
  setTimeout(res, 100, 'two');
});

Promise.race([firstPromise, secondPromise]).then(res => console.log(res));
```

- A: `"one"`
- B: `"two"`
- C: `"two" "one"`
- D: `"one" "two"`

<details><summary><b>答案</b></summary>
<p>

#### 答案：B

當我們向 Promise.race 方法傳遞多個 promise 時，它將 resolves / rejects _最先的_ promise。
在 setTimeout 方法中，我們傳遞了一個計時器：第一個 promise（firstPromise）為 500 毫秒，第二個 promise（secondPromise）為 100 毫秒。這意味著 "secondPromise" 將先用 "two" 的值進行 resolves。現在，`res` 擁有 'two' 的值且該值被 console.log。  

`Promise.race`用於競爭多個 Promise，看哪個先完成。
</p>
</details>

---

###### 46. 將會輸出什麽內容？

```javascript
let person = { name: 'Lydia' };
const members = [person];
person = null;

console.log(members);
```

- A: `null`
- B: `[null]`
- C: `[{}]`
- D: `[{ name: "Lydia" }]`

<details><summary><b>答案</b></summary>
<p>

#### 答案：D

首先，我們宣告一個物件變數 `person` 包含 `name` 屬性以及值 `Lydia`。

<img src="https://i.imgur.com/TML1MbS.png" width="200">

接著我們宣告另一個陣列變數 `members`。我們將該陣列的第一個元素設置等於 `person` 變數的值。
當我們將它們設置為相等時，物件透過 _reference_ 互相關聯。當我們將一個物件變數的 reference 賦值給另一個變數時，實際上我們是 _複製_ 該 reference (它們沒有 _相同_ 的 reference !)  

<img src="https://i.imgur.com/FSG5K3F.png" width="300">

接著我們將變數 `person` 賦予 `null`。

<img src="https://i.imgur.com/sYjcsMT.png" width="300">

我們僅修改變數 `person` 的值，並無修改陣列中的第一個元素。
基於該元素有份不同的 reference (一份複製的)，故 `members` 陣列中第一位元素仍保有對物件的指向，於是當我們 console.log `members` 陣列時，輸出內容為物件。

</p>
</details>

---
