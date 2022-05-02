const Seq = require('../dist/main.cjs.js')
const assert = require('assert')

describe('for_all', () => {
  it('for_alli:fp', () => {
    assert.deepEqual(Seq.for_alli((i, n) => i === 0 && n === 1 || i === 1 && n === 2, Seq.from_array_like([1, 2])), true)
    assert.deepEqual(Seq.for_alli((i, n) => i > 0 || n > 2, Seq.from_array_like([1, 2])), false)
  })

  it('for_alli:chain', () => {
    assert.deepEqual(Seq.from([1, 2]).forAllIndexed((i, n) => i === 0 && n === 1 || i === 1 && n === 2), true)
    assert.deepEqual(Seq.from([1, 2]).forAllIndexed((i, n) => i > 0 || n > 2), false)
  })

  it('every:fp', () => {
    assert.deepEqual(Seq.every((i, n) => i === 0 && n === 1 || i === 1 && n === 2, Seq.from_array_like([1, 2])), true)
    assert.deepEqual(Seq.every((i, n) => i > 0 || n > 2, Seq.from_array_like([1, 2])), false)
  })

  it('every:chain', () => {
    assert.deepEqual(Seq.from([1, 2]).every((i, n) => i === 0 && n === 1 || i === 1 && n === 2), true)
    assert.deepEqual(Seq.from([1, 2]).every((i, n) => i > 0 || n > 2), false)
  })
})
