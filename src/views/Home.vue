<template>
  <div class="home">
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  components: {},
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
