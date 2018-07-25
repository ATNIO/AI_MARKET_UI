<template>
  <section class="ListItemGrid">
    <el-row class="row">
      <el-col v-for="(o, index) in 3" :key="o" :offset="index > 0 ? 2 : 0">
      <!-- <el-col> -->
        <el-card :body-style="{ padding: '0px' }" class="card">
          <span class="title">RANDOM FMAOUS QUOTES</span><br>
          <span class="provider">
            <span class="icon-user"></span>
            <span>ANDRUXNET</span>
          </span><br>
          <img src="../assets/icon-64.png" alt="">
          <p>Get a random quote in JSON format.</p>
          <p>Current categories are:- fa mous-movies.</p>
          <div>
            <span class="price">FREE</span>
            <div class="bottom clearfix">
                <span class="icon-users">number</span> 
                <span class="icon-star">like</span>
                <span class="icon-rise">100%</span>
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
.row {
  display: flex;
  margin: 5em 5em;
  .card {
    flex: 1;
    text-align: center;
    .title {
      color: #705db1;
      font-weight: 800;
      font-size: 1.3rem;
    }
    .price {
      width: 100%;
      display: block;
      text-align: center;
      background: #bebffe;
      color: #ffffff;
      font-size: 3rem;
    }
    .bottom {
      display: flex;
      background-color: #7f6fe7;
      span {
        flex: 1;
      }
    }
  }
}
</style>
