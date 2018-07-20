<template>
  <main id="app">
    <navigation></navigation>
    <section class="containor">
      <top-bar></top-bar>
      <filters></filters>
      <list></list>
      <router-view />
    </section>
  </main>
</template>

<style lang="less" scoped>
#app {
  width: 100vw;
  height: 100vh;
  display: flex;
  // background: url("./assets/design.jpg") no-repeat left top / cover;

  .containor {
    flex: 1;
  }
}
</style>
