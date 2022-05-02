const Seq = require('../dist/main.cjs.js')
const assert = require('assert')

describe('force', () => {
  it('force:fp', () => {
    let flag = false
    Seq.force(Seq.map(_ => flag = true, [1]))
    assert.equal(flag, true)

    flag = false
    Seq.force(Seq.map(_ => flag = true, Seq.from_array_like([1])))
    assert.equal(flag, true)

    flag = false
    const obj = { *[Symbol.iterator]() { const l = 1; let i = 0; while (i++ < l) yield i } }
    Seq.force(Seq.map(_ => flag = true, obj))
    assert.equal(flag, true)
  })

  it('force:chain', () => {
    let flag = false
    Seq.from(Seq.init(1, x => x)).map(_ => flag = true).force()
    assert.equal(flag, true)
  })
})
