<template>
  <div class="field">
    
    <parameter-select v-if="isSelect" :options="parameter"></parameter-select>
    <parameter-file v-else-if="isFile" :options="parameter"></parameter-file>
    <parameter-input v-else :options="parameter"></parameter-input>
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
    isSelect() {
      return this.parameter.enum;
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
