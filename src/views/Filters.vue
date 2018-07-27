<template>
  <transition name="el-fade-in-linear">
    <section class="filters" v-show="filterLayerShow">
    <!-- <div class="hide" @click="filterExpend = !filterExpend">
      <i class="el-icon-view"></i>
      <span>HIDE FILTERS</span>
    </div> -->
    
    
      <div class="wrapper">
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
  </transition>
</template>
<script>
import { mapGetters } from "vuex";
import { filters } from "@/common/constants.js";

export default {
  name: "filters",
  data() {
    return {
      filters,
      filterExpend: true
    };
  },
  computed: {
    ...mapGetters(["filterLayerShow"])
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
  margin-left: 2em;

  // .hide {
  //   color: #878787;
  //   font-size: 1.5em;
  //   text-align: center;
  //   cursor: pointer;

  //   span {
  //     &:last-of-type {
  //       margin-left: 0.5em;
  //     }
  //   }
  // }

  .wrapper {
    color: #878787;
    background: #ffffff;
    border-radius: 20px;
    text-align: center;
    margin-top: 2em;
    padding: 1em 0;

    h3 {
      font-size: 1.6rem;
      margin: 1em 0 1em;
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
        padding: 1em;
        cursor: pointer;

        &:hover {
          background: rgba(209, 209, 209, 0.425);
        }

        &:last-of-type {
          margin: 0;
        }
      }
    }
  }
}
</style>
