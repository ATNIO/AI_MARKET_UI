<template>
  <section class="home">
    <filters class="filters"></filters>
    <div class="containor">
      <actionBar class="actionBar"></actionBar>
      <listView class="listView"></listView>
    </div>   
  </section>
</template>

<style lang="less" scoped>
.home {
  display: flex;

  .containor {
    flex: 1;

    .actionBar {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
    .listView {
    }
  }
}
</style>
