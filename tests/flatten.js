const Seq = require('../dist/main.cjs.js')
const assert = require('assert')

describe('flatten', () => {
  it('flatten:fp', () => {
    assert.deepEqual(Seq.to_array(Seq.flatten([1,[2],3])), [1,2,3])
  })

  it('flatten:chain', () => {
    assert.deepEqual(Seq.from([1,[2],3]).flatten().toArray(), [1,2,3])
  })
})
