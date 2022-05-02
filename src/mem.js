import { defineMethod } from './Sequence.js'
import { curry2 } from './utils.js'
import { exists } from './exists.js'

export const mem = curry2((a, i) => {
  return exists((v) => Object.is(v, a), i)
})

export const contains = mem
export const includes = mem

defineMethod(
  'mem',
  function (a) {
    return mem(a, this.iterable)
  },
  ['includes', 'contains']
)
