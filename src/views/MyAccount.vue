<template>
<div class="myaccount">
  <div class="nav">
    <div class="photo"></div>
    <span class="address">{{address}}</span>
    <div class="balance" @click="hello">
        {{balance}} ATN 
        <icon></icon>
    </div>
    <div>
      <Icon type="ios-person-outline" />
      <span>Profile</span>
    </div>
    <div>
      <Icon type="ios-list-box-outline" />
      <span>Channel list</span>
    </div>
  </div>
</div>
  
</template>

<script>
export default {
  name: "my-account",
  data() {
    return {
      address: 123,
      balance: 1000
    };
  },
  methods: {
    hello() {
      const eth = this.$web3.eth;
      eth.getAccounts().then(accounts => {
        console.log(accounts);
      });
    }
  }
};
</script>

<style lang="less" scoped>
.myaccount {
  width: 1200px;
  margin: 0 auto;
}
.nav {
  width: 290px;
  height: 810px;
  background: #ffffff;
  box-shadow: 3px 0 10px 0 rgba(200, 199, 232, 0.5);

  .photo {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: #797bf8;
    margin: 0 auto;
  }
}
</style>
