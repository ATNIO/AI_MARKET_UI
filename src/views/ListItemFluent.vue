<template>
  <section class="ListItemFluent">
    <el-row class="row">
      <el-col>
        <el-card :body-style="{ padding: '0px' }" class="card">
          <div class="img"><img src="../assets/icon-64.png" alt="" class="img"></div>
          
          <div class="detail">
            <h3 class="title">RANDOM FMAOUS QUOTES</h3> 
            <p class="describe">Get a random quote in JSON format.Current categories are:- fa mous-movies.</p>  
          </div>
          <div class="provider"> by ANDRUXNET</div>
            
          <span class="price">FREE</span>

          <div class="bottom">
            <div><span class="icon-user"></span><span>15442</span></div>
            <div><span class="icon-star"></span><span>15202</span></div>
            <div><span class="icon-arrow"></span><span>100%</span></div>
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
  // display: inline-flex;
  margin: 5em 5em;
  .img {
    display: inline-block;
    margin: 1em;
  }
  .detail {
    display: inline-block;
    height: 3em;
    line-height: 3em;
    .title {
      display: inline-block;
      width: 18em;
      height: 1em;
      line-height: 1em;
      margin: 0;
      font-size: 1.3rem;

      color: #705db1;
    }
    .describe {
    }
  }

  .provider {
    display: inline-block;
  }
  .price {
    display: inline-block;
  }
  .bottom {
    display: inline-block;
  }
}
</style>
