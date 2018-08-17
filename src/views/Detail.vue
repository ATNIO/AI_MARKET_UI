<template>
  <section class="detail">

    <div class="bg">
      <div class="card">
        <!-- 左边logo和tag -->
        <div class="logo-tag">
          <div class="wrapper">
            <div class="logo" :style="logo"></div>
            <span class="tagtitle"><Icon type="md-bookmark" color="#87C5FE"/> Tag:</span>
            <ul class="tag">
              <li v-for="item in data.tag" v-bind:key="item">
              <span>{{item}}</span>
              </li>
            </ul>
          </div>
          
        </div>


        <!-- 右边详细 -->
        <div class="content">
          <p class="name">{{data.name}} <span class="status">online</span> </p>
          <p class="address">Address：{{data.address}} <Icon type="ios-copy-outline" size="18"/></p>
          <p class="domain">Domain：{{data.domain}} <Icon type="ios-copy-outline" size="18"/></p>
          <Icon type="ios-contact" size="32"/><span class="auther"> {{data.auther}} <Icon type="ios-copy-outline" size="17"/></span>
          <p class="description">{{data.description}}</p>
          <div class="like">
            <p class="stars">
              <Icon type="ios-star-outline" size="20"/>
              <span>{{data.stars}}</span>
            </p>
            <p class="created">created: {{data.createdTime}}</p>
            <p class="update">update: {{data.updataTime}}</p>
          </div>
        </div>  





        
      </div>
    </div>

    
    
    
    
    
    
    
    <div class="channel">
      这里两个组件
    </div>

    <detail-container></detail-container>

  </section>
</template>

<script>
import Swagger from "swagger-client";
import { mapActions } from "vuex";

import data from "../mock/listData.js";

import DetailContainer from "./DetailContainer";

export default {
  name: "Detail",
  components: {
    "detail-container": DetailContainer
  },
  data() {
    return {
      detail: {},
      data: data[0]
    };
  },
  computed: {
    address() {
      return this.$route.params.address;
    },
    logo() {
      return {
        backgroundImage: `url(${data[0].logoUrl})`
      };
    }
  },
  mounted() {
    Swagger("https://petstore.swagger.io/v2/swagger.json").then(data => {
      this.setDocData({ data });
    });

    // this.fetch({ address: this.address });
  },
  methods: {
    ...mapActions(["setDocData"]),
    fetch() {}
  }
};
</script>

<style lang="less" scoped>
.bg {
  border-top: 0.5px solid rgba(223, 223, 223, 0.3);
  background: linear-gradient(to right, #787af8, #88c6ff);
  display: flex;
  height: 480px;
  justify-content: center;

  .card {
    background: #ffffff;
    box-shadow: 3px 0 10px 0 rgba(200, 199, 232, 0.5);
    border-radius: 4px;
    width: 1200px;
    height: 300px;
    margin-top: 86px;
    display: flex;

    // 左边
    .logo-tag {
      display: flex;
      margin: 30px 0 0 40px;

      .logo {
        width: 267px;
        height: 156px;
        background-repeat: no-repeat;
        background-position: center center;
        background-color: #f7f6fe;
        background-size: 50% 40%;
        margin-bottom: 20px;
      }
      .tagtitle {
        font-size: 12px;
        color: #7d7d7d;
        display: inline-block;
        margin-bottom: 5px;
      }
      .tag {
        list-style: none;
        font-size: 12px;
        color: #aaaaaa;
        width: 270px;

        li {
          border: 0.5px solid #aaaaaa;
          display: inline-block;
          padding: 0 8px;
          margin-right: 7px;
          margin-bottom: 5px;
          text-align: center;
        }
      }
    }
  }

  // 右边
  .content {
    display: inline;
    margin: 30px 0 22px 40px;
    letter-spacing: 0;
    position: relative;

    .name {
      font-size: 24px;
      color: #11124c;
      margin-bottom: 10px;
      align-items: center;

      .status {
        margin-left: 15px;
        font-size: 12px;
        color: #ffffff;
        padding: 4px 10px;
        background: #00d85a;
        border-radius: 2px;
      }
    }
    .address {
      font-size: 18px;
      color: #11124c;
      margin-bottom: 10px;
    }
    .domain {
      font-size: 18px;
      color: #11124c;
      margin-bottom: 20px;
    }
    .auther {
      font-size: 14px;
      color: #000000;
      align-items: center;
    }
    .description {
      width: 800px;
      margin-top: 25px;
      font-size: 14px;
      color: #5a5a5a;
      text-align: justify;
      line-height: 1.5;
    }
    .like {
      position: absolute;
      top: 0;
      right: 0;

      .stars {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-bottom: 10px;

        span {
          padding-top: 2px;
          line-height: 1;
        }
      }
      .created {
        margin-bottom: 5px;
        display: flex;
        justify-content: flex-end;
      }
      .updata {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}
</style>
