import { defineMethod } from './Sequence.js'
import { fold_left } from './fold_left.js'

export const sum = (i) => {
  return fold_left((acc, n) => acc + n, 0, i)
}

defineMethod('sum', function () {
  return sum(this.iterable)
})
