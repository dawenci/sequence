import { Sequence, defineMethod } from './Sequence.js'
import { curry2 } from './utils.js'
import { flat_map } from './flat_map.js'

export const concat = curry2((seq1, seq2) => {
  return flat_map((x) => x, [seq1, seq2])
})

defineMethod('concat', function (seq) {
  return this._map((iterable) => concat(iterable, seq.iterable))
})
