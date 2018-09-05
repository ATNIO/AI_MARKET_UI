import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import * as types from "./types";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState({ storage: window.sessionStorage })],
  state: {
    detailData: {},
    specification: {},
    dbots: [],
    count: 0,
    currentPage: 1,
    querying: false,
    address: "",
    stateChannel: {},
    categories: {},
    currentSubmenu: [],
    currentItem: "all",
    sortType: "Price",
    sortDir: 1,

    currentComments: [],
    currentCommentsPage: 1,
    currentCommentsCount: 0
  },
  mutations: {
    [types.SET_DOC_DATA](state, data = {}) {
      state.specification = Object.freeze(data);
    },
    [types.SET_DBOTS](state, dbots = []) {
      state.dbots = Object.freeze(dbots);
    },
    [types.SET_COUNT](state, count = 0) {
      state.count = count;
    },
    [types.SET_CURRENT](state, currentPage = 1) {
      state.currentPage = currentPage;
    },
    [types.SET_QUERYING](state, querying = false) {
      state.querying = querying;
    },
    [types.SET_ADDRESS](state, address = "") {
      state.address = address;
    },
    [types.SET_DETAIL_DATA](state, payload = {}) {
      state.detailData = payload;
    },
    [types.SET_STATE_CHANNEL_BANLANCE](state, { storeKey, banlance }) {
      let stateChannel = state.stateChannel[storeKey];

      if (stateChannel) {
        stateChannel.banlance = banlance;
      } else {
        stateChannel = { banlance };
      }

      // TODO:  待优化 SET_STATE_CHANNEL_BANLANCE 与 SET_STATE_CHANNEL_STATUS 应该合并
      state.stateChannel[storeKey] = { ...stateChannel };
      state.stateChannel = { ...state.stateChannel };
    },
    [types.SET_STATE_CHANNEL_STATUS](state, { storeKey, status }) {
      let stateChannel = state.stateChannel[storeKey];

      if (stateChannel) {
        stateChannel.status = status;
      } else {
        stateChannel = { status };
      }

      // TODO:  待优化 SET_STATE_CHANNEL_BANLANCE 与 SET_STATE_CHANNEL_STATUS 应该合并
      state.stateChannel[storeKey] = { ...stateChannel };
      state.stateChannel = { ...state.stateChannel };
    },
    [types.SET_CATEGORIES](state, categories = {}) {
      state.categories = Object.freeze(categories);
    },
    [types.SET_CURRENT_SUB_MENU](state, val) {
      state.currentSubmenu = val;
    },
    [types.SET_CURRENT_ITEM_NAME](state, val) {
      state.currentItem = val;
    },
    [types.SET_SORT_TYPE](state, sortType) {
      state.sortType = sortType;
    },
    [types.SET_SORT_DIR](state, sortDir) {
      state.sortDir = sortDir;
    },
    [types.SET_CURRENT_COMMENTS](state, comments = []) {
      state.currentComments = Object.freeze(comments);
    },
    [types.SET_CURRENT_COMMENTS_PAGE](state, page) {
      state.currentCommentsPage = page;
    },
    [types.SET_CURRENT_COMMENTS_COUNT](state, count) {
      state.currentCommentsCount = count;
    }
  },
  actions: {
    setDocData({ commit }, payload) {
      commit(types.SET_DOC_DATA, payload.data);
    },
    setQuerying({ commit }, querying = true) {
      commit(types.SET_QUERYING, querying);
    },
    setDbots({ commit }, payload) {
      const { data, count, currentPage, querying } = payload;

      commit(types.SET_DBOTS, data);
      commit(types.SET_COUNT, count);
      commit(types.SET_CURRENT, currentPage);
      commit(types.SET_QUERYING, querying);
    },
    setAddress({ commit }, address) {
      commit(types.SET_ADDRESS, address);
    },
    setDetailData({ commit }, payload) {
      commit(types.SET_DETAIL_DATA, payload);
    },
    setStateChannel({ commit }, payload) {
      const { status, banlance } = payload;

      status && commit(types.SET_STATE_CHANNEL_STATUS, payload);
      banlance && commit(types.SET_STATE_CHANNEL_BANLANCE, payload);
    },
    setCategories({ commit }, categories) {
      commit(types.SET_CATEGORIES, categories);
    },
    setCategory({ commit }, payload) {
      const { subMenu, itemName } = payload;

      subMenu && commit(types.SET_CURRENT_SUB_MENU, subMenu);
      itemName && commit(types.SET_CURRENT_ITEM_NAME, itemName);
    },
    setSortType({ commit }, sortType) {
      commit(types.SET_SORT_TYPE, sortType);
    },
    setSortDir({ commit }, sortDir) {
      commit(types.SET_SORT_DIR, sortDir);
    },
    setCurrentComments({ commit }, payload) {
      const { count, comments } = payload;
      commit(types.SET_CURRENT_COMMENTS_COUNT, count);
      commit(types.SET_CURRENT_COMMENTS, comments);
    },
    setCurrentCommentsPage({ commit }, page) {
      commit(types.SET_CURRENT_COMMENTS_PAGE, page);
    }
  },
  getters: {
    specification(state) {
      return state.specification;
    },
    count(state) {
      return state.count;
    },
    currentPage(state) {
      return state.currentPage;
    },
    dbots(state) {
      return state.dbots;
    },
    address(state) {
      return state.address;
    },
    addressInDetail(state) {
      return state.detailData.addr;
    },
    endpoints(state) {
      return state.detailData.endpoints || [];
    },
    stateChannel(state) {
      return state.stateChannel;
    },
    categories(state) {
      return state.categories;
    },
    currentSubmenu(state) {
      return state.currentSubmenu;
    },
    currentItem(state) {
      return state.currentItem;
    },
    querying(state) {
      return state.querying;
    },
    sortType(state) {
      return state.sortType;
    },
    sortDir(state) {
      return state.sortDir;
    },
    currentComments(state) {
      return state.currentComments;
    },
    currentCommentsPage(state) {
      return state.currentCommentsPage;
    },
    currentCommentsCount(state) {
      return state.currentCommentsCount;
    }
  }
});
