import Vue from "vue";
import "iview/dist/styles/iview.css";
import {
  Button,
  Row,
  Col,
  CheckboxGroup,
  Checkbox,
  Input,
  Modal,
  Dropdown,
  Icon,
  Menu
} from "iview";

const components = [
  Button,
  Row,
  Col,
  CheckboxGroup,
  Checkbox,
  Input,
  Modal,
  Dropdown,
  Icon,
  Menu
];

components.forEach(component => {
  // 全局注册组件
  Vue.component(component.name, component);
});
