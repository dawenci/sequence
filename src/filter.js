import { defineMethod } from './Sequence.js'
import { curry2 } from './utils.js'

class FilterIterable {
  constructor(iterable, f) {
    this.iterable = iterable
    this.f = f
  }

  [Symbol.iterator]() {
    const iterable = this.iterable
    const f = this.f

    if (Array.isArray(iterable) || iterable._iter_at) {
      const _iter_at = Array.isArray(iterable) ? (i) => iterable[i] : (i) => iterable._iter_at(i)
      let l = iterable.length
      let i = 0
      const _next = { value: undefined, done: false }
      const next = () => {
        while (i < l) {
          _next.value = _iter_at(i++)
          if (f(_next.value)) return _next
        }
        _next.value = undefined
        _next.done = true
        return _next
      }
      return { next }
    }

    const it = iterable[Symbol.iterator]()
    const next = () => {
      let _next = it.next()
      while (!_next.done && !f(_next.value)) {
        _next = it.next()
      }
      return _next
    }
    return { next }
  }
}

export const filter = curry2((p, i) => {
  return new FilterIterable(i, p)
})

defineMethod('filter', function (p) {
  return this._map((iterable) => filter(p, iterable))
})
