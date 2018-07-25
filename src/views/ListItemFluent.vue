<template>
  <section class="ListItemFluent">
    <el-row class="row">
      <el-col>
        <el-card :body-style="{ padding: '0px' }">
          <div class="card">
            <div class="img-wrapper">
              <img src="../assets/icon-64.png" alt="">
            </div>
            
            <div class="detail">
              <h3 class="title">RANDOM FMAOUS QUOTES</h3> 
              <p class="describe">
                Get a random quote in JSON format.Current categories are:- fa mous-movies.
              </p>  
            </div>

            <div class="provider"> by ANDRUXNET</div>
              
            <div class="price">FREE</div>

            <div class="developers-follows-uptime">
              <div class="number">15442</div>
              <div>developers</div>

            </div>
            <div class="developers-follows-uptime">
              <div class="number">15202</div>
              <div>follows</div>

            </div>
            <div class="developers-follows-uptime">
              <div class="green number">100%</div>
              <div>uptime</div>

            </div>
            <span class="icon-star star"></span>
          </div>
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
  margin: 1em;
  .card {
    height: 10em;
    display: flex;
    align-items: center;
    width: 110em;

    .img-wrapper {
      margin: 0 2em;
    }
    .detail {
      width: 25em;
      height: 5xem;
      margin: 0 2em;

      .title {
        margin: 0 0 1em 0;
        font-size: 1.3rem;
        color: #705db1;
      }
      .describe {
        width: 20em;
        margin: 0;
        font-size: 0.8rem;
        color: #888888;
        line-height: 1.5;
      }
    }

    .provider {
      flex: 1;
      font-size: 1.3rem;
      color: #888888;
    }
    .price {
      flex: 1;
      font-size: 1.3rem;
      color: #705db1;
      text-align: center;
    }
    .developers-follows-uptime {
      width: 10em;
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
    .star[class^="icon-"] {
      text-align: center;
      margin: 0 2em;
      &::before {
        color: #7451dc;
        font-size: 2rem;
      }
    }
  }
}
</style>
