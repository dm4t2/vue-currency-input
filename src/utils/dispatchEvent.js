export default (el, eventName, data) => {
  const event = document.createEvent('CustomEvent')
  event.initCustomEvent(eventName, true, true, data)
  el.dispatchEvent(event)
}
