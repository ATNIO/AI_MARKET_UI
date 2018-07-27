<template>
  <section class="ListItemGrid">
    <el-card :body-style="{ padding: '0px' }" class="card">
      <span class="icon-star star"></span><br>
      <h3 class="title">RANDOM FMAOUS QUOTES</h3>
      <div class="provider">
        <span class="icon-user"></span>
        <span>ANDRUXNET</span>
      </div>
      <div class="img">
        <img src="../assets/icon-64.png" alt="">
      </div>
      <p class="describe">
        Visit the Github wiki tab here to learn everything you need to know about how this starter project was built (which allows you to learn and rebuild this project from scratch if you want.
      </p>
      <span class="price">FREE</span>
      <div class="bottom">
        <div>
          <span class="icon-user"></span>
          <span>15442</span>
        </div>
        <div>
          <span class="icon-star"></span>
          <span>15202</span>
        </div>
        <div>
          <span class="icon-arrow"></span>
          <span>100%</span>
        </div>
      </div>
    </el-card>
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
.ListItemGrid {
  margin: 1em;

  & /deep/ .is-always-shadow {
    transition: all 0.2s;
    cursor: pointer;

    &:hover {
      transform: translate3d(0, -5px, 0);
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    }
  }
}

.card {
  width: 20em;

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
    [class^="icon-"] {
      margin-right: 5px;
    }
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
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
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
</style>
