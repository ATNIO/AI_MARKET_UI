<template>
  <section class="doc" v-show="spec">
    <aside class="base">
      <h2>Endpoint</h2>
      <ul class="list">
        <li 
          v-for="(endpoint, index) in endpoints" 
          :key="`${ endpoint.path }_${ endpoint.type }`"
          :class="{
            current: current === index
          }"
          @click="_click(index)"
        >
          <p>{{ endpoint.path }}</p>
          <p>{{ endpoint.type | toUpper }}</p>
        </li>
      </ul>
    </aside>
    <detail-doc-content :content="currentEndpointDetail" :endpoint="endpoints[current]"></detail-doc-content>
  </section>
</template>

<script>
import { mapGetters } from "vuex";

import DetailDocContent from "./DetailDocContent";

export default {
  name: "DetailDoc",
  components: {
    "detail-doc-content": DetailDocContent
  },
  data() {
    return {
      current: 0
    };
  },
  computed: {
    ...mapGetters(["docData"]),
    spec() {
      return this.docData.spec;
    },
    endpoints() {
      if (!this.spec) return [];

      const { paths } = this.docData.spec;
      const endpoints = [];

      for (let path in paths) {
        if (paths.hasOwnProperty(path)) {
          const types = paths[path];

          for (let type in types) {
            if (types.hasOwnProperty(type)) {
              endpoints.push({ path, type });
            }
          }
        }
      }

      return endpoints;
    },
    currentEndpointDetail() {
      if (!this.spec) return {};

      const endpoint = this.endpoints[this.current];
      const { path, type } = endpoint;

      return this.spec.paths[path][type];
    }
  },
  methods: {
    _click(index) {
      this.current = index;
    }
  },
  filters: {
    toUpper(value) {
      return value ? value.toUpperCase() : "";
    }
  }
};
</script>

<style lang="less" scoped>
.doc {
  margin-bottom: 40px;
  display: flex;

  .base {
    box-shadow: 3px 0 10px 0 rgba(200, 199, 232, 0.5);
    border-radius: 4px;
    background: #fff;
  }

  aside {
    width: 290px;
    padding-bottom: 20px;

    h2 {
      margin-bottom: 16px;
      padding: 20px 0 20px 20px;
      font-size: 20px;
      font-weight: 500;
      color: #000;
      line-height: 1;
      border-bottom: thin solid rgba(200, 199, 232, 0.2);
    }

    .list {
      list-style: none;

      li {
        height: 40px;
        padding: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        transition: background 0.3s;

        &.current {
          background: #87c5fe;

          p {
            color: #fff;
          }
        }

        p {
          color: #707070;
          transition: color 0.3s;

          &:first-of-type {
            flex: 0 0 1;
            font-size: 14px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          &:last-of-type {
            margin-left: 16px;
            font-size: 18px;
          }
        }
      }
    }
  }
}
</style>
