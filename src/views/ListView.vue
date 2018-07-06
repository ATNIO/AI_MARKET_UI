<template>
  <section class="list">
    <div class="wrapper" v-if="list.length > 0">
      <ul>
        <li>
          <div class="logo">Logo</div>
          <div class="name">Name</div>
          <div class="des">Description</div>
          <div class="star">Stars</div>
          <div class="pool">Pool Value</div>
        </li>
        <ListItem v-for="item in list" :item="item" :key="item.id"></ListItem>
      </ul>
      <Page 
        :total="total" 
        v-on:on-change="pageChange"
        show-total 
        show-elevator 
        :current="cur"
        :page-size="size"
        class-name="page"
      ></Page>
    </div>
    <Spin size="large" fix v-else></Spin>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

import ListItem from "./ListItem";

import { dbots } from "@/common/api";

export default {
  components: { ListItem },
  name: "ListView",
  data() {
    return {
      cur: 1,
      size: 20
    };
  },
  computed: {
    ...mapGetters(["list", "total"])
  },
  mounted() {
    if (this.list.length === 0) {
      this.getDbotList();
    }
  },
  methods: {
    async getDbotList() {
      const response = await fetch(dbots(this.cur, this.size));

      if (response.status === 200) {
        try {
          const data = await response.json();
          const { status, result, error_msg, total } = data;

          if (status === 200) {
            this.$store.dispatch("setList", { result, total });
          } else {
            console.log("error_msg", error_msg);
          }
        } catch (err) {
          console.error(err);
        }
      } else {
        console.log(response);
      }
    },
    pageChange(page) {
      this.cur = page;
      this.$store.dispatch("setList", {});
      this.getDbotList();
    }
  }
};
</script>

<style lang="less">
.list {
  ul:first-of-type {
    li {
      padding: 1rem 0;
      display: flex;
      align-items: center;
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

        .des {
          text-align: center;
        }
      }

      .logo,
      .name,
      .star,
      .pool {
        text-align: center;
      }

      .logo {
        flex: 100px 0 1;

        img {
          display: block;
          width: 100px;
          height: 100px;
        }
      }

      .name {
        flex: 1;
      }

      .des {
        flex: 4;
        text-align: left;
      }

      .star {
        flex: 1;
      }

      .pool {
        flex: 1;
      }
    }
  }
}
</style>

<style lang="less" scoped>
.list {
  max-width: 1460px;
  min-height: 500px;
  margin: 0 auto;
  position: relative;

  ul {
    list-style: none;
    padding: 0 2rem;
    margin: 0;
    box-sizing: border-box;
    background: #ffffff;
  }

  .page {
    margin: 2rem auto 0;
    display: flex;
    justify-content: center;
  }
}
</style>
