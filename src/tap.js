import { defineMethod } from './Sequence.js'
import { curry2 } from './utils.js'

class TapIterable {
  constructor(iterable, f) {
    this.iterable = iterable
    this.f = f

    if (Array.isArray(iterable)) {
      this.length = iterable.length
      this._iter_at = (i) => (f(iterable[i]), iterable[i])
    } else if (iterable._iter_at) {
      this.length = iterable.length
      this._iter_at = (i) => {
        const value = iterable._iter_at(i)
        f(value)
        return value
      }
    }
  }

  [Symbol.iterator]() {
    const iterable = this.iterable
    const f = this.f
    const it = iterable[Symbol.iterator]()
    const next = () => {
      const _next = it.next()
      if (!_next.done) f(_next.value)
      return _next
    }
    return { next }
  }
}

export const tap = curry2((f, i) => {
  return new TapIterable(i, f)
})

defineMethod('tap', function (f) {
  return this._map((iterable) => tap(f, iterable))
})
