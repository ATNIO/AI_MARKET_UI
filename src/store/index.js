import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import * as types from "./types";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage
    })
  ],
  state: {
    list: [],
    account: ""
  },
  mutations: {
    [types.SET_LIST](state, list) {
      state.list = list;
    },
    [types.SET_ACCOUNT](state, account) {
      state.account = account;
    }
  },
  actions: {
    setList({ commit }, list) {
      commit(types.SET_LIST, list);
    },
    setAccount({ commit }, account) {
      commit(types.SET_ACCOUNT, account);
    }
  },
  getters: {
    list(state) {
      return state.list;
    },
    account(state) {
      return state.account;
    }
  }
});
