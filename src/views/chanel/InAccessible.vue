<template>
  <div class="inaccessible">
    <div class="wrapper">
        <p class="title">No channel was found registered for you on this Dbot</p>
        <div class="means">
          <p class="method">In order to call API...</p>
          <p class="step-one"><Icon type="ios-add-circle" color="#87C5FE" size="20"/> deposit some ATN to open a channel with this Dbot</p>
          <p class="step-two"><Icon type="ios-create" color="#87C5FE" size="20"/> For each transfer , sign a message confirming the balance with the new transferred amount.</p>
          <Input search enter-button="Deposit" placeholder=" imput ATN" size="large" class="search"/>
        </div>
    </div>
  </div>   
</template>

<script>
export default {
  name: "InAccessible",
  data() {
    return {};
  }
};
</script>
 <style lang="less" scoped>
.inaccessible {
  display: flex;
  justify-content: center;
  .wrapper {
    width: 1200px;
    height: 310px;
    background: #ffffff;
    border-radius: 4px;

    .title {
      font-size: 24px;
      color: #11124c;
      letter-spacing: 0;
      text-align: center;
      margin: 28px 0 20px 0;
    }
    .means {
      margin-left: 226px;
      .method {
        font-size: 18px;
        color: #0d0628;
        margin-bottom: 12px;
      }
      .step-one {
        font-size: 16px;
        color: #0d0628;
        margin-bottom: 15px;
      }
      .step-two {
        font-size: 16px;
        color: #0d0628;
        margin-bottom: 32px;
      }
      .search {
        width: 748px;
        height: 50px;
        border-radius: 4px;
        border: 1px #787bf7 solid;

        & /deep/ .ivu-input-large {
          height: 50px;
          font-size: 18px;
          color: #aaaaaa;
        }
        & /deep/ .ivu-input-search {
          width: 138px;
          background: #797bf8 !important;
          border-color: #797bf8 !important;
        }
      }
    }
  }
}
</style>
