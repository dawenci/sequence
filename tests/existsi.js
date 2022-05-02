const Seq = require('../dist/main.cjs.js')
const assert = require('assert')

describe('existsi', () => {
  it('existsi:fp', () => {
    assert.deepEqual(Seq.existsi((i, n) => i === 0 && n === 1, Seq.from_array_like([1, 2, 3])), true)
    assert.deepEqual(Seq.existsi((i, n) => i === 1 && n === 2, Seq.from_array_like([1, 2, 3])), true)
    assert.deepEqual(Seq.existsi((i, n) => i === 2 && n === 3, Seq.from_array_like([1, 2, 3])), true)
  })

  it('existsi:chain', () => {
    assert.deepEqual(Seq.from([1, 2, 3]).existsi((i, n) => i === 0 && n === 1), true)
    assert.deepEqual(Seq.from([1, 2, 3]).existsi((i, n) => i === 1 && n === 2), true)
    assert.deepEqual(Seq.from([1, 2, 3]).existsi((i, n) => i === 2 && n === 3), true)
  })

  it('some:fp', () => {
    assert.deepEqual(Seq.some((i, n) => i === 0 && n === 1, Seq.from_array_like([1, 2, 3])), true)
    assert.deepEqual(Seq.some((i, n) => i === 1 && n === 2, Seq.from_array_like([1, 2, 3])), true)
    assert.deepEqual(Seq.some((i, n) => i === 2 && n === 3, Seq.from_array_like([1, 2, 3])), true)
  })

  it('some:chain', () => {
    assert.deepEqual(Seq.from([1, 2, 3]).some((i, n) => i === 0 && n === 1), true)
    assert.deepEqual(Seq.from([1, 2, 3]).some((i, n) => i === 1 && n === 2), true)
    assert.deepEqual(Seq.from([1, 2, 3]).some((i, n) => i === 2 && n === 3), true)
  })
})
