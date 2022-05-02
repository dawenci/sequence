import { defineMethod } from './Sequence.js'
import { addIndex1, curry2 } from './utils.js'
import { iter } from './iter.js'

export const iteri = curry2((f, i) => iter(addIndex1(f), i))

defineMethod(
  'iteri',
  function (f) {
    return iteri(f, this.iterable)
  },
  ['eachi', 'forEach']
)
