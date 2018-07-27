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
    total: 0,
    list: [],
    account: "",
    dbotDetail: {},
    filterLayerShow: false
  },
  mutations: {
    [types.SET_LIST](state, list = []) {
      state.list = Object.freeze(list);
    },
    [types.SET_LIST_TOTAL](state, total = 0) {
      state.total = total;
    },
    [types.SET_ACCOUNT](state, account = "") {
      state.account = account;
    },
    [types.SET_DBOT_DETAIL](state, detail = {}) {
      state.dbotDetail = detail;
    },
    [types.SET_FILTER_SHOW](state, status = false) {
      state.filterLayerShow = status;
    }
  },
  actions: {
    setList({ commit }, payload) {
      const { result, total } = payload;

      commit(types.SET_LIST, result);
      commit(types.SET_LIST_TOTAL, total);
    },
    setAccount({ commit }, account) {
      commit(types.SET_ACCOUNT, account);
    },
    setDbotDetail({ commit }, detail) {
      commit(types.SET_DBOT_DETAIL, detail);
    },
    setFilterShow({ commit }, status) {
      commit(types.SET_FILTER_SHOW, status);
    }
  },
  getters: {
    list(state) {
      return [...state.list];
    },
    total(state) {
      return state.total;
    },
    account(state) {
      return state.account;
    },
    dbotDetail(state) {
      return state.dbotDetail;
    },
    filterLayerShow(state) {
      return state.filterLayerShow;
    }
  }
});
