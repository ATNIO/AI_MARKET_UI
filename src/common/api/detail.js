import base from "./base";
import fetch from "./fetch";

const { dev } = base;
const detail = address => `${dev}dbots/${address}/detail`;

export default {
  getDetail(address) {
    return fetch.get(detail(address));
  }
};
