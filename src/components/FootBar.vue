<template>
  <footer>
    <span>Copyright &#169; {{ new Date().getFullYear() }}</span>
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
    color: #80848f;
  }
}
</style>
