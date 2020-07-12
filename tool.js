const log = console.log.bind(console)

const e = function(selector) {
    return document.querySelector(selector)
}

const es = function(selector) {
    return document.querySelectorAll(selector)
}
const appendHtml = function(element, html) {
    element.insertAdjacentHTML('beforeend', html)
}

const bindEvent = function(element, eventName, callback) {
    element.addEventListener(eventName, callback)
}

const removeClassAll = function(className) {
    let selector = '.' + className
    let elements = es(selector)
    for (let i = 0; i < elements.length; i++) {
        let e = elements[i]
        e.classList.remove(className)
    }
}

const bindAll = function(selector, eventName, callback) {
    let elements = es(selector)
    for (let i = 0; i < elements.length; i++) {
        let e = elements[i]
        bindEvent(e, eventName, callback)
    }
}

const clonedSquare = function(array) {
    let r = []
    for (let i = 0; i < array.length; i++) {
        let line = array[i].slice(0)
        r.push(line)
    }
    return r
}