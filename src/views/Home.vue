<template>
  <section class="home">
    <el-container>
      <el-aside width="auto">
        <filters></filters>
      </el-aside>
      <el-container class="containor">
        <el-header height="auto">
          <action-bar v-on:changeLayout="changeLayout"></action-bar>
        </el-header>
        <el-main>
          <list-view :layout="layout"></list-view>
        </el-main>
        <!-- <div class="containor">
          <action-bar v-on:changeLayout="changeLayout"></action-bar>
          <list-view :layout="layout"></list-view>
        </div> -->
      </el-container>
    </el-container>  
  </section>
</template>

<script>
import Filters from "./Filters";
import ActionBar from "./ActionBar";
import ListView from "./ListView";

export default {
  name: "Home",
  components: {
    ActionBar,
    ListView,
    Filters
  },
  data() {
    return {
      layout: "list-item-grid"
    };
  },
  methods: {
    changeLayout(layout) {
      this.layout = `list-item-${layout}`;
    }
  }
};
</script>


<style lang="less" scoped>
.home {
  display: flex;

  .containor {
    padding: 0 2rem;
  }
}
</style>
