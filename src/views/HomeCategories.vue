<template>
  <div class="home-categories">
    <Menu 
      :active-name="activeName" 
      accordion
      width="100%"
      v-on:on-select="_click"
    >
      <MenuItem name="all">All</MenuItem>
      <template v-for="(child, key) in categories">
        <Submenu :name="key" :key="key">
          <template slot="title">
              {{ key }}
          </template>
          <template v-for="item in child">
            <MenuItem :name="item" :key="item">{{ item }}</MenuItem>
          </template>
        </Submenu>
      </template>
    </Menu>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "HomeCategories",
  data() {
    return {
      activeName: "all"
    };
  },
  computed: {
    ...mapGetters(["categories"])
  },
  methods: {
    _click(name) {
      this.activeName = name;
      this.$emit("changeCategory", name);
    }
  }
};
</script>

<style lang="less" scoped>
.home-categories {
  width: 290px;
  padding-top: 76px;
  background: #ffffff;
  box-shadow: 1px 0 10px 0 rgba(200, 199, 232, 0.2);

  & /deep/ .ivu-menu-item-active:not(.ivu-menu-submenu) {
    color: #fff !important;
    background: #797bf8;

    &:after {
      background: transparent;
    }
  }

  & /deep/ .ivu-menu-light:after {
    background: transparent;
  }

  &/deep/ .ivu-menu-submenu-title:hover,
  &/deep/ .ivu-menu-item:hover {
    color: #797bf8;
  }
}
</style>
