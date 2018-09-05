<template>
    <section class="detail">
        <div class="bg"></div>

        <div class="container">
            <div class="breadcrumb">
                <Breadcrumb separator=">">
                    <BreadcrumbItem to="/">{{data.name}}</BreadcrumbItem>
                    <BreadcrumbItem to="/detail">{{dbot.name}}</BreadcrumbItem>
                </Breadcrumb>
            </div>

            <div class="card">
                <!-- 左边logo和tag -->
                <div class="logo-tag">
                    <div class="wrapper">
                        <div class="logo" :style="logo"></div>
                        <span class="tagtitle"><Icon type="md-bookmark" color="#87C5FE"/> Tag:</span>
                        <ul class="tag">
                            <li v-for="item in dbot.tags" v-bind:key="item">
                                <span>{{item}}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- 右边详细 -->
                <div class="content">
                    <p class="name">{{dbot.name}}</p>
                    <p class="address">
                        <span>Address：{{dbot.addr}}</span>
                        <Icon
                                type="ios-copy-outline"
                                size="20"
                                v-clipboard:copyhttplist="dbot.addr"
                                v-clipboard:success="onCopy"
                        />
                    </p>
                    <p class="domain">
                        <span>Domain：{{dbot.domain}}</span>
                        <Icon
                                type="ios-copy-outline"
                                size="20"
                                v-clipboard:copyhttplist="dbot.domain"
                                v-clipboard:success="onCopy"
                        />
                    </p>
                    <p class="auther">
                        <span>{{dbot.owner}}</span>
                        <Icon
                                type="ios-copy-outline"
                                size="20"
                                v-clipboard:copyhttplist="dbot.owner"
                                v-clipboard:success="onCopy"
                        />
                    </p>
                    <p class="description">{{dbot.description}}</p>
                    <div class="like">
                        <p class="stars">
                            <Icon
                                    :type="visibleType"
                                    @click="_click()"
                                    size="20"
                            />
                            <span>{{this.likeCount}}</span>
                        </p>
                        <p class="update">update: {{dbot.update_at | timeFormat}}</p>
                    </div>
                </div>
            </div>


            <channel :dbot="dbot"></channel>


            <detail-container></detail-container>
        </div>
    </section>
</template>

<script>
import Swagger from "swagger-client";
import dayjs from "dayjs";
import { mapActions, mapGetters } from "vuex";

import data from "../mock/listData.js";
import Channel from "./Channel";

import DetailContainer from "./DetailContainer";

export default {
  name: "Detail",
  components: {
    Channel,
    "detail-container": DetailContainer
  },
  data() {
    return {
      detail: {},
      data: data[0],
      visible: false,
      likeCount: 0
    };
  },
  computed: {
    ...mapGetters(["addressInDetail", "dbots", "address"]),
    dbotAddress() {
      return this.$route.params.address;
    },
    logo() {
      return {
        backgroundImage: `url(${this.dbot.logo})`
      };
    },
    dbot() {
      return this.dbots.filter(item => this.dbotAddress === item.addr)[0];
    },
    visibleType() {
      return this.visible ? "ios-star" : "ios-star-outline";
    }
  },
  mounted() {
    this.fetch();
    this.getLikeVote();
    //this.likeCount=this.dbot().collect_count.upcount;

    // Swagger("https://petstore.swagger.io/v2/swagger.json").then(data => {
    //   this.setDocData({ data });
    // });
  },
  methods: {
    ...mapActions(["setDocData", "setDetailData"]),
    _click() {
      this.setLikeVote(!this.visible);
    },
    fetch() {
      const { getDetail } = this.$api.detail;

      if (this.dbotAddress === this.addressInDetail) return;

      this.setDocData({});

      this.$Spin.show();
      getDetail(this.dbotAddress)
        .then(res => {
          this.$Spin.hide();

          const { data, status } = res;
          const { addr, create_at, endpoints, update_at, specification } = data;

          if (status === 200) {
            this.setDetailData({ addr, create_at, endpoints, update_at });

            new Swagger({ spec: JSON.parse(specification.data) })
              .then(data => {
                console.log(data);
                this.setDocData({ data });
              })
              .catch(e => {
                console.log(e);
              });
          }
        })
        .catch(e => {
          this.$Spin.hide();
          console.log(e);
        });
    },
    onCopy() {
      this.$Message.success("Copy success.");
    },
    checkLogin(account) {
      if (account.replace(/(^\s*)|(\s*$)/g, "").length != 0) {
        return true;
      }
      return false;
    },
    async getLikeVote() {
      const user = this.address;
      if (!this.checkLogin(user)) {
        return;
      }
      const { getLikeVote } = this.$api.detail;
      const dbot = this.$route.params.address;
      const response = await getLikeVote(dbot, user);
      const { status, data } = response;
      if (status === 200) {
        this.visible = data.voted.upvoted;
        this.likeCount = data.count.upcount;
      }
    },
    async setLikeVote(value) {
      const user = this.address;
      if (!this.checkLogin(user)) {
        this.$Notice.error({
          title: "点评失败",
          desc: "请先登录! "
        });
        return;
      }
      const { setLikeVote } = this.$api.detail;
      const dbot = this.$route.params.address;
      const response = await setLikeVote(dbot, user, value);
      const { status, data } = response;
      if (status === 200 && data.err != false) {
        /*
        this.visible = value;
        if (value) {
          this.likeCount++;
        } else {
          this.likeCount--;
        }
        */
        this.getLikeVote();

        this.$Notice.success({
          title: "点评成功",
          desc: "您评价了该服务! "
        });
        this.visible = value;
      }
    }
  },
  filters: {
    timeFormat(time) {
      return dayjs(time).format("YYYY/MM/DD");
    }
  }
};
</script>

<style lang="less" scoped>
.detail {
  position: relative;

  .bg {
    border-top: 0.5px solid rgba(223, 223, 223, 0.3);
    background: linear-gradient(to right, #787af8, #88c6ff);
    display: flex;
    height: 480px;
    flex-direction: column;
    align-items: center;
  }

  .container {
    width: 1200px;
    margin: -480px auto 0;

    .breadcrumb {
      margin: 40px 0 20px;

      & /deep/ .ivu-breadcrumb a {
        font-size: 18px;
        color: #ffffff;
      }
    }

    .card {
      background: #ffffff;
      box-shadow: 3px 0 10px 0 rgba(200, 199, 232, 0.5);
      border-radius: 4px;
      width: 1200px;
      height: 300px;
      display: flex;
      margin-bottom: 14px;

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
          background-size: cover;
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
        }

        .address,
        .domain,
        .auther {
          display: flex;
          align-items: center;

          & /deep/ .ivu-icon {
            margin-left: 10px;
            cursor: pointer;
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
  }
}
</style>
