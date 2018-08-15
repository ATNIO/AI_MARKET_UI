<template>
  <div class="home-categories">
        <ul  class="items">
          <li
            v-for="(item, index) in filters"
            :key="index"
            @click="_click(index)"
            :class="{ active: index === current }"
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
      filters,
      current: -1
    };
  },
  methods: {
    _click(index) {
      this.current = index;
    }
  }
};
</script>

<style lang="less" scoped>
.home-categories {
  width: 290px;
  background: #ffffff;
  box-shadow: 1px 0 10px 0 rgba(200, 199, 232, 0.2);
  .items {
    padding-top: 64px;
    font-family: SourceHanSansCN-Medium;
    font-size: 18px;
    color: #707070;
    list-style: none;
    padding-bottom: 25px;

    li {
      height: 40px;
      padding-left: 20px;
      line-height: 40px;
      transition: all 0.2s ease;
    }
    .active {
      color: #ffffff;
      background: #797bf8;
    }
  }
}
</style>
