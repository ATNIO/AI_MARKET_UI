<template>
  <div class="model" :class="theme === 'dark' ? 'dark': 'normal'"></div>
</template>

<script>
import JSONSchemaView from "json-schema-view-js";

export default {
  name: "SchemaModel",
  props: {
    schema: {
      type: Object,
      default: () => ({})
    },
    theme: {
      type: String
    }
  },
  mounted() {
    this.$el.appendChild(
      new JSONSchemaView(this.schema, Infinity, { theme: this.theme }).render()
    );
  }
};
</script>

<style lang="less" scoped>
.model {
  margin-bottom: 24px;
  padding: 10px;
  border-radius: 4px;

  &.normal {
    background: rgba(0, 0, 0, 0.05);
  }

  &.dark {
    background: #42444e;
  }

  &:last-of-type {
    margin-bottom: 0;
  }
}
</style>
