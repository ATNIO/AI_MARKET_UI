import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import * as types from "./types";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    list: []
  },
  mutations: {
    [types.SET_LIST](state, list) {
      state.list = list;
    }
  },
  actions: {
    setList({ commit }, list) {
      commit(types.SET_LIST, list);
    }
  },
  getters: {
    list(state) {
      return state.list;
    }
  }
});
