Array.prototype.myFilter = function (callbackFn, thisArg) {
  const len = this.length;
  const result = [];

  for (let k = 0; k < len; k++) {
    let kValue = this[k];
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
    // callbackFn element index array  
    if (Object.hasOwn(this, k) && callbackFn.call(thisArg, kValue, k, this)) {
      result.push(kValue);
    }
  }
  return result;
};

module.exports = Array.prototype.myFilter;
