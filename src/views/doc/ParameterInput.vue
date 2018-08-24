// text , textarea, time picker, number
<template>
  <div class="input-wrapper">
    <Input 
      :name="options.name"
      v-if="options.type === 'string' || options.type === 'array'"
      :placeholder="placeholder" 
      style="width: 100%" 
    />
    <InputNumber 
      v-else-if="options.type === 'integer'" 
      :placeholder="placeholder"
      style="width: 100%" 
    ></InputNumber>
  </div>
</template>


<script>
export default {
  name: "ParameterInput",
  props: {
    options: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    placeholder() {
      const { name, description } = this.options;

      return `${name}${description ? " - " + description : ""}`;
    }
  }
};
</script>
