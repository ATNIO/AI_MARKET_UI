<template>
  <section class="action-bar">
    <h2>Face percetion</h2>
    <div class="right">
      <span>Sort By:</span>
      <Select v-model="sortValue" size="small" style="width:96px">
        <Option v-for="item in selectList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <div class="btn-sort">
        <Icon custom="i-icon icon-sort" size="20" />
      </div>
    </div>
  </section>
</template>

<script>
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
          value: "London",
          label: "London"
        }
      ]
    };
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
      background: #797bf8;
      border-radius: 2px;
    }
  }
}
</style>
