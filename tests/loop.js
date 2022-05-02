const Seq = require('../dist/main.cjs.js')
const assert = require('assert')

describe('loop', () => {
  it('loop:fp', () => {
    const arr = []
    Seq.loop((i, x) => arr.push(x + i), [1,2,3])
    assert.deepEqual(arr, [1,3,5])

    const arr2 = []
    Seq.loop((i, x) => {
      arr2.push(x + i)
      if (i === 1) return false
    }, [1,2,3])
    assert.deepEqual(arr2, [1,3])

    const arr3 = []
    const obj = { *[Symbol.iterator]() { const l = 3; let i = 0; while (i++ < l) yield i } }
    Seq.loop((i, x) => arr3.push(x + i), obj)
    assert.deepEqual(arr3, [1,3,5])

    const arr4 = []
    const obj2 = { *[Symbol.iterator]() { const l = 3; let i = 0; while (i++ < l) yield i } }
    Seq.loop((i, x) => {
      arr4.push(x + i)
      if (i === 1) return false
    }, obj2)
    assert.deepEqual(arr4, [1,3])
  })

  it('loop:chain', () => {
    const arr = []
    Seq.from([1,2,3]).loop((i, x) => arr.push(x + i))
    assert.deepEqual(arr, [1,3,5])

    const arr2 = []
    Seq.from([1,2,3]).loop((i, x) => {
      arr2.push(x + i)
      if (i === 1) return false
    })
    assert.deepEqual(arr2, [1,3])
  })
})
