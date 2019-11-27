const equal = (a, b) => {
  if (a === b) {
    return true
  }
  if (a.valueOf !== Object.prototype.valueOf) {
    return a.valueOf() === b.valueOf()
  }
  const keys = Object.keys(a)
  if (keys.length !== Object.keys(b).length) {
    return false
  }
  if (!keys.every(Object.prototype.hasOwnProperty.bind(b))) {
    return false
  }
  return keys.every(key => equal(a[key], b[key]))
}

export default equal
