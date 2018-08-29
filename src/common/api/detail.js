import prefix from "./base";
import fetch from "./fetch";

const detail = address => `${prefix}dbots/${address}/detail`;

export default {
  getDetail(address) {
    return fetch.get(detail(address));
  }
};
