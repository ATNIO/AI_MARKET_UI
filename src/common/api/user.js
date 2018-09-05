import prefix from "./base";
import fetch from "./fetch";
import Cookies from "js-cookie";

const login = `${prefix}login`;
const logout = `${prefix}logout`;
const check = address => `${prefix}check?usraddr=${address}`;
const channelUrl = (sender, status, limit, page) =>
  `${prefix}channels?sender=${sender}&status=${status}&limit=${limit}&page=${page}`;
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
  },
  channel(sender, status, limit, page) {
    return fetch.get(channelUrl(sender, status, limit, page));
  }
};
