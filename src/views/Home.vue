<template>
  <section class="home">
    <Spin fix v-show="spinShow"></Spin>
    <div class="category">
      <categories v-on:changeCategory="changeCategory"></categories>
    </div>
    <div class="container" v-if="!noDBots">
      <action-bar></action-bar>
      <list-view></list-view>
    </div>
    <div v-else class="no-dbots">
      <p>Sorry, no DBots searched.</p>
    </div>
  </section>
</template>

<script>
import HomeCategories from "./HomeCategories";
import HomeActionBar from "./HomeActionBar";
import ListView from "./List/ListView";

import Swagger from "swagger-client";
import { mapActions, mapGetters } from "vuex";

import { pageCount } from "@/common/constants";

export default {
  name: "Home",
  components: {
    categories: HomeCategories,
    "action-bar": HomeActionBar,
    ListView
  },
  data() {
    return {
      spinShow: false,
      noDBots: false
    };
  },
  computed: {
    ...mapGetters(["dbots"])
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapActions(["setDbots", "setCategories"]),
    changeCategory(category) {
      // TODO: re query
      console.log(category);
    },
    // 初始化
    async init() {
      this.spinShow = true;

      await this.getDbots();
      await this.getCategories();

      this.spinShow = false;
    },
    // 获取 dbots 列表
    async getDbots() {
      const { getDbots } = this.$api.home;
      const dbots = await getDbots({
        limit: pageCount,
        page: 1
      });
      const { status, data } = dbots;

      if (status === 200 && data.count > 0) {
        this.setDbots({
          ...data,
          current: 1
        });
      } else {
        this.noDBots = true;
        console.log("dbots !200:", data);
      }
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
  min-height: calc(100vh - 270px);
  margin: 0 auto;
  display: flex;
  position: relative;

  .category {
    flex: 0 0 auto;
    width: 290px;
  }

  .container,
  .no-dbots {
    margin-left: 20px;
    flex: 1;
  }

  .container {
    height: 100%;
  }

  .no-dbots {
    p {
      margin-top: 200px;
      font-size: 24px;
      text-align: center;
      color: #999;
    }
  }
}
</style>
