<template>
  <section class="ListItemFluent">
    <el-card :body-style="{ padding: '0px' }" shadow="hover">
      <div class="card">
        <div class="img-wrapper">
          <img src="../assets/icon-64.png" alt="">
        </div>
        
        <div class="detail">
          <h3 class="title">RANDOM FMAOUS QUOTES</h3> 
          <p class="describe">
            Visit the Github wiki tab here to learn everything you need to know about how this starter project was built (which allows you to learn and rebuild this project from scratch if you want.
          </p>  
        </div>

        <div class="provider">by ANDRUXNET</div>
          
        <div class="price">FREE</div>

        <div class="developers">
          <div class="number">15442</div>
          <div>developers</div>
        </div>

        <div class="follows">
          <div class="number">15202</div>
          <div>follows</div>
        </div>

        <div class="uptime">
          <div class="green number">100%</div>
          <div>uptime</div>
        </div>

        <span class="icon-star"></span>
      </div>
    </el-card>
  </section>
</template>

<script>
export default {
  name: "ListItemFluent"
};
</script>

<style lang="less" scoped>
.ListItemFluent {
  width: 100%;
  // max-width: 1600px;
  margin-top: 1em;
  cursor: pointer;

  .card {
    padding: 2em 1.5em;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #f7f6fe;

    .img-wrapper {
      width: 50px;
      height: 50px;

      img {
        width: 100%;
        height: 100%;
        vertical-align: bottom;
      }
    }

    .detail {
      width: 20em;
      height: 5rem;
      margin: 0 1em;

      .title {
        margin: 0 0 0.5em 0;
        font-size: 1.3rem;
        color: #705db1;
      }

      .describe {
        margin: 0;
        font-size: 0.8rem;
        color: #888888;
        line-height: 1.5;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
      }
    }

    .provider {
      margin-right: 1em;
      font-size: 1.3rem;
      color: #888888;
    }
    .price {
      font-size: 1.3rem;
      color: #705db1;
      text-align: center;
    }
    .developers,
    .follows,
    .uptime {
      // margin-right: 10px;
      text-align: center;
      color: #888888;

      .green {
        color: #27b80c;
      }

      .number {
        font-size: 1.5rem;
        margin-bottom: 8px;
      }
    }
    .icon-star {
      text-align: center;

      &::before {
        color: #7451dc;
        font-size: 2rem;
      }
    }
  }
}
</style>
