import { defineMethod } from './Sequence.js'

export const force = (iterable) => {
  if (iterable._iter_at && typeof iterable.length === 'number') {
    for (let i = 0, l = iterable.length; i < l; i += 1) {
      iterable._iter_at(i)
    }
    return
  }
  const it = iterable[Symbol.iterator]()
  while (!it.next().done) continue
}

defineMethod('force', function () {
  return force(this.iterable)
})
