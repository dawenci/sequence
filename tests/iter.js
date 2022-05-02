const Seq = require('../dist/main.cjs.js')
const assert = require('assert')

describe('iter', () => {
  it('iter:fp', () => {
    const arr = []
    Seq.iter(x => arr.push(x), [1,2,3])
    assert.deepEqual(arr, [1,2,3])

    const arr2 = []
    const obj = { *[Symbol.iterator]() { const l = 3; let i = 0; while (i++ < l) yield i } }
    Seq.iter(x => arr2.push(x), obj)
    assert.deepEqual(arr2, [1,2,3])
    
  })

  it('iter:chain', () => {
    const arr = []
    Seq.from([1,2,3]).iter(x => arr.push(x))
    assert.deepEqual(arr, [1,2,3])
  })
})
