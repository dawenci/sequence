import { defineMethod } from './Sequence.js'
import { addIndex1, curry2 } from './utils.js'
import { exists } from './exists.js'

export const existsi = curry2((p, i) => exists(addIndex1(p), i))

export const some = existsi

defineMethod(
  'existsi',
  function (p) {
    return existsi(p, this.iterable)
  },
  ['some']
)
