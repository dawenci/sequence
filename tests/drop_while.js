const Seq = require('../dist/main.cjs.js')
const assert = require('assert')

describe('drop_while', () => {
  it('concat:fp', () => {
    const actual = Seq.to_array(Seq.drop_while(n => n < 4, Seq.from_array_like([1, 2, 3, 4, 5])))
    assert.deepEqual(actual, [4, 5])
  })

  it('concat:chain', () => {
    const actual = Seq.from([1, 2, 3, 4, 5]).dropWhile(n => n < 4).toArray()
    assert.deepEqual(actual, [4, 5])
  })
})
