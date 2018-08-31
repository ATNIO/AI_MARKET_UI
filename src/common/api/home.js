import prefix from "./base";
import fetch from "./fetch";

const dbots = (l, p, c, st, sd) =>
  `${prefix}dbots?limit=${l}&page=${p}&category=${c}&sortType=${st}&sortDir=${sd}`;
const dbotCategories = `${prefix}setting/dbotCategories`;

const search = (f, s, w) => `${prefix}query?from=${f}&size=${s}&word=${w}`;

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
  search({ from = 0, size = 10, word }) {
    return fetch.get(search(from, size, word));
  }
};
