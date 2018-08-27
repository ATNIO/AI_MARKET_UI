<template>
<div class="myaccount">
  <div class="nav">
    <div class="photo"></div>
    <div class="address">{{address}}</div>
    <div class="balance">
      <span>
        <span>0000.00</span>
         ATN 
        <Icon type="ios-eye-outline" />
      </span>
      <span>
        <span>****</span>
         ATN 
        <Icon type="ios-eye-off-outline" />
      </span>
        
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
import { mapGetters } from "vuex";
export default {
  name: "my-account",
  data() {
    return {
      balance: 1000
    };
  },
  computed: {
    ...mapGetters(["address"])
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
  display: flex;
  flex-direction: column;
  align-items: center;

  .photo {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: #797bf8;
    margin-top: 75px;
    margin-bottom: 15px;
  }
  .address {
    font-size: 24px;
    color: #788091;
    width: 176px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .balance {
    width: 230px;
    height: 54px;
    border: 1px solid #dfdfdf;
  }
}
</style>
