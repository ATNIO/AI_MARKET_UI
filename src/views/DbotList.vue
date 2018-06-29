<template>
  <section class="list">
    <Filters></Filters>
    <ul>
      <li>
        <i-row type="flex">
          <i-col :xs="6" :sm="6" :md="6" :lg="6" class-name="center">Name</i-col>
          <i-col :xs="6" :sm="6" :md="6" :lg="6" class-name="center">Reputation</i-col>
          <i-col :xs="6" :sm="6" :md="6" :lg="6" class-name="center">Query(24h)</i-col>
          <i-col :xs="6" :sm="6" :md="6" :lg="6" class-name="center">Pool Value</i-col>
        </i-row>
      </li>
      <li 
        v-for="(item, idx) in list" 
        :key="`${ item.name }_${ idx }`"
        @click="gotoDetail(idx)"
      >
        <i-row type="flex">
          <i-col :xs="6" :sm="6" :md="6" :lg="6" class-name="center">
            {{ item.name }}
          </i-col>
          <i-col :xs="6" :sm="6" :md="6" :lg="6" class-name="center">
            {{ item.reputation }}
          </i-col>
          <i-col :xs="6" :sm="6" :md="6" :lg="6" class-name="center">
            {{ item.num_api_call_24h }}
          </i-col>
          <i-col :xs="6" :sm="6" :md="6" :lg="6" class-name="center">
            {{ item.pool_size }}
          </i-col>
        </i-row>
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

        this.$store.dispatch("setList", data.dbots);
      } catch (err) {
        console.error(err);
      }
    },
    gotoDetail(index) {
      this.$router.push({
        name: "detail",
        params: {
          id: index
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
      }

      .center {
        text-align: center;
      }
    }
  }
}
</style>
