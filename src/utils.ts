export const escapeRegExp = (str: string): string => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export const removeLeadingZeros = (str: string): string => {
  return str.replace(/^0+(0$|[^0])/, '$1')
}

export const count = (str: string, search: string): number => {
  return (str.match(new RegExp(escapeRegExp(search), 'g')) || []).length
}

export const substringBefore = (str: string, search: string): string => {
  return str.substring(0, str.indexOf(search))
}

export const abs = (n: bigint): bigint => {
  return n < BigInt(0) ? n * BigInt(-1) : n
}
