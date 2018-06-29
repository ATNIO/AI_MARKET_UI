import Vue from "vue";
import { row, col, Button, Checkbox, Input, List, message } from "vue-antd-ui";

Vue.component(Button.name, Button);
Vue.prototype.$message = message;

const components = [
  row,
  col,
  Button,
  Checkbox,
  Checkbox.Group,
  Input,
  Input.Search,
  List
];

components.forEach(component => {
  // 全局注册组件
  Vue.component(component.name, component);
});
