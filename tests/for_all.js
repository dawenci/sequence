const Seq = require('../dist/main.cjs.js')
const assert = require('assert')

describe('for_all', () => {
  it('for_all:fp', () => {
    assert.deepEqual(Seq.for_all(n => n === 1 || n === 2, Seq.from_array_like([1, 2])), true)
    assert.deepEqual(Seq.for_all(n => n > 1, Seq.from_array_like([1, 2])), false)
  })

  it('for_all:chain', () => {
    assert.deepEqual(Seq.from([1, 2]).forAll(n => n === 1 || n === 2), true)
    assert.deepEqual(Seq.from([1, 2]).forAll(n => n > 1), false)
  })
})
