const Seq = require('../dist/main.cjs.js')
const assert = require('assert')

describe('map2', () => {
  it('map2:fp', () => {
    const seq1 = Seq.from_array_like([1,2,3])
    const seq2 = Seq.from_array_like([1,2,3])
    const actual = Seq.to_array(Seq.map2((x, y) => x + y, seq1, seq2))
    assert.deepEqual(actual, [2, 4, 6])
  })

  it('map2:chain', () => {
    const seq1 = Seq.from([1,2,3])
    const seq2 = Seq.from([1,2,3])
    const actual = seq1.map2(seq2, (x, y) => x + y).toArray()
    assert.deepEqual(actual, [2, 4, 6])
  })
})
