function curry(func) {
  return function curried(...args) {
    // 判斷參數是否足夠
    if (args.length >= func.length) {
      return func.apply(this, args);
    }
    // 參數不足時繼續柯里化
    return (arg) =>
      arg === undefined
        ? curried.apply(this, args)
        : curried.apply(this, [...args, arg]);
  };
}
module.exports = curry;
