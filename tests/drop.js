const Seq = require('../dist/main.cjs.js')
const assert = require('assert')

describe('drop', () => {
  it('concat:fp', () => {
    const actual = Seq.to_array(Seq.drop(3, Seq.from_array_like([1, 2, 3, 4, 5])))
    assert.deepEqual(actual, [4, 5])
  })

  it('concat:chain', () => {
    const actual = Seq.from([1, 2, 3, 4, 5]).drop(3).toArray()
    assert.deepEqual(actual, [4, 5])
  })
})
