<template>
  <main id="app">
    <head-bar></head-bar>
    <router-view class="content" />
    <foot-bar></foot-bar>
  </main>
</template>

<style lang="less" scoped>
.content {
  padding: 2rem 0;
}
</style>
