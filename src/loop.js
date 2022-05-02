import { defineMethod } from './Sequence.js'
import { curry2 } from './utils.js'

export const loop = curry2((f, i) => {
  if (Array.isArray(i)) {
    for (let index = 0, len = i.length; index < len; index += 1) {
      if (f(index, i[index]) === false) return false
    }
    return true
  }
  if (i._iter_at && i.length) {
    for (let index = 0, len = i.length; index < len; index += 1) {
      if (f(index, i._iter_at(index)) === false) return false
    }
    return true
  } else {
    const it = i[Symbol.iterator]()
    let index = 0
    let _next = it.next()
    while (!_next.done) {
      if (f(index++, _next.value) === false) return false
      _next = it.next()
    }
    return true
  }
})

defineMethod('loop', function (f) {
  return loop(f, this.iterable)
})
