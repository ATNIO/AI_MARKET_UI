<template>
  <section class="home">
    <div class="category">
      <categories v-on:changeCategory="changeCategory"></categories>
    </div>
    <div class="container">
      <action-bar v-on:sortChange="sortChange"></action-bar>
      <template v-if="!querying">
        <list-view v-on:pageChange="pageChange"></list-view>
      </template>
      <Spin fix size="large" v-else></Spin>
    </div>
  </section>
</template>

<script>
import HomeCategories from "./HomeCategories";
import HomeActionBar from "./HomeActionBar";
import ListView from "./List/ListView";

import Swagger from "swagger-client";
import { mapActions, mapGetters } from "vuex";

import { pageCount, typeMap } from "@/common/constants";

export default {
  name: "Home",
  components: {
    categories: HomeCategories,
    "action-bar": HomeActionBar,
    ListView
  },
  data() {
    return {
      spinShow: false
    };
  },
  computed: {
    ...mapGetters([
      "dbots",
      "count",
      "currentItem",
      "querying",
      "sortType",
      "sortDir"
    ])
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapActions(["setDbots", "setCategories", "setQuerying"]),
    changeCategory(category) {
      this.getDbots({ category });
    },
    pageChange(page) {
      this.getDbots({ page });
    },
    sortChange({ sortType, sortDir }) {
      console.log(sortType);
      this.getDbots({ sortType, sortDir });
    },
    // 初始化
    async init() {
      this.spinShow = true;

      await this.getDbots({});
      await this.getCategories();

      this.spinShow = false;
    },
    // 获取 dbots 列表
    async getDbots({ category, page, sortType, sortDir }) {
      const { getDbots } = this.$api.home;

      this.setQuerying();

      const dbots = await getDbots({
        limit: pageCount,
        page,
        category: category || this.currentItem,
        sortType: sortType
          ? typeMap[sortType.toLowerCase()]
          : typeMap[this.sortType.toLowerCase()],
        sortDir: sortDir || this.sortDir
      });
      // const { status, data } = dbots;
      //
      // if (status === 200) {
      //   this.setDbots({
      //     ...data,
      //     currentPage: page
      //   });
      // } else {
      //   console.log("dbots !200:", data);
      // }
    },
    // 获取分类列表
    async getCategories() {
      const { getCategories } = this.$api.home;

      const categories = await getCategories();
      const { data, status } = categories;

      if (status === 200) {
        this.setCategories(data);
      } else {
        console.log("categories !200:", data);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.home {
  width: 1200px;
  margin: 0 auto;
  display: flex;

  .category {
    flex: 0 0 auto;
    width: 290px;
  }

  .container {
    min-height: 500px;
    margin-left: 20px;
    flex: 1;
    position: relative;

    & /deep/ .ivu-spin-fix {
      background: transparent;
    }
  }
}
</style>
