const Seq = require('../dist/main.cjs.js')
const assert = require('assert')

describe('find', () => {
  it('find:fp', () => {
    assert.equal(Seq.find(x => x > 1, [1,2,3]), 2)
  })

  it('find:chain', () => {
    assert.equal(Seq.from([1,2,3]).find(x => x > 1), 2)
  })
})
