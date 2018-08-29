import prefix from "./base";
import fetch from "./fetch";
import Cookies from "js-cookie";

const login = `${prefix}login`;
const logout = `${prefix}logout`;

export default {
  login(params, sig) {
    return fetch.post(login, {
      params,
      sig
    });
  },
  logout(params) {
    console.log(params);
    return fetch.post(logout, params);
  }
};
