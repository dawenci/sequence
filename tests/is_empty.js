const Seq = require('../dist/main.cjs.js')
const assert = require('assert')

describe('is_empty', () => {
  it('is_empty:fp', () => {
    assert.equal(Seq.is_empty(Seq.from_array_like([])), true)
    assert.equal(Seq.is_empty(Seq.from_array_like([1])), false)
  })

  it('is_empty:chain', () => {
    assert.equal(Seq.from([]).isEmpty(), true)
    assert.equal(Seq.from([1]).isEmpty(), false)
  })
})
