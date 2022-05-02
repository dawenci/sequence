const Seq = require('../dist/main.cjs.js')
const assert = require('assert')

describe('take', () => {
  it('take:fp', () => {
    assert.deepEqual(Seq.to_array(Seq.take(3, Seq.from_array_like([1, 2, 3, 4, 5]))), [1, 2, 3])
  })

  it('take:chain', () => {
    assert.deepEqual(Seq.from([1, 2, 3, 4, 5]).take(3).toArray(), [1, 2, 3])
  })
})
