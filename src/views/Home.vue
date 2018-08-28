<template>
  <section class="home">
    <Spin fix v-show="spinShow"></Spin>
    <div class="category">
      <categories></categories>
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
    ...mapActions(["setDbots"]),
    init() {
      const { getDbots } = this.$api.home;

      if (this.dbots.length > 0) return;

      this.spinShow = true;

      getDbots({
        limit: 3,
        page: 1
      })
        .then(res => {
          this.spinShow = false;

          const { status, data } = res;

          if (status === 200 && data.count > 0) {
            this.setDbots({
              ...data,
              current: 1
            });
          } else {
            this.noDBots = true;
          }
        })
        .catch(e => {
          this.spinShow = false;
          this.noDBots = true;
          console.log(e);
        });
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
