<template>
  <div class="channel-list">
    <span class="title">Chanel list</span>

    
    <channel-record></channel-record>
    <ul>
      <!-- <channel-record v-for="(item, index) in dbots" :key="index" :item="item"></channel-record> -->
    </ul>





  </div>
</template>

<script>
import ChannelRecord from "./ChannelRecord";
import { mapGetters } from "vuex";

export default {
  name: "ChannelList",
  components: {
    ChannelRecord
  },
  data() {
    return {
      // data: data[0]
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
}
</style>
