<template>
  <section class="home">
    <Spin fix v-show="spinShow"></Spin>
    <div class="category">
      <categories></categories>
    </div>
    <div class="container">
      <action-bar></action-bar>
      <list-view></list-view>
    </div>
  </section>
</template>

<script>
import HomeCategories from "./HomeCategories";
import HomeActionBar from "./HomeActionBar";
import ListView from "./List/ListView";

import Swagger from "swagger-client";

import { mapActions } from "vuex";

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
  mounted() {
    this.init();
  },
  methods: {
    ...mapActions(["setDbots"]),
    init() {
      const { getDbots } = this.$api.home;

      this.spinShow = true;

      getDbots(3, 1)
        .then(res => {
          this.spinShow = false;

          const { status, data } = res;

          if (status === 200) {
            this.setDbots({
              ...data,
              current: 1
            });
          }
        })
        .catch(e => {
          this.spinShow = false;
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

  .container {
    margin-left: 20px;
  }
}
</style>
