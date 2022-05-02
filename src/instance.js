import { Sequence } from './Sequence.js'
import { curry2 } from './utils.js'

class ArrayLikeIterable {
  constructor(arrayLike) {
    this.iterable = arrayLike
    this.length = arrayLike.length
    this._iter_at = (i) => arrayLike[i]
  }

  [Symbol.iterator]() {
    const ret = { done: false, value: undefined }
    const iterable = this.iterable
    const l = iterable.length
    let i = -1
    const next = () => {
      ret.done = ++i >= l
      ret.value = iterable[i]
      return ret
    }
    return { next }
  }
}

class StepIterator {
  constructor(n, f) {
    this.n = n
    this.f = f
    this.length = n
    this._iter_at = (i) => f(i)
  }

  [Symbol.iterator]() {
    const f = this.f
    const n = this.n
    let i = 0
    const next = () => {
      if (i < n) return { value: f(i++), done: false }
      return { value: undefined, done: true }
    }
    return { next }
  }
}

export const init = curry2((n, f) => {
  return new StepIterator(n, f)
})

export const forever = (f) => {
  return init(Infinity, (_) => f())
}

export const repeat = (x) => {
  return init(Infinity, (_) => x)
}

export const iterate = curry2((f, x) => {
  return init(Infinity, (_) => {
    const x_ = x
    x = f(x)
    return x_
  })
})

export const from_array_like = (xs) => {
  if (xs && typeof xs.length === 'number') {
    return new ArrayLikeIterable(xs)
  }
  throw new Error('参数必须为 array-like 对象')
}

export const from = (i) => {
  if (i) {
    if (Array.isArray(i)) {
      return new Sequence(i)
    }
    if (typeof i.length === 'number') {
      return new Sequence(from_array_like(i))
    }
    if (typeof i[Symbol.iterator] === 'function') {
      return new Sequence(i)
    }
  }

  if (!i) throw new Error('参数必须为类数组或可迭代对象')
}
