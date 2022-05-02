const Seq = require('../dist/main.cjs.js')
const assert = require('assert')

describe('fold_left', () => {
  it('fold_left:fp', () => {
    assert.equal(Seq.fold_left((acc, v) => acc + v, 0, [1,2,3]), 6)
  })

  it('fold_left:chain', () => {
    assert.equal(Seq.from([1,2,3]).foldLeft((acc, v) => acc + v, 0), 6)
  })
})
