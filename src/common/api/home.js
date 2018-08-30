import prefix from "./base";
import fetch from "./fetch";

const dbots = (l, p, c, st, sd) =>
  `${prefix}dbots?limit=${l}&page=${p}&category=${c}&sortType=${st}&sortDir=${sd}`;
const dbotCategories = `${prefix}setting/dbotCategories`;

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
  }
};
