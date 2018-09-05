<template>
    <div class="channel-list">
        <span class="title">Channel list</span>
        <ul>
            <channel-record v-for="(item, index) in this.records" :key="index" :item="item"></channel-record>
        </ul>
        <Page
                class-name="page"
                :total="this.count"
                show-total
                :current="this.page"
                :page-size="5"
                v-on:on-change="changePage"/>
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
      page: 1,
      limit: 5,
      count: 0,
      records: []
    };
  },
  computed: {
    ...mapGetters(["address"])
  },
  mounted() {
    this.fetchChannel();
  },
  methods: {
    fetchChannel() {
      const addr = this.address;
      const { channel } = this.$api.user;
      channel(addr, "open", this.limit, this.page)
        .then(res => {
          const { data, status } = res;
          if (status === 200) {
            this.count = data.count;
            this.records = data.data;
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    changePage(page) {
      this.page = page;
      this.fetchChannel();
    }
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
  & /deep/ .card {
    margin-top: 15px;
  }
  .page {
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }
}
</style>
