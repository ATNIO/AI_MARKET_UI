<template>
  <div class="list">
    <ul class="list-view" @click="_click($event)">
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
    return {};
  },
  computed: {
    ...mapGetters(["dbots", "count", "current"])
  },
  methods: {
    _click(e) {
      console.log(e);

      const target = e.target || e.currentTarget;

      if (target.tagName === "LI") {
        const address = target.dataset.address;

        this.$router.push({
          name: "detail",
          params: {
            address: address
          }
        });
      }
    }
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
