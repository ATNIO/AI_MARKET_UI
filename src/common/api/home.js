import prefix from "./base";
import fetch from "./fetch";

const dbots = (l, p) => `${prefix}dbots?limit=${l}&page=${p}`;
const dbotCategories = `${prefix}setting/dbotCategories`;

export default {
  getDbots({ limit, page }) {
    return fetch.get(dbots(limit, page));
  },
  getCategories() {
    return fetch.get(dbotCategories);
  }
};
