const Seq = require('../dist/main.cjs.js')
const assert = require('assert')

describe('length', () => {
  it('length:fp', () => {
    assert.deepEqual(Seq.length([1, 2, 3]), 3)
    assert.deepEqual(Seq.length(Seq.map((x) => x, [1, 2, 3])), 3)
    assert.deepEqual(Seq.length(Seq.filter((x) => x % 2, [1, 2, 3])), 2)
  })

  it('length:chain', () => {
    assert.deepEqual(Seq.from([1, 2, 3]).length(), 3)
    assert.deepEqual(
      Seq.from([1, 2, 3])
        .map((x) => x)
        .length(),
      3
    )
    assert.deepEqual(
      Seq.from([1, 2, 3])
        .filter((x) => x % 2)
        .length(),
      2
    )
  })
})
