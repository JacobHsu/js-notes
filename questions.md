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
