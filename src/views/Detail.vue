<template>
    <section class="detail">
        <div class="bg"></div>

        <div class="container">
            <div class="breadcrumb">
                <Breadcrumb separator=">">
                    <BreadcrumbItem to="/" class="current-item">{{currentItem | upperFirst }}</BreadcrumbItem>
                    <BreadcrumbItem :to=dbot.addr>{{dbot.name}}</BreadcrumbItem>
                </Breadcrumb>
            </div>

            <div class="card">
                <!-- 左边logo和tag -->
                <div class="logo-tag">
                    <div class="wrapper">
                        <div class="logo">
                          <img :src="logo" alt="" class="image">
                        </div>

                        <span class="tagtitle"><Icon custom="icon-tag" color="#87C5FE"/> Tag:</span>
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
                                custom="i-icon icon-copy"
                                size="20"
                                v-clipboard:copyhttplist="dbot.addr"
                                v-clipboard:success="onCopy"
                        />
                    </p>
                    <p class="domain">
                        <span>Domain：{{dbot.domain}}</span>
                        <Icon
                                custom="i-icon icon-copy"
                                size="20"
                                v-clipboard:copyhttplist="dbot.domain"
                                v-clipboard:success="onCopy"
                        />
                    </p>
                    <p class="auther">
                        <avatar
                          :text="dbot.owner && dbot.owner.toLowerCase()"
                          :width="32"
                          :height="32"
                        ></avatar>
                        <span>{{dbot.owner}}</span>
                        <Icon
                                custom="i-icon icon-copy"
                                size="20"
                                v-clipboard:copyhttplist="dbot.owner"
                                v-clipboard:success="onCopy"
                        />
                    </p>
                    <p class="description">{{dbot.description}}</p>
                    <div class="like">
                        <p class="stars">
                            <Icon
                                    :custom="visibleType"
                                    @click="_click()"
                                    size="20"
                                    color="#797bf8"
                            />
                            <span class="star-count">{{dbot.collect_count.upcount}}</span>
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
import Channel from "./Channel.vue";
import DetailContainer from "./DetailContainer";
import { upperFirst } from "lodash";

export default {
  name: "Detail",
  components: {
    Channel,
    "detail-container": DetailContainer
  },
  data() {
    return {
      detail: {},
      visible: false,
      likeCount: 0
    };
  },
  computed: {
    ...mapGetters(["dbotDetail", "dbots", "address", "currentItem"]),
    dbotAddress() {
      return this.$route.params.address;
    },
    // logo() {
    //   return {
    //     backgroundImage: `url(${this.dbot.logo})`
    //   };
    // },
    logo() {
      if (this.dbot.outdate) {
        const logostr = this.dbot.logo;
        return logostr.substring(0, logostr.length - 4) + "-offline.png";
      }
      return this.dbot.logo;
    },
    dbot() {
      return this.dbotDetail;
    },
    visibleType() {
      return this.visible ? "icon-star" : "icon-unstar";
    }
  },
  created() {
    this.fetch();
    this.getLikeVote();
  },
  methods: {
    ...mapActions(["setDocData", "setDetailData"]),
    _click() {
      this.setLikeVote(!this.visible);
    },
    fetch() {
      const { getDetail } = this.$api.detail;

      if (this.dbotAddress === this.dbotDetail.addr) return;

      this.setDocData({});

      this.$Spin.show();
      getDetail(this.dbotAddress)
        .then(res => {
          this.$Spin.hide();

          const { data, status } = res;
          const { specification } = data;
          if (status === 200) {
            this.setDetailData(data);

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
    },
    upperFirst(value) {
      return value ? upperFirst(value) : "";
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

      .current-item {
        font-weight: 600;
      }

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
          width: 280px;
          height: 150px;
          margin-bottom: 25px;
          display: flex;
          justify-content: center;
          align-items: center;
          .image {
            width: 100%;
          }
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

          .avatar {
            border-radius: 100%;
            overflow: hidden;
            box-shadow: none;
            margin-right: 8px;
          }

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
            .star-count {
              margin-left: 4px;
            }

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
