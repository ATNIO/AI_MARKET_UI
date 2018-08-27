<template>
<div class="myaccount">
  <div class="nav">
    <div class="photo"></div>
    <div class="address">{{address}}</div>
    <div class="balance">
      <span class="visible" v-show="visible">
        <span class="number">
          <span class="number-visible">0000.00</span>
          <span class="unit"> ATN</span>
        </span>
        <Icon type="ios-eye-outline" @click="visible = !visible" size="28" color="#B7B9CE" class="icon"/>
      </span>
      <span class="unvisible" v-show="!visible">
        <span class="number">
          <span class="number-unvisible">****</span>
          <span class="unit"> ATN</span>
        </span>
         
        <Icon type="ios-eye-off-outline" @click="visible = !visible" size="28" color="#B7B9CE" class="icon"/>
      </span>
        
    </div>


    <div class="list">
      <div class="profile">
        <Icon type="ios-person-outline" size="41" color="#ffffff" class="list-icon"/>
        <span> Profile</span>
      </div>
      <div class="channel-list">
        <Icon type="ios-list-box-outline" size="41" color="#ffffff" class="list-icon"/>
        <span> Channel list</span>
      </div>
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
      visible: true
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
    text-align: center;
    position: relative;

    .unit {
      font-size: 16px;
      color: #000000;
      position: absolute;
      top: 8px;
      left: 92px;
    }
    .number {
      position: absolute;
      display: flex;
      flex-direction: row;
      top: 8px;
      margin-left: 40px;
    }
    .number-visible {
      font-size: 24px;
      color: #87c5ff;
    }
    .number-unvisible {
      font-size: 46px;
      color: #87c5ff;
      position: absolute;
      top: -6px;
      left: 15px;
    }
    .icon {
      position: absolute;
      right: 14px;
      top: 14px;
    }
  }

  .list {
    display: flex;
    flex-direction: column;
    margin-top: 35px;

    .list-icon {
      margin-left: 25px;
      margin-right: 20px;
    }
    .profile {
      width: 290px;
      height: 60px;
      background: #797bf8;
      color: #ffffff;
      font-size: 24px;
      padding-top: 8px;
    }
    .channel-list {
      width: 290px;
      height: 60px;
      background: #797bf8;
      color: #ffffff;
      font-size: 24px;
      padding-top: 8px;
    }
  }
}
</style>
