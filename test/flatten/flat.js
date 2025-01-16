function flatten(arr) {
  return arr.flat(Infinity); // 利用 Array.prototype.flat 展開嵌套陣列
}

module.exports = flatten;
