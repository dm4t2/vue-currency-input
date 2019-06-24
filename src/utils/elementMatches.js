export default (el, selector) => (el.matches || el.msMatchesSelector || el.webkitMatchesSelector).call(el, selector)
