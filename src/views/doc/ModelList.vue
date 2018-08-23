<template>
  <section class="model-list">
    <h3>Model</h3>
    <model-item 
      v-for="(definition, key) in definitions" 
      :key="key"
      :itemName="key"
      :definition="definition"
    ></model-item >
  </section>
</template>

<script>
import ModelItem from "./ModelItem";

export default {
  name: "ModelList",
  components: { ModelItem },
  props: {
    definitions: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>

<style lang="less" scoped>
.model-list {
  margin-top: 40px;

  h3 {
    margin-bottom: 30px;
    padding-left: 16px;
    font-size: 20px;
    font-weight: 500;
    color: #87c5fe;
    border-left: 4px solid #87c5fe;
    line-height: 1;
  }
}
</style>
