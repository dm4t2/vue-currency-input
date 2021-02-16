export const escapeRegExp = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

export const removeLeadingZeros = (str) => str.replace(/^0+(0$|[^0])/, '$1')

export const count = (str, search) => (str.match(new RegExp(escapeRegExp(search), 'g')) || []).length

export const substringBefore = (str, search) => str.substring(0, str.indexOf(search))
