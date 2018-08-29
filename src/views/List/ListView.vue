<template>
  <div class="list">
    <!-- <Spin fix size="large" v-if="querying"></Spin> -->
    <template v-if="count > 0">
      <ul class="list-view">
        <card v-for="(item, index) in dbots" :key="index" :item="item"></card>
      </ul>
      <Page 
        v-if="count > 9" 
        class-name="page" 
        :total="count" 
        show-total
        :current="currentPage" 
        :page-size="pageCount"
        v-on:on-change="changePage"
      />
    </template>
    <template v-else>
      <p class="no-dbots">Sorry, no DBots searched, please search other categories.</p>
    </template>
  </div>
</template>

<script>
import Card from "./Card";

import { mapGetters } from "vuex";

import { pageCount } from "@/common/constants";

export default {
  name: "ListView",
  components: {
    Card
  },
  data() {
    return {
      listView: null,
      pageCount
    };
  },
  computed: {
    ...mapGetters(["dbots", "count", "currentPage", "querying"])
  },
  methods: {
    changePage(page) {
      this.$emit("pageChange", page);
    }
  }
};
</script>

<style lang="less" scoped>
.list {
  position: relative;
}

.list-view {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
}

.page {
  margin-top: 33px;
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
}

.no-dbots {
  margin-top: 200px;
  font-size: 24px;
  text-align: center;
  color: #999;
  background: transparent;
}
</style>
