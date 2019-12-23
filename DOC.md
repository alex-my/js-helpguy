## 目标

构建基于`lerna+es6+jest+rollup`的`utils`库

## lerna

全局安装`lerna`

```shell
cnpm i lerna -g
```

初始化项目

```shell
lerna init
// 生成 packages, lerna.json, package.json
```

创建一系列依赖包，包名需要未在`npmjs.com`上使用过，也可以在`package.json`中单独改名

```shell
cd packages
mkdir helpguy helpguy-crypto

// 每个包都进行初始化
cd helpguy
npm init -y
```

默认情况是每个包都有自己的 node_modules，设置之后，只有顶层有`node_modules`

```json
// 根目录 package.json
{
  "name": "root",
  "private": true,
  "workspaces": [
    "packages/*"
  ],
  "devDependencies": {
    "lerna": "^3.19.0"
  }
}

// 根目录 lerna.json
{
  "packages": ["packages/*"],
  "version": "0.1.0",
  "useWorkspaces": true,
  "npmClient": "yarn"
}
```

`helpguy`包是总集成，需要添加其它包做为依赖

```shell
lerna add helpguy-crypto --scope=helpguy
```

此时`helpguy`的`package.json`显示如下

```json
{
  "name": "helpguy",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "MIT",
  "dependencies": {
    "helpguy-crypto": "^1.0.0"
  }
}
```

添加依赖的方式

如果依赖是所有包都需要的

```shell
lerna add eslint
```

如果依赖是只是某个包有需要

```json
lerna add crypto-js --scope=helpguy-crypto
```

添加到`devDependencies`中

```shell
lerna add eslint --dev
```

创建新包

```shell
lerna create helpguy-me -y
```

发布到`npmjs.com`

```shell
lerna publish
```

## rollup

### 初始配置

安装`rollup`

```shell
lerna add rollup
```

虽然`lerna`管理了多个包，但每个包的构建还是独立的，这里以`helpguy-crypto`为例

安装相关依赖，这里使用`babel7`

```shell
lerna add @babel/core  --dev
lerna add @babel/cli  --dev
lerna add @babel/preset-env  --dev
lerna add @babel/plugin-proposal-class-properties  --dev
lerna add @babel/plugin-syntax-dynamic-import  --dev
lerna add rollup-plugin-babel@latest  --dev
lerna add rollup-plugin-terser --dev
```

进入`packages/helpguy-crypto`，创建文件`src/index.js`，随意添加些内容

```javascript
class MyCrypto {
  md5() {
    console.log('md5 is ...');
  }
}

export default MyCrypto;
```

添加配置文件`.babelrc`

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "modules": false
      }
    ]
  ],
  "plugins": [
    "@babel/plugin-syntax-dynamic-import",
    [
      "@babel/plugin-proposal-class-properties",
      {
        "loose": true
      }
    ]
  ]
}
```

添加配置文件`rollup.config.js`

```javascript
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

export default {
  input: './src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'umd',
    name: 'index'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    terser()
  ]
};
```

`package.json`添加脚本`build`

```json
{
  "name": "helpguy-crypto",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "rollup -c"
  },
  "keywords": [],
  "author": "",
  "license": "MIT",
  "dependencies": {
    "crypto-js": "^3.1.9-1"
  },
  "devDependencies": {
    "@babel/cli": "^7.7.7",
    "@babel/core": "^7.7.7",
    "@babel/plugin-proposal-class-properties": "^7.7.4",
    "@babel/plugin-syntax-dynamic-import": "^7.7.4",
    "@babel/preset-env": "^7.7.7",
    "rollup-plugin-babel": "^4.3.3",
    "rollup-plugin-terser": "^5.1.3"
  }
}
```

执行`npm run build`可以看见目标文件`dist/index.js`

### 添加 node 支持

添加插件用于解析`node_modules`中的第三方模块，以及转换`CommonJS`为`ES Model`

```shell
lerna add @rollup/plugin-node-resolve --dev
lerna add rollup-plugin-commonjs --dev
```

修改配置文件`rollup.config.js`，添加这两个插件，插件参数见[plugins.resolve.mainFields](https://github.com/rollup/plugins/tree/master/packages/node-resolve#mainfields)

```javascript
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import commonjs from 'rollup-plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: './src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'umd',
    name: 'index'
  },
  plugins: [
    resolve({
      mainFields: ['jsnext', 'main', 'browser']
    }),
    commonjs({
      sourceMap: false
    }),
    babel({
      // 排除
      exclude: 'node_modules/**'
    }),
    terser()
  ]
};
```

其中`plugins.resolve.mainFields`的意思是这些字段会读取`package.json`对应的字段，当前完整的`package.json`如下，`main`字段原本已有，新增了`jsnext`和`browser`字段

```json
{
  "name": "helpguy-crypto",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "rollup -c"
  },
  "keywords": [],
  "author": "",
  "license": "MIT",
  "dependencies": {
    "crypto-js": "^3.1.9-1"
  },
  "devDependencies": {
    "@babel/cli": "^7.7.7",
    "@babel/core": "^7.7.7",
    "@babel/plugin-proposal-class-properties": "^7.7.4",
    "@babel/plugin-syntax-dynamic-import": "^7.7.4",
    "@babel/preset-env": "^7.7.7",
    "@rollup/plugin-node-resolve": "^6.0.0",
    "rollup-plugin-babel": "^4.3.3",
    "rollup-plugin-commonjs": "^10.1.0",
    "rollup-plugin-terser": "^5.1.3"
  },
  "jsnext": true,
  "browser": true
}
```

修改`pckages/helpguy-crypto/src/index.js`的内容

```javascript
const crypto = require('crypto-js');

