<template>
  <main id="app">
    <el-container>
      <el-aside width="auto">
        <navigation></navigation>
      </el-aside>
      <el-container>
        <el-header height="auto">
          <top-bar></top-bar>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
        <!-- <el-footer>Footer</el-footer> -->
      </el-container>
    </el-container>
  </main>
</template>

<style lang="less" scoped>
#app {
  width: 100vw;
  height: 100vh;
  display: flex;
  // background: url("./assets/design.jpg") no-repeat left top / cover;

  & /deep/ .el-header,
  & /deep/ .el-footer,
  & /deep/ .el-main {
    padding: 0;
  }
}
</style>
