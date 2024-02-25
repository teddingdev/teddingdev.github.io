---
title: Angular Style Guide [Angular 风格指南] 
date: 2024-02-25 16:27:08
tags:
categories:
---

{{ title }}
<!-- more -->
## Git 提交消息风格指南 [部分]
提交消息的格式 (Format of the commit message)
`<type>(<scope>): <subject>`
允许的`<type>`
- feat (feature)
- fix (bug fix)
- docs (documentation)
- style (formatting, missing semi colons, …)
- refactor
- test (when adding missing tests)
- chore (maintain)
eg:
> - chore(deps): bump tough-cookie from 4.1.2 to 4.1.3
> - refactor(core): use performance API for signals 
> - fix(compiler-cli): correctly detect deferred dependencies across scop… 

## 代码 风格指南
### 单一职责
> - 对所有的组件、服务等等应用单一职责原则(SRP)。这样可以让应用更干净、更易读、更易维护、更易测试。
> - 坚持每个文件只定义一样东西（比如服务或组件）。
> - 考虑把文件大小限制在 400 行代码以内。

### 小函数
> - 坚持定义简单函数
> - 考虑限制在 75 行之内。

### 总体命名原则
#### 坚持所有符号使用一致的命名规则。
> - 坚持遵循同一个模式来描述符号的特性和类型。推荐的模式为 feature.type.ts。
#### 使用点和横杠来分隔文件名
> - 坚持 在描述性名字中，用横杠来分隔单词。
> - 坚持使用点来分隔描述性名字和类型。
> - 坚持遵循先描述组件特性，再描述它的类型的模式，对所有组件使用一致的类型命名规则。推荐的模式为 feature.type.ts。
> - 坚持使用惯用的后缀来描述类型，包括 *.service、*.component、*.pipe、.module、.directive。必要时可以创建更多类型名，但必须注意，不要创建太多。
#### 符号名与文件名
> - 坚持为所有东西使用一致的命名约定，以它们所代表的东西命名。
> - 坚持使用大写驼峰命名法来命名类。
> - 坚持匹配符号名与它所在的文件名。
> - 坚持在符号名后面追加约定的类型后缀（比如 Component、Directive、Module、Pipe、Service）。
> - 坚持在文件名后面追加约定的类型后缀（比如 .component.ts、.directive.ts、.module.ts、.pipe.ts、.service.ts）。

### 特性模块(features)
> - 坚持为应用中每个明显的特性创建一个 NgModule。
> - 坚持把特性模块放在与特性区同名的目录中（比如 app/heroes）。
> - 坚持特性模块的文件名应该能反映出特性区的名字和目录（比如 app/heroes/heroes.module.ts）。
> - 坚持特性模块的符号名应该能反映出特性区、目录和文件名（比如在 app/heroes/heroes.module.ts 中定义 HeroesModule）。

### 不要往管道中添加过滤和排序逻辑
> - 避免往自定义管道中添加过滤或排序逻辑。
> - 坚持在把模型绑定到模板中时，把过滤和排序逻辑在组件或服务中进行预先计算。

### 避免为 inputs 和 outputs 指定别名 [（参考）](https://angular.cn/guide/styleguide#avoid-aliasing-inputs-and-outputs)
> - 除非有重要目的，否则不要为 input 和 output 指定别名。

### 把逻辑放到服务里
> - 坚持在组件中只包含与视图相关的逻辑。所有其它逻辑都应该放到服务中。
> - 坚持把可复用的逻辑放到服务中，保持组件简单，聚焦于它们预期目的。

### 不要给 output 属性加前缀
> - 坚持命名事件时，不要带前缀 on。
> - 坚持把事件处理器方法命名为 on 前缀之后紧跟着事件名。

### 把表现层逻辑放到组件类里
> - 坚持把表现层逻辑放进组件类中，而不要放在模板里。（逻辑应该只出现在一个地方（组件类里）而不应分散在两个地方。）

### 初始化输入属性
> - TypeScript 的编译器选项 --strictPropertyInitialization，会确保某个类在构造函数中初始化其属性。当启用时，如果该类没有对任何未显式标为可选值的属性提供初始值，TypeScript 编译器就会报错。
> - 按照设计，Angular 把所有 @Input 都视为可选值。只要有可能，你就应该通过提供默认值来满足 --strictPropertyInitialization 的要求。
> - 如果该属性很难构造出默认值，请使用 ? 来把该属性显式标记为可选的。

### 服务总是单例的
> - 坚持在同一个注入器内，把服务当做单例使用。用它们来共享数据和功能。
> - 服务是在特性范围或应用内共享方法的理想载体。
> - 服务是共享状态性内存数据的理想载体。

