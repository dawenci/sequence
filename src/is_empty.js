import { defineMethod } from './Sequence.js'
import { exists } from './exists.js'

export const is_empty = (i) => {
  return !exists(() => true, i)
}

defineMethod('isEmpty', function () {
  return is_empty(this.iterable)
})
