import prefix from "./base";
import fetch from "./fetch";

const detail = address => `${prefix}dbots/${address}`;
const queryCommentsUrl = (address, page, limit) =>
  `${prefix}comment/query?dbotaddr=${address}&page=${page}&limit=${limit}`;
const addCommentUrl = `${prefix}comment/add`;

const likeVoteQueryUrl = (address, user) =>
  `${prefix}vote/detail?dbotaddr=${address}&usraddr=${user}`;
const likeVoteSetUrl = `${prefix}vote/vote`;

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
      usraddr: user,
      dbotaddr: address,
      content: content
    });
  },
  getLikeVote(address, user) {
    return fetch.get(likeVoteQueryUrl(address, user));
  },
  setLikeVote(address, user, value) {
    return fetch.post(likeVoteSetUrl, {
      dbotaddr: address,
      usraddr: user,
      upvoted: value
    });
  }
};
