<template>
  <section> 
    <!-- 通道未开通 -->
    <template v-if="stateChannelStatus === 'close'">
      <div class="inaccessible">
        <div class="wrapper">
            <p class="title">No channel was found registered for you on this Dbot</p>
            <div class="means">
              <p class="method">In order to call API...</p>
              <p class="step-one"><Icon custom="icon-add" color="#87C5FE" size="20"/> deposit some ATN to open a channel with this Dbot</p>
              <p class="step-two"><Icon custom="icon-sign" color="#87C5FE" size="20"/> For each transfer , sign a message confirming the balance with the new transferred amount.</p>
              <Input 
                search 
                enter-button="Deposit" 
                placeholder=" 0 ATN" 
                size="large" 
                class="search" 
                v-on:on-search="nextStep" 
                v-model="depositValue"
              />
            </div>
        </div>
      </div>
    </template>

    <!-- 通道loading -->
    <template v-else>
      <div class="accessible">
        <div class="wrapper">       
            <div class="yourself">
              <avatar :width="86" :height="86" :borderWidth="3" :text="address"></avatar>
              <span>{{ address }}</span>
            </div>

            <div class="center">
              <div class="bg"></div>
              <div class="content">
                <div v-if="stateChannelStatus==='open'">
                  <p class="title">Remaining  Balance </p>
                  <p class="balance">{{stateChannelBanlance | priceFormat}} ATN</p>
                </div>  
                <div v-else>
                  <div class="wait">
                    <div class="circle circle1"></div>
                    <div class="circle circle2"></div>
                    <div class="circle circle3"></div>
                    <div class="circle circle4"></div>
                    <div class="circle circle5"></div>
                    <div class="circle circle6"></div>
                  </div>
                  <p class="syncing">syncing</p>
                </div>             
                <P class="description">A channel was found for this address.</P>
                <Input 
                  search 
                  enter-button="TOP UP" 
                  placeholder=" 0 ATN" 
                  size="large" 
                  class="top-up" 
                  v-model="topupValue"
                  v-on:on-search="topup"
                />
                <button @click="closeChannel">close channel</button>
              </div>
            </div>  

            <div class="dbot">
              <div class="dbot-avatar">
                <img :src="dbot.logo" alt="" />
              </div> 
              <span>{{ dbot.addr }}</span>
            </div>
        </div>
      </div>
    </template>
  </section>
  
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import data from "../mock/listData.js";
import Atn from "atn-js";
import BN from "bignumber.js";

const atn = new Atn(window.atn3);
const CACHE_KEY = "DETAIL_STATE_CHANNEL";

