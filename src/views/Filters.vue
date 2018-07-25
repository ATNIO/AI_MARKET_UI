<template>
   <section class="filters">
    <div class="hide" @click="filterExpend = !filterExpend">
      <i class="el-icon-view"></i>
      <span>HIDE FILTERS</span>
    </div>
    
    <div class="wrapper" v-show="filterExpend">
      <h3>CATEGORIES</h3>
      <ul>
        <li
          v-for="item in filters"
          :key="item"
        >
          <span>{{item}}</span>
        </li>
      </ul>
    </div>
   </section>       
</template>
<script>
import { filters } from "@/common/constants.js";

export default {
  name: "filters",
  data() {
    return {
      filters,
      filterExpend: true
    };
  }
  // methods: {
  //   _click (item) {
  //     switch (itme) {
  //       case 'test':
  //         // TODOS: to do something
  //         break;
  //       default:
  //         break;
  //     }
  //   }
  // }
};
</script>
<style lang="less" scoped>
.filters {
  margin-left: 2.5vw;
  width: 14em;

  .hide {
    color: #878787;
    font-size: 1.5em;
    margin-top: 2.2em;
    text-align: center;
    cursor: pointer;

    span {
      &:last-of-type {
        margin-left: 0.5em;
      }
    }
  }

  .wrapper {
    color: #878787;
    background: #ffffff;
    border-radius: 20px;
    text-align: center;
    margin-top: 3.2em;
    padding: 1em;

    h3 {
      font-size: 1.6rem;
      margin: 1em 0 2em;
    }

    ul {
      width: 100%;
      margin: 0;
      padding: 0;
      list-style: none;
      font-size: 1.4rem;

      li {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: left;
        margin-bottom: 1em;

        &:last-of-type {
          margin: 0;
        }
      }
    }
  }
}
</style>
