<template>
  <section class="ListItemFluent">
    <el-row class="row">
      <el-col v-for="(o, index) in 1" :key="o" :offset="index > 0 ? 2 : 0">
        <el-card :body-style="{ padding: '0px' }" class="card">
          <img src="../assets/icon-64.png" alt="" class="img">
          
          <span class="title">RANDOM FMAOUS QUOTES</span> 
          <span class="describe">
            <span>Get a random quote in JSON format.</span>
            <span>Current categories are:- fa mous-movies.</span>
          </span>  

          <span class="provider"> by ANDRUXNET</span>
            
          <span class="price">FREE</span>

          <div class="bottom clearfix">
            <span class="icon-user"> 15442</span> 
            <span class="icon-star"> 15202</span>
            <span class="icon-arrow"> 100%</span>
          </div>

          <span class="icon-star star"></span>
        </el-card>
      </el-col>
    </el-row>
    
  </section>
</template>

<script>
export default {
  name: "ListItemFluent"
};
</script>

<style lang="less" scoped>
.row {
  display: flex;
  margin: 5em 5em;
  .img {
    flex: 1;
  }
  .title {
    flex: 1;
  }
  .describe {
    flex: 1;
  }
  .provider {
    flex: 1;
  }
  .price {
    flex: 1;
  }
  .bottom {
    flex: 1;
  }
}
</style>
