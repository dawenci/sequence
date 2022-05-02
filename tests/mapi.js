const Seq = require('../dist/main.cjs.js')
const assert = require('assert')

describe('map', () => {
  it('mapi:fp', () => {
    const actual = Seq.to_array(Seq.mapi((i, n) => n + i, Seq.from_array_like([1, 2, 3])))
    assert.deepEqual(actual, [1, 3, 5])

    let count = 0
    Seq.to_array(Seq.mapi(() => count += 1, Seq.from_array_like([1,2,3])))
    assert.equal(count, 3)
  })

  it('mapi:chain', () => {
    const actual = Seq.from([1, 2, 3]).mapi((i, n) => n + i).toArray()
    assert.deepEqual(actual, [1, 3, 5])

    let count = 0
    Seq.from([1,2,3]).mapi(() => count += 1).toArray()
    assert.equal(count, 3)
  })
})
