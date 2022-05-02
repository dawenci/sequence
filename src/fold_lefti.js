import { defineMethod } from './Sequence.js'
import { addIndex2, curry3 } from './utils.js'
import { fold_left } from './fold_left.js'

export const fold_lefti = curry3((f, acc, i) => fold_left(addIndex2(f), acc, i))
export const reduce = fold_lefti

defineMethod(
  'foldLeftIndexed',
  function (f, initValue) {
    return fold_lefti(f, initValue, this.iterable)
  },
  ['reduce']
)
