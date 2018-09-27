<template>
  <div class="bottom-bar">
    <div class="tp">
      <a href="https://github.com/ATNIO">
        <Icon custom="icon-github" size="40"/>
        <span>Github</span>
      </a>
      <a href="https://t.me/ATN_Blockchain">
        <Icon custom="icon-elegram" size="40"/>
        <span>Telegram</span>
      </a>
      <a href="mailto:contact@atn.io">
        <Icon custom="icon-email" size="40"/>
        <span>Email</span>
      </a>
    </div>
    <p>Copyright © 2018 ATNIO</p>
    <p>Largest AI API Marketplace And Powerful Tools For Private And Public AI APIs.</p>
  </div>
</template>
<script>
export default {
  name: "BottomBar"
};
</script>
<style lang="less" scoped>
.bottom-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 210px;
  background: linear-gradient(to right, #787af8, #88c6ff);

  .tp {
    display: flex;

    a {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-family: SourceHanSansCN-Normal;
      font-size: 14px;
      color: #ffffff;
      letter-spacing: 0;
      text-align: center;
      margin: 35px 60px 26px 60px;
    }
  }
  p {
    font-size: 14px;
    color: #ffffff;
  }
}
</style>
