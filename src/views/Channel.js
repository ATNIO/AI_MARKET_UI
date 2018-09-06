import { mapGetters, mapActions } from "vuex";
import data from "../mock/listData.js";
import Atn from "atn-js";
import BN from "bignumber.js";

const atn = new Atn(window.atn3);
const CACHE_KEY = "DETAIL_STATE_CHANNEL";

export default {
  name: "Channel",
  data() {
    return {
      balance: 80,
      data: data[0],
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
    ...mapGetters(["address", "stateChannel"]),
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
    },
    stateChannelBanlance() {
      const dbotStateChannel = this.stateChannel[this.cacheKey];

      if (!dbotStateChannel) return "";

      return dbotStateChannel.banlance;
    }
  },
  mounted() {
    // 如果状态管理器里有关于 state channel 的状态，无需重新去查询
    if (!this.stateChannel[this.cacheKey]) return;
    this.init();
  },
  beforeDestroy() {
    // 在页面注销后清除定时器
    clearInterval(this.timer);
    this.timer = null;
  },
  methods: {
    ...mapActions(["setStateChannel"]),
    nextStep(value) {
      this.createNewChannel();
    },
    numberHandler(num) {
      // 对ATN 数字处理
      const _num = new BN(num, 10);
      const multi = new BN("1e18");
      const rtn = _num.times(multi).toString(10);

      return rtn;
    },
    cacheHander({ status, hash }) {
      if (status === "synced") {
        // TODO: delete
        delete this.storageCache[this.cacheKey];
      } else {
        this.storageCache[this.cacheKey] = { status, hash };
      }

      localStorage.setItem(CACHE_KEY, JSON.stringify(this.storageCache));
    },
    async init() {
      const cache = localStorage.getItem(CACHE_KEY);

      // 没有缓存，退出。
      if (!cache) return;

      this.storageCache = JSON.parse(cache);

      // 没有当前 dbot 的缓存，退出。
      if (!(new String(this.cacheKey) in this.storageCache)) return;

      const currentDbotCache = this.storageCache[this.cacheKey];
      let { status, hash } = currentDbotCache;
      let currentStatus = "";

      // opening, closing, close, syncing, synced
      switch (status) {
        case "opening":
        case "closing":
        case "syncing":
          this.setStateChannel({ status, storeKey: this.cacheKey });
          currentStatus = await this.waitTx(hash, status);
          break;
        case "synced":
          await this.updateDeposit(status, null, false);
          break;
        case "close":
          this.setStateChannel({ status, storeKey: this.cacheKey });
          return;
        default:
          break;
      }

      // 当处于 syncing 状态时，才去查询当前 state channel 的余额。
      if (currentStatus !== "syncing") return;

      // 查询当前 state channel 的余额
      this.updateDeposit(currentStatus);
    },
    /**
     * @param status String 状态
     * @param hash String 哈希值(需要去调用 waitTx 查询线上处理结果的时候才用)
     * @param fromLink Boolean 是否从链上查询(getDeposit 是从链上获取数据，
     * 用来和 dbot server 获取到的数据进行对比，以判断服务器是否同步完链上的数据)
     */
    async updateDeposit(status, hash, fromLink = false) {
      // 详细信息请看流程图
      if (hash) {
        status = await this.waitTx(hash, status);
      }

      let depositByLink = null;
      let depositComputed = 0;

      if (fromLink) {
        depositByLink = await this.getDeposit();
      }

      let channelDetail = await this.getChannelDetail();

      if (fromLink) {
        if (!channelDetail) {
          this.timer = setInterval(async () => {
            channelDetail = await this.getChannelDetail();

            if (channelDetail || channelDetail === "error") {
              clearInterval(this.timer);
              this.timer = null;

              // 提示异常
              return;
            }

            const { deposit } = channelDetail;

            if (depositByLink === deposit) {
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000);
        }

        const { balance, deposit } = channelDetail;

        depositComputed = new BN(deposit, 10)
          .minus(new BN(balance, 10))
          .toString(10);
      } else {
        const { balance, deposit } = channelDetail;

        depositComputed = new BN(deposit, 10)
          .minus(new BN(balance, 10))
          .toString(10);
      }

      // 成功获取到余额之后，将 state channel 状态更改为 synced.
      status = "synced";

      // 将 state channel 的信息存储到状态管理器
      this.setStateChannel({
        status,
        banlance: depositComputed,
        storeKey: this.cacheKey
      });
      // 缓存当前 dbot 的 state channel 的信息
      // this.storageCache[this.cacheKey] = { status };
      // localStorage.setItem(CACHE_KEY, JSON.stringify(this.storageCache));
      this.cacheHander({ status });
    },
    async waitTx(hash, status) {
      // 根据交易 hash， 获取当前交易状态
      const _status = status;
      // hash
      // timeout (default: 5e3) 超时时间
      // confirmations (default: 6) 确认次数
      const tx = await atn.waitTx(hash, undefined, 4);
      const txHash = tx.hash;
      const txStatus = tx.status;

      if (tx.status === 51) {
        // waitTx Timeout
        this.$Message.error("超时，请稍后刷新重试");
        return;
      }

      switch (status) {
        case "opening":
          status = txStatus ? "syncing" : "close";
          break;
        case "closing":
          status = txStatus ? "close" : "syncing";
          break;
        case "syncing":
          txStatus || (status = "synced");
          break;
        default:
          break;
      }

      if (_status === status) {
        this.setStateChannel({ status, storeKey: this.cacheKey });
        // this.storageCache[this.cacheKey] = { status, hash: txHash };
        // localStorage.setItem(CACHE_KEY, JSON.stringify(this.storageCache));
        this.cacheHander({ status, hash: txHash });
      }

      return status;
    },
    async getDeposit() {
      const deposit = await atn.getChannelDeposit(this.dbotAddr, this.address);

      if (!deposit) {
        // TODO: 如果为空，需提示，待优化
        console.log("getDeposit:", deposit);
      }

      return deposit;
    },
    async getChannelDetail() {
      let channelDetail = null;

      try {
        channelDetail = await atn.getChannelDetail(this.dbotAddr, this.address);
      } catch (e) {
        console.error("getChannelDetail catch:", e);

        return "error";
      }

      if (!channelDetail) {
        // TODO: 待优化
        console.error("getChannelDetail:", channelDetail);
      }

      const { status, msg } = channelDetail;

      if (status === 11) {
        // Init Dbot Fail
        this.setStateChannel({ status: "close", storeKey: this.cacheKey });

        return "error";
      } else if (status === 12) {
        // Get channels from server errors
        // TODO: 暂时不知道改成什么状态比较合适
        return "error";
      }

      return channelDetail;
    },
    async topup() {
      let status = "syncing";
      let txHash = "";

      this.setStateChannel({ status, storeKey: this.cacheKey });

      await atn.topUpChannel(
        this.dbotAddr,
        this.numberHandler(this.topupValue),
        this.address,
        (err, hash) => {
          if (err) return;

          txHash = hash;
        }
      );

      if (txHash) {
        // this.storageCache[this.cacheKey] = { status, hash: txHash };
        // localStorage.setItem(CACHE_KEY, JSON.stringify(this.storageCache));

        this.cacheHander({ status, hash: txHash });

        await this.updateDeposit(status, txHash, true);
      } else {
        // TODO: 如果没有 hash
      }
    },
    async createNewChannel() {
      let status = "opening";
      let txHash = "";

      if (!this.address) {
        this.$Notice.warning({
          title: "未登录",
          desc: "您需要使用您的ATN钱包登录"
        });

        return;
      }

      // 创建用户和Dbot交易通道
      this.setStateChannel({ status, storeKey: this.cacheKey });

      try {
        const res = await atn.createChannel(
          this.dbotAddr,
          this.numberHandler(this.depositValue),
          this.address,
          (err, hash) => {
            if (err) return;

            txHash = hash;
          }
        );

        status = "syncing";
        this.setStateChannel({ status, storeKey: this.cacheKey });

        if (res.status === 21) {
          // Channel has exist
          this.updateDeposit(status, null, false);
        } else {
          this.cacheHander({ status, hash: txHash });
          this.updateDeposit(status, txHash, true);
        }
      } catch (e) {
        // 通常进入到这个分支是因为 channel is exit. 所以这时可直接调用 updateDeposit 查询余额。
        // TODO: 不排除有别的异常的可能性，需要补充处理
        console.error("Creates new channel failure:", e);
      }
    },
    async closeChannel() {
      let status = "closing";

      this.setStateChannel({ status, storeKey: this.cacheKey });
      // channelDetail 可以在 update deposit 的时候缓存。
      const channelDetail = await this.getChannelDetail();

      if (channelDetail === "error") {
        this.$Message.error("error");
        return;
      }

      try {
        const closeResult = await atn.closeChannel(
          this.dbotAddr,
          this.address,
          channelDetail.balance,
          (err, hash) => {
            status = "close";

            this.setStateChannel({ status, storeKey: this.cacheKey });

            // this.storageCache[this.cacheKey] = { status };
            // delete this.storageCache[this.cacheKey];
            // localStorage.setItem(CACHE_KEY, JSON.stringify(this.storageCache));

            this.cacheHander({ status });
          }
        );

        if (closeResult.status === 31) {
          // Init Dbot Fail
        } else if (closeResult.status === 32) {
          // Get Delete Close_Signature From DbotServer Error
        }
      } catch (e) {
        // 关闭 channel 出现异常
        console.error("closeChannel:", e);
        // exception
        this.$Notice.warning({
          title: "关闭 channel 失败",
          desc: "抱歉，关闭 channel 失败，请稍后重试"
        });
      }
    }
  }
};
