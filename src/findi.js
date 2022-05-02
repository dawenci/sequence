import { defineMethod } from './Sequence.js'
import { addIndex1, curry2 } from './utils.js'
import { find } from './find.js'

export const findi = curry2((p, i) => find(addIndex1(p), i))

defineMethod('findi', function (p) {
  return findi(p, this.iterable)
})
