const Seq = require('../dist/main.cjs.js')
const assert = require('assert')

describe('utils', () => {
  it('pipe', () => {
    assert.equal(Seq.pipe([])(1), 1)
    assert.equal(Seq.pipe([x => x + 1])(1), 2)
  })

  it('curry2', () => {
    const f = Seq.curry2((x, y) => x + y)
    assert.equal(f(1, 1, 1), 2)
    assert.equal(f(1, 1), 2)
    assert.equal(f(1)(1), 2)
    assert.equal(f()(''), 'undefined')
    assert.equal(f('')(), 'undefined')
  })

  it('curry3', () => {
    const f = Seq.curry3((x, y, z) => x + y + z)
    assert.equal(f(1, 1, 1, 1), 3)
    assert.equal(f(1, 1, 1), 3)
    assert.equal(f(1, 1)(1), 3)
    assert.equal(f(1)(1, 1), 3)
    assert.equal(f(1)(1)(1), 3)
    assert.equal(f()('')(''), 'undefined')
    assert.equal(f('')()(''), 'undefined')
    assert.equal(f('')('')(), 'undefined')
  })

  it('addIndex1', () => {
    const f = Seq.addIndex1((x, y) => x + y)
    assert.equal(f(0), 0)
    assert.equal(f(0), 1)
  })

  it('addIndex2', () => {
    const f = Seq.addIndex2((x, y, z) => x + y + z)
    assert.equal(f(0, 0), 0)
    assert.equal(f(0, 0), 1)
  })
})
