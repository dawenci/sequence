import { defineMethod } from './Sequence.js'
import { curry2 } from './utils.js'

export const iter = curry2((f, i) => {
  if (Array.isArray(i)) {
    for (let index = 0, len = i.length; index < len; index += 1) f(i[index])
  } else if (i._iter_at && i.length) {
    for (let index = 0, len = i.length; index < len; index += 1) f(i._iter_at(index))
  } else {
    const it = i[Symbol.iterator]()
    let _next = it.next()
    while (!_next.done) {
      f(_next.value)
      _next = it.next()
    }
  }
})

defineMethod(
  'iter',
  function (f) {
    return iter(f, this.iterable)
  },
  ['each']
)
