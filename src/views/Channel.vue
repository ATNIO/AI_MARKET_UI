<template>
  <section> 
    <!-- 通道未开通 -->
    <template v-if="stateChannelStatus === 'close'">
      <div class="inaccessible">
        <div class="wrapper">
            <p class="title">No channel was found registered for you on this Dbot</p>
            <div class="means">
              <p class="method">In order to call API...</p>
              <p class="step-one"><Icon type="ios-add-circle" color="#87C5FE" size="20"/> deposit some ATN to open a channel with this Dbot</p>
              <p class="step-two"><Icon type="ios-create" color="#87C5FE" size="20"/> For each transfer , sign a message confirming the balance with the new transferred amount.</p>
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
                <div v-if="stateChannelStatus==='synced'">
                  <p class="title">Remaining  Balance </p>
                  <p class="balance">{{stateChannelBanlance | priceFormat}} ATN</p>
                </div>  
                <div v-else-if="stateChannelStatus === 'opening' || stateChannelStatus === 'syncing' || stateChannelStatus === 'closing'">
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
      storageCache: {},
      timer: null
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
      return (
        "0x73e1fe970b29534bc993846c4902b625555cd0cc" ||
        this.$route.params.address
      );
    },
    cacheKey() {
      return this.address + "_" + this.dbotAddr;
    }
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer = null;
  },
  methods: {
    ...mapActions(["setStateChannel"]),
    nextStep(value) {
      this.createNewChannel();
    },
    numberHandler(num) {
      const _num = new BN(num, 10);
      const multi = new BN("1e18");
      const rtn = _num.times(multi).toString(10);

      console.log("numberHandler:", num, rtn);

      return rtn;
    },
    init() {
      // TODO: 检查状态管理器里是否已有 state channel 的状态，如果有，return

      const cache = localStorage.getItem(CACHE_KEY);
      let currentStatus = "";

      if (!cache) return;

      this.storageCache = JSON.parse(cache);
      const currentDbotCache = this.storageCache[this.cacheKey];

      if (!currentDbotCache) return;

      const { status, hash } = currentDbotCache;

      // opening, closing, close, syncing, synced
      switch (status) {
        case "opening":
        case "closing":
        case "syncing":
          this.setStateChannel({ status });
          currentStatus = this.waitTx(hash, status);
          break;
        case "close":
          this.setStateChannel({ status });
          return;
        default:
          break;
      }

      if (currentStatus !== "syncing") return;

      // getItem balance
      this.updateDeposit(currentStatus);
    },
    async updateDeposit(status, hash, fromLink = false) {
      if (hash) {
        status = await this.waitTx(hash, status);
      }

      let depositByLink = null;
      let depositComputed = 0;

      if (fromLink) {
        depositByLink = await this.getDeposit();
      }

      let channelDetail = await this.getChannelDetail();

      if (fromLink) {
        if (!channelDetail) {
          this.timer = setInterval(async () => {
            channelDetail = await this.getChannelDetail();

            if (channelDetail || channelDetail === "error") {
              clearInterval(this.timer);
              this.timer = null;

              // 提示异常
              return;
            }

            const { deposit } = channelDetail;

            if (depositByLink === deposit) {
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000);
        }
        const { balance, deposit } = channelDetail;

        depositComputed = new BN(deposit, 10)
          .minus(new BN(balance, 10))
          .toString(10);
      } else {
        const { balance, deposit } = channelDetail;

        depositComputed = new BN(deposit, 10)
          .minus(new BN(balance, 10))
          .toString(10);
      }

      status = "synced";

      this.setStateChannel({ status, banlance: depositComputed });
      this.storageCache[this.cacheKey] = { status };
      localStorage.setItem(CACHE_KEY, JSON.stringify(this.storageCache));
    },
    async waitTx(hash, status) {
      // 根据交易 hash， 获取当前交易状态
      console.log("wait tx hash:", hash);

      const _status = status;
      const tx = await atn.waitTx(hash);
      const txHash = tx.hash;
      const txStatus = tx.status;

      switch (status) {
        case "opening":
          status = txStatus ? "syncing" : "close";
          break;
        case "closing":
          status = txStatus ? "close" : "syncing";
          break;
        case "syncing":
          txStatus || (status = "synced");
          break;
        default:
          break;
      }

      if (_status === status) {
        this.setStateChannel({ status });
        this.storageCache[this.cacheKey] = { status, hash: txHash };
        localStorage.setItem(CACHE_KEY, JSON.stringify(this.storageCache));
      }

      return status;
    },
    async getDeposit() {
      const deposit = await atn.getChannelDeposit(this.dbotAddr, this.address);

      if (!deposit) {
        // TODO: 如果为空，需提示
      }

      console.log("getDeposit:", deposit);

      return deposit;
    },
    async getChannelDetail() {
      let channelDetail = null;

      try {
        channelDetail = await atn.getChannelDetail(this.dbotAddr, this.address);
      } catch (e) {
        console.error("getChannelDetail:", e);

        return "error";
      }

      if (!channelDetail) {
        // TODO: 判断 getChannelDetail 返回结果
      }

      console.log("getChannelDetail:", channelDetail);

      return channelDetail;
    },
    async topup() {
      let status = "syncing";
      let txHash = "";

      this.setStateChannel({ status });

      await atn.topUpChannel(
        this.dbotAddr,
        this.numberHandler(this.topupValue),
        this.address,
        (err, hash) => {
          if (err) return;

          txHash = hash;
        }
      );

      if (txHash) {
        this.storageCache[this.cacheKey] = { status, hash: txHash };
        localStorage.setItem(CACHE_KEY, JSON.stringify(this.storageCache));

        await this.updateDeposit(status, txHash, true);
      } else {
        // TODO: 如果没有 hash
      }
    },
    async createNewChannel() {
      let status = "syncing";
      let txHash = "";

      if (!this.address) {
        this.$Notice.warning({
          title: "未登录",
          desc: "您需要使用您的ATN钱包登录"
        });

        return;
      }

      // 创建用户和Dbot交易通道
      this.setStateChannel({ status });

      try {
        await atn.createChannel(
          this.dbotAddr,
          this.numberHandler(this.depositValue),
          this.address,
          (err, hash) => {
            if (err) return;

            txHash = hash;
          }
        );
      } catch (e) {
        console.error("Create new channel failure:", e);

        status = "syncing";
        this.setStateChannel({ status });
        await this.updateDeposit(status, null, false);

        return "error";
      }

      this.storageCache[this.cacheKey] = { status, hash: txHash };
      localStorage.setItem(CACHE_KEY, JSON.stringify(this.storageCache));

      await this.updateDeposit(status, txHash, true);
    },
    async closeChannel() {
      // channelDetail 可以在 update deposit 的时候缓存。
      const channelDetail = await this.getChannelDetail();

      console.log(this.dbotAddr, this.address);

      try {
        const closeResult = await atn.closeChannel(
          this.dbotAddr,
          channelDetail.balance,
          this.address
        );

        this.storageCache[this.cacheKey] = { status: "close" };
        localStorage.setItem(CACHE_KEY, JSON.stringify(this.storageCache));
      } catch (e) {
        console.error("closeChannel:", e);
        // exception
        this.$Notice.warning({
          title: "关闭 channel 失败",
          desc: "抱歉，关闭 channel 失败，请稍后重试"
        });
      }
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
        position: absolute;
        margin-top: -300px;
        margin-left: 45px;
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
            animation-duration: 2.6s;
            animation-iteration-count: infinite;
            animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
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
