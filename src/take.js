import { Sequence, defineMethod } from './Sequence.js'
import { curry2 } from './utils.js'
import { take_while } from './take_while.js'

export const take = curry2((n, i) => {
  let index = 0
  return take_while((_) => index++ < n, i)
})

defineMethod('take', function (n) {
  return new Sequence(take(n, this.iterable))
})
