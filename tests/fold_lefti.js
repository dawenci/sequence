const Seq = require('../dist/main.cjs.js')
const assert = require('assert')

describe('fold_lefti', () => {
  it('fold_lefti:fp', () => {
    assert.equal(Seq.fold_lefti((i, acc, v) => acc + v + i, 0, [1,2,3]), 9)
  })

  it('fold_lefti:chain', () => {
    assert.equal(Seq.from([1,2,3]).foldLeftIndexed((i, acc, v) => acc + v + i, 0), 9)
  })

  it('reduce:fp', () => {
    assert.equal(Seq.reduce((acc, v, i) => acc + v + i, 0, [1,2,3]), 9)
  })

  it('reduce:chain', () => {
    assert.equal(Seq.from([1,2,3]).reduce((i, acc, v) => acc + v + i, 0), 9)
  })
})
