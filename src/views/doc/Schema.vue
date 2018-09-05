<template>
  <section class="schema-wrapper">
    <div class="view-change">
      <span :class="{ dark: currentView === 0 }" @click="currentView = 0">Example Value</span>
      <span>&#8739;</span>
      <span :class="{ dark: currentView === 1 }" @click="currentView = 1">Model</span>
    </div>
    <Input 
      v-if="currentView === 0"
      :value="jsonData" 
      type="textarea" 
      autosize
      placeholder="Enter something..."
      :disabled="!isEditable"
      :class="{ dark: theme === 'dark' }"
      v-on:on-change="valueChange"
    />
    <schema-model v-else :schema="schema" :theme="theme"></schema-model>
  </section>
</template>

<script>
import SchemaModel from "./SchemaModel";

function schema2json(schema) {
  const obj = {};

  for (let key in schema) {
    const item = schema[key];

    if (schema.hasOwnProperty(key)) {
      if (item.type === "object") {
        obj[key] = schema2json(item.properties);
      } else if (item.type === "array") {
        obj[key] = item.example || [schema2json(item.items.properties)];
      } else if (item.type === "integer") {
        obj[key] = 0;
      } else if (item.type === "string") {
        obj[key] =
          item.example ||
          item.default ||
          (item.enum && item.enum[0]) ||
          item.type;
      }
    }
  }

  return obj;
}

export default {
  name: "Schema",
  components: { SchemaModel },
  data() {
    return {
      currentView: 0
    };
  },
  props: {
    schema: {
      type: Object,
      default: () => ({})
    },
    isEditable: {
      type: Boolean,
      default: true
    },
    theme: {
      type: String
    }
  },
  computed: {
    jsonData() {
      const { properties, type, items } = this.schema;
      const jsonData = schema2json(
        type === "array" ? items.properties : properties
      );

      return JSON.stringify(type === "array" ? [jsonData] : jsonData, null, 2);
    }
  },
  methods: {
    valueChange(e) {
      this.$emit("input", e.target.value);
    }
  }
};
</script>

<style lang="less" scoped>
.schema-wrapper {
  & /deep/ textarea {
    font-size: 14px;
    color: #0d0628;
    line-height: 1.5;
  }

  .dark /deep/ textarea {
    background: #42444e;
    color: #fff;
  }

  & /deep/ .ivu-input[disabled] {
    cursor: text;
  }

  .view-change {
    margin-bottom: 10px;
    cursor: pointer;

    span {
      margin: 0 4px;
      font-size: 12px;

      &.dark {
        cursor: text;
        color: #0d0628;
      }
    }
  }
}
</style>
