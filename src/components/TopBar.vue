<template>
  <header class="top-bar">
    <span>ATN: 2,000.00</span>
    <div class="wrapper">
      <el-input placeholder="请输入内容" v-model="searchVal" class="search-input">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <i class="el-icon-bell"></i>
    </div>
  </header>
</template>

<script>
export default {
  name: "TopBar",
  data() {
    return {
      searchVal: ""
    };
  }
};
</script>

<style lang="less" scoped>
.top-bar {
  position: sticky;
  height: 6vw;
  max-height: 8em;
  min-height: 4em;
  padding: 0 5rem;
  border-bottom: thin solid rgba(128, 128, 128, 0.425);
  font-size: 1.5rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  .wrapper {
    width: 40%;
    display: flex;
    align-items: center;

    .search-input {
      width: 30rem;
      margin-right: 10rem;
    }

    .el-icon-bell {
      font-size: 2.5rem;
      color: #711ecf;
    }
  }
}
</style>
