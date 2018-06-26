<template>
  <div class="home">
    <bot-list></bot-list>
  </div>
</template>

<script>
// @ is an alias to /src
import BotList from "./DbotList";

export default {
  name: "home",
  components: {
    BotList
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
