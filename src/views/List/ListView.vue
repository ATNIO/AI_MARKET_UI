<template>
  <ul class="list-view">
    <card v-for="(item, index) in data" :key="index" :item="item"></card>
  </ul>
</template>

<script>
import Card from "./Card";

import data from "../../mock/listData.js";

export default {
  name: "ListView",
  components: {
    Card
  },
  data() {
    return {
      data
    };
  }
};
</script>

<style lang="less" scoped>
.list-view {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  list-style: none;
}
</style>
