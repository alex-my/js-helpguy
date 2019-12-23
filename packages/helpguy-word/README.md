## 说明

请看`helpguy`

## 示例

所有接口

```js
const sw = require('@helpguy-word');

// 初始化敏感词库，建议在启动的时候执行
sw.addWords(['天安门', '管理员']);
sw.addWord('管理员');

// 判断是否包含敏感词，返回值 true: 包含; false: 不包含
sw.contains('我爱北京天安门'); // => true
sw.contains('我不管理这个部门'); // => false

// 获取含有的敏感词内容，返回值 字符串数组
sw.words('我喜欢做网络管理员怎么了'); // => ['管理员']

// 替换敏感词，当once=true时，对于每一个出现的敏感词，只替换一次。默认 once = false
sw.replace('我是管理员', '*', true); // => 我是*
// 替换敏感词, 当once=false时，对于每一个出现的敏感词，按照其长度替换。默认 once = false
sw.replace('我是管理员', '*', false); // => 我是***
```
