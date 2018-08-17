<template>
  <section class="home">
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

export default {
  name: "Home",
  components: {
    categories: HomeCategories,
    "action-bar": HomeActionBar,
    ListView
  },
  mounted() {
    const res = Swagger("https://petstore.swagger.io/v2/swagger.json");
    console.log(res);
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
    margin-left: 20px;
  }
}
</style>
