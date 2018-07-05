<template>
  <footer>
    <span>Copyright &#169; ATN {{ new Date().getFullYear() }}</span>
  </footer>
</template>

<script>
export default {
  name: "footBar"
};
</script>

<style lang="less" scoped>
footer {
  text-align: center;

  span {
    font-size: 12px;
    color: #80848f;
  }
}
</style>
