<template>
  <div class="channel-list">
    <span class="title">Channel list</span>

    
    <ul>
      <channel-record v-for="(item, index) in dbots" :key="index" :item="item"></channel-record>

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
  },
  computed: {
    ...mapGetters(["dbots"])
  }
};
</script>

<style lang="less" scoped>
.channel-list {
  margin-left: 20px;
  margin-top: 42px;
  position: relative;
  // height: 810px;

  .title {
    font-size: 24px;
    color: #11124c;
  }
}
</style>
