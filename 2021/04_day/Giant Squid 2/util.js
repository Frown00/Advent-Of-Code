function replaceAt(string, index, replacement) {
  if (index >= string.length) {
      return string.valueOf();
  }

  return string.substring(0, index) + replacement + string.substring(index + 1);
}

module.exports = {
  replaceAt
}