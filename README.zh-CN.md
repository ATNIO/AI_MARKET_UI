# AI_MARKET_UI

## 简介
AI_MARKET_UI 是人工智能API市场的前端项目，不同的AI服务商尽可能多的为我们提供AI API服务，它极大的简化了整个流程，只需一个账户就可使用所有的AI服务。

### 浏览器兼容
支持所有的支持 [ES5-compliant](http://kangax.github.io/compat-table/es5/) 特性的浏览器(IE8 及以下暂不支持).

## 快速入门
```bash
$ yarn install
$ yarn serve
```

### 编译成生产模式
```bash
$ yarn build
```

### 代码质量检测以及修复
```bash
$ yarn lint
```

## 文档
```bash
.
├── deploy -------------- 部署
├── public -------------- 公共文件 
└── src ----------------- 主要搬砖区域
    ├── assets ---------- 资源文件
    │   ├── styles ------ 样式文件
    │   └── fonts ------- 字体相关
    ├── common ---------- 公共方法
    │   └── api --------- api 相关
    ├── components ------ 公共组件
    └── views ----------- 页面组件
        ├── List -------- home 页面的列表
        └── doc --------- detail 页面的 endpoint 部分
```
注: 使用 [iView](https://www.iviewui.com/) 开源 UI 库。

 如需进一步了解，参见[Vue.js](https://vuejs.org/)。

## 证书
[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2018 ATNIO <atn.io>
