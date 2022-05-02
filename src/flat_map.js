import { Sequence, defineMethod } from './Sequence.js'
import { curry2 } from './utils.js'
import { iter } from './iter.js'

class ConcatenatedIterable {
  constructor(iterables) {
    this.iterables = iterables
  }

  [Symbol.iterator]() {
    let l = this.iterables.length
    let i = 0
    let it = this.iterables[i][Symbol.iterator]()
    const next = () => {
      let _next = it.next()
      if (!_next.done) return _next
      if (++i < l) {
        it = this.iterables[i][Symbol.iterator]()
        return next()
      }
      return _next
    }
    return { next }
  }
}

export const flat_map = curry2((f, i) => {
  const iterables = []
  iter((v) => iterables.push(f(v)), i)
  return new ConcatenatedIterable(iterables)
})

defineMethod('flatMap', function (f) {
  return this._map((iterable) => flat_map(f, iterable))
})
