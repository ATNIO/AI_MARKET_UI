<template>
  <section class="actionBar">
    <div class="left" @click="toggleFilters">
      <i class="el-icon-view"></i>
      <span>Filters</span>
    </div>

    <div class="right">
      <!-- sort by popular -->
      <div class="option-sort">
        <span class="title">Sort By: </span>
        <el-select v-model="sortVal" clearable placeholder="Please select">
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
        <el-select v-model="priceType" clearable placeholder="Please select">
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
    </div>

  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

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
  computed: {
    ...mapGetters(["filterLayerShow"])
  },
  methods: {
    ...mapActions(["setFilterShow"]),
    _click(layout) {
      this.layout = layout;
      this.$emit("changeLayout", layout);
    },
    toggleFilters() {
      this.setFilterShow(!this.filterLayerShow);
    }
  }
};
</script>

<style lang="less" scoped>
.actionBar {
  padding: 1.5em 0;
  border-bottom: thin solid rgba(128, 128, 128, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #9b9b9b;
  font-size: 1rem;
  margin-right: 0.5rem;

  .left {
    cursor: pointer;

    .el-icon-view {
      margin-right: 5px;
    }
  }

  .right {
    display: flex;
    align-items: center;

    .option-sort,
    .option-price {
      margin-right: 2em;

      // .title {
      //   color: #9b9b9b;
      //   font-size: 1rem;
      //   margin-right: 0.5rem;
      // }

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

      &:first-of-type {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
      }

      &:last-of-type {
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
      }

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
}
</style>
