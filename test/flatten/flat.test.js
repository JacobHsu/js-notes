const flatten = require("./flat"); 

describe("flatten array", () => {
  test("empty array", () => {
    expect(flatten([])).toEqual([]); // 測試空陣列
  });

  test("nested array", () => {
    expect(flatten([1, [2]])).toEqual([1, 2]); // 測試一層嵌套
  });

  test("multiple levels of nesting", () => {
    expect(flatten([1, [2, [3]]])).toEqual([1, 2, 3]); // 測試多層嵌套
  });
});
