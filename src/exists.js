import { defineMethod } from './Sequence.js'
import { curry2 } from './utils.js'
import { loop } from './loop.js'

export const exists = curry2((p, i) => {
  return !loop((_, v) => !p(v), i)
})

defineMethod('exists', function (p) {
  return exists(p, this.iterable)
})
