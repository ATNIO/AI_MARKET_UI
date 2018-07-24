<template>
  <section class="home">
    <filters class="filters"></filters>
    <div class="containor">
      <action-bar class="actionBar" v-on:changeLayout="changeLayout"></action-bar>
      <list-view class="listView" :layout="layout"></list-view>
    </div>   
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
    flex: 1;

    .actionBar {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
    .listView {
    }
  }
}
</style>
