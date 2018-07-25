<template>
  <section class="ListItemGrid">
    <el-row class="row">
      <el-col v-for="(o, index) in 3" :key="o" :offset="index > 0 ? 2 : 0">
      <!-- <el-col> -->
        <el-card :body-style="{ padding: '0px' }" class="card">
          <span class="icon-star star"></span><br>
          <span class="title">RANDOM FMAOUS QUOTES</span><br>
          <span class="provider">
            <span class="icon-user"></span>
            <span> ANDRUXNET</span>
          </span><br>
          <img src="../assets/icon-64.png" alt="">
          <div class="describe">
            <p>Get a random quote in JSON format.</p>
            <p>Current categories are:- fa mous-movies.</p>
          </div>
          <span class="price">FREE</span>
          <div class="bottom clearfix">
            <span class="icon-user"> 15442</span> 
            <span class="icon-star"> 15202</span>
            <span class="icon-arrow"> 100%</span>
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
    flex: 1;
    text-align: center;
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
      display: inline-block;
      margin: 2em 0 0 0;
    }
    .provider {
      display: inline-block;
      margin: 2em 0;
      color: #888888;
    }
    .describe {
      font-size: 0.8rem;
      color: #888888;
      margin: 4em 0 2em 0;
      p {
        margin: 0.3em;
      }
    }
    .price {
      width: 100%;
      height: 2.5em;
      line-height: 2.5em;
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
      span[class^="icon-"] {
        line-height: 2em;
        flex: 1;
        border-right: #ffffff 1px solid;
        &:last-of-type {
          border-style: none;
        }
        &::before {
          color: #ffffff;
        }
      }
    }
  }
}
</style>
