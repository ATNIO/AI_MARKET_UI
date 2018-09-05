<template>
  <section class="parameters">
    <h3>
      Parameters
      <span class="note">
        (<span style="color: red">&#8727;</span> is required)
      </span>
    </h3>
    <div v-if="param.length === 0" class="no-parameter">
      <span>No parameter</span>
    </div>
    <div v-else class="re-header">
      <p>Name</p>
      <p>Description</p>
    </div>
    <div class="parameters-content">
      <parameter-form ref="form" :param="param"></parameter-form>
    </div>
    <div class="action-bar">
      <span>{{ price | priceFormat }} ATN</span>
      <Button 
        :loading="isLoading" 
        type="primary" 
        :disabled="isDeprecated" 
        @click="callAi"
      >Sign Balance to Execute API</Button>
    </div>
    <div class="clear-btn" v-if="serverRes">
      <Button @click="clear">Clear</Button>
    </div>
  </section>
</template>

<script>
import Atn from "atn-js";
import { mapGetters, mapActions } from "vuex";
import BN from "bignumber.js";

import ParameterForm from "./ParameterForm";

const atn = new Atn(window.atn3);
const CACHE_KEY = "DETAIL_STATE_CHANNEL";

function getOptions(model) {
  const headers = {};
  const path = {}; // TODO: 这个还不知道怎么处理
  const query = {};
  const formdata = new FormData();
  let body = {};

  let isbody = false;
  let isFormdata = false;

  for (let key in model) {
    if (model.hasOwnProperty(key)) {
      const { value, pt, nt } = model[key];

      switch (pt.toLowerCase()) {
        case "header":
          headers[key] = value;
          break;
        case "path":
          path[key] = value;
          break;
        case "query":
          query[key] = value;
          break;
        case "body":
          isbody = true;
          body = JSON.parse(value);
          break;
        case "formdata":
          isFormdata = true;
          if (nt === "file") {
            value.map(item => {
              formdata.append(key, item.file);
            });
          } else {
            formdata.append(key, value);
          }
          break;
        default:
          break;
      }
    }
  }

  return {
    headers,
    params: query,
    data: isbody ? body : isFormdata ? formdata : {}
  };
}

export default {
  name: "Parameters",
  components: { ParameterForm },
  data() {
    return {
      parameterModel: {},
      isLoading: false
    };
  },
  props: {
    param: {
      type: Array,
      default: () => []
    },
    isDeprecated: {
      type: Boolean,
      default: false
    },
    price: {
      type: String,
      default: "0"
    },
    method: {
      type: String,
      default: "GET"
    },
    uri: {
      type: String,
      default: ""
    }
  },
  computed: {
    ...mapGetters(["address", "stateChannel", "serverRes"]),
    parametersType() {
      return this.param.map(parameter => parameter.in).reduce((pre, cur) => {
        pre.includes(cur) || pre.push(cur);

        return pre;
      }, []);
    },
    parametersRender() {
      return this.param.reduce((pre, cur) => {
        pre[cur.in] ? pre[cur.in].push(cur) : (pre[cur.in] = [cur]);

        return pre;
      }, {});
    },
    dbotAddr() {
      return this.$route.params.address;
    },
    cacheKey() {
      return this.address + "_" + this.dbotAddr;
    },
    stateChannelStatus() {
      const dbotStateChannel = this.stateChannel[this.cacheKey];

      if (!dbotStateChannel) return "close";

      return dbotStateChannel.status;
    }
  },
  watch: {
    param: {
      immediate: true,
      handler(val) {
        this.parameterModel = this.param.reduce((pre, cur) => {
          pre[cur.name] = "";

          return pre;
        }, {});
      }
    }
  },
  methods: {
    ...mapActions(["setStateChannel", "setServerRes"]),
    checkBeforeCall() {
      if (!this.address) {
        this.$Notice.warning({
          title: "未登录",
          desc: "您需要使用您的ATN钱包登录"
        });
        return false;
      }

      if (this.stateChannelStatus === "close") {
        this.$Notice.warning({
          title: "未检测到 state channel",
          desc: "您需要打开一个 state channel，以便成功调用该 API"
        });
        return false;
      }

      if (this.stateChannelStatus !== "synced") {
        this.$Notice.warning({
          title: "state channel 尚未准备好",
          desc: "state channel 正在打开或者正在同步数据，请稍后再试"
        });
        return false;
      }

      return true;
    },
    clear() {
      this.setServerRes(null);
    },
    async callAi() {
      if (!this.checkBeforeCall()) return;

      this.isLoading = true;

      const paramsModel = this.$refs.form.paramModel;
      const options = getOptions(paramsModel);

      options.method = this.method;
      let callResult = null;

      try {
        callResult = await atn.callAPI(
          this.dbotAddr,
          this.method,
          this.uri,
          options,
          this.address
        );

        this.isLoading = false;

        const { status, msg, data } = callResult;

        if (status === 200) {
          this.setServerRes(data);
        } else {
          this.$Message.error(msg);
        }
      } catch (e) {
        console.error("call ai:", e);
        this.$Message.error(e);
      }

      this.getChannelDetail();
    },
    async getChannelDetail() {
      let channelDetail = null;

      this.setStateChannel({
        status: "syncing",
        storeKey: this.cacheKey
      });

      try {
        channelDetail = await atn.getChannelDetail(this.dbotAddr, this.address);
      } catch (e) {
        console.error("getChannelDetail catch:", e);

        return "error";
      }

      console.log("channelDetail:", channelDetail);

      if (!channelDetail) {
        // TODO: 判断 getChannelDetail 返回结果
        console.error("getChannelDetail:", channelDetail);
      }

      const { deposit, balance } = channelDetail;
      const depositComputed = new BN(deposit, 10)
        .minus(new BN(balance, 10))
        .toString(10);

      this.setStateChannel({
        status: "synced",
        balance: depositComputed,
        storeKey: this.cacheKey
      });
    }
  }
};
</script>


<style lang="less" scoped>
.parameters {
  h3 {
    margin-bottom: 30px;
    padding-left: 16px;
    font-size: 20px;
    font-weight: 500;
    color: #87c5fe;
    border-left: 4px solid #87c5fe;
    line-height: 1;

    .note {
      font-size: 14px;
      color: #ccc;
    }
  }

  .re-header {
    padding-bottom: 16px;
    display: flex;
    align-items: center;
    border-bottom: thin solid #dfdfdf;

    p {
      font-size: 14px;
      color: #727272;

      &:first-of-type {
        flex: 1;
      }

      &:last-of-type {
        width: 650px;
      }
    }
  }

  .no-parameter {
    margin-top: 16px;
    font-size: 16px;
  }

  &-content {
    h4 {
      margin-top: 16px;
      font-size: 20px;
      color: #11124c;
    }

    .parameters-list {
      padding-left: 16px;
      list-style: none;
    }

    .parameters-item {
      margin-top: 25px;
      display: flex;

      .key {
        flex: 1;

        p {
          line-height: 1;

          &.required {
            &:after {
              content: "\2217";
              color: red;
              vertical-align: text-top;
            }
          }

          &:first-of-type {
            margin-bottom: 8px;
            font-size: 18px;
            color: #11124c;
          }

          &:last-of-type {
            font-size: 12px;
            color: #727272;
          }
        }
      }

      .value {
        width: 650px;

        .description {
          margin-bottom: 10px;
          font-size: 12px;
          color: #727272;
        }

        .uploaded-list {
          list-style: none;

          li {
            span {
              margin-right: 16px;
            }

            & /deep/ .ivu-icon-ios-close {
              cursor: pointer;
            }
          }
        }
      }
    }
  }

  .action-bar {
    width: 100%;
    height: 60px;
    margin-top: 30px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #f7f6fe;
    border-radius: 4px;

    span {
      font-size: 20px;
      color: #ff5655;
    }

    & /deep/ .ivu-btn-primary {
      height: 40px;
      padding: 0 24px;
      border: none;
      outline: none;
      background: #9ea0f9;
      border-radius: 4px;
      font-size: 18px;

      &:hover {
        background: #7c7fff;
      }
    }
  }

  .clear-btn {
    width: 100%;
    height: 50px;
    margin-top: 16px;

    & /deep/ .ivu-btn-default {
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
      background: #9ea0f9;
      font-size: 18px;
      color: #ffffff;

      &:hover {
        background: #7c7fff;
      }
    }
  }
}
</style>
