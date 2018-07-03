<template>
  <section class="list">
    <Filters></Filters>
    <ul>
      <li>
        <a-row type="flex">
          <a-col :xs="6" :sm="6" :md="6" :lg="6" class="center">Name</a-col>
          <a-col :xs="6" :sm="6" :md="6" :lg="6" class="center">Reputation</a-col>
          <a-col :xs="6" :sm="6" :md="6" :lg="6" class="center">Query(24h)</a-col>
          <a-col :xs="6" :sm="6" :md="6" :lg="6" class="center">Pool Value</a-col>
        </a-row>
      </li>
      <li 
        v-for="(item, idx) in list" 
        :key="`${ item.name }_${ idx }`"
        @click="gotoDetail(idx)"
      >
        <a-row type="flex">
          <a-col :xs="6" :sm="6" :md="6" :lg="6" class="center">
            {{ item.name }}
          </a-col>
          <a-col :xs="6" :sm="6" :md="6" :lg="6" class="center">
            {{ item.reputation }}
          </a-col>
          <a-col :xs="6" :sm="6" :md="6" :lg="6" class="center">
            {{ item.num_api_call_24h }}
          </a-col>
          <a-col :xs="6" :sm="6" :md="6" :lg="6" class="center">
            {{ item.pool_size }}
          </a-col>
        </a-row>
      </li>
    </ul>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

import Filters from "./Filters";

export default {
  components: {
    Filters
  },
  name: "botList",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["list"])
  },
  mounted() {
    if (this.list.length === 0) {
      this.getDbotList();
    }
  },
  methods: {
    async getDbotList() {
      const response = await fetch("/list");

      // TODOS: judge the status of response
      try {
        const data = await response.json();

        this.$store.dispatch("setList", data);
      } catch (err) {
        console.error(err);
      }
    },
    gotoDetail(index) {
      this.$router.push({
        name: "detail",
        params: {
          dbot: index
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.list {
  max-width: 1600px;
  margin: 0 auto;

  ul {
    list-style: none;
    padding: 0 2rem;
    margin: 0;
    box-sizing: border-box;

    li {
      padding: 1rem 0;
      border-bottom: thin solid #dddee1;
      cursor: pointer;

      &:hover {
        background: #f8f8f9;
      }

      &:first-of-type {
        font-size: 16px;
        border-top: thin solid #dddee1;
        color: #1c2438;
        cursor: default;

        &:hover {
          background: transparent;
        }
      }

      .center {
        text-align: center;
      }
    }
  }
}
</style>
