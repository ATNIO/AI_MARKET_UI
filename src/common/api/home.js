import prefix from "./base";
import fetch from "./fetch";

const dbots = (l, p, c, st, sd) =>
  `${prefix}dbots?limit=${l}&page=${p}&category=${c}&sortType=${st}&sortDir=${sd}`;
const dbotCategories = `${prefix}setting/dbotCategories`;

const search = (f, s, k) => `${prefix}query?&word=${k}`;

export default {
  getDbots({
    limit,
    page = 1,
    category = "all",
    sortType = "floor_price",
    sortDir = "1"
  }) {
    return fetch.get(dbots(limit, page, category, sortType, sortDir));
  },
  getCategories() {
    return fetch.get(dbotCategories);
  },
  search({ from = 0, size = 10, keyword = 1 }) {
    console.log("search-------", keyword);
    return fetch.get(search(from, size, keyword));
  }
};
