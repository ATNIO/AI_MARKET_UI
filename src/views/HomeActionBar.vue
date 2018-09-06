<template>
  <section class="action-bar">
    <div class="current-item">{{ currentItem }}</div>
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
        <Icon 
          class="btn-sort" 
          :custom="visibleType" 
          size="26" 
          color="#797bf8" 
          @click="sortDirChange"/>
      </div>

  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ActionBar",
  data() {
    return {
      visible: true,
      sortValue: "Price",
      selectList: [
        {
          value: "Price",
          label: "Price"
        },
        {
          value: "OutDate",
          label: "Date"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["currentItem", "sortType", "sortDir"]),
    visibleType() {
      return this.visible ? "icon-up" : "icon-down";
    }
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
      this.visible = !this.visible;
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

  .current-item {
    font-size: 28px;
    text-transform: capitalize;
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
      cursor: pointer;
    }
  }
}
</style>
