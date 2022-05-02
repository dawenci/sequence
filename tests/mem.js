const Seq = require('../dist/main.cjs.js')
const assert = require('assert')

describe('mem', () => {
  it('mem:fp', () => {
    assert.deepEqual(Seq.mem(0, Seq.from_array_like([1, 2])), false)
    assert.deepEqual(Seq.mem(1, Seq.from_array_like([1, 2])), true)
    assert.deepEqual(Seq.mem(2, Seq.from_array_like([1, 2])), true)
    assert.deepEqual(Seq.mem(3, Seq.from_array_like([1, 2])), false)
  })

  it('mem:chain', () => {
    assert.deepEqual(Seq.from([1, 2]).mem(0), false)
    assert.deepEqual(Seq.from([1, 2]).mem(1), true)
    assert.deepEqual(Seq.from([1, 2]).mem(2), true)
    assert.deepEqual(Seq.from([1, 2]).mem(3), false)
  })

  it('includes:fp', () => {
    assert.deepEqual(Seq.includes(0, Seq.from_array_like([1, 2])), false)
    assert.deepEqual(Seq.includes(1, Seq.from_array_like([1, 2])), true)
    assert.deepEqual(Seq.includes(2, Seq.from_array_like([1, 2])), true)
    assert.deepEqual(Seq.includes(3, Seq.from_array_like([1, 2])), false)
  })

  it('includes:chain', () => {
    assert.deepEqual(Seq.from([1, 2]).includes(0), false)
    assert.deepEqual(Seq.from([1, 2]).includes(1), true)
    assert.deepEqual(Seq.from([1, 2]).includes(2), true)
    assert.deepEqual(Seq.from([1, 2]).includes(3), false)
  })

  it('contains:fp', () => {
    assert.deepEqual(Seq.includes(0, Seq.from_array_like([1, 2])), false)
    assert.deepEqual(Seq.includes(1, Seq.from_array_like([1, 2])), true)
    assert.deepEqual(Seq.includes(2, Seq.from_array_like([1, 2])), true)
    assert.deepEqual(Seq.includes(3, Seq.from_array_like([1, 2])), false)
  })

  it('contains:chain', () => {
    assert.deepEqual(Seq.from([1, 2]).includes(0), false)
    assert.deepEqual(Seq.from([1, 2]).includes(1), true)
    assert.deepEqual(Seq.from([1, 2]).includes(2), true)
    assert.deepEqual(Seq.from([1, 2]).includes(3), false)
  })
})
