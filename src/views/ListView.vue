<template>
  <section class="listView">
      <component :is="layout"></component>
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
}
</style>
