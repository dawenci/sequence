import { defineMethod } from './Sequence.js'
import { curry2 } from './utils.js'
import { loop } from './loop.js'

export const find = curry2((p, i) => {
  let ret
  loop((_, v) => {
    if (p(v)) {
      ret = v
      return false
    }
  }, i)
  return ret
})

defineMethod('find', function (p) {
  return find(p, this.iterable)
})
