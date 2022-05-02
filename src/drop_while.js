import { defineMethod } from './Sequence.js'
import { curry2 } from './utils.js'

class DropIterable {
  constructor(iterable, f) {
    this.iterable = iterable
    this.f = f
  }

  [Symbol.iterator]() {
    const f = this.f
    const it = this.iterable[Symbol.iterator]()
    let skip = true
    const next = () => {
      let _next = it.next()
      while (skip && !_next.done) {
        skip = f(_next.value)
        if (!skip) break
        _next = it.next()
      }
      return _next
    }
    return { next }
  }
}

export const drop_while = curry2((p, i) => {
  return new DropIterable(i, p)
})

defineMethod('dropWhile', function (p) {
  return this._map((iterable) => drop_while(p, iterable))
})
