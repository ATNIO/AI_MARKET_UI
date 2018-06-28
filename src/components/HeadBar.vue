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
  background: #2b85e4;

  p {
    font-size: 48px;
    color: #ffffff;
  }
}
</style>
