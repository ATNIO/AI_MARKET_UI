import prefix from "./base";
import fetch from "./fetch";
import Cookies from "js-cookie";

const login = `${prefix}login`;
const logout = `${prefix}logout`;
const check = address => `${prefix}check?usraddr=${address}`;

export default {
  login(params, sig) {
    return fetch.post(login, {
      params,
      sig
    });
  },
  logout(params) {
    return fetch.post(logout, params);
  },
  check(address) {
    return fetch.get(check(address));
  }
};
