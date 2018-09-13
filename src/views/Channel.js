import { mapGetters, mapActions } from "vuex";
import Atn from "atn-js";
import BN from "bignumber.js";

const atn = new Atn(window.atn3);
const CACHE_KEY = "DETAIL_STATE_CHANNEL";

export default {
  name: "Channel",
  data() {
    return {
      status: 0,
      depositValue: "",
      topupValue: "",
      storageCache: {},
      timer: null
    };
  },
  props: {
    dbot: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    ...mapGetters(["address", "networkVersion", "stateChannel"]),
    dbotAddr() {
      return this.$route.params.address;
    },
    isLogin() {
      return this.address;
    },
    cacheKey() {
      return this.networkVersion + "_" + this.address + "_" + this.dbotAddr;
    },
    stateChannelStatus() {
      var status = this.stateChannel[this.cacheKey];
      if (status) return status.status;
      return null;
    },
    stateChannelBanlance() {
      var status = this.stateChannel[this.cacheKey];
      if (status) return status.balance;
      return 0;
    },
    showChannelWaiting() {
      var status = this.stateChannel[this.cacheKey];
      if (!status) return "ERR";
      if (status.status == "waitingTX") {
        return "正在等待交易上链";
      } else if (status.status == "waitingSync") {
        return "正在等待dbot服务确认交易";
      }
    }
  },
  mounted() {
    this.updateStatus("initenter");
  },
  beforeDestroy() {
    // 在页面注销后清除定时器
    clearInterval(this.timer);
    this.timer = null;
  },
  methods: {
    ...mapActions(["setStateChannel"]),
    nextStep(value) {
      this.updateStatus("open");
    },
    async topup() {
      this.updateStatus("topup");
    },
    async closeChannel() {
      this.updateStatus("close");
    },
    numberHandler(num) {
      // 对ATN 数字处理
      const _num = new BN(num, 10);
      const multi = new BN("1e18");
      const rtn = _num.times(multi).toString(10);

      return rtn;
    },
    // reutrn {status, balance, hash}
    //TODO move to compute
    getStatusCache() {
      var status = this.stateChannel[this.cacheKey];
      if (status) return status;
      const cache = localStorage.getItem(CACHE_KEY);
      if (!cache) {
        return { status: null, balance: -1, usedbalance: -1, hash: null };
      }
      const storageCache = JSON.parse(cache);

      if (!(new String(this.cacheKey) in storageCache)) {
        return { status: null, balance: -1, usedbalance: -1, hash: null };
      }
      return storageCache[this.cacheKey];
    },
    setStatusCache(status, balance, usedbalance, hash) {
      this.setStateChannel({
        status,
        balance,
        usedbalance,
        hash,
        storeKey: this.cacheKey
      });
      // TODO localStorage
    },
    async updateStatus(action) {
      if (!this.checkLogin()) {
        return;
      }

      let { status, balance, usedbalance, hash } = this.getStatusCache();
      let para = { action, balance, usedbalance, hash };
      console.log(status);
      console.log(para);
      var ret = true;
      switch (status) {
        case null:
          // 初始状态，无缓存，需要分别从链上和dbotserver上获取信息
          ret = await this.unknownProcess(para);
          break;
        case "normal":
          ret = await this.normalProcess(para);
          break;
        case "waitingTX":
          ret = await this.waitingTxProcess(para);
          break;
        case "waitingSync":
          ret = await this.waitingSyncProcess(para);
          break;
        case "TXErr":
          ret = await this.txErrProcess(para);
          break;
        case "dbotErr":
          ret = await this.dbotErrProcess(para);
          break;
        default:
          console.log("status cannot be processed");
          break;
      }
      if (!ret) {
        //err
      }
    },
    async unknownProcess(para) {
      if (para.action != "initenter") {
        return false;
      }
      let { err, info } = await this.loadingChannelInfo();
      if (err) {
        if (info == null) {
          this.setStatusCache("normal", -1, -1, null);
          this.updateStatus("unknownenter");
          return;
        }
        const remainbalance = new BN(info.deposit, 10)
          .minus(new BN(info.balance, 10))
          .toString(10);
        this.setStatusCache("normal", remainbalance, info.balance, null);
        this.updateStatus("unknownenter");
        return;
      } else {
        if (info) {
          console.log(info);
        }
        this.setStatusCache("waitingSync", -1, -1, null);
        this.updateStatus("unknownenter");
      }
    },
    checkLogin() {
      if (!this.address) {
        this.$Notice.warning({
          title: "未登录",
          desc: "您需要使用您的ATN钱包登录"
        });

        return false;
      }
      return true;
    },
    async normalProcess(para) {
      switch (para.action) {
        case "unknownenter":
          //do nothing, only show view
          console.log("unknownenter normal, now you can open channel");
          return true;
        case "waitSyncenter":
          return;
        case "openenter":
          //do nothing
          console.log("open channel failed, please retry");
          return true;
        case "open":
          if (!this.checkLogin()) {
            return true;
          }
          try {
            const res = await atn.createChannel(
              this.dbotAddr,
              this.numberHandler(this.depositValue),
              this.address,
              (err, hash) => {
                if (err || hash == null) {
                  // 重新从网络上获取数据
                  if (err.status == 21) {
                    this.setStatusCache(null, -1, -1, null);
                    this.updateStatus("initenter");
                  }
                  return;
                }
                this.setStatusCache("waitingTX", 0, -1, hash);
                this.updateStatus("openenter");
              }
            );
          } catch (e) {
            console.log(e);
            this.$Notice.warning({
              title: "打开 channel 失败",
              desc: "抱歉, 打开channel失败，请检查网络和签名"
            });
            this.setStatusCache("normal", para.balance, para.usedbalance, null);
            this.updateStatus("openenter");
            return true;
          }
          break;
        case "close":
          // close the channel if exist
          if (para.balance >= 0) {
            try {
              const closeResult = await atn.closeChannel(
                this.dbotAddr,
                this.address,
                para.usedbalance,
                (err, hash) => {
                  if (err || hash == null) {
                    this.$Notice.warning({
                      title: "关闭 channel 失败",
                      desc: "抱歉，关闭 channel 失败，请稍后重试"
                    });
                    this.setStatusCache(
                      "normal",
                      para.balance,
                      para.usedbalance,
                      null
                    );
                    return;
                  }
                  this.setStatusCache(
                    "waitingTX",
                    para.balance,
                    para.usedbalance,
                    hash
                  );
                }
              );

              if (closeResult.status === 31) {
                // Init Dbot Fail
                this.$Notice.warning({
                  title: "关闭 channel 失败",
                  desc: "抱歉，无法连接dbot服务器, 请稍后重试"
                });
                this.setStatusCache(
                  "normal",
                  para.balance,
                  para.usedbalance,
                  null
                );
                this.updateStatus("closeenter");
                return false;
              } else if (closeResult.status === 32) {
                // Get Delete Close_Signature From DbotServer Error
                this.$Notice.warning({
                  title: "关闭 channel 失败",
                  desc: "抱歉，无法获取dbot服务器签名, 请稍后重试"
                });
                this.setStatusCache(
                  "dbotErr",
                  para.balance,
                  para.usedbalance,
                  null
                );
                this.updateStatus("closeenter");
                return false;
              }
            } catch (e) {
              console.error("closeChannel:", e);
              // exception
              this.$Notice.warning({
                title: "关闭 channel 失败",
                desc: "抱歉，关闭 channel 失败，请稍后重试"
              });
              this.setStatusCache(
                "normal",
                para.balance,
                para.usedbalance,
                null
              );
              this.updateStatus("closeenter");
              return false;
            }
          }
          this.updateStatus("closeenter");
          return true;
        case "initenter":
          // should check current status
          break;
        case "topup":
          try {
            await atn.topUpChannel(
              this.dbotAddr,
              this.numberHandler(this.topupValue),
              this.address,
              (err, hash) => {
                if (err || hash == null) {
                  this.$Notice.warning({
                    title: "topup channel 失败",
                    desc: "抱歉，topup channel 失败，请稍后重试"
                  });
                  return;
                }
                this.setStatusCache(
                  "waitingTX",
                  para.balance,
                  para.usedbalance,
                  hash
                );
                this.updateStatus("topupenter");
              }
            );
          } catch (e) {
            this.setStatusCache("normal", para.balance, para.usedbalance, null);
          }
      }
    },
    async waitingTxProcess(para) {
      switch (para.action) {
        case "openenter":
          // update view
          break;
        case "closeenter":
          // update view
          break;
        case "topupenter":
          // update view
          break;
        case "txErrenter":
          // update view
          break;
        case "initenter":
          break;
      }
      try {
        if (para.hash == null) {
          console.log("feta Err: waitingtxprocess cannot find hash");
          this.setStatusCache(
            "TXErr",
            para.balance,
            para.usedbalance,
            para.hash
          );
          this.updateStatus("waitTxenter");
          return;
        }
        const tx = await atn.waitTx(para.hash, undefined, 4);
        const txHash = tx.hash;
        const txStatus = tx.status;

        if (tx.status === 51 || tx.status == false) {
          this.setStatusCache(
            "TXErr",
            para.balance,
            para.usedbalance,
            para.hash
          );
          this.updateStatus("waitTxenter");
          return;
        }
        this.setStatusCache(
          "waitingSync",
          para.balance,
          para.usedbalance,
          null
        );
      } catch (e) {
        this.setStatusCache("TXErr", para.balance, para.usedbalance, para.hash);
      }
      this.updateStatus("waitTxenter");
    },
    async txErrProcess(para) {
      switch (para.action) {
        case "waitTxenter":
          // update view
          return true;
        case "TXErr":
          return true;
      }
      this.setStatusCache("waitingTX", 0, -1, para.hash);
      this.updateStatus("txErrenter");
      return true;
    },
    async waitingSyncProcess(para) {
      // change view

      // 加一个保护，防止程序BUG启动多个定时器
      if (this.timer != null) {
        clearInterval(this.timer);
        this.timer = null;
      }
      this.retrySyncTimes = 0;

      this.timer = setInterval(async () => {
        try {
          let { err, info } = await this.loadingChannelInfo();
          if (err) {
            if (info) {
              const remainbalance = new BN(info.deposit, 10)
                .minus(new BN(info.balance, 10))
                .toString(10);
              this.setStatusCache("normal", remainbalance, info.balance, null);
            } else {
              this.setStatusCache("normal", -1, -1, null);
            }
          } else {
            if (this.retrySyncTimes < 10) {
              this.retrySyncTimes += 1;
              return;
            } else {
              this.setStatusCache("dbotErr", -1, -1, null);
            }
          }
        } catch (e) {
          this.setStatusCache("dbotErr", -1, -1, null);
        }
        clearInterval(this.timer);
        this.timer = null;
        this.updateStatus("waitSyncenter");
      }, 1000);
    },
    async dbotErrProcess(para) {
      switch (para.action) {
        case "waitSyncenter":
        case "closeenter":
          // only change view
          break;
        default:
          this.setStatusCache("waitingSync", -1, -1, null);
          this.updateStatus("dbotErrcenter");
      }
    },
    async loadingChannelInfo() {
      try {
        const dchannel = await atn.getChannelDetail(
          this.dbotAddr,
          this.address
        );
        const deposit = await atn.getChannelDeposit(
          this.dbotAddr,
          this.address
        );
        //console.log("loadingChannelInfo:", dchannel, deposit);
        if (dchannel == undefined && deposit == 0) {
          return { err: true, info: null };
        }
        if (dchannel != undefined && dchannel.deposit == deposit) {
          return { err: true, info: dchannel };
        } else {
          return { err: false, info: dchannel };
        }
      } catch (e) {
        return { err: false, info: e };
      }
    }
  }
};
