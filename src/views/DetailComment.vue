<template>
  <section class="comment">
    <div class="publish">
      <div class="content">
          <!-- 头像和input -->
          <div class="photo"></div>
          <Input class="input" type="textarea" :rows="9" placeholder="What do you think of this API?" />
      </div>
      <button class="button">发表评论</button>
    </div>

    <div class="history">
      <ul>
        <div v-for="(item, index) in data" :key="index" :item="item">
          <div class="content">
            <div class="photo"></div>
            <div class="wrapper">
              <span class="name">{{item.reviewer}}</span><span class="time">{{item.time}}</span>
              <p class="details">{{item.details}}</p>
            </div>            
          </div>
        </div>  
      </ul>  
    </div>
  </section>
</template>

<script>
import data from "../mock/listData.js";
export default {
  data() {
    return {
      data
    };
  }
};
</script>
<style lang="less" scoped>
.comment {
  width: 1200px;
  height: 1400px;
  background: #ffffff;
  box-shadow: 3px 0 10px 0 rgba(200, 199, 232, 0.5);
  border-radius: 4px;

  .publish {
    width: 1160px;
    height: 335px;
    border-bottom: 1px solid #dfdfdf;
    margin-left: 20px;

    .content {
      display: flex;
      flex-direction: row;
      justify-content: center;
      padding-top: 40px;

      .photo {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        margin-right: 20px;
        background: rgba(149, 149, 149, 0.5);
      }
      .input {
        width: 690px;
        border: 1px solid #787bf7;
        border-radius: 4px;
        margin-bottom: 15px;
      }
    }
    .button {
      width: 120px;
      height: 40px;
      background: #797bf8;
      border-radius: 4px;
      font-size: 16px;
      color: #ffffff;
      margin-left: 848px;
    }
  }

  .history {
    display: flex;
    flex-direction: row;
    padding-top: 40px;
    padding-left: 220px;

    .photo {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      margin-right: 20px;
      background: rgba(149, 149, 149, 0.5);
    }
    .content {
      display: flex;
      flex-direction: row;
      margin-bottom: 40px;

      .name {
        font-size: 14px;
        color: #11124c;
        margin-right: 15px;
      }
      .time {
        font-size: 11px;
        color: #9c9c9c;
      }
      .details {
        font-size: 16px;
        color: #727272;
      }
    }
  }
}
</style>
