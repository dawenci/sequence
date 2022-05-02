import { defineMethod } from './Sequence.js'
import { addIndex1, curry2 } from './utils.js'
import { filter } from './filter.js'

export const filteri = curry2((p, i) => filter(addIndex1(p), i))

defineMethod('filteri', function (p) {
  return this._map((iterable) => filteri(p, iterable))
})
