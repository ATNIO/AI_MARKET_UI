<template>
  <el-row
    class="top-bar"
    type="flex"
    align="middle"
  >
    <el-col :push="1">
      <span>ATN: 2,000.00</span>
    </el-col>
    <el-col :pull="1">
      <el-row 
        class="wrapper"
        type="flex"
        justify="end"  
      >
        <el-col :md="20" :lg="16" :xl="12" class="hidden-sm-and-down">
          <el-input 
            placeholder="Search APIs" 
            v-model="searchVal" 
            class="search-input"
            prefix-icon="el-icon-search"
          >
            <el-button 
              slot="append" 
              icon="el-icon-search"
            ></el-button>
          </el-input>
        </el-col>
        <el-col 
          :xs="3"
          :sm="1"
          :md="{
            span: 2,
            offset: 2
          }"
          :xl="{
            span: 1
          }"
        >
          <i class="el-icon-bell"></i>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
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
  border-bottom: thin solid rgba(128, 128, 128, 0.425);
  font-size: 1.5rem;

  .wrapper {
    .search-input {
      width: 100%;
    }

    .el-icon-bell {
      font-size: 2.5rem;
      color: #711ecf;
    }

    & /deep/ .el-input-group__append,
    & /deep/ input {
      border: none;
    }

    & /deep/ input {
      border-bottom-right-radius: 0;
      border-top-right-radius: 0;
      border-bottom-left-radius: 20px;
      border-top-left-radius: 20px;
    }

    & /deep/ button {
      height: 40px;
      padding: 0 20px;
      display: flex;
      justify-content: center;
      border: none;
      color: #ffffff;
      background: #409eff;
      border-bottom-right-radius: 20px;
      border-top-right-radius: 20px;
      border-bottom-left-radius: 0;
      border-top-left-radius: 0;
    }
  }
}
</style>
