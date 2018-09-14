<template>
  <div class="progress-bar">
    <div class="progress-left" :style="{width:barwidth + '%'}"></div>
  </div>
</template>
<script>
export default {
  name: "ProgressBar",
  props: ["barwidth"]
};
</script>
<style lang="less" scoped>
.progress-bar {
  position: relative;
  height: 5px;
  width: 100%;
  background-color: #aaa;
  border-radius: 2px;
  .progress-left {
    position: absolute;
    height: 5px;
    width: 100%;
    background-color: #1000cc;
    border-radius: 2px;
    border: 1px solid #1000cc;
  }
}
</style>
