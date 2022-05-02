import { defineMethod } from './Sequence.js'

export const length = (i) => {
  if (Array.isArray(i)) return i.length
  if (i._iter_at && typeof i.length === 'number') return i.length
  let len = 0
  for (let _ of i) len += 1
  return len
}

defineMethod('length', function () {
  return length(this.iterable)
})
