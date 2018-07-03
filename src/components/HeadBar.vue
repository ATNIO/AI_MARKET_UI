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
        <a-menu slot="overlay">
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
      style="top: 20px;"
      :visible="loginModalShow"
      @ok="() => setModalShow(false)"
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
  methods: {
    setModalShow(isShow) {
      this.loginModalShow = isShow;
    },
    async login() {
      const { getCoinbase } = this.$web3.eth;
      let coinbase = null;

      this.loading = true;

      coinbase = await getCoinbase();

      this.$store.dispatch("setAccount", coinbase);
      this.loading = false;
      this.setModalShow(false);
    }
  }
};
</script>

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
