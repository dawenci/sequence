const Benchmark = require('benchmark')
const Seq = require('../dist/main.cjs.js')
const Lazy = require('lazy.js')
const _ = require('lodash')

const suites = []

function make(type, options) {
  const suite = new Benchmark.Suite(`${type} test`)
  _.forEach(options, (fn, name) => {
    suite.add(`<${name}> ${type}`, fn)
  })
  suite
    .on('cycle', function (event) {
      console.log(String(event.target))
    })
    .on('complete', function () {
      console.log('Fastest is ' + this.filter('fastest').map('name'))
    })
  suites.push(suite)
}

const array = Array(1000 * 1000).fill(0).map((_, i) => i)

make('->map->value', {
  seq_fp: () => Seq.pipe([Seq.map(increment), Seq.iter(noop)])(array),
  seq_chain: () => Seq.from(array).map(increment).iter(noop),
  lazy: () => Lazy(array).map(increment).forEach(noop),
  lodash: () => _(array).map(increment).forEach(noop),
  native: () => array.map(increment).forEach(noop),
})

make('->filter->value', {
  seq_fp: () => Seq.pipe([Seq.filter(isEven), Seq.iter(noop)])(array),
  seq_chain: () => Seq.from(array).filter(isEven).iter(noop),
  lazy: () => Lazy(array).filter(isEven).forEach(noop),
  lodash: () => _(array).filter(isEven).forEach(noop),
  native: () => array.filter(isEven).forEach(noop),
})

make('->map->filter->value', {
  seq_fp: () => Seq.pipe([Seq.map(x => x + 2), Seq.filter(isEven), Seq.iter(noop)])(array),
  seq_chain: () => Seq.from(array).map(x => x + 2).filter(isEven).iter(noop),
  lazy: () => Lazy(array).map(x => x + 2).filter(isEven).forEach(noop),
  lodash: () => _(array).map(x => x + 2).filter(isEven).forEach(noop),
  native: () => array.map(x => x + 2).filter(isEven).forEach(noop),
})

suites.forEach((suite) => suite.run({ async: true }))

function increment(x) {
  return x + 1
}

function isEven(x) {
  return x % 2 === 0
}

function noop() {}
