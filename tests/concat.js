const Seq = require('../dist/main.cjs.js')
const assert = require('assert')

describe('concat', () => {
  it('concat:fp', () => {
    assert.deepEqual(
      Seq.to_array(
        Seq.concat(
          Seq.from_array_like([1]),
          Seq.from_array_like([2])
        )
      ), [1, 2])
  })

  it('concat:chain', () => {
    assert.deepEqual(Seq.from([1]).concat(Seq.from([2])).toArray(), [1, 2])
  })
})
