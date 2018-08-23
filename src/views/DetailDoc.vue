<template>
  <section class="doc" v-show="show">
    <endpoint-list :endpoints="endpoints" v-on:changeCurrent="changeCurrent"></endpoint-list>
    <doc-content :spec="spec" :endpoint="endpoints[current]"></doc-content>
  </section>
</template>

<script>
import { isEmpty } from "lodash";
import { mapGetters } from "vuex";

import EndpointList from "./doc/EndpointList";
import Content from "./doc/Content";

export default {
  name: "DetailDoc",
  components: {
    "endpoint-list": EndpointList,
    "doc-content": Content
  },
  data() {
    return {
      current: 0
    };
  },
  computed: {
    ...mapGetters(["docData"]),
    spec() {
      return this.docData.spec || {};
    },
    show() {
      return !isEmpty(this.spec);
    },
    paths() {
      return this.spec.paths;
    },
    endpoints() {
      const paths = this.paths;
      const endpoints = [];

      if (!paths) return [];

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
    content() {
      if (!this.paths) return {};

      const endpoint = this.endpoints[this.current];
      const { path, type } = endpoint;

      return this.paths[path][type];
    }
  },
  methods: {
    _click(index) {
      this.current = index;
    },
    changeCurrent(index) {
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

  article {
    flex: 1;
    margin-left: 20px;
  }
}
</style>
