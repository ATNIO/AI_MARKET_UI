<template>
  <section class="actionBar">
      <span class="icon-sort" @click="_click('grid')"></span> 
      <span class="icon-menu" @click="_click('fluent')"></span> 
  </section>
</template>

<script>
export default {
  name: "ActionBar",
  data() {
    return {};
  },
  methods: {
    _click(layout) {
      this.$emit("changeLayout", layout);
    }
  }
};
</script>

<style lang="less" scoped>
.actionBar {
  span {
    font-size: 1.5rem;
  }
}
</style>
