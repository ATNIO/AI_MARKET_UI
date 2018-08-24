<template>
  <div class="field">
    <parameter-input v-if="isInput || isArrayInput" :options="parameter"></parameter-input>
    <parameter-select v-else-if="isSelect" :options="parameter"></parameter-select>
    <parameter-file v-else-if="isFile" :options="parameter"></parameter-file>
  </div>
</template>

<script>
import ParameterInput from "./ParameterInput";
import ParameterSelect from "./ParameterSelect";
import ParameterFile from "./ParameterFile";

export default {
  name: "Field",
  components: { ParameterInput, ParameterSelect, ParameterFile },
  props: {
    parameter: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    type() {
      return this.parameter.type;
    },
    isInput() {
      return this.type === "string" || this.type === "integer";
    },
    isArrayInput() {
      return this.type === "array" && !this.parameter.items.enum;
    },
    isSelect() {
      return this.type === "array" && this.parameter.items.enum;
    },
    isFile() {
      return this.type === "file";
    }
  }
};
</script>

<style lang="less" scoped>
.field {
}
</style>
