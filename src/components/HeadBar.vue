<template>
  <header>
    <p>ATN</p>
    <template v-if="!account">
      <Button size="large" @click="() => setModalShow(true)">
        Login
        <Icon type="log-in"></Icon>
      </Button>
    </template>
    <template v-else>
      <Dropdown placement="bottom-end" v-on:on-click="menuClick">
        <a class="ant-dropdown-link" href="#">
          <span style="color: #fff;">Account</span>
          <icon type="chevron-down" style="color: #fff; margin-left: .5rem" />
        </a>
        <DropdownMenu slot="list">
          <DropdownItem :name="1">
            <span>{{ account }}</span>
          </DropdownItem>
          <DropdownItem :name="2">
            <span>TX VERIFICATION: OFF</span>
          </DropdownItem>
          <DropdownItem :name="3">
            <span>CHANGE WALLET</span>
          </DropdownItem>
          <DropdownItem :name="4">
            <span>NEW WALLET</span>
          </DropdownItem>
          <DropdownItem :name="5">
            <span>SIGN OUT</span>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </template>
    
    <Modal
      title="Login methods"
      wrapClassName="vertical-center-modal"
      type="info"
      v-model="loginModalShow"
      @cancel="() => setModalShow(false)"
    >
      <Button 
        size="large"
        :loading="loading"
        type="primary" 
        @click="login"
      >{{ loading ? loginBtnLoadingText : loginBtnText }}</Button>
      <Button
        disabled
        style="margin-left: 1rem;"
        size="large"
      >Create new account</Button>
    </Modal>
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
    menuClick(key) {
      switch (key) {
        case 5:
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

      this.$Notice.success({
        title: "Your wallet has been unlocked successfully.",
        desc:
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
      this.$Notice.success({
        title: "Your account has been exited successfully.",
        desc:
          "Good job. Now you can experience the Loopr wallet. Be sure to let us know your feedback."
      });
    },
    metamaskChange({ selectedAddress }) {
      if (!this.account || selectedAddress === this.account) return;

      this.$Notice.warning(
        {
          title: "Account changed in MetaMask",
          desc:
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
