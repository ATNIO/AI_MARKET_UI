<template>
    <div class="Profile">
        <span class="title">Profile</span>
        <div class="content">
            <div class="deposit">
                <span class="deposit-title">ACCOUNT：DEPOSIT </span>
                <Icon type="ios-download-outline" size="34" color="#11124C" class="title-icon"/>


                <div class="address">
                    <p class="address-name">ACCOUNT ADDRESS:</p>
                    <p class="address-value">{{address}}</p>
                </div>
                <img src="../assets/二维码.png" alt="QR code" class="QRcode">

            </div>

            <div class="withdraw">
                <span class="withdraw-title">ACCOUNT：WITHDRAW  </span>
                <Icon type="ios-repeat" size="34" color="#11124C" class="repeat-icon"/>
                <div class="topic lasttopic">Recipient Address:</div>
                <Input v-model="toAddress" size="large" placeholder="Recipient Address" class="address-input"/>

                <div class="topic">Amount</div>
                <Input v-model="toAmount" size="large" placeholder="Amount" class="quantity-input"/>


                <div class="topic lasttopic">Transaction Data (optional):</div>
                <Input v-model="toData" size="large" placeholder="Transaction Data" class="data-input"/>
                <button class="withdraw-button" v-on:click="sendTransaction1">Send</button>


            </div>
        </div>


    </div>

</template>

<script>
import BN from "bignumber.js";
import { mapGetters } from "vuex";

export default {
  name: "AccountProfile",
  data() {
    return {
      toAddress: "",
      toAmount: "",
      toData: ""
    };
  },
  computed: {
    ...mapGetters(["address"])
  },
  methods: {
    sendTransaction1() {
      const fromAddr = this.address;
      const toAddr = this.toAddress;
      const toAmount = this.atnToWei(this.toAmount);
      const toData = this.toData;
      this.$atn.web3.eth.sendTransaction(
        {
          from: fromAddr,
          to: toAddr,
          value: toAmount,
          data: toData
        },
        function(err, result) {
          this.$Notice.error({
            title: "Send SUCC!",
            desc:
              "FROM[" +
              fromAddr +
              "],TO[" +
              toAddr +
              "],VALUE[" +
              toAmount +
              "],DATA[" +
              toData +
              "]"
          });
          /*
                    if(!result)
                        this.$Notice.error({
                            title: "Send SUCC!",
                            desc: "FROM["+fromAddr+"],TO["+toAddr+"],VALUE["+toAmount+"],DATA["+toData+"]"
                        });
                    else
                        this.$Notice.error({
                            title: "Send FAIL!",
                            desc: "ERROR["+error+"]"
                        });
                        */
        }
      );
    },
    atnToWei(price) {
      const a = new BN(price, 10);
      const b = new BN(10, 10);
      const c = new BN(18, 10);

      return a.multipliedBy(b.pow(c)).toString(10);
    }
  }
};
</script>


<style lang="less" scoped>
.Profile {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  margin-left: 20px;
  margin-top: 42px;
  position: relative;
  .title {
    font-size: 24px;
    color: #11124c;
  }
  .content {
    margin-top: 42px;
    width: 890px;
    height: 600px;
    background: #ffffff;
    box-shadow: 3px 0 10px 0 rgba(200, 199, 232, 0.5);
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .deposit {
    width: 770px;
    border-bottom: 1px solid #dfdfdf;
    margin-top: 40px;
    position: relative;

    .deposit-title {
      font-size: 18px;
      color: #11124c;
      font-weight: 600;
    }

    .address {
      margin-top: 34px;
      margin-bottom: 40px;

      .address-name {
        font-size: 12px;
        color: #464c5b;
        line-height: 24px;
        margin-bottom: 8px;
      }
      .address-value {
        font-size: 16px;
        color: #11124c;
        line-height: 24px;
      }
    }
    .QRcode {
      width: 120px;
      height: 120px;
      position: absolute;
      top: 0;
      right: 0px;
    }
  }
  .withdraw {
    width: 770px;
    margin-top: 44px;
    margin-bottom: 54px;

    .withdraw-title {
      font-size: 18px;
      color: #11124c;
      font-weight: 600;
    }
    .repeat-icon {
      margin-top: -10px;
    }
    .topic {
      margin-bottom: 10px;
      margin-top: 30px;
    }
    .lasttopic {
      margin-top: 15px;
    }
    .address-input {
      width: 542px;
      height: 40px;
    }
    .quantity-input {
      width: 260px;
      height: 40px;
    }
    .data-input {
      width: 542px;
      height: 40px;
    }
    & /deep/ .ivu-input {
      background-color: #f7f6fe;
      border: 1px solid #f7f6fe;
    }
    .withdraw-button {
      margin-left: 86px;
      width: 140px;
      height: 40px;
      background: #797bf8;
      border-radius: 4px;
      font-size: 18px;
      color: #ffffff;
    }
  }
}
</style>
