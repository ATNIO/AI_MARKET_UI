<template>
  <div class="model-item">
    <p class="item-name" v-if="itemName">{{ itemName }}</p>
  </div>
</template>

<script>
import JSONSchemaView from "json-schema-view-js";

export default {
  name: "ModelItem",
  props: {
    definition: {
      type: Object,
      default: () => ({})
    },
    itemName: {
      type: String
    }
  },
  mounted() {
    this.$el.appendChild(new JSONSchemaView(this.definition, 0).render());
  }
};
</script>

<style lang="less" scoped>
.model-item {
  margin-bottom: 24px;
  padding: 10px;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.05);

  &:last-of-type {
    margin-bottom: 0;
  }

  .item-name {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 16px;
  }
}
</style>
