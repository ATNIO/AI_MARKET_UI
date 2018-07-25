<template>
  <section class="actionBar">

    <!-- sort by popular -->
    <div class="option-sort">
      <span class="title">Sort By: </span>
      <el-select v-model="sortVal" clearable placeholder="请选择">
        <el-option
          v-for="item in options_sort"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>

    <!-- sort by price -->
    <div class="option-price">
      <span class="title">Price Range: </span>
      <el-select v-model="priceType" clearable placeholder="请选择">
        <el-option
          v-for="item in options_price"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>

    <template v-for="item in layoutArr">
      <div 
        :key="item" 
        class="wrapper"
        :class="{
          active: layout === item
        }" 
        @click="_click(item)"
      >
        <span :class="`icon-${ item }`"></span>
      </div>
    </template>
  </section>
</template>

<script>
export default {
  name: "ActionBar",
  data() {
    return {
      layoutArr: ["grid", "fluent"],
      layout: "grid",
      options_sort: [
        {
          value: "Popular",
          label: "Popular"
        },
        {
          value: "Hot",
          label: "Hot"
        }
      ],
      sortVal: "Popular",
      options_price: [
        {
          value: "All",
          label: "All"
        },
        {
          value: "Up",
          label: "Up"
        },
        {
          value: "Down",
          label: "Down"
        }
      ],
      priceType: "All"
    };
  },
  methods: {
    _click(layout) {
      this.layout = layout;
      this.$emit("changeLayout", layout);
    }
  }
};
</script>

<style lang="less" scoped>
.actionBar {
  padding: 3em 0;
  border-bottom: thin solid rgba(128, 128, 128, 0.425);

  .option-sort,
  .option-price {
    margin-right: 2em;

    .title {
      color: #9b9b9b;
      font-size: 1rem;
      margin-right: 0.5rem;
    }

    & /deep/ .el-select .el-input__inner {
      border-style: none;
      color: #9b9b9b;
      border-radius: 4px;
      font-size: 1rem;
    }
  }

  .wrapper {
    height: 40px;
    padding: 1em;
    display: flex;
    align-items: center;
    background: #ffffff;
    cursor: pointer;
    transition: all 0.2s;

    [class^="icon-"] {
      font-size: 1.2rem;
      transition: all 0.2s;
    }

    &.active {
      background: #9b9b9b;

      [class^="icon-"] {
        color: #ffffff;
      }
    }
  }
}

// .optionOne {
//   margin: 0 10em;
// }
// .optionTwo {
//   margin: 0 5em;
// }
</style>
