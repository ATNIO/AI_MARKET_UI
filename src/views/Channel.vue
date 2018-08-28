<template>
  <section> 
    <!-- 通道未开通 -->
    <template v-if="data.chanel=='0'">
      <div class="inaccessible">
        <div class="wrapper">
            <p class="title">No channel was found registered for you on this Dbot</p>
            <div class="means">
              <p class="method">In order to call API...</p>
              <p class="step-one"><Icon type="ios-add-circle" color="#87C5FE" size="20"/> deposit some ATN to open a channel with this Dbot</p>
              <p class="step-two"><Icon type="ios-create" color="#87C5FE" size="20"/> For each transfer , sign a message confirming the balance with the new transferred amount.</p>
              <Input search enter-button="Deposit" placeholder=" 0 ATN" size="large" class="search" v-on:on-search="nextStep" />
            </div>
        </div>
      </div>
    </template>

    <!-- 通道loading -->
    <template v-if="data.chanel=='1'">
      <div class="accessible">
        <div class="wrapper">       
            <div class="yourself">
              <i>头像</i>
              <span>your address</span>
            </div>

            <div class="center">
              <div class="bg"></div>
              <div class="content">               
                  <span class="wait">
                    <div class="circle1"></div>
                    <div class="circle2"></div>
                    <div class="circle3"></div>
                    <div class="circle4"></div>
                    <div class="circle5"></div>
                    <div class="circle6"></div>
                  </span>
                  <p class="syncing">syncing</p>
                <P class="description">A channel was found for this address.</P>
                <Input search enter-button="TOP UP" placeholder=" 0 ATN" size="large" class="top-up" v-on:on-search="nextStep" />
              </div>
            </div>              
            
            <div class="dbot">
              <i>头像</i>
              <span>address</span>
            </div>
        </div>
      </div>
    </template>
    <!-- 通道open -->
     <template v-if="data.chanel=='2'">
      <div class="accessible">
        <div class="wrapper">          
            <div class="yourself">
              <i>头像</i>
              <span>your address</span>
            </div>

            <div class="center">
              <div class="bg"></div>
              <div class="content">
                  <p class="title">Remaining  Balance </p>
                  <p class="balance">{{balance}} ATN</p>
                <P class="description">A channel was found for this address.</P>
                <Input search enter-button="TOP UP" placeholder=" 0 ATN" size="large" class="top-up" v-on:on-search="nextStep" />
              </div>
            </div>
                         
            <div class="dbot">
              <i>头像</i>
              <span>address</span>
            </div>
        </div>
      </div>
    </template>
    <!-- 通道返回结果 -->
    <template v-if="data.chanel>='3'">
      <div class="accessible">
        <div class="wrapper">
          
            <div class="yourself">
              <i>头像</i>
              <span>your address</span>
            </div>

            <div class="center">
              <div class="bg"></div>
              <div class="content">
                  <p class="title">Remaining  Balance </p>
                  <p class="balance">{{balance-2}} ATN</p>
                <P class="description">A channel was found for this address.</P>
                <Input search enter-button="TOP UP" placeholder=" 0 ATN" size="large" class="top-up" v-on:on-search="nextStep" />
              </div>
            </div>
                          
            <div class="dbot">
              <i>头像</i>
              <span>address</span>
            </div>
        </div>
      </div>
    </template>
    

     
  </section>
  
</template>

<script>
import data from "../mock/listData.js";

export default {
  name: "Channel",
  data() {
    return {
      balance: 80,
      data: data[0],
      status: 0
    };
  },
  methods: {
    nextStep(value) {
      console.log(value);
      // console.log(data[0].chanel);
      data[0].chanel++;
    },
    openChannel() {
      // TODO: createChannel 创建channel
      // getChannelDeposit 获取存款
      // getChannelDetail 获取channel
      // topUpChannel 增加channel的deposit
      // closeChannel 关闭Channel
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

    .yourself {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .dbot {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
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
