const Seq = require('../dist/main.cjs.js')
const assert = require('assert')

describe('filter', () => {
  it('filter:fp', () => {
    const actual = Seq.to_array(Seq.filter(n => n % 2 === 0, [1, 2, 3, 4, 5]))
    assert.deepEqual(actual, [2, 4])

    let count = 0
    Seq.to_array(Seq.filter(() => (count += 1, true), Seq.from_array_like([1,2,3])))
    assert.equal(count, 3)



    const obj = { *[Symbol.iterator]() { const l = 5; let i = 0; while (i++ < l) yield i } }
    assert.deepEqual(Seq.to_array(Seq.filter(n => n % 2 === 0, obj)), [2, 4])
  })

  it('filter:chain', () => {
    const actual = Seq.from([1, 2, 3, 4, 5]).filter(n => n % 2 === 0).toArray()
    assert.deepEqual(actual, [2, 4])

    let count = 0
    Seq.from([1,2,3]).filter(() => (count += 1, true)).toArray()
    assert.equal(count, 3)
  })
})
