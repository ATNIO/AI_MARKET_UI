import Vue from "vue";
import Vuex from "vuex";

import * as types from "./types";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    docData: {}
  },
  mutations: {
    [types.SET_DOC_DATA](state, data = {}) {
      state.docData = Object.freeze(data);
    }
  },
  actions: {
    setDocData({ commit }, payload) {
      commit(types.SET_DOC_DATA, payload.data);
    }
  },
  getters: {
    docData(state) {
      return state.docData;
    }
  }
});
