import { Sequence, defineMethod } from './Sequence.js'
import { curry2 } from './utils.js'

class TakeIterable {
  constructor(iterable, f) {
    this.iterable = iterable
    this.f = f
  }

  [Symbol.iterator]() {
    const f = this.f
    const it = this.iterable[Symbol.iterator]()
    const next = () => {
      const _next = it.next()
      if (!_next.done) _next.done = !f(_next.value)
      return _next
    }
    return { next }
  }
}

export const take_while = curry2((p, i) => {
  return new TakeIterable(i, p)
})

defineMethod('takeWhile', function (p) {
  return new Sequence(take_while(p, this.iterable))
})
