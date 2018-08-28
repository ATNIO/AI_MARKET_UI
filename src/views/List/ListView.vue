<template>
  <div class="list">
    <ul class="list-view">
      <card v-for="(item, index) in dbots" :key="index" :item="item"></card>
    </ul>
    <Page class-name="page" :total="count" :current="current" />
  </div>
</template>

<script>
import Card from "./Card";

import { mapGetters } from "vuex";

export default {
  name: "ListView",
  components: {
    Card
  },
  data() {
    return {
      listView: null
    };
  },
  computed: {
    ...mapGetters(["dbots", "count", "current"])
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
  margin-bottom: 40px;
}
</style>
