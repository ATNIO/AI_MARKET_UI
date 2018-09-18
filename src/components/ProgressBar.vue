<template>
  <div class="wrapper-progress">
    <div class="progress-bar">
      <div class="progress-error" :style="{width:percent + '%'}" v-if="status==='wrong'"></div>
      <div class="progress-success" :style="{width:percent + '%'}" v-else-if="percent==100"></div>
      <div class="progress-active" :style="{width:percent + '%'}" v-else></div>
    </div>
    <div class="show-percent" :style="{'margin-left': percent + '%'}">
      <!--<img src="../assets/icon-32.png">-->
      {{percent}}%
    </div>
  </div>
</template>
<script>
export default {
  name: "ProgressBar",
  props: ["percent", "status"]
};
</script>
<style lang="less" scoped>
.wrapper-progress {
  position: relative;
  width: 100%;
  .show-percent {
    position: relative;
    margin-left: 0px;
  }
  .progress-bar {
    position: relative;
    height: 5px;
    width: 100%;
    background-color: #aaa;
    border-radius: 2px;
    .progress-error {
      position: absolute;
      height: 5px;
      width: 100%;
      background-color: #ff0000;
      border-radius: 2px;
      border: 1px solid #ff0000;
    }
    .progress-active {
      position: absolute;
      height: 5px;
      width: 100%;
      background-color: #1000cc;
      border-radius: 2px;
      border: 1px solid #1000cc;
    }
    .progress-success {
      position: absolute;
      height: 5px;
      width: 100%;
      background-color: #01ff00;
      border-radius: 2px;
      border: 1px solid #01ff00;
    }
  }
}
</style>
