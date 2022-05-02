const Seq = require('../dist/main.cjs.js')
const assert = require('assert')

describe('to_array', () => {
  it('to_array:fp', () => {
    assert.deepEqual(Seq.to_array([1,2,3]), [1,2,3])
  })

  it('to_array:chain', () => {
    assert.deepEqual(Seq.from([1,2,3]).toArray([1,2,3]), [1,2,3])
  })
})
