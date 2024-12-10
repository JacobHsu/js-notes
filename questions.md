如果執行以下程式碼：

```javascript
for (var i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i)
  })
}
```

<details><summary><b>答案</b></summary>
<p>
  
**結果：**
```
5
5
5
5
5
```

**原因：**
1. 這是因為 `var` 的變數是**函式作用域**（function scope），而非**塊級作用域**（block scope）。
2. 當 `setTimeout` 排程執行時，`for` 迴圈早已完成執行，`i` 的值變成了 5（迴圈停止時的值）。
3. 當計時器執行時，`console.log(i)` 都會參考到同一個變數 `i`，此時 `i` 的值已經是 5。

---

### 解決方式：

如果希望每次 `setTimeout` 中的 `i` 保持其當前的值，可以改用以下方法：

1. **使用 `let`：**
   `let` 是塊級作用域，會為每次迭代建立新的作用域，因此每次的 `i` 值會正確地保存。
   ```javascript
   for (let i = 0; i < 5; i++) {
     setTimeout(() => {
       console.log(i);
     });
   }
   // 結果：0, 1, 2, 3, 4
   ```

2. **使用 IIFE（立即執行函式）：**
   為每次迭代建立一個新的作用域。
   ```javascript
   for (var i = 0; i < 5; i++) {
     (function(i) {
       setTimeout(() => {
         console.log(i);
       });
     })(i);
   }
   // 結果：0, 1, 2, 3, 4
   ```

3. **使用 `bind`：**
   綁定當前的 `i` 值作為參數。
   ```javascript
   for (var i = 0; i < 5; i++) {
     setTimeout(console.log.bind(null, i));
   }
   // 結果：0, 1, 2, 3, 4
   ```

</p>
</details>

---


微任務（Microtasks）以及宏任務（Macrotasks） 是什麼


<details><summary><b>答案</b></summary>
<p>

**微任務（Microtasks）**和**宏任務（Macrotasks）**是 JavaScript 中執行模型的一部分，用來處理非同步任務。理解這兩者可以幫助我們掌握 JavaScript 的事件循環（Event Loop）運作方式。

---

### **1. 微任務（Microtasks）**
微任務是一種執行優先級較高的任務。它會在當前的執行上下文（Execution Context）結束後立即執行，但必須等同步代碼執行完成。

#### **常見的微任務來源**
- `Promise.then`、`Promise.catch`、`Promise.finally`
- `MutationObserver`
- `queueMicrotask`

#### **微任務的特性**
- 當同步代碼執行完成後，微任務會在事件循環處理下一個宏任務之前被執行。
- 可以連續執行多個微任務（例如鏈式的 `Promise`）。

---

### **2. 宏任務（Macrotasks）**
宏任務的執行優先級低於微任務。它會被排入事件循環的下一次迭代中執行。

#### **常見的宏任務來源**
- `setTimeout`
- `setInterval`
- `setImmediate`（Node.js 環境）
- `I/O` 操作
- `requestAnimationFrame`

#### **宏任務的特性**
- 每次事件循環的開始，都會先處理一個宏任務。
- 微任務執行結束後，才會進入宏任務的執行。

---

### **執行順序：微任務 vs. 宏任務**
1. 先執行同步代碼（直接進入主線程執行）。
2. 執行所有微任務（Microtasks）。
3. 執行一個宏任務（Macrotasks）。
4. 重複上述過程。

---

### **具體運作流程**
假設有以下程式碼：

```javascript
console.log('同步代碼');

setTimeout(() => {
  console.log('宏任務');
}, 0);

Promise.resolve().then(() => {
  console.log('微任務');
});

console.log('結束');
```

執行步驟：
1. **執行同步代碼**：
   - 輸出：`同步代碼`
2. **將 `setTimeout` 加入宏任務佇列**。
3. **將 `Promise.then` 加入微任務佇列**。
4. **繼續執行同步代碼**：
   - 輸出：`結束`
5. **執行微任務**：
   - 輸出：`微任務`
6. **執行宏任務（`setTimeout` 的回呼）**：
   - 輸出：`宏任務`

最終輸出結果：
```
同步代碼
結束
微任務
宏任務
```

---

### **總結**
- **微任務（Microtasks）**：優先於宏任務執行，適合處理短時間、緊急的非同步操作。
- **宏任務（Macrotasks）**：次於微任務執行，用於較大的非同步任務（例如定時器或渲染相關的操作）。

微任務和宏任務的區別主要在於**執行順序**，這是理解 JavaScript 非同步行為的核心！
</p>
</details>

---
