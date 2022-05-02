const Seq = require('../dist/main.cjs.js')
const assert = require('assert')

describe('filteri', () => {
  it('filteri:fp', () => {
    const actual = Seq.to_array(Seq.filteri((i, _) => i % 2 === 0, Seq.from_array_like([1, 2, 3, 4, 5])))
    assert.deepEqual(actual, [1, 3, 5])

    let count = 0
    Seq.to_array(Seq.filteri(() => (count += 1, true), Seq.from_array_like([1,2,3])))
    assert.equal(count, 3)
  })

  it('filteri:chain', () => {
    const actual = Seq.from([1, 2, 3, 4, 5]).filteri((i, _) => i % 2 === 0).toArray()
    assert.deepEqual(actual, [1, 3, 5])

    let count = 0
    Seq.from([1,2,3]).filteri(() => (count += 1, true)).toArray()
    assert.equal(count, 3)
  })
})
