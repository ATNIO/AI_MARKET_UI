<template>
  <header>
    <p>ATN</p>
    <i-button>Login</i-button>
  </header>
</template>

<script>
export default {
  name: "headBar"
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
    font-size: 48px;
    color: #ffffff;
  }
}
</style>
