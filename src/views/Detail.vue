<template>
  <section class="detail"></section>
</template>

<script>
import { mapGetters } from "vuex";

import { dbotDetail } from "@/common/api";

export default {
  name: "detail",
  mounted() {
    this.init();
  },
  computed: {
    ...mapGetters(["dbotDetail"]),
    address() {
      return this.$route.params.address;
    }
  },
  methods: {
    async init() {
      const res = await fetch(dbotDetail(this.address));

      if (res.status === 200) {
        const data = await res.json();

        this.$store.dispatch("setDbotDetail", data);
      } else {
        console.log(res);
      }
    }
  }
};
</script>

<style lang="less" scoped>
</style>
