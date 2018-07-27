<template>
  <section 
    class="listView"
    :class="{ center: layout === 'list-item-fluent' }"
  >
      <template v-for="item in [1,2,3,4,5,6,7,8]">
        <component :is="layout" :key="item"></component>
      </template>
  </section>
</template>

<script>
import ListItemGrid from "./ListItemGrid";
import ListItemFluent from "./ListItemFluent";

export default {
  name: "ListView",
  components: {
    ListItemGrid,
    ListItemFluent
  },
  data() {
    return {};
  },
  props: ["layout"],
  computed: {}
};
</script>

<style lang="less" scoped>
.listView {
  padding-bottom: 2em;
  display: flex;
  flex-wrap: wrap;

  &.center {
    justify-content: center;
  }
}
</style>