### 单一职责的服务
> - 坚持创建封装在上下文中的单一职责的服务。
> - 坚持当服务成长到超出单一用途时，创建一个新服务。

### 如何提供服务
> - 坚持在服务的 @Injectable 装饰器上指定通过应用的根注入器提供服务。
> - 特别的，当不同的两个组件需要一个服务的不同的实例时，在这种情况下，对于需要崭新和单独服务实例的组件，最好在组件级提供服务。

### 通过服务与 Web 服务器通讯
> - 坚持把数据操作和与数据交互的逻辑重构到服务里。
> - 坚持让数据服务来负责 XHR 调用、本地储存、内存储存或者其它数据操作。(数据服务应该封装这些细节。这样，在服务内部修改细节，就不会影响到它的消费者)

##  TypeScript 风格指南
### 缩写
> 缩写应被视为一个词。例如，应使用 loadHttpUrl，而非 loadHTTPURL。平台有特殊要求的标识符例外，如 XMLHttpRequest。
### 美元符号 $
> 一般情况下，标识符不应使用 $，除非为了与第三方框架的命名规范保持一致。
### _ 前缀与后缀
> 标识符禁止使用下划线 _ 作为前缀或后缀。这也意味着，禁止使用单个下划线 _ 作为标识符（例如：用来表示未被使用的参数）。
> 如果需要从数组或元组中取出某个或某几个特定的元素的话，可以在解构语句中插入额外的逗号，忽略掉不需要的元素：
```js
const [a, , b] = [1, 5, 10];  // a <- 1, b <- 10
```
### 数组构造函数
在 TypeScript 中，禁止使用 Array() 构造函数（无论是否使用 new 关键字）。它有许多不合直觉又彼此矛盾的行为，例如：
```typescript
// 不要这样做！同样的构造函数，其构造方式却却完全不同！
const a = new Array(2); // 参数 2 被视作数组的长度，因此返回的结果是 [undefined, undefined]
const b = new Array(2, 3); // 参数 2, 3 被视为数组中的元素，返回的结果此时变成了 [2, 3]
```
应当使用方括号对数组进行初始化，或者使用 from 构造一个具有确定长度的数组：
```typescript
const a = [2];
const b = [2, 3];

// 等价于 Array(2)：
const c = [];
c.length = 2;

// 生成 [0, 0, 0, 0, 0]
Array.from<number>({length: 5}).fill(0);
```

### 强制类型转换
> 不建议通过字符串连接操作将类型强制转换为 string ，这会导致加法运算符两侧的运算对象具有不同的类型。
> 禁止使用一元加法运算符 + 将字符串强制转换为数字。
```typescript
// 不要这样做！
const x = +y;
```
> 不要在 if 、 for 或者 while 的条件语句中显式地将类型转换为 boolean ，因为这里原本就会执行隐式的类型转换。
```typescript
// 不要这样做！
const foo: MyInterface|null = ...;
if (!!foo) {...}
while (!!foo) {...}
```
> 在代码中使用显式和隐式的比较均可。
```typescript
// 显式地和 0 进行比较，没问题！
if (arr.length > 0) {...}

// 依赖隐式类型转换，也没问题！
if (arr.length) {...}
```

### 删除对象的属性
> 请使用 this.foo = null 。在现代的JavaScript引擎中，改变一个对象属性的数量比重新分配值慢得多。应该避免删除关键字，除非有必要从一个对象的迭代的关键字列表删除一个属性，或改变 if (key in obj) 结果。
```typescript
//推荐
o.prototype.dispose = function() {
    this.property_ = null;
};
// 不推荐
Foo.prototype.dispose = function() {
    delete his.property_;
};
```

## CSS 风格指南
### 简写属性
> 尽可能使用简写的属性书写方式。CSS提供了多种属性 简写 的方式（如 font ），即使只显式设置一个值，也应该尽可能地使用。
### 0与单位
> 省略“0”后的单位。除非必需，否则0后不要加单位。
> 省略前导“0”值。在-1至1之间的值无需保留整数位的0。
### id与class名称分隔符
> 用连字符分隔ID和类名中的单词。选择器中的词语和缩写中不要使用除了连字符以外的任何字符（包括空字符），以提高可理解性和可读性。
```css
/* 不推荐: 单词未分开 */
.demoimage {}

/* 不推荐：使用下划线而不是连字符 */
.error_status {}

/* 推荐 */
#video-id {}
.ads-sample {}
```

**参考文档**
1. https://angular.cn/guide/styleguide
2. https://google.github.io/styleguide
3. https://zh-google-styleguide.readthedocs.io/en/latest/
4. https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/