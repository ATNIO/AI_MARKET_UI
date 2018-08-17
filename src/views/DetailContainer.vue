<template>
  <section class="container">
    <Tabs value="documention">
      <TabPane label="DOCUMENTION" name="documention">
        <detail-doc v-once></detail-doc>
      </TabPane>
      <TabPane label="COMMENT" name="comment">
        <detail-comment></detail-comment>
      </TabPane>
    </Tabs>
  </section>
</template>

<script>
import DetailDoc from "./DetailDoc";
import DetailComment from "./DetailComment";

export default {
  name: "DetailContainer",
  components: {
    "detail-doc": DetailDoc,
    "detail-comment": DetailComment
  },
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1200px;
  margin: 0 auto;

  & /deep/ .ivu-tabs-ink-bar {
    height: 5px;
    background-color: #787dff;
  }

  & /deep/ .ivu-tabs-tab {
    font-size: 24px;
    color: #788091;
  }

  & /deep/ .ivu-tabs-bar {
    margin-bottom: 32px;
  }

  & /deep/ .ivu-tabs-tab-active {
    color: #11124c;
  }
}
</style>
