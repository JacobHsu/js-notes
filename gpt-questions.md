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



用 JavaScript 編寫的展平（`flatten`）嵌套結構。

<details><summary><b>答案</b></summary>
<p>

  以下是用 JavaScript 編寫的展平（`flatten`）嵌套結構的多種實現方法，涵蓋遞迴與非遞迴版本。
  
### **1. 遞迴實現**

使用遞迴來處理嵌套數據結構：

```javascript
function flattenRecursive(array) {
    const result = [];
    for (const item of array) {
        if (Array.isArray(item)) {
            result.push(...flattenRecursive(item)); // 遞迴展開
        } else {
            result.push(item);
        }
    }
    return result;
}

// 測試
const nestedArray = [1, [2, [3, 4]], [5, 6], 7];
console.log(flattenRecursive(nestedArray)); // [1, 2, 3, 4, 5, 6, 7]
```

---

### **2. 非遞迴實現（堆疊方式）**

使用堆疊模擬遞迴的行為展平數據：

```javascript
function flattenIterative(array) {
    const stack = [...array]; // 初始化堆疊
    const result = [];
    while (stack.length) {
        const item = stack.pop();
        if (Array.isArray(item)) {
            stack.push(...item); // 若為陣列，將其展開後壓回堆疊
        } else {
            result.unshift(item); // 若非陣列，直接插入結果陣列
        }
    }
    return result;
}

// 測試
const nestedArray = [1, [2, [3, 4]], [5, 6], 7];
console.log(flattenIterative(nestedArray)); // [1, 2, 3, 4, 5, 6, 7]
```

---

### **3. 使用內建方法**

在 JavaScript 中，`Array.prototype.flat()` 是展平數據的內建方法：

```javascript
const nestedArray = [1, [2, [3, 4]], [5, 6], 7];
console.log(nestedArray.flat(Infinity)); // [1, 2, 3, 4, 5, 6, 7]
```

- **`flat(depth)`**:
  - `depth` 是展平的層數。
  - 若需完全展平嵌套結構，將 `depth` 設為 `Infinity`。

---

### **4. 使用 `reduce` 方法**

透過 `Array.prototype.reduce()` 展平數據結構：

```javascript
function flattenWithReduce(array) {
    return array.reduce((acc, item) => {
        if (Array.isArray(item)) {
            return acc.concat(flattenWithReduce(item)); // 遞迴展開
        }
        return acc.concat(item);
    }, []);
}

// 測試
const nestedArray = [1, [2, [3, 4]], [5, 6], 7];
console.log(flattenWithReduce(nestedArray)); // [1, 2, 3, 4, 5, 6, 7]
```

---

### **5. 高性能非遞迴解法**

使用 `while` 與 `some` 方法檢查是否需要繼續展平：

```javascript
function flattenHighPerformance(array) {
    while (array.some(item => Array.isArray(item))) {
        array = [].concat(...array); // 使用展開運算符展平一層
    }
    return array;
}

// 測試
const nestedArray = [1, [2, [3, 4]], [5, 6], 7];
console.log(flattenHighPerformance(nestedArray)); // [1, 2, 3, 4, 5, 6, 7]
```

---

### **總結**
- **簡單展平一層**：使用 `flat()` 或展開運算符（`[].concat(...array)`）。
- **深度展平**：
  - 小數據量：可以使用遞迴方法。
  - 大數據量：推薦使用非遞迴堆疊方式。
- **高效且現代**：`Array.prototype.flat(Infinity)` 是最直接的方式。

選擇取決於具體需求（如性能或兼容性要求）。
</p>
</details>

---





### **`vh` 在手機上的問題**

<details><summary><b>答案</b></summary>
<p>
  
`vh`（viewport height）是 CSS 的一個單位，表示視窗高度的 1%。然而，在手機或平板設備上，`vh` 單位可能會出現以下問題：

1. **地址欄與工具欄的影響**：
   - 手機瀏覽器通常有地址欄和工具欄（如導航按鈕）。
   - 當用戶滾動時，地址欄和工具欄會隱藏或顯示，導致視窗高度動態變化。
   - `vh` 單位基於「當前視窗高度」計算，因此當地址欄或工具欄出現或隱藏時，`vh` 的值會改變，導致頁面布局出現跳動或不穩定。

2. **不一致的視窗報告**：
   - 不同的瀏覽器處理 `vh` 單位的方式不同。
   - 一些瀏覽器會將工具欄包含在 `vh` 的計算中，而其他瀏覽器則不會，這導致跨瀏覽器不一致的行為。

---

### **替代語法與解決方案**

#### **1. 使用 `100dvh`**
新的 CSS 單位 `dvh`（Dynamic Viewport Height）是 `vh` 的改進版：
- `100dvh` 表示「動態視窗高度」，不受工具欄影響。
- 許多現代瀏覽器已支持 `dvh`。

```css
.height {
    height: 100dvh; /* 使用動態視窗高度 */
}
```

#### **2. 使用 JavaScript 動態計算高度**
如果需要支援舊瀏覽器或更精確的控制，可以使用 JavaScript 手動計算高度：

```javascript
function updateHeight() {
    const viewportHeight = window.innerHeight;
    document.documentElement.style.setProperty('--vh', `${viewportHeight * 0.01}px`);
}

// 初次設置
updateHeight();

// 當視窗大小變化時更新
window.addEventListener('resize', updateHeight);

// CSS 中使用
/* 100vh 的替代方案 */
.element {
    height: calc(var(--vh, 1vh) * 100);
}
```

#### **3. 結合 `min-height` 與 `vh`**
對於支持不一致的設備，可以用 `min-height` 確保最小高度：
```css
.container {
    min-height: 100vh; /* 確保基本支持 */
    min-height: 100dvh; /* 覆蓋現代設備的精確高度 */
}
```

#### **4. 使用 `env(safe-area-inset-*)` 進行安全區域處理**
在某些設備（如 iPhone 帶瀏海的設備）上，考慮使用 CSS 的 `env()` 函數處理安全區域(瀏海屏幕（Notch Screens）)：
```css
.container {
    padding-top: env(safe-area-inset-top);
    padding-bottom: env(safe-area-inset-bottom);
    height: calc(100vh - env(safe-area-inset-bottom));
}
```

---

### **總結**
1. **首選現代解法**：使用 `100dvh` 或結合 `min-height`，解決地址欄影響的問題。
2. **兼容舊瀏覽器**：使用 JavaScript 計算並設置自定義 CSS 變數（如 `--vh`）。
3. **跨設備的最佳體驗**：結合 `env()` 確保在支持瀏海的設備上不會截斷內容。

</p>
</details>
