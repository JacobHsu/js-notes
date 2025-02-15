
[URL：searchParams](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/searchParams)

```js
function getUserIdFromUrl(url) {
    const urlParams = new URL(url).searchParams;
    const userId = urlParams.get("userid"); 
    
    if (userId) {
        console.log(userId);
    } else {
        console.log("User ID not found");
    }
}


const url = "https://example.com?userid=jacob.hsu";
getUserIdFromUrl(url); // jacob.hsu
```
