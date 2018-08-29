<template>
  <div class="card">
    <div class="title">
      <span class="remaining">Remaining Balance: </span><span class="balance">{{data.balance}}</span>
    </div>
    <span class="channel">Channel Status: </span><span class="status">{{data.channelStatus}}</span>    
    <span class="block">Block: </span><span class="value">{{data.block}}</span>
    <div class="img"></div>
    <div class="goods">
    <div class="logo" :style="logo"></div>
    <div class="content">
      <p class="name">{{data.name}}</p>
      <span class="address">Address: </span><span class="price">{{data.address}}</span>
    </div>
    
      
    </div>
  </div>
</template>

<script>
import data from "../mock/channelList.js";

export default {
  name: "ChannelRecord",
  data() {
    return {
      data: data[0]
    };
  },
  computed: {
    logo() {
      return {
        backgroundImage: `url(${data[0].logoUrl})`
      };
    }
  }
};
</script>

<style lang="less" scoped>
.card {
  margin-top: 42px;
  width: 890px;
  height: 140px;
  background: #ffffff;
  box-shadow: 3px 0 10px 0 rgba(200, 199, 232, 0.5);
  border-radius: 4px;
  padding-top: 30px;
  padding-left: 40px;
  position: relative;

  .title {
    margin-bottom: 16px;
    .remaining {
      font-size: 24px;
      color: #3f485c;
      font-weight: 500;
    }
    .balance {
      font-size: 24px;
      color: #87c5fe;
      font-weight: 800;
    }
  }
  .channel {
    font-size: 16px;
    color: #555d6f;
  }
  .status {
    font-size: 16px;
    color: #00d85a;
    font-weight: 800;
    margin-right: 108px;
  }
  .block {
    font-size: 16px;
    color: #555d6f;
  }
  .value {
    font-size: 16px;
    color: #555d6f;
    font-weight: 500;
  }

  .img {
    width: 330px;
    height: 140px;
    background-image: url(../assets/Group2Copy2png);
    position: absolute;
    top: 0;
    left: 250px;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 100% 100%;
  }

  .goods {
    position: absolute;
    left: 598px;
    top: 28px;
    display: flex;
    flex-direction: row;
    .logo {
      width: 80px;
      height: 80px;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 50% 50%;
      border: 2px solid #87c5ff;
      border-radius: 50%;
    }
    .content {
      margin-left: 25px;
      .name {
        margin-top: 10px;
        font-size: 18px;
        color: #11124c;
        font-weight: 500;
      }
      .address {
        font-size: 14px;
        color: #11124c;
        font-weight: 500;
      }
      .price {
        display: inline-block;
        font-size: 14px;
        width: 62px;
        height: 21px;
        padding-top: 6px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
