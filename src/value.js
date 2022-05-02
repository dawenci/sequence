import { defineMethod } from './Sequence.js'
import { to_array } from './to_array.js'

export const value = (i) => {
  return to_array(i)
}

defineMethod('value', function () {
  return value(this.iterable)
})
