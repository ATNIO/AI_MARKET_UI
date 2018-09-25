<template>
  <section class="server-res" v-if="serverResCond">
    <div class="response-topper">
      <h3>Server response</h3>
      <div class="clear-btn" v-if="serverRes && serverRes[cacheKey]">
        <Button @click="clear">Clear</Button>
      </div>
    </div>
    <div class="re-header">
      <p>Code</p>
      <p>Details</p>
    </div>
    <div class="response-content">
      <p class="response-code">{{ status }}</p>
      <div class="response-detail">
        <p>Response body</p>
        <div class="response-description">
          <Input 
            :value="response" 
            type="textarea" 
            autosize
            disabled
            class="dark"
            v-if="responseType!='audio/mpeg'"
          />
          <AudioBar :audiofile="responseData" v-else>
          </AudioBar>
        </div>

        <p>Response headers</p>
        <div class="response-description">
          <Input 
            :value="headers" 
            type="textarea" 
            autosize
            disabled
            class="dark"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ServerRes",
  computed: {
    ...mapGetters(["serverRes", "address", "networkVersion"]),
    status() {
      return this.serverRes && this.serverRes[this.cacheKey]
        ? this.serverRes[this.cacheKey].status
        : "";
    },
    dbotAddr() {
      return this.$route.params.address;
    },
    cacheKey() {
      return this.networkVersion + "_" + this.address + "_" + this.dbotAddr;
    },
    response() {
      if (!(this.serverRes && this.serverRes[this.cacheKey])) return "";

      // const { items, error_code, error_msg } = this.serverRes[this.cacheKey].data;

      return JSON.stringify(this.serverRes[this.cacheKey].data, null, 2);
    },
    headers() {
      return this.serverRes && this.serverRes[this.cacheKey]
        ? JSON.stringify(this.serverRes[this.cacheKey].headers, null, 2)
        : "";
    },
    responseType() {
      try {
        return this.serverRes[this.cacheKey].headers["content-type"];
      } catch (e) {
        return "text/plain";
      }
    },
    responseData() {
      const data = this.serverRes[this.cacheKey].data;
      const blob = new Blob([data], { type: "audio/wav" });
      const blobUrl = URL.createObjectURL(blob);
      return blobUrl;
    },
    serverResCond() {
      return this.serverRes && this.serverRes[this.cacheKey];
    }
  },
  methods: {
    ...mapActions(["setServerRes"]),
    clear() {
      this.setServerRes({ storeKey: this.cacheKey, data: null });
    }
  }
};
</script>

<style lang="less" scoped>
.server-res {
  margin-top: 20px;
  margin-left: -20px;
  margin-right: -20px;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  background: #11124c;

  .response-topper {
    display: flex;
    width: 100%;
    justify-content: space-between;
    .clear-btn {
      width: 110px;
      height: 40px;

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

  h3 {
    margin-bottom: 30px;
    padding-left: 16px;
    font-size: 20px;
    font-weight: 500;
    color: #87c5fe;
    border-left: 4px solid #87c5fe;
    line-height: 1;
  }

  .re-header {
    padding-bottom: 16px;
    display: flex;
    align-items: center;
    border-bottom: thin solid #dfdfdf;

    p {
      font-size: 14px;
      color: #ffffff;

      &:first-of-type {
        flex: 1;
      }

      &:last-of-type {
        width: 650px;
      }
    }
  }

  .response-detail {
    p {
      margin-bottom: 16px;
      font-size: 12px;
      color: #ffffff;
    }
  }

  .response-content {
    display: flex;
    margin-top: 16px;
  }

  .response-code {
    flex: 1;
    color: #ffffff;
  }

  .response-description {
    width: 650px;
    margin-bottom: 16px;

    & /deep/ .ivu-input[disabled] {
      cursor: text;
      color: #fff;
      background: #42444e;
    }
  }
}
</style>
