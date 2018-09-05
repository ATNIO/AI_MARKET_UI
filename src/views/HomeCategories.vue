<template>
  <div class="home-categories">
    <Menu 
      :active-name="currentItem" 
      :open-names="currentSubmenu"
      accordion
      width="100%"
      v-on:on-select="_click"
      v-on:on-open-change="openChange"
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
import { mapGetters, mapActions } from "vuex";

export default {
  name: "HomeCategories",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["categories", "currentSubmenu", "currentItem"])
  },
  methods: {
    ...mapActions(["setCategory"]),
    _click(name) {
      this.setCategory({ itemName: name });
      this.$emit("changeCategory", name);
    },
    openChange(subMenu) {
      this.setCategory({ subMenu });
    }
  }
};
</script>

<style lang="less" scoped>
.home-categories {
  width: 290px;
  padding: 76px 0 32px;
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
