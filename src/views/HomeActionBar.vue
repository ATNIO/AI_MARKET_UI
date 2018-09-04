<template>
  <section class="action-bar">
    <h2>{{ currentItem }}</h2>
    <div class="right">
      <span>Sort By:</span>
      <Select 
        v-model="sortValue" 
        size="small" 
        style="width:96px"
        v-on:on-change="sortTypeChange"
      >
        <Option v-for="item in selectList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <div 
        class="btn-sort" 
        :class="sortDir === 1 ? 'asc' : 'desc' "
        @click="sortDirChange"
      >
        <Icon custom="i-icon icon-sort" size="20" />
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ActionBar",
  data() {
    return {
      sortValue: "Price",
      selectList: [
        {
          value: "Price",
          label: "Price"
        },
        {
          value: "OutDate",
          label: "OutDate"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["currentItem", "sortType", "sortDir"])
  },
  watch: {
    sortType: {
      immediate: true,
      handler(val) {
        this.sortValue = val;
      }
    }
  },
  methods: {
    ...mapActions(["setSortType", "setSortDir"]),
    sortTypeChange(type) {
      this.$emit("sortChange", { sortType: type });
      this.setSortType(type);
    },
    sortDirChange() {
      const dir = this.sortDir === 1 ? -1 : 1;

      this.$emit("sortChange", { sortDir: dir });
      this.setSortDir(dir);
    }
  }
};
</script>

<style lang="less" scoped>
.action-bar {
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h2 {
    font-size: 24px;
  }

  .right {
    display: flex;
    align-items: center;

    span {
      margin-right: 8px;
      font-size: 12px;
      color: #b7b9ce;
    }

    .btn-sort {
      margin-left: 6px;
      padding: 1px;
      box-sizing: border-box;
      border-width: 1px;
      border-style: solid;
      border-radius: 2px;
      cursor: pointer;
    }

    .asc {
      border-color: transparent;
    }

    .desc {
      border-color: #797bf8;
      background: #ffffff;

      & /deep/ i::before {
        color: #797bf8;
      }
    }
  }
}
</style>
