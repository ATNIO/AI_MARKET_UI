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
      <div v-if="loginShow">
        <Button @click="modal1 = true">login</Button>
      </div>
      <div class="prefsession" v-else>
        <Icon type="ios-alert-outline" size="24" color="#ffffff" class="icon"/>
        <Icon type="ios-notifications-outline" size="24" color="#ffffff" class="icon"/>
        <Dropdown placement="bottom-end" v-on:on-click="_click">
          <div class="avatar-wrapper">
            <avatar :text="address"></avatar>
            <Icon type="ios-arrow-down" color="#fff"></Icon>
          </div>
          <DropdownMenu slot="list">
            <DropdownItem name="personal">
              <router-link to="/my-account/AccountProfile" class="personal">
                个人中心
              </router-link>
            </DropdownItem>
            <DropdownItem name="logout">logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>

    <Modal 
      v-model="modal1" 
      :footer-hide="true" 
      width="890px"
      :closable="false"
      :styles="{top: '160px'}"
      class="login-modal"
    >

        <!-- login的卡片在这里添加 -->
        <Card class="metamask">
          <div class="fox-img"></div>
          <!-- <img src="../assets/metamask-logo.c51e1a45.svg" alt="" class="fox-img"> -->
          <div class="word">
            <span class="login">Connect to the </span>
            <span class="wallet">MetaMask browser wallet.</span>
          </div>
          <button class="metamask-button" @click="login('metamask')">Connect to MetaMask.</button>
        </Card>

        <!-- <Card class="ledger">
          <div class="ledger-left">
            <img src="../assets/ledger.png" alt="">
            <div>
              <span class="login">Connect and sign with your </span>
              <span class="wallet">Ledger hardware wallet. </span>
            </div>
          </div>
          <button class="ledger-button">Connect to Ledger</button>
        </Card>

        <Card class="trezor">
          <div class="trezor-left">
            <img src="../assets/trezor.png" alt="">
            <div>
              <span class="login">Connect and sign with your </span>
              <span class="wallet">Trezor hardware wallet.</span>
            </div>
          </div>
          <button class="trezor-button">Connect to Trezor</button>
        </Card>

        <Card class="walletconnect">
          <div class="walletconnect-left">
            <img src="../assets/walletconnect.png" alt="">
            <div>
              <span class="login">Scan a QR code to link your mobile wallet </span>
              <span class="wallet">using WalletConnect.</span>
            </div>
          </div>
          <button class="walletconnect-button">Use WalletConnect</button>
        </Card> -->
    </Modal>
  </div>
 </div>  
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import Atn from "atn-js";
import Cookies from "js-cookie";

const atn = new Atn(window.web3);

export default {
  name: "TopBar",
  data() {
    return {
      modal1: false,
      loginShow: true,
      isLogin: false
    };
  },
  computed: {
    ...mapGetters(["address"])
  },
  mounted() {
    this.$web3.currentProvider.publicConfigStore.on(
      "update",
      ({ selectedAddress, networkVersion }) =>
        this.accountChange(selectedAddress, networkVersion)
    );
  },
  methods: {
    ...mapActions(["setAddress"]),
    notice({ type, title, desc }) {
      this.$Notice[type]({
        title: title ? title : "",
        desc: desc ? desc : ""
      });
    },
    accountChange(address, network) {
      if (this.isLogin) {
        if (address.toLowerCase() !== this.address.toLowerCase()) {
          this.$Modal.warning({
            title: "Detect account has changed",
            content:
              "检测到您的账号发生更改，请通过钱包签名以便使用新的账号重新登录",
            okText: "confirm",
            onOk: () => {
              this.setAddress(address);
              this.goLogin(address);
            }
          });
        } else {
          // TODO: network change
        }
      }
    },
    _click(name) {
      switch (name) {
        case "logout":
          this.logout();
          break;
        default:
          break;
      }
    },
    login(type) {
      switch (type) {
        case "metamask":
          this.loginByMetamask();
          break;
        default:
          break;
      }
    },
    async getAccounts() {
      const eth = this.$web3.eth;
      const accounts = await eth.getAccounts();

      this.setAddress(accounts[0]);

      return accounts[0];
    },
    async goLogin(account) {
      const { login } = this.$api.user;

      if (!account) {
        return this.notice({
          type: "warning",
          title: "Attempt to login AI Market by MetaMask",
          desc:
            "我们检测到您已安装MetaMask浏览器插件并尝试用MetaMask登录 AI Market，请先在您的MetaMask浏览器插件创建账户或解锁后再尝试用MetaMask解锁"
        });
      }

      const params = await atn.getRegisterLoginParams(account);
      const sig = await atn.getLoginSign(account);
      const response = await login(params, sig);
      const { data, status } = response;

      if (status === 200) {
        this.modal1 = false;
        this.loginShow = false;
        this.isLogin = true;
      }
    },
    async loginByMetamask() {
      const { login } = this.$api.user;
      const account = await this.getAccounts();

      this.goLogin(account);
    },
    async logout() {
      const { logout } = this.$api.user;
      const response = await logout({ usraddr: this.address });
      const { status, data } = response;

      if (status === 200) {
        this.loginShow = true;
        this.isLogin = false;
        this.setAddress();
        Cookies.remove("token", { path: "/" });
        Cookies.remove("token.sig", { path: "/" });
      }
    }
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
      .prefsession {
        display: flex;
        align-items: center;
      }

      .icon {
        margin-right: 40px;
      }
      .via {
        margin-left: 7px;
      }

      .personal {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
      }

      .avatar-wrapper {
        display: flex;
        align-items: center;

        & /deep/ .ivu-icon-ios-arrow-down {
          margin-left: 10px;
        }
      }

      .avatar {
        width: 36px;
        height: 36px;
        border-radius: 100%;
        overflow: hidden;
      }
    }
  }
}

.login-modal {
  & /deep/ .ivu-modal-content {
    background-color: transparent;
    box-shadow: none;
  }

  & /deep/ .ivu-modal-body {
    padding: 0;
  }
  & /deep/ .ivu-card-body {
    padding: 0;
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
      background: url("../assets/metamask.svg");
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
}
</style>
