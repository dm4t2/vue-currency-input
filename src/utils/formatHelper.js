export const onlyDigits = (str) => str.replace(/\D+/g, '')

export const removePrefix = (str, prefix) => {
  if (prefix.length && str.startsWith(prefix)) {
    return str.substr(prefix.length)
  }
  return str
}

export const removeSuffix = (str, suffix) => {
  if (suffix.length && str.endsWith(suffix)) {
    return str.slice(0, suffix.length * -1)
  }
  return str
}
