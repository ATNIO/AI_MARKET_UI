<template>
  <section class="ListItemGrid">
    <h1>你还是个人吗</h1>
    <el-row>
    <el-col :span="8" v-for="(o, index) in 1" :key="o" :offset="index > 0 ? 2 : 0">
    <el-card :body-style="{ padding: '0px' }">
      <img src="../assets/icon-128.png" class="image">
      <div>
        <span class="price">FREE</span>
        <div class="bottom clearfix">
          
          <div class="lastLine">
            <span>number</span> 
            <span>like</span>
            <span>100%</span>
          </div>

        </div>
      </div>
    </el-card>
  </el-col>
</el-row>
  </section>
</template>

<script>
export default {
  name: "ListItemGrid",
  data() {
    return {
      // currentDate: new Date()
    };
  }
};
</script>

<style lang="less" scoped>
.image {
  display: block;
}
.price {
  width: 100%;
  display: block;
  text-align: center;
  background: #bebffe;
  color: #ffffff;
  font-size: 3rem;
}
</style>
