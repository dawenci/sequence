# 一个列表 lazy 操作工具库

提供函数式 API 以及链式操作 API。

其中函数式 API 用于操作各种实现了迭代器模式的对象。  
命名风格采用蛇形风格，默认开启柯里化。  
使用体验大概如下：

```js
pipe([
  map(add_two), // 每个数字 +2
  filter(is_even), // 选出偶数
  take(10), // 取最终结果的 10 条
  tap(console.log), // 打印日志数据
  to_array, // 将结果转换成数组输出
])(array)
```

而链式操作 API 是对大部分函数式 API 的接口封装，所有方法都挂载在一个 Sequence 类上，以提供统一的接口和实现链式调用。
API 命名上采用驼峰风格，上述函数式风格的代码，可等价表达为：

```js
Seq.from(array)
  .map(addTwo)
  .filter(isEven)
  .take(10)
  .tap(console.log)
  .toArray()
```

---

## 函数式 API

下列函数式 API，均作了柯里化处理，方便传入部分参数后，用在 `pipe` 中。
基于同样的理由，这些函数在设计上，通常将函数参数作为第一个参数传入，数据参数最后传入，以方便部分应用参数。

### 初始化

- `from_array_like(arrayLike: any): Iterable`  
将类数组转换成可迭代对象  

- `init(n: number, f: () => any): Iterable`  
生成一个长度为 `n`，通过调用 `f` 函数生成元素的可迭代对象  

- `forever(f: () => any): Iterable`  
生成一个无限长度的，通过调用 `f` 函数生成元素的可迭代对象  

- `repeat(x: any): Iterable`  
生成一个无限长度，元素固定为 `x` 的可迭代对象  

- `iterate(f: (x: any)=>any, x: any): Iterable`  
生成一个无限长度，初始元素为 `x`，下个元素为使用 `f` 对上一个元素的迭代，比如依次为 `f(x)` -> `f(f(x))` -> `f(f(f(x)))`…  


### 操作

- `concat(i1: Iterable, i2: Iterable): boolean`
合并两个可迭代对象为一个

- `drop_while(p: (e: any)=>boolean, i: Iterable): Iterable`  
从头开始对可迭代对象 `i` 的每个元素 `e` 进行 `p(e)` 检测，为 `true` 则剔除，直至 `false` 或迭代完成，返回只包含剩余元素的可迭代对象。

- `drop(n: number, i: Iterable): Iterable`  
剔除可迭代对象 `i` 的开头 `n` 个元素，返回只包含剩余元素的可迭代对象。

- `exists(p: (e: any)=>boolean, i: Iterable): boolean`  
在可迭代对象 `i` 中，检测是否有符合 `p(e)` 为 `true` 的元素，返回布尔值。

- `existsi(p: (index: number, e: any)=>boolean, i: Iterable): boolean`  
是 `exists` 的 indexed 版本，额外给 `p` 函数传入一个 index。
  > 函数存在别名：`some(p, i)`  

- `filter(p: (e: any)=>boolean, i: Iterable): Iterable`  
查找可迭代对象中，满足 `p(e)` 为 `true` 的元素，返回符合的元素组成的可迭代对象。

- `filteri(p: (index: number, e: any)=>boolean, i: Iterable): Iterable`  
是 `filter` 的 indexed 版本，额外给 `p` 函数传入一个 index。

- `find(p: (e: any)=>boolean, i: Iterable): any`  
查找可迭代对象中，满足 `p(e)` 为 `true` 的元素，返回该元素。

- `findi(p: (index: number, e: any)=>boolean, i: Iterable): any`  
是 `findi` 的 indexed 版本，额外给 `p` 函数传入一个 index。

- `flat_map(f: (e: any)=>Iterable, i: Iterable): Iterable`  
将可迭代对象 `i` 中的元素，映射为一个可迭代对象，最终结果返回一个可迭代对象。

- `flatten(i: Iterable): Iterable`  
压平一个元素也为可迭代对象的可迭代对象。

- `fold_left(f: (acc: any, v: any)=>any, initValue: any, i: Iterable): any`
左折叠一个可迭代对象

- `fold_lefti(f: (index: number, acc: any, v: any)=>any, initValue: any, i: Iterable): any`
是 `fold_left` 的 indexed 版本，额外给 `f` 函数传入一个 index。
  > 函数存在别名：`reduce(f, initValue, i)`  

