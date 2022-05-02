import { defineMethod } from './Sequence.js'
import { curry3 } from './utils.js'
import { iter } from './iter.js'

export const fold_left = curry3((f, acc, i) => {
  iter((v) => {
    acc = f(acc, v)
  }, i)
  return acc
})

defineMethod('foldLeft', function (f, initValue) {
  return fold_left(f, initValue, this.iterable)
})
