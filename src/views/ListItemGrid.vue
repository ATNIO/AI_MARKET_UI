<template>
  <section class="ListItemGrid">
    <el-row class="row">
      <el-col v-for="(o, index) in 4" :key="o" :offset="index > 0 ? 1 : 0">
      <!-- <el-col> -->
        <el-card :body-style="{ padding: '0px' }" class="card">
          <span class="icon-star star"></span><br>
          <h3 class="title">RANDOM FMAOUS QUOTES</h3>
          <div class="provider">
            <span class="icon-user"></span>
            <span> ANDRUXNET</span>
          </div>
          <div class="img"><img src="../assets/icon-64.png" alt=""></div>
          <p class="describe">Get a random quote in JSON format.Current categories are:- fa mous-movies.</p>
          <span class="price">FREE</span>
          <div class="bottom">
            <div><span class="icon-user"></span><span>15442</span></div>
            <div><span class="icon-star"></span><span>15202</span></div>
            <div><span class="icon-arrow"></span><span>100%</span></div>
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
.row {
  display: flex;
  margin: 5em 5em;
  .card {
    width: 20em;
    flex: 1;
    .star {
      background: linear-gradient(to bottom right, #a284f5, #4a86f4);
      color: #ffffff;
      float: right;
      padding: 0.5em 0.5em;
    }
    .title {
      color: #705db1;
      font-weight: 800;
      font-size: 1.3rem;
      display: block;
      margin: 1.5em 0 1em 0;
      text-align: center;
    }
    .provider {
      display: block;
      text-align: center;
      margin: 0 0 1.5em 0;
      color: #888888;
    }
    .img {
      display: block;
      text-align: center;
    }
    .describe {
      font-size: 0.8rem;
      color: #888888;
      padding: 0 1.5em;
      line-height: 1.5;
    }
    .price {
      width: 100%;
      height: 2em;
      line-height: 2em;
      display: block;
      text-align: center;
      background: linear-gradient(to right, #99c6fa, #bebffe);
      color: #ffffff;
      font-size: 1.3rem;
    }
    .bottom {
      display: flex;
      background-color: #7f6fe7;
      height: 2em;
      color: #ffffff;
      div {
        line-height: 2em;
        flex: 1;
        border-right: #ffffff 1px solid;
        text-align: center;
        &:last-of-type {
          border-style: none;
        }
      }
      [class^="icon-"] {
        margin-right: 5px;
        &::before {
          color: #ffffff;
        }
      }
    }
  }
}
</style>
