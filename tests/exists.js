const Seq = require('../dist/main.cjs.js')
const assert = require('assert')

describe('exists', () => {
  it('concat:fp', () => {
    assert.equal(
      Seq.exists(n => n === 0, Seq.from_array_like([1, 2, 3])),
      false
    )
    assert.equal(
      Seq.exists(n => n === 1, Seq.from_array_like([1, 2, 3])),
      true
    )
    assert.equal(
      Seq.exists(n => n === 2, Seq.from_array_like([1, 2, 3])),
      true
    )
    assert.equal(
      Seq.exists(n => n === 3, Seq.from_array_like([1, 2, 3])),
      true
    )
    assert.equal(
      Seq.exists(n => n === 4, Seq.from_array_like([1, 2, 3])),
      false
    )
  })

  it('concat:chain', () => {
    assert.deepEqual(Seq.from([1, 2, 3]).exists(n => n === 0), false)
    assert.deepEqual(Seq.from([1, 2, 3]).exists(n => n === 1), true)
    assert.deepEqual(Seq.from([1, 2, 3]).exists(n => n === 2), true)
    assert.deepEqual(Seq.from([1, 2, 3]).exists(n => n === 3), true)
    assert.deepEqual(Seq.from([1, 2, 3]).exists(n => n === 4), false)
  })
})