class MyCrypto {
  md5(str) {
    return crypto.MD5(str).toString();
  }
}

export default MyCrypto;
```

### 一些辅助插件

添加插件

```shell
lerna add rollup-plugin-notify --dev
lerna add rollup-plugin-progress --dev
lerna add rollup-plugin-visualizer --dev
lerna add rollup-plugin-analyzer --dev
```

修改配置文件`rollup.config.js`，添加以上插件

```javascript
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import commonjs from 'rollup-plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import notify from 'rollup-plugin-notify';
import progress from 'rollup-plugin-progress';
import visualizer from 'rollup-plugin-visualizer';
import analyzer from 'rollup-plugin-analyzer';

export default {
  input: './src/index.js',
  output: {
    file: 'dist/index.js',
    format: 'umd',
    name: 'index'
  },
  plugins: [
    progress({
      clearLine: true
    }),
    resolve({
      mainFields: ['jsnext', 'main', 'browser']
    }),
    commonjs({
      sourceMap: false
    }),
    babel({
      // 排除
      exclude: 'node_modules/**'
    }),
    terser(),
    notify(),
    visualizer({
      open: false
    }),
    analyzer({
      summaryOnly: true
    })
  ]
};
```

## 格式与规范

添加编辑器规范，在每个包的根目录添加文件`.editorconfig`，如`packages/helpguy-crypto/.editorconfig`

```text
root = true
[{*.js,*.css,*.html}]
indent_style = space
indent_size = 4
end_of_line = lf
charset = utf-8
insert_final_newline = true

[{package.json,.*rc,*.yml}]
indent_style = space
indent_size = 2

```

在项目根目录添加`eslint、prettier、husky、lint-staged`以及相关的插件

```shell
cnpm i eslint eslint-config-airbnb-base eslint-plugin-import eslint-plugin-prettier eslint-config-prettier eslint-plugin-standard -D
cnpm i husky lint-staged prettier rollup-plugin-eslint
```

在项目根目录添加`.eslintignore`

```text
dist
node_modules
```

在项目根目录添加`.eslintrc.js`

```javascript
module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: ['airbnb-base', 'prettier', 'prettier/standard'],
  plugins: ['prettier', 'standard'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  // https://cn.eslint.org/docs/rules/
  rules: {
    'prettier/prettier': 'error',
    'class-methods-use-this': 'off'
  }
};
```

在项目根目录添加`.huskyrc.js`

```javascript
module.exports = {
  hooks: {
    'pre-commit': 'lint-staged'
  }
};
```

在项目根目录添加`.prettierignore`

```json
dist
node_modules
```

在项目根目录添加`.prettierrc.js`

```javascript
// 更多内容见
// https://prettier.io/docs/en/options.html
module.exports = {
  // 使用空格进行缩进
  useTabs: false,
  // 字符串使用单引号
  singleQuote: true,
  // 对象的大括号中有空格 { a: b } 非 {a:b}
  bracketSpacing: true,
  // 语句末尾添加分号
  semi: true,
  // 当箭头函数前只有一个参数时，是否保留括号，默认保留
  arrowParens: 'always',
  // 一行的字符数，超过会自动换行
  printWidth: 180,
  // 尾部追加逗号
  trailingComma: 'none'
};
```

在项目根目录添加`lint-staged.config.js`

```javascript
module.exports = {
  '*.js': ['eslint --fix --color', 'prettier --write', 'git add']
};
```

## 测试

添加`jest`

```shell
lerna add jest --dev
lerna add babel-jest --dev
```

在每个包目录添加配置文件`jest.config.js`

```javascript
module.exports = {
  moduleFileExtensions: ['js'],
  modulePaths: ['/__tests__/'],
  // 收集测试覆盖率信息
  collectCoverage: true,
  // 配置测试最低阈值
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  }
};
```

在`.eslintrc.js`中的`env`添加`jest:true`

```javascript
 env: {
   browser: true,
   es6: true,
   node: true,
   jest: true
},
```

修改`packages/helpguy-crypto/src/index.js`

```javascript
const crypto = require('crypto-js');

const md5 = (word) => crypto.MD5(word).toString();

module.exports = md5;
```

添加新文件夹`_tests_`，添加测试文件`packages/helpguy-crypto/_tests_/index.test.js`

```javascript
const md5 = require('./index');

test("md5('123456') to equal e10adc3949ba59abbe56e057f20f883e", () => {
  expect(md5('123456')).toBe('e10adc3949ba59abbe56e057f20f883e');
});
```

每个包的`package.json`添加`test`

```json
"scripts": {
	"test": "jest"
}
```

执行测试

```shell
lerna exec npm run test
```

可以看到测试结果，每个包生都成了`coverage`文件夹，用浏览器打开`Icov-report`的`index.html`，可以看到测试结果

如果我们希望每次提交的时候自动检查一次，也可以修改`lint-staged.config.js`

```javascript
module.exports = {
  '*': 'lerna exec npm run test',
  '*.js': ['eslint --fix --color', 'prettier --write', 'git add']
};
```
