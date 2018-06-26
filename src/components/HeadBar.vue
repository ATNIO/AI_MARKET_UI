<template>
  <header>
    <p>ATN</p>
    <el-button size="mini">Login</el-button>
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
  background: #5db9cf;

  p {
    font-size: 48px;
  }
}
</style>
