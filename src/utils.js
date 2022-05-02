export const pipe = (fns) => {
  const l = fns.length
  return (x) => {
    let i = -1
    while (++i < l) x = fns[i](x)
    return x
  }
}

export function curry2(f) {
  return function curry_f(a, b) {
    if (arguments.length > 1) return f(a, b)
    return function (b) {
      return f(a, b)
    }
  }
}

export function curry3(f) {
  return function curry_f(a, b, c) {
    if (arguments.length > 2) return f(a, b, c)
    if (arguments.length === 2) {
      return function (c) {
        return f(a, b, c)
      }
    }
    return curry2(function (b, c) {
      return f(a, b, c)
    })
  }
}

export function addIndex1(f) {
  let i = 0
  return (v) => f(i++, v)
}

export function addIndex2(f) {
  let i = 0
  return (v, w) => f(i++, v, w)
}
