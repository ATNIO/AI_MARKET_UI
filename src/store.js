import Vue from "vue";
import Vuex from "vuex";

import * as types from "./types";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    docData: {},
    dbots: [],
    count: 0,
    current: 1
  },
  mutations: {
    [types.SET_DOC_DATA](state, data = {}) {
      state.docData = Object.freeze(data);
    },
    [types.SET_DBOTS](state, dbots = []) {
      state.dbots = dbots;
    },
    [types.SET_COUNT](state, count = 0) {
      state.count = count;
    },
    [types.SET_CURRENT](state, current = 1) {
      state.current = current;
    }
  },
  actions: {
    setDocData({ commit }, payload) {
      commit(types.SET_DOC_DATA, payload.data);
    },
    setDbots({ commit }, dbots) {
      const { data, count, current } = dbots;

      commit(types.SET_DBOTS, data);
      commit(types.SET_COUNT, count);
      commit(types.SET_CURRENT, current);
    }
  },
  getters: {
    docData(state) {
      return state.docData;
    },
    count(state) {
      return state.count;
    },
    current(state) {
      return state.current;
    },
    dbots(state) {
      return state.dbots;
    }
  }
});
