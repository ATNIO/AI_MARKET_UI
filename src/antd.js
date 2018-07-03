import Vue from "vue";
import {
  row,
  col,
  Button,
  Checkbox,
  Input,
  List,
  Message,
  Progress,
  Modal,
  Dropdown,
  Icon,
  Menu
} from "vue-antd-ui";

Vue.component(Button.name, Button);

Vue.prototype.$message = Message;
Vue.prototype.$progress = Progress;

const components = [
  row,
  col,
  Button,
  Checkbox,
  Checkbox.Group,
  Input,
  Input.Search,
  List,
  Modal,
  Dropdown,
  Icon,
  Menu,
  Menu.Item
];

components.forEach(component => {
  // 全局注册组件
  Vue.component(component.name, component);
});
