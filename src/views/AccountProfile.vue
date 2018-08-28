<template>
<div class="Profile">
  <span class="title">Profile</span>

  <div class="deposit">
    <span class="deposit-title">ACCOUNT：DEPOSIT </span><Icon type="ios-download-outline" size="34" color="#11124C" class="title-icon"/>
    <div class="content">
      <div class="left">
        <p>USE SHAPEAHIFT</p>
        <p>USE AIRSWAP（NO FEES</p>
      </div>
      <div class="right">
        <p>PUBLIC ACCOUNT ADDRESS</p>
        <p>{{data.publicAddress}}</p>
      </div>
      <img src="../assets/二维码.png" alt="QR code" class="QRcode">
    </div>        
  </div>

  <div class="withdraw">
    <span class="withdraw-title">ACCOUNT：WITHDRAW  </span><Icon type="ios-repeat" size="34" color="#11124C" class="repeat-icon"/>
    <div class="content">
      <div class="left">
        <span class="description">WIthdraw Ethereum or Reputation form your Trading Account into another account.</span>
        <span class="use">USE SHAPEAHIFT</span>
      </div>
      <div class="right">
        <div class="wrapper">
          <div class="needright">
            <div class="topic">SELECT CURRENCY</div>
            <Select v-model="model1" disabled  style="width:260px">
              <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </div>
          <div>
            <div class="topic">QUANTITY</div>
            <Select v-model="model2" disabled  style="width:260px">
              <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </div>
        </div>
        
        <div class="topic lasttopic">RECIPIENT ACCOUNT ADDRESS</div>
        <Select v-model="model3" disabled  style="width:544px">
          <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>


        <button class="withdraw-button">WITHDRAW</button>
      </div>

    </div>
  </div>
  
</div>
 
</template>

<script>
import data from "../mock/listData.js";

export default {
  name: "AccountProfile",
  data() {
    return {
      data: data[0],
      cityList: [
        {
          value: "New York",
          label: "New York"
        },
        {
          value: "London",
          label: "London"
        },
        {
          value: "Sydney",
          label: "Sydney"
        },
        {
          value: "Ottawa",
          label: "Ottawa"
        },
        {
          value: "Paris",
          label: "Paris"
        },
        {
          value: "Canberra",
          label: "Canberra"
        }
      ],
      model1: "",
      model2: "",
      model3: ""
    };
  }
};
</script>


<style lang="less" scoped>
.Profile {
  margin-left: 20px;
  margin-top: 42px;
  position: relative;

  .title {
    font-size: 24px;
    color: #11124c;
  }
  .deposit {
    margin-top: 42px;
    width: 890px;
    height: 240px;
    background: #ffffff;
    box-shadow: 3px 0 10px 0 rgba(200, 199, 232, 0.5);
    border-radius: 4px;
    padding-top: 28px;
    padding-left: 45px;

    .deposit-title {
      font-size: 18px;
      color: #11124c;
    }
    .title-icon {
      margin-top: -15px;
    }
    .content {
      position: relative;
      margin-top: 38px;
      display: flex;
      flex-direction: row;
      .left {
        font-size: 14px;
        color: #11124c;
        line-height: 20px;
        width: 218px;
        height: 100px;
        border-right: 1px solid #dfdfdf;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      .right {
        width: 335px;
        height: 100px;
        font-size: 12px;
        color: #11124c;
        line-height: 18px;
        border-right: 1px solid #dfdfdf;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 45px;
      }
      .QRcode {
        position: absolute;
        top: -60px;
        right: 40px;
      }
    }
  }
  .withdraw {
    margin-top: 15px;
    width: 890px;
    height: 350px;
    background: #ffffff;
    box-shadow: 3px 0 10px 0 rgba(200, 199, 232, 0.5);
    border-radius: 4px;
    padding-top: 40px;
    padding-left: 45px;
    position: relative;

    .withdraw-title {
      font-size: 18px;
      color: #11124c;
    }
    .repeat-icon {
      margin-top: -10px;
    }
    .content {
      margin-top: 38px;
    }

    .left {
      display: flex;
      flex-direction: column;
      width: 210px;
      height: 130px;
      border-right: 1px solid #dfdfdf;

      .description {
        width: 189px;
        height: 50px;
        display: inline-block;
        margin-bottom: 38px;
      }
      .use {
        font-size: 14px;
        color: #11124c;
        line-height: 20px;
      }
    }
    .right {
      position: absolute;
      width: 626px;
      height: 153px;
      right: -28px;
      top: 106px;

      .topic {
        margin-bottom: 10px;
      }
      .lasttopic {
        margin-top: 15px;
      }

      .wrapper {
        display: flex;
        flex-direction: row;

        .needright {
          margin-right: 22px;
        }
      }

      .withdraw-button {
        width: 140px;
        height: 40px;
        background: #797bf8;
        border-radius: 4px;
        font-size: 18px;
        color: #ffffff;
        text-align: center;
        margin-top: 20px;
        margin-left: 405px;
      }
    }
  }
}
</style>
