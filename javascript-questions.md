
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

###### 47. 將會輸出什麽內容？

```javascript
const person = {
  name: 'Lydia',
  age: 21,
};

for (const item in person) {
  console.log(item);
}
```

- A: `{ name: "Lydia" }, { age: 21 }`
- B: `"name", "age"`
- C: `"Lydia", 21`
- D: `["name", "Lydia"], ["age", 21]`

<details><summary><b>答案</b></summary>
<p>

#### 答案：B

通過 `for-in` 循環，我們可以遍歷物件的鍵，在這個題目中的鍵是 `name` 和 `age`。在內部，物件鍵是字串 (strings)（如果它們不是 Symbol）。
在每次循環中，我們將 `item` 的值設置為等於其迭代的當前鍵。第一輪循環中，`item` 等於 `name`，並輸出內容。接著，`item` 等於 `age`，並輸出內容。

</p>
</details>

---

###### 48. 將會輸出什麽內容？

```javascript
console.log(3 + 4 + '5');
```

- A: `"345"`
- B: `"75"`
- C: `12`
- D: `"12"`

<details><summary><b>答案</b></summary>
<p>

#### 答案：B

運算子關聯性是編譯器計算表達式的順序，從左到右或從右到左。僅適用於所有運算子具有 _相同_ 優先級時，才會發生這種情況。
在這裡我們只有一種類型的運算子：+。而其關聯性是從左到右。

首先計算 `3 + 4`。結果為數字 7。

由於強制 (coercion) ，`7 +'5'` 會導致結果為 `75`。JavaScript 將數字 `7` 轉換型態成字串，請參閱問題 15。我們可以使用 `+` 運算子將兩個字串連接起來。`7` + `5` 產生 `75`。

</p>
</details>

---

###### 49. `num` 的值會是什麼？

```javascript
const num = parseInt('7*6', 10);
```

- A: `42`
- B: `"42"`
- C: `7`
- D: `NaN`

<details><summary><b>答案</b></summary>
<p>

#### 答案：C

