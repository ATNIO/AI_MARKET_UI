<template>
  <Select v-model="defaultValue" :multiple="isMulti" style="width:100%">
    <Option v-for="item in enumArray" :value="item" :key="item">{{ item }}</Option>
  </Select>
</template>

<script>
export default {
  name: "ParameterSelect",
  data() {
    return {
      defaultValue: ""
    };
  },
  props: {
    options: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    enumArray() {
      return this.options.items.enum;
    },
    isMulti() {
      return this.options.collectionFormat === "multi";
    }
  },
  mounted() {
    this.defaultValue = this.options.default || this.enumArray[0];
  }
};
</script>
