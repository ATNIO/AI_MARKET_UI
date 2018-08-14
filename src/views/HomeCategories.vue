<template>
  <div class="home-categories">
        <ul  class="items">
          <li
            v-for="(item, index) in filters"
            :key="index"
          >
            <span>{{item}}</span>
          </li>
        </ul>
  </div>
</template>

<script>
import { filters } from "@/common/constants.js";

export default {
  name: "HomeCategories",
  data() {
    return {
      filters
    };
  }
};
</script>

<style lang="less" scoped>
.home-categories {
  width: 290px;
  height: 764px;
  background: #ffffff;
  // box-shadow: 3px 0 10px 0 rgba(200, 199, 232, 0.5);
  box-shadow: 1px 0 10px 0 rgba(200, 199, 232, 0.2);
  .items {
    margin-left: 20px;
    padding-top: 64px;
    font-family: SourceHanSansCN-Medium;
    font-size: 18px;
    color: #707070;
    list-style: none;
    li {
      margin-bottom: 10px;
    }
  }
}
</style>
