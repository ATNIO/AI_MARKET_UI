# AI_MARKET_UI

[![GitHub issues](https://img.shields.io/github/issues/ATNIO/AI_MARKET_UI.svg?longCache=true&style=popout-square)](https://github.com/ATNIO/AI_MARKET_UI/issues)
[![GitHub forks](https://img.shields.io/github/forks/ATNIO/AI_MARKET_UI.svg?longCache=true&style=popout-square)](https://github.com/ATNIO/AI_MARKET_UI/network)
[![GitHub stars](https://img.shields.io/github/stars/ATNIO/AI_MARKET_UI.svg?longCache=true&style=popout-square)](https://github.com/ATNIO/AI_MARKET_UI/stargazers)
[![GitHub license](https://img.shields.io/github/license/ATNIO/AI_MARKET_UI.svg?longCache=true&style=popout-square)](https://github.com/ATNIO/AI_MARKET_UI/blob/master/LICENSE)

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
```bash
.
├── deploy -------------- deploy files
├── public -------------- public files 
└── src ----------------- source code
    ├── assets ---------- asset files
    │   ├── styles ------ style files 
    │   └── fonts ------- font relation
    ├── common ---------- common func
    │   └── api --------- api relation
    ├── components ------ common components
    └── views ----------- page components
        ├── List -------- home page list
        └── doc --------- detail page endpoint part
```
note: use [iView](https://www.iviewui.com/) open source UI lib.

see [Vue.js](https://vuejs.org/) for more detail.

## License
[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2018 ATNIO <atn.io>
