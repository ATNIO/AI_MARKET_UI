<template>
    <section class="detail-container">
        <Tabs :value="tabsValue">
            <TabPane label="DOCUMENTION" name="1">
                <detail-doc></detail-doc>
            </TabPane>
            <TabPane label="COMMENT" name="0">
                <detail-comment></detail-comment>
            </TabPane>
        </Tabs>
    </section>
</template>

<script>
import DetailDoc from "./DetailDoc";
import DetailComment from "./DetailComment";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "DetailContainer",
  components: {
    "detail-doc": DetailDoc,
    "detail-comment": DetailComment
  },
  computed: {
    ...mapGetters(["tabsValue"])
  },
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.detail-container {
  margin-top: 40px;

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
