import { defineMethod } from './Sequence.js'

export const to_array = (i) => {
  if (Array.isArray(i)) return i.slice()

  if (i._iter_at && i.length) {
    const results = Array(i.length)
    for (let index = 0; index < i.length; index += 1) {
      results[index] = i._iter_at(index)
    }
    return results
  }

  return [...i]
}

defineMethod('toArray', function () {
  return to_array(this.iterable)
})
