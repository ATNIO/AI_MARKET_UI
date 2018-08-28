import base from "./base";
import fetch from "./fetch";
import qs from "qs";

const { dev } = base;
const dbots = (l, p) => `${dev}dbots?limit=${l}&page=${p}`;

export default {
  getDbots({ limit, page }) {
    return fetch.get(dbots(limit, page));
  }
};
