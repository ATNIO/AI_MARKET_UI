<template>
  <div class="list">
    <ul class="list-view">
      <card v-for="(item, index) in data" :key="index" :item="item"></card>
    </ul>
    <Page class-name="page" :total="100" />
  </div>
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
  flex-wrap: wrap;
  list-style: none;
}

.page {
  margin-top: 33px;
  display: flex;
  justify-content: center;
}
</style>
