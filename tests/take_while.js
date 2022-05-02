const Seq = require('../dist/main.cjs.js')
const assert = require('assert')

describe('take', () => {
  it('take_while:fp', () => {
    assert.deepEqual(Seq.to_array(Seq.take_while(n => n < 4, Seq.from_array_like([1, 2, 3, 4, 5]))), [1, 2, 3])
  })

  it('take_while:chain', () => {
    assert.deepEqual(Seq.from([1, 2, 3, 4, 5]).takeWhile(n => n < 4).toArray(), [1, 2, 3])
  })
})
