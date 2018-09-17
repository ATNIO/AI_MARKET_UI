import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import api from "@/common/api"; // 导入api接口

import Atn from "atn-js";
import { upperFirst, camelCase } from "lodash";
import BN from "bignumber.js";

import iView from "iview";
import locale from "iview/dist/locale/en-US";
import VueClipboard from "vue-clipboard2";

import "normalize.css";
import "iview/dist/styles/iview.css";
import "@/assets/styles/base.less";
import "@/assets/styles/style.css";
import "json-schema-view-js/dist/style.min.css";

Vue.use(iView, { locale });
Vue.use(VueClipboard);

Vue.config.productionTip = false;

Vue.prototype.$api = api; // 将api挂载到vue的原型上

try {
  Vue.prototype.$atn = new Atn(window.atn3); // 挂载 atn3 实例
} catch (e) {
  Vue.prototype.$atn = null;
}

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

Vue.mixin({
  filters: {
    toUpper(value) {
      return value ? value.toUpperCase() : "";
    },
    priceFormat(price) {
      const a = new BN(price, 10);
      const b = new BN(10, 10);

      return a.div(1e18).toString(10);
    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
