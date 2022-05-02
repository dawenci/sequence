const Seq = require('../dist/main.cjs.js')
const assert = require('assert')

describe('tap', () => {
  it('tap:fp', () => {
    const raw = [1,2,3]
    const arr = []
    const tab = Seq.tap(x => arr.push(x), raw)
    Seq.force(tab)
    assert.deepEqual(arr, raw)
    assert.deepEqual([...tab], raw)

    const arr2 = []
    const tab2 = Seq.tap(x => arr2.push(x), Seq.from_array_like(raw))
    Seq.force(tab2)
    assert.deepEqual(arr2, raw)
    assert.deepEqual([...tab2], raw)
  })

  it('tap:chain', () => {
    const raw = [1,2,3]
    const arr = []
    const tab = Seq.from(raw).tap(x => arr.push(x))
    tab.force()
    assert.deepEqual(arr, raw)

    const arr2 = []
    for (let v of tab) {
      arr2.push(v)
    }
    assert.deepEqual(arr2, raw)
  })
})
