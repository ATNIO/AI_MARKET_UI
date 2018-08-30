<template>
<div class="myaccount">
  <div class="nav">
    <div class="photo"></div>
    <div class="address">{{address}}</div>
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
          :type="visibleType" 
          @click="visible = !visible" 
          size="28" 
          color="#B7B9CE" 
          class="icon"
        />
      </div>
    </div>


    <div class="list">
      <router-link :to="{name: 'AccountProfile'}">
        <div class="profile" @click="_click(index)" :class="{ active: index === current }">
        <Icon type="ios-person-outline" size="41" class="list-icon"/>
        <span> Profile</span>
      </div>
      </router-link>
      
      <router-link :to="{name: 'ChannelList'}">
        <div class="channel-list">
          <Icon type="ios-list-box-outline" size="41" class="list-icon"/>
          <span>  Channel list</span>
        </div>
      </router-link>
      
    </div>  
  </div>
  
  <router-view></router-view>
</div>
  
</template>

<script>
import { mapGetters } from "vuex";
import AccountProfile from "./AccountProfile";
import ChannelList from "./ChannelList";
export default {
  name: "my-account",
  data() {
    return {
      visible: true,
      current: 1,
      index: -1,
      balance: "0000.00",
      balanceHolder: "****"
    };
  },
  components: {
    AccountProfile,
    ChannelList
  },
  computed: {
    ...mapGetters(["address"]),
    visibleType() {
      return this.visible ? "ios-eye-outline" : "ios-eye-off-outline";
    },
    balanceRender() {
      return this.visible ? this.balance : this.balanceHolder;
    }
  },
  methods: {
    _click(index) {
      this.current = index;
      // TODOS
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

  .photo {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: #797bf8;
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
    .profile {
      width: 290px;
      height: 60px;
      font-size: 24px;
      padding-top: 8px;
      color: #3f485c;

      &:hover {
        background: #797bf8;
        color: #ffffff;
      }
    }
    .channel-list {
      width: 290px;
      height: 60px;
      font-size: 24px;
      padding-top: 8px;
      color: #3f485c;

      &:hover {
        background: #797bf8;
        color: #ffffff;
      }
    }
  }
}
</style>
