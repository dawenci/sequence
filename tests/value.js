const Seq = require('../dist/main.cjs.js')
const assert = require('assert')

describe('value', () => {
  it('value:fp', () => {
    assert.deepEqual(Seq.value([1,2,3]), [1,2,3])
  })

  it('value:chain', () => {
    assert.deepEqual(Seq.from([1,2,3]).value([1,2,3]), [1,2,3])
  })
})
