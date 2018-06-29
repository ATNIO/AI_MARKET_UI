import Vue from "vue";
import "normalize.css";
import "iview/dist/styles/iview.css";

import "whatwg-fetch";
import upperFirst from "lodash/upperFirst";
import camelCase from "lodash/camelCase";

import router from "./router";
import store from "./store";

import web3 from "./plugins/web3";

import App from "./App.vue";

import { Row, Col, Button, CheckboxGroup, Checkbox, Input } from "iview";

Vue.component("i-row", Row);
Vue.component("i-col", Col);
Vue.component("i-button", Button);
Vue.component("i-checkboxGroup", CheckboxGroup);
Vue.component("i-checkbox", Checkbox);
Vue.component("i-input", Input);

Vue.config.productionTip = false;

const requireComponent = require.context(
  // 其组件目录的相对路径
  "./components",
  // 是否查询其子目录
  false,
  // 匹配基础组件文件名的正则表达式
  /[A-Z]\w+\.(vue|js)$/
);

requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName);

  // 获取组件的 PascalCase 命名
  const componentName = upperFirst(
    camelCase(
      // 剥去文件名开头的 `'./` 和结尾的扩展名
      fileName.replace(/^\.\/(.*)\.\w+$/, "$1")
    )
  );

  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  );
});

Vue.use(web3);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
