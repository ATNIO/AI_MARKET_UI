<template>
  <div class="chanel">
  <keep-alive>
    <component :is="currentChanel"></component>
  </keep-alive>
  </div>
</template>

<script>
import InAccessible from "./InAccessible";
import Accessible from "./Accessible";

// import data from "../../mock/listData.js";

export default {
  name: "Chanel",
  components: {
    InAccessible,
    Accessible
  },
  data() {
    return {
      currentChanel: InAccessible
    };
  }
};
</script>

<style lang="less" scoped>
</style>
