import { defineMethod } from './Sequence.js'
import { flat_map } from './flat_map.js'

export const flatten = (i) => {
  return flat_map((x) => (x[Symbol.iterator] ? x : [x]), i)
}

defineMethod('flatten', function () {
  return this._map((iterable) => flatten(iterable))
})
