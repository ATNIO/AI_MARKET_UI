<template>
    <section class="comment">
        <div class="publish">
            <div class="content">
                <!-- 头像和input -->
                <div class="photo">
                    <avatar :width="60" :height="60" :margin-right="20" :text="userAddress"></avatar>
                    <!--
                    <span>{{ userAddress }}</span>
                    -->
                </div>
                <Input class="input" type="textarea" :autosize="{minRows: 9,maxRows: 9}"
                       placeholder="What do you think of this API?" v-model="message"
                       v-bind:maxlength="200"/>
            </div>
            <button class="button" v-on:click="addComment">发表评论</button>
        </div>

        <div class="history">
            <ul>
                <div v-for="(item, index) in currentComments" :key="index" :item="item">
                    <template>
                        <Card>
                            <div class="content">
                                <div class="photo">
                                    <avatar :width="60" :height="60" :margin-right="20"
                                            :text="item.usraddr"></avatar>
                                </div>
                                <div class="wrapper">
                                    <span class="name">{{item.usraddr}}</span><span class="time"> {{item.create_at | timeFormat}}</span>
                                    <p class="details">{{item.content}}</p>
                                </div>
                            </div>
                        </Card>
                    </template>
                </div>
            </ul>
        </div>
        <Page
                v-show = "currentComments != ''"
                class-name="page"
                :total="currentCommentsCount"
                show-total
                :current="currentCommentsPage"
                :page-size="LIMIT"
                v-on:on-change="changePage"/>

    </section>
</template>

)
<script>
import { mapActions, mapGetters } from "vuex";
import dayjs from "dayjs";

const LIMIT = 5;

export default {
  name: "DetailComment",
  computed: {
    ...mapGetters([
      "currentComments",
      "currentCommentsPage",
      "currentCommentsCount",
      "address"
    ]),
    userAddress() {
      return this.address.toLowerCase();
    }
  },
  mounted() {
    //this.setCurrentCommentsPage(1);
    //this.setCurrentComments(0, []);
    this.comments(1, LIMIT);
  },
  methods: {
    ...mapActions(["setCurrentComments", "setCurrentCommentsPage"]),
    comments(page, limit) {
      const { getComments } = this.$api.detail;

      var dbotAddr = this.$route.params.address;
      //var page = this.currentCommentsPage
      getComments(dbotAddr, page, limit).then(res => {
        const { data, status } = res;
        if (status === 200) {
          const { count, comments } = data;
          this.setCurrentComments({ count, comments });
        }
      });
    },
    tolowcase(addr) {
      return addr.toLowerCase();
    },
    addComment() {
      const account = this.address;
      if (account.replace(/(^\s*)|(\s*$)/g, "").length == 0) {
        this.$Notice.error({
          title: "评论失败",
          desc: "请登录账号后操作! "
        });
        return;
      }
      if (this.message.replace(/(^\s*)|(\s*$)/g, "").length == 0) {
        this.$Notice.error({
          title: "评论失败",
          desc: "请输入有效信息! "
        });
        return;
      }
      const { addComments } = this.$api.detail;
      const dbotAddr = this.$route.params.address;
      const user = this.address;
      addComments(dbotAddr.toLowerCase(), user, this.message).then(res => {
        const { status, data } = res;
        console.log(data);
        if (status === 200 && data.err != false) {
          this.comments(1, LIMIT);
          this.message = " ";
          this.addCommentSucc(false);
        } else {
          this.$Notice.error({
            title: "评论失败",
            desc: "请登录账号后操作! "
          });
        }
      });
    },
    addCommentSucc(nodesc) {
      this.$Notice.success({
        title: "评论成功",
        desc: nodesc ? "" : "您发表了一条评论! "
      });
    },
    changePage(page) {
      this.setCurrentCommentsPage(page);
      this.comments(page, LIMIT);
    }
  },
  data() {
    return {
      LIMIT: LIMIT,
      message: ""
    };
  },
  filters: {
    timeFormat(time) {
      return dayjs(time).format("YYYY/MM/DD HH:mm:ss");
    }
  }
};
</script>
<style lang="less" scoped>
.comment {
  width: 1200px;
  // height: 1400px;
  background: #ffffff;
  box-shadow: 3px 0 10px 0 rgba(200, 199, 232, 0.5);
  border-radius: 4px;

  .publish {
    width: 1160px;
    // height: 335px;
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
      margin-bottom: 40px;
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
      margin-bottom: 10px;

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
        word-wrap: break-word;
        font-size: 16px;
        color: #727272;
        width: 690px;
      }
    }
  }

  .page {
    margin-top: 33px;
    display: flex;
    justify-content: center;
    padding-bottom: 40px;
  }
}
</style>
