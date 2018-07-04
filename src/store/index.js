import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import * as types from "./types";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
      paths: ["account"]
    })
  ],
  state: {
    list: [],
    account: "",
    dbotDetail: {}
  },
  mutations: {
    [types.SET_LIST](state, list = []) {
      state.list = list;
    },
    [types.SET_ACCOUNT](state, account = "") {
      state.account = account;
    },
    [types.SET_DBOT_DETAIL](state, detail = {}) {
      state.dbotDetail = detail;
    }
  },
  actions: {
    setList({ commit }, list) {
      commit(types.SET_LIST, list);
    },
    setAccount({ commit }, account) {
      commit(types.SET_ACCOUNT, account);
    },
    setDbotDetail({ commit }, detail) {
      commit(types.SET_DBOT_DETAIL, detail);
    }
  },
  getters: {
    list(state) {
      return [...state.list];
    },
    account(state) {
      return state.account;
    },
    dbotDetail(state) {
      return state.dbotDetail;
    }
  }
});
