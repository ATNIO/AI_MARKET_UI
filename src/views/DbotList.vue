<template>
  <section class="list">
    <Filters></Filters>
    <ul>
      <li>
        <Row type="flex">
          <i-col :xs="6" :sm="6" :md="6" :lg="6" class="center">Name</i-col>
          <i-col :xs="6" :sm="6" :md="6" :lg="6" class="center">Description</i-col>
          <i-col :xs="6" :sm="6" :md="6" :lg="6" class="center">Stars</i-col>
          <i-col :xs="6" :sm="6" :md="6" :lg="6" class="center">Comments</i-col>
        </Row>
      </li>
      <li 
        v-for="(item, idx) in list" 
        :key="`${ item.name }_${ idx }`"
        @click="gotoDetail(item.address)"
      >
        <Row type="flex">
          <i-col :xs="6" :sm="6" :md="6" :lg="6" class="center">
            {{ item.name }}
          </i-col>
          <i-col :xs="6" :sm="6" :md="6" :lg="6" class="center">
            {{ item.description }}
          </i-col>
          <i-col :xs="6" :sm="6" :md="6" :lg="6" class="center">
            {{ item.stars }}
          </i-col>
          <i-col :xs="6" :sm="6" :md="6" :lg="6" class="center">
            {{ item.comments }}
          </i-col>
        </Row>
      </li>
    </ul>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

import Filters from "./Filters";
import { dbots } from "@/common/api";

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
      const response = await fetch(dbots);

      if (response.status === 200) {
        // TODOS: judge the status of response
        try {
          const data = await response.json();

          this.$store.dispatch("setList", data);
        } catch (err) {
          console.error(err);
        }
      } else {
        console.log(response);
      }
    },
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
.list {
  max-width: 1600px;
  margin: 0 auto;

  ul {
    list-style: none;
    padding: 0 2rem;
    margin: 0;
    box-sizing: border-box;
    background: #ffffff;

    li {
      padding: 1rem 0;
      border-bottom: thin solid #dddee1;
      cursor: pointer;
      transition: all 0.3s ease;

      &:not(:first-of-type):hover {
        background: #f8f8f9;
      }

      &:first-of-type {
        font-weight: 400;
        border-top: thin solid #dddee1;
        color: #1c2438;
        background: #dddee1;
        cursor: default;
      }

      .center {
        text-align: center;
      }
    }
  }
}
</style>
