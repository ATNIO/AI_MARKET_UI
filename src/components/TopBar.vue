<template>
    <div class="top-bar">
        <div class="wrapper">
            <router-link to="/">
                <div class="i-title">
                    <img src="../assets/logo.png" alt="" class="image">
                    <span class="title">AI Market</span>
                </div>
            </router-link>

            <div id="fade" class="black_overlay" v-if="searchShow || searchEmpty" @click="clearSearch"></div>
            <div class="search">
                <Input prefix="ios-search" placeholder="Search APIs" v-model=search1 class="searchinput"
                       v-on:on-keyup="searchEvent"/>

                <div class="search-empty" v-if="searchEmpty">Sorry, the result is empty.</div>
                <div class="search-select" v-if="searchShow">
                    <!--
                    <div class="search-top">
                        <span class="search-dbots">Dbots</span>
                        <a href="#" class="search-more" @click="more();">More</a>
                    </div>
                    <hr class="search-hr"></hr>
                    -->
                    <transition-group name="itemfade" tag="ul" mode="out-in" v-cloak>
                        <li v-for="(value,index) in searchResult" :class="{selectback:index==now}"
                            class="search-select-option" @mouseover="selectHover(index)" @click="selectClick(value)"
                            :key="value">
                            <div class="logo-tag">
                                <div class="item-image-padding">
                                    <img class="item-image" :src="value.logo" alt="">
                                </div>
                                <div class="item-right">
                                    <div class="item-title-style" v-html="value.title"></div>
                                    <div class="item-ignore-style" v-html="value.dbot_address"></div>
                                    <div class="item-ignore-style" v-html="value.content"></div>
                                    <div class="item-ignore-style" v-html="value.tags"></div>
                                </div>
                            </div>
                        </li>
                    </transition-group>
                </div>
            </div>

            <div class="personal-center">
                <div v-show="loginShow">
                    <Button @click="modal1 = true">login</Button>
                </div>
                <div class="prefsession" v-show="!loginShow">
                    <Icon custom="icon-channel" size="24" color="#ffffff" class="icon"/>
                    <Dropdown placement="bottom-end" v-on:on-click="_click">
                        <div class="avatar-wrapper">
                            <avatar :text="address.toLowerCase()"></avatar>
                            <Icon custom="icon-allow" color="#fff"></Icon>
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
                        <span class="wallet">ATN browser wallet.</span>
                    </div>
                    <button class="metamask-button" @click="login('metamask')">Connect to ATN Wallet.</button>
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

const atn = new Atn(window.atn3);

