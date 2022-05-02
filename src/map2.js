import { Sequence, defineMethod } from './Sequence.js'
import { curry3 } from './utils.js'

class Map2Iterable {
  constructor(iterable, iterable2, f) {
    this.iterable = iterable
    this.iterable2 = iterable2
    this.f = f
  }

  [Symbol.iterator]() {
    const f = this.f
    const it = this.iterable[Symbol.iterator]()
    const it2 = this.iterable2[Symbol.iterator]()
    const next = () => {
      const _next = it.next()
      const _next2 = it2.next()
      if (!_next.done && !_next2.done) _next.value = f(_next.value, _next2.value)
      return _next
    }
    return { next }
  }
}

export const map2 = curry3((f, i1, i2) => {
  return new Map2Iterable(i1, i2, f)
})

defineMethod('map2', function (seq, f) {
  return new Sequence(map2(f, this.iterable, seq.iterable))
})
