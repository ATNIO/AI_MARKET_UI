<template>
  <section class="actionBar">
    <div class="optionOne">
      <span>Sort By: </span>
      <el-select v-model="value1" clearable filterable placeholder="请选择">
        <el-option
          v-for="item in options1"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>

      <div class="optionTwo">
      <span>Price Range: </span>
      <el-select v-model="value2" clearable filterable placeholder="请选择">
        <el-option
          v-for="item in options2"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>

      
      <span class="icon-sort" @click="_click('grid')"></span> 
      <span class="icon-menu" @click="_click('fluent')"></span> 
  </section>
</template>

<script>
export default {
  name: "ActionBar",
  data() {
    return {
      options1: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value1: "",
      options2: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value2: ""
    };
  },
  methods: {
    _click(layout) {
      this.$emit("changeLayout", layout);
    }
  }
};
</script>

<style lang="less" scoped>
.actionBar {
  div {
    align-items: center;
    span {
      color: #9b9b9b;
      font-size: 1.2rem;
    }
    & /deep/ .el-select .el-input__inner {
      border-style: none;
      color: #9b9b9b;
      border-radius: 1em;
    }
  }

  span {
    font-size: 1.5rem;
  }
}
.optionOne {
  margin: 0 10em;
}
.optionTwo {
  margin: 0 5em;
}
</style>
