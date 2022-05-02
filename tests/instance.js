const Seq = require('../dist/main.cjs.js')
const assert = require('assert')

describe('instance', () => {
  it('from_array_like', () => {
    assert.deepEqual(Seq.to_array(Seq.from_array_like([0, 1, 2])), [0, 1, 2])
    assert.deepEqual(Seq.from([0, 1, 2]).toArray(), [0, 1, 2])

    assert.throws(() => {
      Seq.from_array_like()
    }, { message: '参数必须为 array-like 对象' })
  })

  it('init', () => {
    assert.deepEqual(Seq.to_array(Seq.init(3, x => x)), [0, 1, 2])

    const arr = []
    for (let v of Seq.init(3, x => x)) {
      arr.push(v)
    }
    assert.deepEqual(arr, [0, 1, 2])
  })

  it('forever', () => {
    let i = 0
    assert.deepEqual(Seq.to_array(Seq.take(3, Seq.forever(() => i++))), [0, 1, 2])
  })

  it('repeat', () => {
    assert.deepEqual(Seq.to_array(Seq.take(3, Seq.repeat('x'))), ['x', 'x', 'x'])
  })

  it('iterate', () => {
    assert.deepEqual(Seq.to_array(Seq.take(3, Seq.iterate(x => x + x, 'x'))), ['x', 'xx', 'xxxx'])
  })

  it('from', () => {
    assert.deepEqual(Seq.from([0, 1, 2]).toArray(), [0, 1, 2])
    assert.deepEqual(Seq.from({ length: 3, 0: 0, 1: 1, 2: 2 }).toArray(), [0, 1, 2])
    assert.deepEqual(Seq.from(new Set([0, 1, 2])).toArray(), [0, 1, 2])
    assert.throws(() => {
      Seq.from()
    }, { message: '参数必须为类数组或可迭代对象' })
  })
})
