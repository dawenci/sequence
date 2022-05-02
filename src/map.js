import { Sequence, defineMethod } from './Sequence.js'
import { curry2 } from './utils.js'

class MapIterable {
  constructor(iterable, f) {
    this.iterable = iterable
    this.f = f

    if (Array.isArray(iterable)) {
      this._iter_at = (i) => f(iterable[i])
      this.length = iterable.length
    } else if (iterable._iter_at) {
      this._iter_at = (i) => f(iterable._iter_at(i))
      this.length = iterable.length
    }
  }

  [Symbol.iterator]() {
    const iterable = this.iterable
    const f = this.f

    if (this._iter_at && this.length) {
      let l = iterable.length
      let i = 0
      const _next = { value: undefined, done: false }
      const next = () => {
        if (i < l) {
          _next.value = this._iter_at(i++)
        } else {
          _next.value = undefined
          _next.done = true
        }
        return _next
      }
      return { next }
    }

    const it = iterable[Symbol.iterator]()
    const next = () => {
      const _next = it.next()
      if (!_next.done) _next.value = f(_next.value)
      return _next
    }
    return { next }
  }
}

export const map = curry2((f, i) => {
  return new MapIterable(i, f)
})

defineMethod('map', function (f) {
  return new Sequence(map(f, this.iterable))
})
