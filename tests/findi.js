const Seq = require('../dist/main.cjs.js')
const assert = require('assert')

describe('findi', () => {
  it('findi:fp', () => {
    assert.equal(Seq.findi((v, i) => v === i, [2,1,0]), 1)
  })

  it('findi:chain', () => {
    assert.equal(Seq.from([2,1,0]).findi((v, i) => v === i), 1)
  })
})
