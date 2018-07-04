<template>
  <header>
    <p>ATN</p>
    <template v-if="!account">
      <a-button size="large" @click="() => setModalShow(true)">Login</a-button>
    </template>
    <template v-else>
      <a-dropdown>
        <a class="ant-dropdown-link" href="#">
          <span style="color: #fff;">Account</span>
          <a-icon type="down" style="color: #fff;" />
        </a>
        <a-menu slot="overlay" @click="menuClick">
          <a-menu-item key="1">
            <span>{{ account }}</span>
          </a-menu-item>
          <a-menu-item key="2">
            <span>TX VERIFICATION: OFF</span>
          </a-menu-item>
          <a-menu-item key="3">
            <span>CHANGE WALLET</span>
          </a-menu-item>
          <a-menu-item key="4">
            <span>NEW WALLET</span>
          </a-menu-item>
          <a-menu-item key="5">
            <span>SIGN OUT</span>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </template>
    
    <a-modal
      title="Login methods"
      wrapClassName="vertical-center-modal"
      type="info"
      :footer="null"
      :visible="loginModalShow"
      @cancel="() => setModalShow(false)"
    >
      <a-button 
        size="large"
        :loading="loading"
        type="primary" 
        @click="login"
      >{{ loading ? loginBtnLoadingText : loginBtnText }}</a-button>
      <a-button
        disabled
        style="margin-left: 1rem;"
        size="large"
      >Create new account</a-button>
    </a-modal>
  </header>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "headBar",
  data() {
    return {
      loginModalShow: false,
      loading: false,
      loginBtnText: "Login by metamask",
      loginBtnLoadingText: "Logging"
    };
  },
  computed: {
    ...mapGetters(["account"])
  },
  mounted() {
    this.$web3.currentProvider.publicConfigStore.on(
      "update",
      this.metamaskChange
    );
  },
  methods: {
    setModalShow(isShow) {
      this.loginModalShow = isShow;
    },
    menuClick({ key }) {
      switch (key) {
        case "5":
          this.signout();
          break;
        default:
          break;
      }
    },
    async login() {
      const { getCoinbase } = this.$web3.eth;
      let coinbase = null;

      this.loading = true;

      coinbase = await getCoinbase();

      this.$notification.success({
        message: "Your wallet has been unlocked successfully.",
        description:
          "Good job. Now you can experience the Loopr wallet. Be sure to let us know your feedback."
      });
      this.$store.dispatch("setAccount", coinbase);
      this.loading = false;
      this.setModalShow(false);
    },
    signout() {
      this.$store.dispatch("setAccount");
      this.$router.replace({
        name: "home"
      });
    },
    metamaskChange({ selectedAddress }) {
      if (!this.account || selectedAddress === this.account) return;

      this.$notification.warning(
        {
          message: "Account changed in MetaMask",
          description:
            "we detected your address in MetaMask has just changed. The old one is closed and the new one will be used instead."
        },
        5
      );
      this.$store.dispatch("setAccount", selectedAddress);
    }
  }
};
</script>

<style>
/* use css to set position of modal */
.vertical-center-modal {
  text-align: center;
  white-space: nowrap;
}

.vertical-center-modal:before {
  content: "";
  display: inline-block;
  height: 100%;
  vertical-align: middle;
  width: 0;
}

.vertical-center-modal .ant-modal {
  display: inline-block;
  vertical-align: middle;
  top: 0;
  text-align: left;
}
</style>


<style lang="less" scoped>
header {
  height: 150px;
  padding: 0 2rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  background: url("../assets/header_bg.png") #498fe1 repeat;

  p {
    margin: 0;
    font-size: 48px;
    color: #ffffff;
  }

  button {
    width: 120px;
  }
}
</style>
