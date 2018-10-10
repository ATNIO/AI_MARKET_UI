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
  </section>
</template>
 <script>
import Atn from "atn-js";
import { mapGetters, mapActions } from "vuex";
import BN from "bignumber.js";

import ParameterForm from "./ParameterForm";
const CACHE_KEY = "DETAIL_STATE_CHANNEL";

function getOptions(model, schema) {
  const headers = {};
  const path = {}; // TODO: 这个还不知道怎么处理
  const query = {};
  const formdata = new FormData();
  let body = {};

  let isbody = false;
  let isFormdata = false;

  schema.map(item => {
    switch (item.in.toLowerCase()) {
      case "header":
        headers[item.name] = model[item.name];
        break;
      case "path":
        path[item.name] = model[item.name];
        break;
      case "query":
        query[item.name] = model[item.name];
        break;
      case "body":
        isbody = true;
        body = JSON.parse(model[item.name]);
        break;
      case "formdata":
        isFormdata = true;
        if (item.type === "file") {
          model[item.name].map(file => {
            formdata.append(item.name, file.file);
          });
        } else if (
          !(model[item.name] === null || model[item.name] === undefined)
        ) {
          formdata.append(item.name, model[item.name]);
        }
        break;
      default:
        break;
    }
  });

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
    },
    produces: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    ...mapGetters(["address", "networkVersion", "stateChannel", "serverRes"]),
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
      return this.networkVersion + "_" + this.address + "_" + this.dbotAddr;
    },
    stateChannelStatus() {
      const dbotStateChannel = this.stateChannel[this.cacheKey];
      if (!dbotStateChannel) return "normal";
      return dbotStateChannel.status;
    },
    stateChannelBanlance() {
      var status = this.stateChannel[this.cacheKey];
      if (status) return status.balance;
      return -1;
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
      console.log(this.stateChannelStatus, this.stateChannelBanlance);
      if (
        this.stateChannelStatus !== "normal" ||
        this.stateChannelBanlance < 0
      ) {
        this.$Notice.warning({
          title: "未检测到 state channel",
          desc: "您需要打开一个 state channel，以便成功调用该 API"
        });
        return false;
      }
      if (
        this.stateChannelBanlance.length < this.price.length ||
        (this.stateChannelBanlance.length == this.price.length &&
          this.stateChannelBanlance < this.price)
      ) {
        this.$Notice.warning({
          title: "余额不足",
          desc: "您需要增加state channel余额，以便成功调用该 API"
        });
        return false;
      }
      return true;
    },
    async callAi() {
      if (!this.checkBeforeCall()) return;
      try {
        const response = await this.$refs.form.handleSubmit("parameter-form");
        if (!response) {
          return;
        }
      } catch (e) {
        console.log(e);
        return;
      }

      this.isLoading = true;

      const paramsModel = this.$refs.form.paramModel;
      const options = getOptions(paramsModel, this.param);

      //TODO provide a select button
      if (
        this.produces[0] == "audio/mpeg" ||
        this.produces[0] == "audio/mp3" ||
        this.produces[0] == "image/jpeg"
      ) {
        options.responseType = "blob";
      }

      options.method = this.method;
      let callResult = null;

      console.log(options);

      try {
        callResult = await this.$atn.callAPI(
          this.dbotAddr,
          this.method,
          this.uri,
          options,
          this.address
        );

        this.isLoading = false;

        // 41  Init Dbot Fail
        // 42  Get EndPoint Fail
        // 43  Get Channel From Server
        // 44  No Channel For Call AI

        const { status, msg, data } = callResult;

        if (status === 41 || status === 42 || status === 43 || status === 44) {
          this.$Message.error(callResult.msg);
          return;
        }

        // if (status === 200) {
        this.setServerRes({ storeKey: this.cacheKey, data });
        // } else {
        //   this.$Message.error(msg);
        // }
      } catch (e) {
        console.error("call ai:", e);
        this.isLoading = false;
        this.$Message.error("请确认签名或网络");
      }

      this.getChannelDetail();
    },
    async getChannelDetail() {
      let channelDetail = null;

      try {
        channelDetail = await this.$atn.getChannelDetail(
          this.dbotAddr,
          this.address
        );
      } catch (e) {
        console.error("getChannelDetail catch:", e);

        return "error";
      }

      if (!channelDetail) {
        console.error("getChannelDetail call ai:", channelDetail);
      }

      if (status === 11) {
        // Init Dbot Fail
        // TODO: ???????
      } else if (status === 12) {
        // Get channels from server errors
        // TODO: 暂时不知道改成什么状态比较合适
      }

      const { deposit, balance } = channelDetail;
      const depositComputed = new BN(deposit, 10)
        .minus(new BN(balance, 10))
        .toString(10);

      this.setStateChannel({
        status: "normal",
        balance: depositComputed,
        usedbalance: balance,
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
      height: 50px;
      padding: 0 24px;
      border: none;
      outline: none;
      background: #797af8;
      border-radius: 4px;
      font-size: 18px;

      &:hover {
        background: #5c5ff7;
      }
    }
  }
}
</style>
