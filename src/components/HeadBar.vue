<template>
  <header>
    <p>ATN</p>
    <a-button size="large">Login</a-button>
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
    margin: 0;
    font-size: 48px;
    color: #ffffff;
  }

  button {
    width: 120px;
  }
}
</style>