export default {
  name: "TopBar",
  data() {
    return {
      modal1: false,
      loginShow: true,
      searchShow: false,
      isLogin: false,
      search1: "",
      searchResult: [],
      now: -1,
      lastMouse: -1,
      searchFrom: 0,
      searchSize: 10,
      searchingFlag: false,
      searchEmpty: false
    };
  },
  computed: {
    ...mapGetters(["address"])
  },
  mounted() {
    this.check();

    this.$atn.web3.currentProvider.publicConfigStore.on(
      "update",
      ({ selectedAddress, networkVersion }) => {
        this.selectedAddress = selectedAddress;
        this.accountChange();
      }
    );
  },
  methods: {
    ...mapActions(["setAddress"]),
    async check() {
      const { check } = this.$api.user;
      const account = this.address;
      if (account.replace(/(^\s*)|(\s*$)/g, "").length != 0) {
        const response = await check(account);
        const { status, data } = response;
        if (status === 200) {
          this.loginShow = false;
          this.isLogin = data.err;
          return true;
        }
      } else {
        this.setAddress();
        return false;
      }
    },
    notice({ type, title, desc }) {
      this.$Notice[type]({
        title: title ? title : "",
        desc: desc ? desc : ""
      });
    },
    accountChange() {
      if (this.isLogin) {
        if (this.selectedAddress.toLowerCase() !== this.address.toLowerCase()) {
          if (!this.noticeLock) {
            this.noticeLock = true;
            this.$Modal.warning({
              title: "Detect account has changed",
              content:
                "检测到您的账号发生更改，请通过钱包签名以便使用新的账号重新登录",
              okText: "confirm",
              onOk: () => {
                this.goLogin(this.selectedAddress);
              }
            });
          }
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
      const eth = this.$atn.web3.eth;
      const accounts = await eth.getAccounts();
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

      const params = await atn.getRegisterLoginParams(account.toLowerCase());
      const sig = await atn.getLoginSign(account.toLowerCase());
      const response = await login(params, sig);
      const { data, status } = response;

      if (status === 200) {
        this.modal1 = false;
        this.loginShow = false;
        this.isLogin = true;
        this.setAddress(account);
      }
      this.noticeLock = false;
    },
    async loginByMetamask() {
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
    },
    async searchEvent(event) {
      if (this.searchingFlag) {
        return;
      }
      const keyDownArray = 40;
      const keyUpArray = 38;
      const keyEnter = 13;
      if (this.now >= this.searchResult.length) {
        this.now = this.searchResult.length - 1;
      }
      if (event.keyCode == keyDownArray) {
        this.now++;
        if (this.searchResult.length == this.now) {
          this.now = 0;
        }
        return;
      }
      if (event.keyCode == keyUpArray) {
        this.now--;
        if (this.now == -1) {
          this.now = this.searchResult.length - 1;
        }
        return;
      }
      if (event.keyCode == keyEnter) {
        if (this.now >= 0 && this.now < this.searchResult.length) {
          this.selectClick(this.searchResult[this.now]);
          return;
        }
      }
      this.searchFrom = 0;
      this.searchingFlag = true;
      setTimeout(async () => {
        await this.search();
      }, 500);
    },
    async search() {
      const { search } = this.$api.home;
      const body = {
        from: this.searchFrom,
        size: this.searchSize,
        word: this.search1
      };
      const response = await search(body);
      const { status, data } = response;
      var result = [];
      for (var i = 0; i < data.length; i++) {
        var title = data[i].title;
        if (title.constructor == Array) {
          title = title[0];
        }
        var dbot_address = data[i].dbot_addr;
        if (dbot_address.constructor == Array) {
          dbot_address = dbot_address[0];
        }
        var des = data[i].description + data[i].specification;
        var index = des.indexOf("font", 0);
        if (index >= 10) {
          des = "..." + des.substring(index - 20, des.length);
        }
        var tagstr = "";
        var tags = data[i].tags;
        for (var idx = 0; idx < tags.length; idx++) {
          tagstr +=
            '<span style="border:1px solid #d4d4d4; padding: 1px; margin: 5px;">' +
            tags[idx] +
            "</span>";
        }
        var it = {
          title: title,
          dbot_address: dbot_address,
          content: des,
          logo: data[i].logo,
          tags: tagstr
        };
        result.push(it);
      }
      if (result.length > 0 || this.searchFrom == 0) {
        if (
          result.length != this.searchResult.length ||
          JSON.stringify(result) != JSON.stringify(this.searchResult)
        ) {
          this.searchResult = result;
        }
      }

      this.searchEmpty = this.search1.length > 0 && result.length == 0;
      this.searchShow = this.searchResult.length > 0;
      this.searchingFlag = false;
    },
    async selectClick(value) {
      this.$router.push({
        name: "detail",
        params: { address: value.dbot_address }
      });
      this.clearSearch();
    },
    async clearSearch() {
      this.searchShow = false;
      this.searchEmpty = false;
      this.search1 = "";
    },
    selectHover(index) {
      if (index != this.lastMouse) {
        this.now = index;
        this.lastMouse = index;
      }
    },
    more() {
      if (this.searchResult.length < this.searchSize) {
        return;
      }
      this.searchFrom += this.searchSize;
      this.search();
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
      z-index: 9999;
      .search-empty {
        width: 590px;
        height: 45px;
        line-height: 45px;
        font-size: 18px;
        box-shadow: 3px 0 10px 0 rgba(200, 199, 232, 0.5);
        background-color: #fff;
        padding-bottom: 27px;
        border-radius: 4px;
        margin-top: 6px;
        padding-left: 30px;
      }
      .search-select {
        border-radius: 4px;
        margin-top: 6px;
        top: 45px;
        width: 590px;
        border: 1px solid #d4d4d4;
        background-color: #fff;
        padding-bottom: 27px;
        .search-top {
          height: 18px;
          background-color: #fff;
          margin-top: 30px;
          margin-bottom: 1px;
          margin-left: 30px;
          margin-right: 30px;
          padding: 0px;
          .search-dbots {
            float: left;
          }
          .search-more {
            float: right;
          }
        }
        .search-hr {
          margin-top: 2px;
          margin-bottom: 23px;
          padding: 0px;
          margin-left: 30px;
          margin-right: 30px;
          height: 0px;
        }
      }

      .search-select li {
        list-style-type: none;
        padding: 0;
        margin-top: 24px;
        margin-left: 30px;
        margin-right: 30px;
        border: 0px solid #d4d4d4;
        border-top: none;
        background-color: #fff;
        width: 407;
      }
      .search-select-option {
        box-sizing: border-box;
        height: 88px;
        padding: 7px 10px;
        .logo-tag {
          display: flex;
          flex-direction: row;
          .item-image-padding {
            width: 88px;
            height: 88px;
            display: flex;
            align-items: center;
            .item-image {
              width: 100%;
            }
          }
          .item-right {
            display: flex;
            flex-direction: column;
            margin-left: 16px;
            .item-title-style {
              width: 407px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .item-ignore-style {
              color: #b1b2bd;
              width: 407px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
      }
      .selectback {
        background-color: #eee !important;
        cursor: pointer;
      }
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
      }

      .avatar {
        width: 36px;
        height: 36px;
        border-radius: 100%;
        overflow: hidden;
        margin-right: 10px;
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
      width: 106px;
      height: 106px;
      margin-left: 34px;
      background: url("../assets/wallet-login.png");
      background-repeat: no-repeat;
      background-position: center center;
      float: left;
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
      cursor: pointer;
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

.black_overlay {
  display: block;
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  background-color: black;
  z-index: 9001;
  -moz-opacity: 0.8;
  opacity: 0.5;
  filter: alpha(opacity=80);
}
</style>
