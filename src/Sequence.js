export class Sequence {
  constructor(iterable) {
    this.iterable = iterable
  }

  [Symbol.iterator]() {
    return this.iterable[Symbol.iterator]()
  }

  _map(f) {
    return new Sequence(f(this.iterable))
  }
}

/**
 * 自定义方法
 * @param {string} name 方法名
 * @param {(...args: any) => any} impl 方法实现
 * @param {string[]} [alias] 别名列表
 */
export const defineMethod = (name, impl, alias) => {
  Sequence.prototype[name] = impl
  if (Array.isArray(alias)) {
    alias.forEach((name) => (Sequence.prototype[name] = impl))
  }
}
