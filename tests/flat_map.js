const Seq = require('../dist/main.cjs.js')
const assert = require('assert')

describe('flat_map', () => {
  it('flat_map:fp', () => {
    assert.deepEqual(Seq.to_array(Seq.flat_map(v => [v], [1,2,3])), [1,2,3])
  })

  it('flat_map:chain', () => {
    assert.deepEqual(Seq.from([1,2,3]).flatMap(v => [v]).toArray(), [1,2,3])
  })
})