- `for_all(p: (e: any)=>boolean, i: Iterable): boolean`  
检测可迭代对象 `i` 中，是否所有元素 `e` 都满足 `p(e)` 为 `true`。

- `for_alli(p: (index: number, e: any)=>boolean, i: Iterable): boolean`  
是 `for_all` 的 indexed 版本，额外给 `f` 函数传入一个 index。
  > 函数存在别名：`every(p, i)`  

- `force(i: Iterable): void`  
强制一个可迭代对象执行迭代

- `is_empty(i: Iterable): boolean`  
检测可迭代对象是否为空（没有元素）

- `iter(f: (e: any) => void, i: Iterable): void`  
迭代一个可迭代对象，为每个元素应用 `f(e)` 函数。
  > 函数存在别名：`each(f, i)`

- `iteri(f: (index: number, e: any)=>void, i: Iterable): void`  
是 `iter` 的 indexed 版本，额外给 `f` 函数传入一个 index。
  > 函数存在别名：`eachi(f, i)` 和 `forEach(f, i)`

- `length(i: Iterable): number`
返回可迭代对象的元素数量。

- `loop(f: (index: number, e: any)=>boolean, i: Iterable): boolean`
迭代可迭代对象 `i`，为每个元素应用 `f(index, e)`，如果这个函数应用的返回结果为 `false`，则迭代提前终止，并返回 `false`，如果迭代没有提前退出，则最终返回 `true`。

- `map(f: (e: any)=>any, i: Iterable): Iterable`  
映射可迭代对象中每个元素，返回映射结果组成的新可迭代对象。

- `mapi(f: (index: number, e: any)=>any, i: Iterable): Iterable`  
是 `mapi` 的 indexed 版本，额外给 `f` 函数传入一个 index。

- `map2(f: (e1: any, e2: any)=>any, i1: Iterable, i2: Iterable): Iterable`  
映射两个可迭代对象中的元素，返回映射结果组成的新可迭代对象。

- `mem(e: any, i: Iterable): boolean`
检测 `e` 是否为可迭代对象 `i` 中的元素。
  > 函数存在别名：`includes(e, i)` 和 `contains(e, i)`

- `sum(i: Iterable): number`  
累加可迭代对象 `i` 中的所有元素。

- `take_while(p: (e: any)=>boolean, i: Iterable): Iterable`  
从第一个元素开始，提取可迭代对象 `i` 中，满足 `p(e)` 为 `true` 的元素，组成新的可迭代对象返回。

- `take(n: number, i: Iterable): Iterable`  
返回可迭代对象 `i` 中的前 `n` 个元素，组成新的可迭代对象返回。

- `tap(f: (e: any)=>void, i: Iterable): Iterable`  
在可迭代对象上符加一个副作用操作，迭代的时候，会自动调用，返回等价于原来的可迭代对象。

- `to_array(i: Iterable): Array<any>`  
将可迭代对象输出为数组。

- `value(i: Iterable): any`  
转换可迭代对象的值（目前只实现转换成数组）


### 工具函数

- `pipe(fns: Array<(x: any)=>any>): (x: any)=>any`  
接受一个有单参数函数组成的数组用于串行调用，返回一个新的单参数函数。

- `curry2(f: (a: any, b: any)=>any): (a: any, b: any)=>any | (a: any)=>(b: any)=>any`
柯里化一个两参数的函数

- `curry3(f: (a: any, b: any, c: any)=>any): (a: any, b: any, c: any)=>any | (a: any, b: any)=>(c: any)=>any | (a: any)(b: any, c: any)=>any | (a: any)=>(b: any)=>(c: any)=>any`
柯里化一个三参数的函数

- `addIndex1(f: (a: any)=>any): (index: number, a: any)=>any`
为一个单参数函数，新增一个 index 参数，每次调用 index 自动加一，从 0 开始。

- `addIndex2(f: (a: any, b: any)=>any): (index: number, a: any, b: any)=>any`
为一个双参数函数，新增一个 index 参数，每次调用 index 自动加一，从 0 开始。


## 链式操作 API

链式 API 设计上，比较类似传统的数组操作方法风格。实现上不做柯里化处理，参数顺序方面，函数参数倾向于放在后面。

### 初始化

- `Seq.from(iterable)`  
包装一个可迭代对象为 Sequence 对象，以便访问链式 API  

### 操作

