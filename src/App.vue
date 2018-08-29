<template>
  <div id="app">
    <top-bar></top-bar>
    <main>
      <router-view />
    </main>
    <bottom-bar></bottom-bar>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>


<style lang="less" scoped>
main {
  min-height: calc(100vh - 270px);
}
</style>
