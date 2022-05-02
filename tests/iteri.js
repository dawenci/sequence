const Seq = require('../dist/main.cjs.js')
const assert = require('assert')

describe('iteri', () => {
  it('iteri:fp', () => {
    const arr = []
    Seq.iteri((x, i) => arr.push(x + i), [1,2,3])
    assert.deepEqual(arr, [1,3,5])
  })

  it('iteri:chain', () => {
    const arr = []
    Seq.from([1,2,3]).iteri((x, i) => arr.push(x + i))
    assert.deepEqual(arr, [1,3,5])
  })
})
