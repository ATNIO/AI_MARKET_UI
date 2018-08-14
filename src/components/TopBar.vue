<template>
 <div class="top-bar">
  <div class="wrapper">
    <div class="i-title">
      <img src="../assets/logo.png" alt="" class="image">
      <span class="title">AI Market</span>
    </div>

    <Input prefix="ios-search" placeholder="Search APIs" class="search" />

    <div class="personal-center">
      <Icon type="ios-alert-outline" size="24" color="#ffffff" class="icon"/>
      <Icon type="ios-notifications-outline" size="24" color="#ffffff" class="icon"/>
      <img src="" alt="">头像<Icon type="ios-arrow-down" color="#ffffff" class="via"/>
    </div>
   
   
  </div>
 </div>  
</template>
<script>
export default {
  name: "TopBar"
};
</script>
<style lang="less" scoped>
.top-bar {
  width: 100%;
  height: 60px;
  background: linear-gradient(to right, #787af8, #88c6ff);
  .wrapper {
    width: 1210px;
    height: 100%;
    margin: 0 auto;
    font-family: SourceHanSansCN-Medium;
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