- `Sequence.prototpye.concat(seq: Sequence): Sequence` 
`concat(i1, i2)` 的对应链式版本。

- `Sequence.prototpye.dropWhile(p: (e: any)=>boolean): Sequence` 
`drop_while(p, i)` 的对应链式版本。

- `Sequence.prototpye.drop(p: (e: any)=>boolean): Sequence` 
`drop(p, i)` 的对应链式版本。

- `Sequence.prototpye.exists(p: (e: any)=>boolean): boolean`
`exists(p, i)` 的对应链式版本。

- `Sequence.prototpye.existsi(p: (index: number, e: any)=>boolean): boolean`
`existsi(p, i)` 的对应链式版本，存在别名 `Sequence.prototpye.some`。

- `Sequence.prototpye.filter(p: (e: any)=>boolean): Sequence`
`filter(p, i)` 的对应链式版本。

- `Sequence.prototpye.filteri(p, (index: number, e: any)=>boolean): Sequence`
`filteri(p, i)` 的对应链式版本。

- `Sequence.prototpye.find(p: (e: any)=>boolean): any`
`find(p, i)` 的对应链式版本。

- `Sequence.prototpye.findi(p: (index: number, e: any)=>boolean): any`
`` 的对应链式版本。

- `Sequence.prototpye.flatMap(f: (e: any)=>Sequence): Sequence`
`flat_map(f, i)` 的对应链式版本。

- `Sequence.prototpye.flatten(): Sequence`
`flatten(i)` 的对应链式版本。

- `Sequence.prototpye.foldLeft(f: (acc: any, v: any)=>any, initValue: any): any`
`fold_left` 的对应链式版本。

- `Sequence.prototpye.foldLeftIndexed(f: (index: number, acc: any, v: any)=>any, initValue: any): any`
`fold_lefti` 的对应链式版本。

- `Sequence.prototpye.forAll(p: (e: any)=>boolean): boolean`
`for_all` 的对应链式版本。

- `Sequence.prototpye.forAllIndexed(p: (index: number, e: any)=>boolean): boolean`
`for_alli` 的对应链式版本，存在别名 `Sequence.prototpye.every`。

- `Sequence.prototpye.force(): void`
`force` 的对应链式版本。

- `Sequence.prototpye.isEmpty(): boolean`
`is_empty` 的对应链式版本。

- `Sequence.prototpye.iter(f: (e: any)=>void, i: Iterable): void`
`iter(f, i)` 的对应链式版本。

- `Sequence.prototpye.iteri(f: (index: number, e: any)=>void, i: Iterable): void`
`iteri(f, i)` 的对应链式版本。

- `Sequence.prototpye.length(): number`
`length(i)` 的对应链式版本。

- `Sequence.prototpye.loop(f: (index: number, e: any)=>boolean): boolean`
`loop(f, i)` 的对应链式版本。

- `Sequence.prototpye.map(f: (e: any)=>any): Iterable`
`map(f, i)` 的对应链式版本。

- `Sequence.prototpye.mapi(f: (index: number, e: any)=>any): Iterable`
`mapi(f, i)` 的对应链式版本。

- `Sequence.prototpye.map2(seq: Sequence, f: (e1: any, e2: any)=>any): Iterable`
`map2(f, i1, i2)` 的对应链式版本。

- `Sequence.prototpye.mem(e): boolean`
`mem(e, i)` 的对应链式版本，存在别名 `Sequence.prototpye.includes` 和 `Sequence.prototpye.contains`。

- `Sequence.prototpye.sum(): number`
`sum(i)` 的对应链式版本。

- `Sequence.prototpye.takeWhile(p: (e: any)=>boolean): Sequence`
`take_while(p, i)` 的对应链式版本。

- `Sequence.prototpye.take(n: number): Sequence`
`take(n, i)` 的对应链式版本。

- `Sequence.prototpye.tap(f: (e: any)=>void): Sequence`
`tap(f, i)` 的对应链式版本。

- `Sequence.prototpye.toArray(): Array<any>`
`to_array(i)` 的对应链式版本。

- `Sequence.prototpye.value(): any`
`value(i)` 的对应链式版本。


## 对比

提供相似功能的库有 `ladash`、`lazy` 等等。那么这个库相比有什么优势吗？

答：没任何优势。不过因为比较简单，所以很容易阅读，可能对各位围观观众能有所启发，那也就就有意义了。
