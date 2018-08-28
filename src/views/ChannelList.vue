<template>
  <div class="channel-list">
    <span class="title">Chanel list</span>

    <div class="card">

    </div>


  </div>
</template>

<script>
import data from "../mock/channelList.js";

export default {
  name: "ChannelList",
  data() {
    return {
      data: data[0]
    };
  }
};
</script>

<style lang="less" scoped>
.channel-list {
  margin-left: 20px;
  margin-top: 42px;
  position: relative;

  .title {
    font-size: 24px;
    color: #11124c;
  }
  .card {
    margin-top: 42px;
    width: 890px;
    height: 140px;
    background: #ffffff;
    box-shadow: 3px 0 10px 0 rgba(200, 199, 232, 0.5);
    border-radius: 4px;
  }
}
</style>
