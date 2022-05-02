import { defineMethod } from './Sequence.js'
import { curry2 } from './utils.js'
import { drop_while } from './drop_while.js'

export const drop = curry2((n, i) => {
  let index = 0
  return drop_while((_) => index++ < n, i)
})

defineMethod('drop', function (n) {
  return this._map((iterable) => drop(n, iterable))
})