僅會回傳字串中的第一個數字。基於 _radix_ (第二個參數，用於指定我們要將其解析為哪種類型的數字：以 10 為基數，十六進制，八進制，二進制等），`parseInt` 檢查字串中的字元是否有效。
一旦遇到基數中無效數字的字元，它將停止解析並忽略以下字元。

`*` 不是合法的 `number`，所以程式僅將字串形態的 `"7"` 轉換至 decimal 形態的 `7`，故 `num` 現在的值為 `7`。

</p>
</details>

---

###### 50. 將會輸出什麽內容？

```javascript
[1, 2, 3].map(num => {
  if (typeof num === 'number') return;
  return num * 2;
});
```

- A: `[]`
- B: `[null, null, null]`
- C: `[undefined, undefined, undefined]`
- D: `[ 3 x empty ]`

<details><summary><b>答案</b></summary>
<p>

#### 答案：C

當對陣列做映射 (map) 時，`num` 的值等同於它當前正在循環的元素。在這種情況中元素均為 numbers，所以條件式 `typeof num === "number"` 會回傳 `true` 的值。
map 函式會建立一個新陣列，並插入該函式回傳的值。

但是我們不回傳任何值。當我們不從函式回傳值時，函式將回傳 `undefined`。由於陣列中的每個元素都會呼叫該函式，因此對於每個元素，我們都回傳 `undefined`。

</p>
</details>

---

###### 51. 將會輸出什麽內容？

```javascript
function getInfo(member, year) {
  member.name = 'Lydia';
  year = '1998';
}

const person = { name: 'Sarah' };
const birthYear = '1997';

getInfo(person, birthYear);

console.log(person, birthYear);
```

- A: `{ name: "Lydia" }, "1997"`
- B: `{ name: "Sarah" }, "1998"`
- C: `{ name: "Lydia" }, "1998"`
- D: `{ name: "Sarah" }, "1997"`

<details><summary><b>答案</b></summary>
<p>

#### 答案：A

參數是透過 _value_ 傳遞，除非它們是一個物件 (object)，物件則由透過 _reference_ 傳遞。`birthYear` 是透過值傳遞的，因為它是字串不是物件。當我們按值傳遞參數時，將建立該值的 _copy_ (請參閱問題 46）。

變數 `birthYear` 具有對值 `1997` 的 reference。參數 `year` 也有對值 `1997` 的 reference，但與變數 `birthYear` 所 reference 的不同。
因此當我們通過將 `year` 設置為等於 `1998` 來更新 `year` 的值時，我們僅更新了 `year` 的值。`birthYear` 仍然等於 `"1997"`。

`person` 的值是一個物件。參數 `member` 具有（複製的）reference 指向 _相同_ 物件。
因此當我們修改物件 `member` 的屬性時，`person` 的值也會被修改，因為它們都 reference 了相同的物件。`person` 的 `name` 屬性現在等於值 `"Lydia"`。

</p>
</details>

---

###### 52. 將會輸出什麽內容？

```javascript
function greeting() {
  throw 'Hello world!';
}

function sayHi() {
  try {
    const data = greeting();
    console.log('It worked!', data);
  } catch (e) {
    console.log('Oh no an error:', e);
  }
}

sayHi();
```

- A: `It worked! Hello world!`
- B: `Oh no an error: undefined`
- C: `SyntaxError: can only throw Error objects`
- D: `Oh no an error: Hello world!`

<details><summary><b>答案</b></summary>
<p>

#### 答案：D

使用 `throw` 語句，我們可以建立自定義的錯誤。使用此語句，您可以觸發例外 (exception)。例外可以是 `<b>string</ b>`，`<b>number</ b>`，`<b>boolean</ b>` 或 `<b>object</ b>`。 
在這種情況下，我們的例外是字串 `Hello world`。

通過 `catch` 語句，我們可以指定如果在 `try` 的程式區塊中拋出例外時該怎麼辦。例如拋出例外：字串 `'Hello world'`。 
現在，`e` 等於我們記錄的字串。因此輸出結果將會是 `'Oh an error: Hello world'`。

</p>
</details>

---

###### 53. 將會輸出什麽內容？

```javascript
function Car() {
  this.make = 'Lamborghini';
  return { make: 'Maserati' };
}

const myCar = new Car();
console.log(myCar.make);
```

- A: `"Lamborghini"`
- B: `"Maserati"`
- C: `ReferenceError`
- D: `TypeError`

<details><summary><b>答案</b></summary>
<p>

#### 答案：B

當您回傳屬性 (property) 時，該屬性的值等於 _returned_ 的值，而不是在函式建構式 (constructor function) 中設置的值。我們回傳字串 `Maserati`，因此 `myCar.make` 等於 `Maserati`。

</p>
</details>

---

###### 54. 將會輸出什麽內容？

```javascript
(() => {
  let x = (y = 10);
})();

console.log(typeof x);
console.log(typeof y);
```

- A: `"undefined", "number"`
- B: `"number", "number"`
- C: `"object", "number"`
- D: `"number", "undefined"`

<details><summary><b>答案</b></summary>
<p>

#### 答案：A

`let x = y = 10;` 實際上是 shorthand for:

```javascript
y = 10;
let x = y;
```

當我們將 `y `設置為等於 `10` 時，我們實際上將屬性 `y` 加入到 global object 中（瀏覽器中的 `window`，Node 中的 `global`）。現在，瀏覽器中 `window.y` 現在等於 `10`。

接著我們宣告一個變數 `x`，並將其值賦予為 `y`，即 `10`。用` let` 關鍵字宣告的變數是 _block scoped_，它們僅在宣告它們的區塊中定義；另外此案例的函示是，立即函示表達式（IIFE）。
當我們使用 `typeof` 運算子時，`x` 並未被定義：我們試圖在宣告它的區塊外訪問 `x`。這將獲得 `x` 並未被定義的結果。未分配值或未宣告的值的類型為 `"undefined"`。`console.log(typeof x)` 回傳 `"undefined"`。

但是，當將 `y` 設置為 `10` 時，我們建立了 global variable `y`。在我們程式中的任何位置均可訪問此值。
`y` 被定義，並且為類型 `number` 的值。因此 `console.log（typeof y` 回傳 `"number"`。

</p>
</details>

---

###### 55. 將會輸出什麽內容？

```javascript
class Dog {
  constructor(name) {
    this.name = name;
  }
}

Dog.prototype.bark = function() {
  console.log(`Woof I am ${this.name}`);
};

const pet = new Dog('Mara');

pet.bark();

delete Dog.prototype.bark;

pet.bark();
```

- A: `"Woof I am Mara"`, `TypeError`
- B: `"Woof I am Mara"`, `"Woof I am Mara"`
- C: `"Woof I am Mara"`, `undefined`
- D: `TypeError`, `TypeError`

<details><summary><b>答案</b></summary>
<p>

#### 答案：A

透過 `delete` 關鍵字，我們可以從物件中刪除它的屬性。同樣適用在原型 (prototype)。通過刪除原型上的屬性，該屬性在原型鏈中將不可再被使用。
在這個案例中，`bark` 函式在 `delete Dog.prototype.bark` 之後的原型上不再可用，但是我們仍然嘗試訪問它。

因此當我們嘗試呼叫不是函式的東西時，程式將拋出 `TypeError`。在這個案例中，將為 `TypeError: pet.bark is not a function`，因為 `pet.bark` 是 `undefined`。

</p>
</details>

---

###### 56. 將會輸出什麽內容？

```javascript
const set = new Set([1, 1, 2, 3, 4]);

console.log(set);
```

- A: `[1, 1, 2, 3, 4]`
- B: `[1, 2, 3, 4]`
- C: `{1, 1, 2, 3, 4}`
- D: `{1, 2, 3, 4}`

<details><summary><b>答案</b></summary>
<p>

#### 答案：D

`Set` 物件是 _唯一_ 值的集合：任何存在於 `Set` 的值均為唯一的，不會存在相同的值 (重複的值將會由後出現的覆蓋已出現的)。

陣列 `[1, 1, 2, 3, 4]` 中有重複的值 `1`，因此結果會是 `{1, 2, 3, 4}`。

</p>
</details>

---

###### 57. 將會輸出什麽內容？

```javascript
// counter.js
let counter = 10;
export default counter;
```

```javascript
// index.js
import myCounter from './counter';

myCounter += 1;

console.log(myCounter);
```

- A: `10`
- B: `11`
- C: `Error`
- D: `NaN`

<details><summary><b>答案</b></summary>
<p>

#### 答案：C

被引用 (imported) 的模組 (module) 是 _唯讀_ 的：您無法修改被引用模組中項目，只有輸出 (export) 該項目的模組可以更改它的值。

因此當我們嘗試增加 `myCounter` 的值時，他將拋出錯誤：`myCounter` is read-only and cannot be modified。

</p>
</details>

---

###### 58. 將會輸出什麽內容？

```javascript
const name = 'Lydia';
age = 21;

console.log(delete name);
console.log(delete age);
```

- A: `false`, `true`
- B: `"Lydia"`, `21`
- C: `true`, `true`
- D: `undefined`, `undefined`

<details><summary><b>答案</b></summary>
<p>

#### 答案：A

`delete` 運算子會回傳一個布林值：成功刪除物件的情況下會回傳 `true`，反之則為 `false`。但是經由 `var`，`const` 或是 `let` 關鍵字所宣告的變數是無法使用 `delete` 運算子刪除的。

此處，`name` 無法成功刪除且會回傳 `false`，因為它是經由 `const` 所宣告。當我們宣告 `age` 的值為 `21` 時，實際上我們做的是將一個名為 `age` 的屬性為添加到了全球物件中，您可以透過 `delete` 來刪除物件中的屬性，因此您也能刪除全球物件中的屬性，故將回傳 `true`。

</p>
</details>

---

###### 59. 將會輸出什麽內容？

```javascript
const numbers = [1, 2, 3, 4, 5];
const [y] = numbers;

console.log(y);
```

- A: `[[1, 2, 3, 4, 5]]`
- B: `[1, 2, 3, 4, 5]`
- C: `1`
- D: `[1]`

<details><summary><b>答案</b></summary>
<p>

#### 答案：C

我們可以通過解構 (destructuring) 從陣列或物件的屬性中獲得值。例如：

```javascript
[a, b] = [1, 2];
```

<img src="https://i.imgur.com/ADFpVop.png" width="200">

a 的值現在為 `1` 且 b 的值現在為`2`。我們針對此問題所做的動作為：

```javascript
[y] = [1, 2, 3, 4, 5];
```

<img src="https://i.imgur.com/NzGkMNk.png" width="200">

這代表著 `y` 的值等同於陣列中第一個元素的值，即為 `1`。因此我們執行 `console.log(y)` 時， `1` 將被輸出。

</p>
</details>

---

###### 60. 將會輸出什麽內容？

```javascript
const user = { name: 'Lydia', age: 21 };
const admin = { admin: true, ...user };

console.log(admin);
```

- A: `{ admin: true, user: { name: "Lydia", age: 21 } }`
- B: `{ admin: true, name: "Lydia", age: 21 }`
- C: `{ admin: true, user: ["Lydia", 21] }`
- D: `{ admin: true }`

<details><summary><b>答案</b></summary>
<p>

#### 答案：B

使用 spread 運算子可以合併物件 (`...`)。它使您可以建立一個物件的鍵/值的複製，並將其添加到另一物件中。
在這裡我們建立了 `user` 物件的複製並將其添加至 `admin` 物件。因此將輸出 `{ admin: true, name: "Lydia", age: 21 }`。

</p>
</details>

---

###### 61. 將會輸出什麽內容？

```javascript
const person = { name: 'Lydia' };

Object.defineProperty(person, 'age', { value: 21 });

console.log(person);
console.log(Object.keys(person));
```

- A: `{ name: "Lydia", age: 21 }`, `["name", "age"]`
- B: `{ name: "Lydia", age: 21 }`, `["name"]`
- C: `{ name: "Lydia"}`, `["name", "age"]`
- D: `{ name: "Lydia"}`, `["age"]`

<details><summary><b>答案</b></summary>
<p>

#### 答案：B

透過 `defineProperty`，我們可以對物件增加新的屬性或是修改已經存在的屬性。當我們使用 `defineProperty` 增加物件的屬性時，它們被預設為 _不可 enumerable_。
 `Object.keys` 方法僅回傳物件中所有 _可 enumerable_ 的屬性名稱，這個案例中只有 `"name"`。

預設下，使用 `defineProperty `方法增加的屬性是不可變的。但您可以覆蓋這個行為透過 `writable`，`configurable` 及 `enumerable` 屬性。
於是，`defineProperty` 方法可以使您對要增加到物件的屬性進行更多的控制。

</p>
</details>

---

###### 62. 將會輸出什麽內容？

```javascript
const settings = {
  username: 'lydiahallie',
  level: 19,
  health: 90,
};

const data = JSON.stringify(settings, ['level', 'health']);
console.log(data);
```

- A: `"{"level":19, "health":90}"`
- B: `"{"username": "lydiahallie"}"`
- C: `"["level", "health"]"`
- D: `"{"username": "lydiahallie", "level":19, "health":90}"`

<details><summary><b>答案</b></summary>
<p>

#### 答案：A

`JSON.stringify` 的第二個參數是 _替換者 (replacer)_，替換者可以是函式，也可以是陣列，並允許您控制值要如何獲怎麼串化 (stringified)。

如果替換者是 _陣列_，僅將陣列中包含的屬性名稱加到 JSON 字串中。
此案例中，僅有 `"level"` and `"health"` 被包含，`"username"` 沒有被包含在內，因此 `data` 的值將為 `"{"level":19, "health":90}"`。

如果替換者是 _函式_，在要字串化的每個物件屬性上將會呼叫此函式。從此函式回傳的值將是加到 JSON 字串中的屬性的值。如果值為 `undefined`，則此屬性從 JSON 字串中排除。

</p>
</details>

---

###### 63. 將會輸出什麽內容？

```javascript
let num = 10;

const increaseNumber = () => num++;
const increasePassedNumber = number => number++;

const num1 = increaseNumber();
const num2 = increasePassedNumber(num1);

console.log(num1);
console.log(num2);
```

- A: `10`, `10`
- B: `10`, `11`
- C: `11`, `11`
- D: `11`, `12`

<details><summary><b>答案</b></summary>
<p>

#### 答案：A

單元運算子 `++` 首先 _回傳_ 操作數的值，然後 _遞增_ 操作數的值。`num1` 的值是 `10`，因為 `increaseNumber`  函式首先回傳 `num` 的值，即 `10`，之後才遞增 `num` 的值。

`num2` 是 `10`，因為我們將 `num1` 傳遞給了 `increasePassedNumber`。`number` 等於 `10`（`num1` 的值。同樣，單元運算子 `++` 首先 _回傳_ 操作數的值，然後 _遞增_ 操作數的值。
`number` 的值是 `10`，因此 `num2` 等於 `10`。

</p>
</details>

---

###### 64. 將會輸出什麽內容？

```javascript
const value = { number: 10 };

const multiply = (x = { ...value }) => {
  console.log((x.number *= 2));
};

multiply();
multiply();
multiply(value);
multiply(value);
```

- A: `20`, `40`, `80`, `160`
- B: `20`, `40`, `20`, `40`
- C: `20`, `20`, `20`, `40`
- D: `NaN`, `NaN`, `20`, `40`

<details><summary><b>答案</b></summary>
<p>

#### 答案：C

在 ES6 中，我們可以使用預設值初始化參數。如果沒有其他值傳遞給該函式或是傳入的參數是 `undefined`，則該參數的值為預設值。此案例中，我們將 `value` 物件的屬性擴展到一個新物件中，因此 `x` 具有預設值 `{number：10}`。

預設值是在 _呼叫_ 時被 evaluated。每次呼叫該函式時，都會建立一個 _新_ 物件。我們在沒有傳遞值的情況下呼叫了 `multiply` 函式兩次：`x` 的預設值是 `{{number：10}`。因此，我們輸出該數字的相乘值，即 `20`。

第三次呼叫時，我們確實傳遞了一個參數：名為 `value` 的物件。`*=` 運算子實際上是 `x.number = x.number * 2` 的簡寫：因此我們修改了 `x.number` 的值，並記錄相乘後的值 `20`。

第四次，我們再次傳遞名為 `value` 的物件。`x.number` 先前已修改為 `20`，因此 `x.number * = 2` 為 `40`。

</p>
</details>

---

###### 65. 將會輸出什麽內容？

```javascript
[1, 2, 3, 4].reduce((x, y) => console.log(x, y));
```

- A: `1` `2` and `3` `3` and `6` `4`
- B: `1` `2` and `2` `3` and `3` `4`
- C: `1` `undefined` and `2` `undefined` and `3` `undefined` and `4` `undefined`
- D: `1` `2` and `undefined` `3` and `undefined` `4`

<details><summary><b>答案</b></summary>
<p>

#### 答案：D

`reduce` 方法接收的第一個參數是 _累加器 (accumulator)_，在這種情況下是 `x`。第二個參數是 _current value_ `y`。使用 `reduce` 方法，我們對陣列中的每個元素執行一個 callback 函式，並在最終回一個值。

在此示例中，我們不回傳任何值，僅記錄了累加器的值和當前值。

累加器的值等於 callback 函式先前回傳的值。如果沒有 `initialValue` 參數傳遞給 `reduce` 方法，則累加器的初始值將會等於第一個元素。

在第一個呼叫中，累加器（`x`）為`1`，當前值（`y`）為`2`。我們不從 callback 函式回傳，而是輸出累加器和當前值：`1` 和 `2`。

如果您不從 callback 函式回傳值，則它將回傳 `undefined`。在下一次呼叫時，累加器為 `undefined`，當前值為 `3`。於是 `undefined` 和 `3` 被輸出。

在第四次呼叫中，我們再次不從 callback 函式回傳。累加器再次為 `undefined`，當前值為 `4`。於是 `undefined` 和 `4` 被輸出。

</p>
</details>
  
---

###### 66. 使用哪個建構式可以成功繼承 Dog 類別？

```javascript
class Dog {
  constructor(name) {
    this.name = name;
  }
};

class Labrador extends Dog {
  // 1
  constructor(name, size) {
    this.size = size;
  }
  // 2
  constructor(name, size) {
    super(name);
    this.size = size;
  }
  // 3
  constructor(size) {
    super(name);
    this.size = size;
  }
  // 4
  constructor(name, size) {
    this.name = name;
    this.size = size;
  }

};
```

- A: 1
- B: 2
- C: 3
- D: 4

<details><summary><b>答案</b></summary>
<p>

#### 答案：B

在子類別中，在呼叫 `super` 前不能存取 `this` 關鍵字，如果你這麼做，它將拋出一個 `ReferenceError`，建構式 1 與 4 會引發這個錯誤。

使用 `super` 關鍵字時，我們要提供參數給父類別呼叫其建構式。父類別需要接受一個 `name` 參數，所以我們需要把 `name` 傳給 `super`。

`Labrador` 類別接收兩個參數，`name` 參數是由於它繼承了 `Dog`，`size` 作為`Labrador` 類的額外屬性，它們都需要傳遞給 `Labrador` 的建構式，因此使用建構式 2 是正確答案。

</p>
</details>

---

###### 67. 將會輸出什麽內容？

```javascript
// index.js
console.log('running index.js');
import { sum } from './sum.js';
console.log(sum(1, 2));

// sum.js
console.log('running sum.js');
export const sum = (a, b) => a + b;
```

- A: `running index.js`, `running sum.js`, `3`
- B: `running sum.js`, `running index.js`, `3`
- C: `running sum.js`, `3`, `running index.js`
- D: `running index.js`, `undefined`, `running sum.js`

<details><summary><b>答案</b></summary>
<p>

#### 答案：B

`import` 命令是 _編譯階段_ 執行的。這代表被引入的模組會優先執行，而引入模組的檔案會 _之後執行_。

這是 `CommonJS` 中 `require()` 和 `import` 之間的區別！使用 `require()`，您可以在執行程式時根據需要戴入依賴的項目。如果我們使用 `require` 而不是 `import` 來執行此題，結果將會依 `running index.js`，`running sum.js`，`3` 的順序輸出。

</p>
</details>

---

###### 68. 將會輸出什麽內容？

```javascript
console.log(Number(2) === Number(2));
console.log(Boolean(false) === Boolean(false));
console.log(Symbol('foo') === Symbol('foo'));
```

- A: `true`, `true`, `false`
- B: `false`, `true`, `false`
- C: `true`, `false`, `true`
- D: `true`, `true`, `true`

<details><summary><b>答案</b></summary>
<p>

#### 答案：A

每個 Symbol 都是完全唯一的。傳遞給 Symbol 的參數只是給 Symbol 的一個描述。Symbol 的值不依賴於傳遞的參數。當我們建立兩個全新的 Symbol 去比較時：第一個`Symbol('foo')`，第二個`Symbol('foo')`, 因這兩個值是唯一的，彼此不相等，因此 `Symbol('foo') === Symbol('foo')` 會得到 `false`。

</p>
</details>

---

###### 69. 將會輸出什麽內容？

```javascript
const name = 'Lydia Hallie';
console.log(name.padStart(13));
console.log(name.padStart(2));
```

- A: `"Lydia Hallie"`, `"Lydia Hallie"`
- B: `" Lydia Hallie"`, `" Lydia Hallie"` (`"[13x whitespace]Lydia Hallie"`, `"[2x whitespace]Lydia Hallie"`)
- C: `" Lydia Hallie"`, `"Lydia Hallie"` (`"[1x whitespace]Lydia Hallie"`, `"Lydia Hallie"`)
- D: `"Lydia Hallie"`, `"Lyd"`,

<details><summary><b>答案</b></summary>
<p>

#### 答案：C

使用 `padStart` 函數，我們可以在字串的前面加上填充字串。傳遞給此函數的參數是字串的總長度（包含填充字串）。字串 Lydia Hallie 的長度為 `12` , 因此 `name.padStart(13)` 在字串的開頭只會插入 1 個空格，因為 12 + 1 等於 13。

如果傳給 `padStart` 函數的參數小於字串的長度，則不會加上填充字串。

</p>
</details>

---

###### 70. 將會輸出什麽內容？

```javascript
console.log('🥑' + '💻');
```

- A: `"🥑💻"`
- B: `257548`
- C: 一個包含碼位 (code point) 的字串
- D: 錯誤

<details><summary><b>答案</b></summary>
<p>

#### 答案：A

使用 `+` 運算元，你可以連接字串。在此例，我們將字串“🥑”與字串”💻“連接起來，產生”🥑💻“。

</p>
</details>

---

###### 71. /* 1 */ 與 /* 2 */ 該填入什麼才能輸出 console.log 之後的值？

```javascript
function* startGame() {
  const answer = yield '你喜歡 JavaScript 嗎？';
  if (answer !== 'Yes') {
    return "哦，我想我們該走了";
  }
  return 'JavaScript 也愛你 ❤️';
}

const game = startGame();
console.log(/* 1 */); // 你喜歡 JavaScript 嗎？
console.log(/* 2 */); // JavaScript 也愛你 ❤️
```

- A: `game.next("Yes").value` and `game.next().value`
- B: `game.next.value("Yes")` and `game.next.value()`
- C: `game.next().value` and `game.next("Yes").value`
- D: `game.next.value()` and `game.next.value("Yes")`

<details><summary><b>答案</b></summary>
<p>

#### 答案：C

`generator` 函數在遇到 yield 關鍵字時會“暫停”執行。首先，我們需要讓函數產生字串 "你喜歡 JavaScript 嗎？"，這可以透過呼叫 `game.next().value` 來完成。

`startGame()` 函數會一行一行執行直到遇到 `yield` 關鍵字，在函數裡第一個就有一個 `yield` 關鍵字：所以執行到第一行就停止了！_此時 answer 變數還尚未定義_

當我們呼叫 `game.next("Yes").value`，前一個 `yield` 被傳遞給 `next()` 的參數值所取代。此例我們使用 `Yes`。變數 `answer` 的值現在等於 `Yes`。if 語句的條件回傳 `false`，並且會回傳 `JavaScript 也愛你 ❤️`。

</p>
</details>

---

###### 72. 將會輸出什麽內容？

```javascript
console.log(String.raw`Hello\nworld`);
```

- A: `Hello world!`
- B: `Hello` <br />&nbsp; &nbsp; &nbsp;`world`
- C: `Hello\nworld`
- D: `Hello\n` <br /> &nbsp; &nbsp; &nbsp;`world`

<details><summary><b>答案</b></summary>
<p>

#### 答案：C

`String.raw`會回傳一個字串，其中轉義符 (`/n`, `/v`, `/t`等) 被忽略！反斜線可能是一個問題，因為你可能會有這樣的結果。

`const path = "C:\Documents\Projects\table.html"`。

將會得到：

`C:DocumentsProjects able.html`

如果使用`String.raw`，它將直接忽略轉譯並輸出。

`C:\Documents\Projects\table.html`。

在這種情況下，字串會以 "Hello\nworld"，被記錄下來。

</p>
</details>

---
