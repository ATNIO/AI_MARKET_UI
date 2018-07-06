<template>
  <section class="detail">
    <div class="wrapper">
      <div class="content">
        <div class="dbot-avatar">
          <img :src="dbotDetail.logo" alt="">
        </div>
        <div class="info">
          <p class="name">{{`${ dbotDetail.name }: ${ dbotDetail.address }`}}</p>
          <p class="sub">
            <Icon type="ios-clock"></Icon>
            <span style="margin: 0 1rem 0 .2rem;">{{`Last updated: ${ dbotDetail.createAt }`}}</span>
            <Icon type="ios-pricetags"></Icon>
            <span style="margin: 0 1rem 0 .2rem;">{{`Tag: ${ dbotDetail.tag }`}}</span>
          </p>
          <p class="des">{{ dbotDetail.description }}</p>
        </div>
        <div class="external">
          <p>{{ dbotDetail.developers }}</p>
          <p>developers</p>
        </div>
      </div>
    </div>
    <Tabs class="tabs">
      <TabPane label="DBOT Documentation" icon="document-text">
        <ApiSpec />
      </TabPane>
      <TabPane label="DBOT Statistics" icon="calculator">标签二的内容</TabPane>
    </Tabs>
    
  </section>
</template>

<script>
import { mapGetters } from "vuex";

import { dbotDetail } from "@/common/api";

import ApiSpec from "./Detail_ApiSpec";

export default {
  components: { ApiSpec },
  name: "detail",
  mounted() {
    this.init();
  },
  computed: {
    ...mapGetters(["dbotDetail"]),
    address() {
      return this.$route.params.address;
    }
  },
  methods: {
    async init() {
      this.$Spin.show();
      const res = await fetch(dbotDetail(this.address));

      if (res.status === 200) {
        const data = await res.json();

        this.$store.dispatch("setDbotDetail", data);
      } else {
        console.log(res);
      }
      this.$Spin.hide();
    }
  }
};
</script>

<style lang="less" scoped>
.detail {
  .wrapper {
    background: #f8f8f9;

    .content {
      max-width: 1460px;
      margin: 0 auto;
      padding: 2rem;
      display: flex;
      align-items: flex-start;
    }

    .dbot-avatar {
      width: 100px;
      height: 100px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .info {
      margin: 0 4rem 0 1rem;

      .name {
        margin: 0 0 0.5rem;
        font-size: 1.5rem;
        color: #1c2438;
      }

      .sub {
        font-size: 12px;
        color: #80848f;
        margin-bottom: 1rem;
      }

      .des {
        color: #495060;
      }
    }

    .external {
      padding: 0.5rem;
      background: #498fe1;
      border-radius: 0.5rem;

      p {
        font-size: 12px;
        text-align: center;
        color: #fff;
      }
    }
  }

  .tabs {
    max-width: 1460px;
    margin: 1rem auto;
  }
}
</style>
