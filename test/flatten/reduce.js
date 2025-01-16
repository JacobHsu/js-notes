function flatten(value) {
  return value.reduce(
    (acc, curr) => acc.concat(Array.isArray(curr) ? flatten(curr) : curr),
    []
  );
}

module.exports = flatten;
