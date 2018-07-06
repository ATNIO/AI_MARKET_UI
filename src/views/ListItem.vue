<template>
  <li @click="gotoDetail(item.address)">
    <div class="logo">
      <img :src="item.logo" alt="" srcset="">
    </div>
    <div class="name">
      {{ item.name }}
    </div>
    <div  class="des">
      {{ item.description }}
    </div>
    <div class="star">
      {{ item.nb_like }}
    </div>
    <div class="pool">
      {{ item.pool_value }}
    </div>
  </li>
</template>


<script>
export default {
  name: "ListItem",
  props: {
    item: Object
  },
  methods: {
    gotoDetail(address) {
      this.$router.push({
        name: "detail",
        params: {
          address
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
</style>
