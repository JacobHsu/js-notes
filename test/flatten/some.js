function flatten(value) {
  while (value.some(Array.isArray)) {
    value = [].concat(...value);
  }

  return value;
}

module.exports = flatten;
