<template>
  <section class="listView">
  <component :is="itemType"></component>
  </section>
</template>

<script>
import ListItemCard from "./ListItemGrid";
import ListItemFluent from "./ListItemFluent";

export default {
  name: "ListView",
  components: {
    ListItemCard,
    ListItemFluent
  },
  data() {
    return {
      itemType: ListItemCard
    };
  }
};
</script>

<style lang="less" scoped>
.listView {
}
</style>
