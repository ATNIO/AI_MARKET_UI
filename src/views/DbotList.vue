<template>
  <section class="list">
    <el-table
      :data="list"
      style="width: 100%"
    >
      <el-table-column
        prop="name"
        label="Dbot Name"
        width="180">
      </el-table-column>
      <el-table-column
        prop="reputation"
        label="Reputation"
        width="180">
      </el-table-column>
      <el-table-column
        prop="num_api_call_24h"
        label="Query(24h)">
      </el-table-column>
      <el-table-column
        prop="pool_size"
        label="Pool Value">
      </el-table-column>
    </el-table>

    <el-pagination
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      class="pagination"
    >
    </el-pagination>
  </section>
</template>

<script>
export default {
  name: "botList",
  data() {
    return {
      list: [],
      total: 400
    };
  },
  mounted() {
    this.getDbotList();
  },
  methods: {
    async getDbotList() {
      const response = await fetch("/list");

      // TODOS: judge the status of response
      const data = await response.json();

      this.list = data.dbots;
    }
  }
};
</script>

<style lang="less" scoped>
.list {
  .pagination {
    margin: 1rem 0;
    display: flex;
    justify-content: center;
  }
}
</style>
