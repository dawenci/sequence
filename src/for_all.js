import { defineMethod } from './Sequence.js'
import { curry2 } from './utils.js'
import { iter } from './iter.js'

export const for_all = curry2((p, i) => {
  let ret = true
  iter((v) => {
    if (!p(v)) {
      ret = false
      return false
    }
  }, i)
  return ret
})

defineMethod('forAll', function (p) {
  return for_all(p, this.iterable)
})
