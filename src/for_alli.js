import { defineMethod } from './Sequence.js'
import { addIndex1, curry2 } from './utils.js'
import { for_all } from './for_all.js'

export const for_alli = curry2((p, i) => for_all(addIndex1(p), i))

export const every = for_alli

defineMethod(
  'forAllIndexed',
  function (p) {
    return for_alli(p, this.iterable)
  },
  ['every']
)
