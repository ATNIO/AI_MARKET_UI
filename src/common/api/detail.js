import prefix from "./base";
import fetch from "./fetch";

const detail = address => `${prefix}dbots/${address}/detail`;
const queryCommentsUrl = (address, page, limit) =>
  `${prefix}comment/query?dbotaddr=${address}&page=${page}&limit=${limit}`;
const addCommentUrl = `${prefix}comment/add`;

export default {
  getDetail(address) {
    return fetch.get(detail(address));
  },
  getComments(address, page, limit) {
    return fetch.get(queryCommentsUrl(address, page, limit));
  },
  addComments(address, user, content) {
    return fetch.post(addCommentUrl, {
      parent: "0",
      useraddr: user,
      dbotaddr: address,
      content: content
    });
  }
};
