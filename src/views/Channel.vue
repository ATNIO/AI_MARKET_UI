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
                <div v-if="stateChannelStatus==='open'">
                  <p class="title">Remaining  Balance </p>
                  <p class="balance">{{stateChannelBanlance | priceFormat}} ATN</p>
                </div>  
                <div v-else>
                  <div class="wait">
                    <div class="circle1"></div>
                    <div class="circle2"></div>
                    <div class="circle3"></div>
                    <div class="circle4"></div>
                    <div class="circle5"></div>
                    <div class="circle6"></div>
                  </div>
                  <p class="syncing">syncing</p>
                </div>             
                <P class="description">A channel was found for this address.</P>
                <Input search enter-button="TOP UP" placeholder=" 0 ATN" size="large" class="top-up" v-on:on-search="nextStep" />
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

const atn = new Atn(window.web3);

export default {
  name: "Channel",
  data() {
    return {
      balance: 80,
      data: data[0],
      status: 0,
      depositValue: ""
    };
  },
  props: {
    dbot: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    ...mapGetters(["address", "stateChannelStatus", "stateChannelBanlance"])
  },
  methods: {
    ...mapActions(["setStateChannel"]),
    nextStep(value) {
      this.openChannel();
    },
    async openChannel() {
      // TODO: createChannel 创建channel
      // getChannelDeposit 获取存款
      // getChannelDetail 获取channel
      // topUpChannel 增加channel的deposit
      // closeChannel 关闭Channel
      const DBotAddr =
        "0x961f1c5e79c6ea36ddbc0b66dd60aaab00210bbd" ||
        this.$route.params.address;
      const res = await atn.createChannel(
        DBotAddr,
        this.depositValue,
        this.address
      );
      console.log("createChannel:", res);

      this.setStateChannel({ status: "syncing" });

      const deposit = await atn.getChannelDeposit(DBotAddr, this.address);
      console.log(deposit);

      this.setStateChannel({ status: "open", banlance: deposit });
    },
    async getDeposit() {},
    async closeChannel() {
      const DBotAddr =
        "0x961f1c5e79c6ea36ddbc0b66dd60aaab00210bbd" ||
        this.$route.params.address;
      const channelDetail = await atn.getChannelDetail(DBotAddr, this.address);
      console.log("channelDetail:", channelDetail);
      const closeResult = await atn.closeChannel(
        DBotAddr,
        channelDetail.balance,
        this.address
      );
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

          .circle1 {
            width: 9px;
            height: 9px;
            border-radius: 50%;
            background: rgba(149, 149, 149, 0.5);
          }
          .circle2 {
            width: 9px;
            height: 9px;
            border-radius: 50%;
            background: rgba(149, 149, 149, 0.6);
          }
          .circle3 {
            width: 9px;
            height: 9px;
            border-radius: 50%;
            background: rgba(149, 149, 149, 0.7);
          }
          .circle4 {
            width: 9px;
            height: 9px;
            border-radius: 50%;
            background: rgba(149, 149, 149, 0.8);
          }
          .circle5 {
            width: 9px;
            height: 9px;
            border-radius: 50%;
            background: rgba(149, 149, 149, 0.9);
          }
          .circle6 {
            width: 9px;
            height: 9px;
            border-radius: 50%;
            background: #959595;
          }
        }
        .syncing {
          font-size: 48px;
          color: #959595;
          letter-spacing: 0;
          text-align: center;
        }
        //--------------------------back
        .description {
          font-size: 18px;
          color: #11124c;
          text-align: center;
          margin-bottom: 30px;
        }
        .top-up {
          width: 340px;
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
}
</style>
