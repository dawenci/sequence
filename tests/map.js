const Seq = require('../dist/main.cjs.js')
const assert = require('assert')

describe('map', () => {
  it('map:fp', () => {
    const m1 = Seq.map(n => n + 1, Seq.from_array_like([1, 2, 3]))
    const actual = Seq.to_array(m1)
    const actual2 = [...m1]
    assert.deepEqual(actual, [2, 3, 4])
    assert.deepEqual(actual2, [2, 3, 4])

    let count = 0
    Seq.to_array(Seq.map(() => count += 1, Seq.from_array_like([1,2,3])))
    assert.equal(count, 3)
  })

  it('map:chain', () => {
    const m2 = Seq.from([1, 2, 3]).map(n => n + 1)
    const actual = m2.toArray()
    const actual2 = [...m2]
    assert.deepEqual(actual, [2, 3, 4])
    assert.deepEqual(actual2, [2, 3, 4])

    let count = 0
    Seq.from([1,2,3]).map(() => count += 1).toArray()
    assert.equal(count, 3)
  })
})
