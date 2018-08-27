<template>
 <div class="top-bar">
  <div class="wrapper">
    <router-link to="/">
      <div class="i-title">
        <img src="../assets/logo.png" alt="" class="image">
        <span class="title">AI Market</span>
      </div>
    </router-link>
    

    <Input prefix="ios-search" placeholder="Search APIs" class="search" />

    <div class="personal-center">
      <Icon type="ios-alert-outline" size="24" color="#ffffff" class="icon"/>
      <Icon type="ios-notifications-outline" size="24" color="#ffffff" class="icon"/>
      <router-link to="/my-account"><img src="" alt="">头像</router-link><Icon type="ios-arrow-down" color="#ffffff" class="via"/>
      <Button @click="modal1 = true">login</Button>
    </div>

    <Modal 
      v-model="modal1" 
      :footer-hide="true" 
      width="890px"
      class-name="vertical-center-modal">

      <!-- login的卡片在这里添加 -->
       <Card class="metamask">
         <div class="fox-img"></div>
        <!-- <img src="../assets/metamask-logo.c51e1a45.svg" alt="" class="fox-img"> -->
        <div class="word">
          <span class="login">Connect to the </span>
          <span class="wallet">MetaMask browser wallet.</span>
        </div>
        <button class="metamask-button">Connect to MetaMask.</button>
      </Card>

      <Card class="ledger">
        <div class="ledger-left">
          <img src="../assets/ledger-logo.15c0fba6 copy.png" alt="">
          <div>
            <span class="login">Connect and sign with your </span>
            <span class="wallet">Ledger hardware wallet. </span>
          </div>
        </div>
        <button class="ledger-button">Connect to Ledger</button>
      </Card>

      <Card class="trezor">
        <div class="trezor-left">
          <img src="../assets/trezor-logo.05bf1698 copy.png" alt="">
          <div>
            <span class="login">Connect and sign with your </span>
            <span class="wallet">Trezor hardware wallet.</span>
          </div>
        </div>
        <button class="trezor-button">Connect to Trezor</button>
      </Card>

      <Card class="walletconnect">
        <div class="walletconnect-left">
          <img src="../assets/walletconnect-logo-and-type.044b39a9 copy.png" alt="">
          <div>
            <span class="login">Scan a QR code to link your mobile wallet </span>
            <span class="wallet">using WalletConnect.</span>
          </div>
        </div>
        <button class="walletconnect-button">Use WalletConnect</button>
      </Card>
    </Modal>
  </div>
 </div>  
</template>
<script>
export default {
  name: "TopBar",
  data() {
    return {
      modal1: false
    };
  }
};
</script>
<style lang="less" scoped>
.top-bar {
  width: 100%;
  height: 60px;
  background: linear-gradient(to right, #787af8, #88c6ff);

  .wrapper {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .i-title {
      display: flex;
      align-items: center;

      .image {
        margin-right: 12px;
      }
      .title {
        font-size: 20px;
        color: #ffffff;
      }
    }

    .search {
      width: 590px;
      height: 30px;
    }
    .personal-center {
      .icon {
        margin-right: 40px;
      }
      .via {
        margin-left: 7px;
      }
    }
  }
}
</style>

<style lang="less">
.vertical-center-modal {
  margin-top: 160px;
}
.ivu-modal-content {
  height: 525px;
  background-color: transparent;
}
.ivu-modal-close {
  display: none;
}
.ivu-modal-body {
  padding: 0;
}
.ivu-card-body {
  padding: 0;
}
.ive-card-body {
  height: 120px;
}

.login {
  font-size: 16px;
  color: #000000;
}
.wallet {
  font-size: 16px;
  color: #797bf8;
  line-height: 24px;
}
.metamask {
  height: 120px;
  margin-bottom: 15px;

  .fox-img {
    width: 203px;
    height: 120px;
    border-radius: 4px;
    background: url("../assets/metamask-logo.c51e1a45.svg");
    float: left;
    margin-top: -1px;
    margin-left: -1px;
  }
  .word {
    padding-top: 50px;
    padding-left: 236px;
  }
  .metamask-button {
    float: right;
    width: 210px;
    height: 50px;
    margin-top: -40px;
    margin-right: 26px;
    background: #797bf8;
    box-shadow: 3px 0 10px 0 rgba(200, 199, 232, 0.5);
    border-radius: 4px;
    font-size: 16px;
    color: #ffffff;
  }
}
.ledger {
  height: 120px;
  margin-bottom: 15px;
  .ledger-left {
    margin-top: 27px;
    margin-left: 30px;
  }

  .ledger-button {
    float: right;
    width: 210px;
    height: 50px;
    margin-top: -62px;
    margin-right: 26px;
    background: #797bf8;
    box-shadow: 3px 0 10px 0 rgba(200, 199, 232, 0.5);
    border-radius: 4px;
    font-size: 16px;
    color: #ffffff;
  }
}
.trezor {
  height: 120px;
  margin-bottom: 15px;

  .trezor-left {
    margin-top: 24px;
    margin-left: 30px;
  }
  .trezor-button {
    float: right;
    width: 210px;
    height: 50px;
    margin-top: -65px;
    margin-right: 26px;
    background: #797bf8;
    box-shadow: 3px 0 10px 0 rgba(200, 199, 232, 0.5);
    border-radius: 4px;
    font-size: 16px;
    color: #ffffff;
  }
}
.walletconnect {
  height: 120px;

  .walletconnect-left {
    margin-top: 30px;
    margin-left: 30px;
  }
  .walletconnect-button {
    float: right;
    width: 210px;
    height: 50px;
    margin-top: -58px;
    margin-right: 26px;
    background: #797bf8;
    box-shadow: 3px 0 10px 0 rgba(200, 199, 232, 0.5);
    border-radius: 4px;
    font-size: 16px;
    color: #ffffff;
  }
}
</style>
