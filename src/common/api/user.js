import base from "./base";
import fetch from "./fetch";
import Cookies from "js-cookie";

const { dev } = base;
const login = `${dev}login`;
const logout = `${dev}logout`;

export default {
  login(params, sig) {
    // Cookies.set("params", params);
    // Cookies.set("sig", sig);

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
