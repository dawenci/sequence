import { Sequence, defineMethod } from './Sequence.js'
import { addIndex1, curry2 } from './utils.js'
import { map } from './map.js'

export const mapi = curry2((f, i) => {
  return map(addIndex1(f), i)
})

defineMethod('mapi', function (f) {
  return new Sequence(mapi(f, this.iterable))
})
