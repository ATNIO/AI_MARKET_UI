<template>
  <section class="home">
    <filters></filters>
    <div class="containor">
      <action-bar v-on:changeLayout="changeLayout"></action-bar>
      <list-view :layout="layout"></list-view>
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
    padding: 0 2rem;
    flex: 1;
    transition: all 0.2s;
  }
}
</style>
