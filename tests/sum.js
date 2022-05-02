const Seq = require('../dist/main.cjs.js')
const assert = require('assert')

describe('sum', () => {
  it('sum:fp', () => {
    assert.deepEqual(Seq.sum(Seq.from_array_like([1, 2, 3])), 6)
  })

  it('sum:chain', () => {
    assert.deepEqual(Seq.from([1, 2, 3]).sum(), 6)
  })
})
