# AI_MARKET_UI

## Introduction
AI_MARKET_UI is the frontend of AI Market which is a decentralized platform to provide AI services from plenty of AI providers.
Only one key is needed to access all kind of AI services.

### Browser Compatibility
Support all browsers that are [ES5-compliant](http://kangax.github.io/compat-table/es5/) (IE8 and below are not supported).

## QuickStart
```bash
$ yarn install
$ yarn serve
```

### Compiles and minifies for production
```bash
$ yarn build
```

### Lints and fixes files
```bash
$ yarn lint
```

## Documentation

.
├── deploy -------------- 部署
├── public -------------- 公共文件
└── src ----------------- 主要搬砖区域
    ├── assets ---------- 资源目录
    │   ├── styles ------ 样式
    │   └── fonts ------- 字体相关
    ├── common ---------- 公共方法
    │   └── api --------- api 相关
    ├── components ------ 公共组件
    └── views ----------- 页面组件
        ├── List -------- home 页面的列表
        └── doc --------- detail 页面的 endpoint 部分

注: 使用 [iView](https://www.iviewui.com/) 开源 UI 库。

see [Vue.js](https://vuejs.org/) for more detail.

## License
[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2018 ATNIO <atn.io>
