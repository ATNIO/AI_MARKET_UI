<template>
  <section class="home">
    <Filters></Filters>
    <list-view></list-view>
  </section>
</template>

<script>
import Filters from "./Filters";
import ListView from "./ListView";

export default {
  name: "home",
  components: {
    Filters,
    ListView
  },
  mounted() {
    // this._getBalance();
  },
  methods: {
    async _getBalance() {
      const { getCoinbase, getBalance } = this.$web3.eth;
      const coinbase = await getCoinbase();
      const balance = await getBalance(coinbase);

      console.log(coinbase, balance);
    }
  }
};
</script>

<style lang="less" scoped>
.home {
  padding: 2rem 0;
}
</style>