export default {
  name: "Channel",
  data() {
    return {
      balance: 80,
      data: data[0],
      status: 0,
      depositValue: "",
      topupValue: "",
      storageCache: {}
    };
  },
  props: {
    dbot: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    ...mapGetters(["address", "stateChannelStatus", "stateChannelBanlance"]),
    dbotAddr() {
      return this.$route.params.address;
    },
    cacheKey() {
      return this.account + this.dbotAddr;
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapActions(["setStateChannel"]),
    nextStep(value) {
      this.openChannel();
    },
    numberHandler(num) {
      const _num = new BN(num, 10);
      const multi = new BN("10e18");

      return _num.times(multi).toString(10);
    },
    init() {
      // TODO: 检查状态管理器里是否已有 state channel 的状态，如果有，return

      const cache = localStorage.get(CACHE_KEY);
      let res = null;
      let currentStatus = "";

      if (!cache) return;

      this.storageCache = Object.freeze(JSON.parse(cache));
      const currentDbotCache = this.storageCache[this.cacheKey];

      if (!currentDbotCache) return;

      const { status, hash } = currentDbotCache;

      // opening, closing, close, syncing, synced

      switch (status) {
        case "opening":
        case "closing":
          this.setStateChannel({ status });
          res = this.waitTx(hash, status);
          break;
        case "close":
          return;
        default:
          break;
      }

      if (res === -1) return;

      // get balance
    }
  }
};
</script>
<style lang="less" scoped>
.inaccessible {
  display: flex;
  justify-content: center;
  .wrapper {
    width: 1200px;
    height: 310px;
    background: #ffffff;
    border-radius: 4px;

    .title {
      font-size: 24px;
      color: #11124c;
      letter-spacing: 0;
      text-align: center;
      margin: 28px 0 20px 0;
    }
    .means {
      margin-left: 226px;

      .method {
        font-size: 18px;
        color: #0d0628;
        margin-bottom: 12px;
      }
      .step-one {
        font-size: 16px;
        color: #0d0628;
        margin-bottom: 15px;
      }
      .step-two {
        font-size: 16px;
        color: #0d0628;
        margin-bottom: 32px;
      }
      .search {
        width: 748px;
        height: 50px;
        border-radius: 4px;
        border: 1px #787bf7 solid;

        & /deep/ .ivu-input-large {
          height: 50px;
          font-size: 18px;
          color: #aaaaaa;
        }
        & /deep/ .ivu-input-search {
          width: 138px;
          background: #797bf8 !important;
          border-color: #797bf8 !important;
        }
      }
    }
  }
}
.accessible {
  display: flex;
  justify-content: center;
  .wrapper {
    width: 1200px;
    height: 300px;
    background: #ffffff;
    display: flex;

    .yourself,
    .dbot {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      span {
        margin-top: 14px;
      }

      .dbot-avatar {
        width: 86px;
        height: 86px;
        border: 3px solid #7a83f8;
        border-radius: 100%;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }

    .center {
      position: relative;

      .bg {
        background-image: url(../assets/channel-bg.png);
        width: 495px;
        height: 300px;
      }

      .content {
        display: flex;
        justify-content: center;
        //-----------------------open
        .title {
          font-size: 18px;
          color: #0d0628;
          text-align: center;
          margin-top: 30px;
          margin-bottom: 12px;
        }
        .balance {
          font-size: 48px;
          color: #00d85a;
          text-align: center;
          margin-bottom: 12px;
        }
        //---------------------------loading
        .wait {
          margin: 30px 0 12px 103px;
          margin-top: 30px;
          margin-bottom: 12px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          width: 134px;

          .circle {
            width: 9px;
            height: 9px;
            border-radius: 50%;
            animation-name: fadeIn;
            animation-duration: 2s;
            animation-iteration-count: infinite;
            background: tranparent;
          }

          .circle1 {
            animation-delay: 0;
          }
          .circle2 {
            animation-delay: 0.4s;
          }
          .circle3 {
            animation-delay: 0.8s;
          }
          .circle4 {
            animation-delay: 1.2s;
          }
          .circle5 {
            animation-delay: 1.6s;
          }
          .circle6 {
            animation-delay: 2s;
          }
        }
        .syncing {
          font-size: 48px;
          color: #959595;
          letter-spacing: 0;
          text-align: center;
        }
        //----------------back
        .description {
          font-size: 18px;
          color: #11124c;
          text-align: center;
          margin-bottom: 30px;
        }
        .channel-need {
          display: flex;
          flex-direction: row;
        }
        .top-up {
          width: 270px;
          height: 50px;
          border-radius: 4px;
          border: 1px #787bf7 solid;

          & /deep/ .ivu-input-large {
            height: 50px;
            font-size: 18px;
            color: #aaaaaa;
          }
          & /deep/ .ivu-input-search {
            width: 138px;
            background: #797bf8 !important;
            border-color: #797bf8 !important;
          }
        }
        .close-channel {
          margin-left: 10px;
          width: 90px;
          height: 52px;
          background: #dfdfdf;
          border-radius: 6px;
          font-size: 18px;
          color: #ff5655;
          text-align: center;
          font-weight: 600;
        }
      }
    }
  }
}
@keyframes fadeIn {
  0% {
    background: rgba(149, 149, 149, 1);
  }

  100% {
    background: rgba(149, 149, 149, 0);
  }

  80% {
    background: rgba(149, 149, 149, 0.2);
  }

  60% {
    background: rgba(149, 149, 149, 0.4);
  }

  40% {
    background: rgba(149, 149, 149, 0.6);
  }

  20% {
    background: rgba(149, 149, 149, 0.8);
  }
}
</style>
