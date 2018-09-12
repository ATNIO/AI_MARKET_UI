<template>
    <div class="myaccount">
        <div class="nav">
            <div class="avatar-wrapper">
                <avatar
                        :text="address.toLowerCase()"
                        :width="100"
                        :height="100"
                        :borderWidth="0"
                ></avatar>
            </div>

            <!-- <div class="balance">
              <span class="visible">
                <span class="number">
                  <span class="number-visible">{{ balanceRender }}</span>
                  <span class="unit"> ATN</span>
                </span>
                <Icon
                  :type="visibleType"
                  @click="visible = !visible"
                  size="28"
                  color="#B7B9CE"
                  class="icon"
                />
              </span>
            </div> -->

            <div class="balance-box">
                <span class="number">{{ balanceRender }}</span>
                <div class="right">
                    <span>ATN</span>
                    <Icon
                            :custom="visibleType"
                            @click="visible = !visible"
                            size="28"
                            color="#B7B9CE"
                            class="icon"
                    />
                </div>
            </div>


            <div class="list">
                <router-link
                  v-for="route in routeList"
                  :key="route.routeName" 
                  :to="{name: route.routeName}"
                >
                    <div 
                      class="profile" 
                      :class="{ active: currentRouteName === route.routeName }">
                        <Icon :custom="route.icon" size="32" class="list-icon"/>
                        <span class="trash">{{ route.label }}</span>
                    </div>
                </router-link>
            </div>
        </div>

        <router-view class="needabottom"></router-view>
    </div>

</template>

<script>
import { mapGetters } from "vuex";
import AccountProfile from "./AccountProfile";
import AccountChannelList from "./AccountChannelList";

const routeList = [
  {
    label: "Profile",
    routeName: "AccountProfile",
    icon: "icon-profile"
  },
  {
    label: "ChannelList",
    routeName: "AccountChannelList",
    icon: "icon-channel-list"
  }
];

export default {
  name: "my-account",
  data() {
    return {
      visible: true,
      balance: "0000.00",
      balanceHolder: "****",
      routeList,
      currentRouteName: "AccountProfile"
    };
  },
  components: {
    AccountProfile,
    AccountChannelList
  },
  computed: {
    ...mapGetters(["address"]),
    visibleType() {
      return this.visible ? "icon-eye" : "icon-no-eye";
    },
    balanceRender() {
      this.getBalance();
      return this.visible ? this.balance : this.balanceHolder;
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler(val) {
        this.currentRouteName = val.name;
      }
    }
  },
  methods: {
    async getBalance() {
      this.$atn.web3.eth.getBalance(this.address).then(balance => {
        this.balance = this.$atn.web3.utils.fromWei(balance);
      });
    }
  }
};
</script>

<style lang="less" scoped>
.myaccount {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
}

.nav {
  width: 290px;
  height: 810px;
  background: #ffffff;
  box-shadow: 3px 0 10px 0 rgba(200, 199, 232, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;

  .avatar-wrapper {
    border-radius: 50%;
    margin-top: 75px;
    margin-bottom: 15px;
  }
  .address {
    font-size: 24px;
    color: #788091;
    width: 176px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .balance-box {
    margin-top: 20px;
    width: 230px;
    height: 54px;
    padding: 0 8px;
    border: 1px solid #dfdfdf;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .number {
      flex: 1;
      margin-right: 8px;
      font-size: 26px;
      color: #87c5ff;
      text-align: center;
      width: 100px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .right {
      display: flex;
      align-items: center;

      span {
        margin-right: 8px;
        font-size: 16px;
      }
    }
  }
  .list {
    display: flex;
    flex-direction: column;
    margin-top: 35px;

    .list-icon {
      margin-left: 25px;
      margin-right: 20px;
    }
    .active {
      background: #797bf8;
      color: #ffffff !important;
    }
    .profile {
      width: 290px;
      height: 60px;
      font-size: 24px;
      padding-top: 8px;
      color: #3f485c;
      transition: all 0.2s ease;
      margin-bottom: 25px;
    }
  }
}

.needabottom {
  margin-bottom: 20px;
}
</style>
