<template>
  <article>
    <div class="header">
      <div class="left">
        <p class="endpoint">
          <span>{{ endpoint.type | toUpper }}</span>
          <span>{{ endpoint.path }}</span>
        </p>
        <p class="description" v-if="content.description">{{ content.description }}</p>
      </div>
      <div class="price">
        <span>8 ATN</span>
      </div>
    </div>
    <div class="content">
      <div class="request">

      </div>
      <div class="response">
        <h3>Response</h3>
        <div class="response-header">
          <p>Status Code</p>
          <p>Description</p>
        </div>
        <div class="response-content">
          <template v-for="response in responses">
            <div class="response-item" :key="response.code">
              <div class="response-res">
                <p class="response-code">{{ response.code }}</p>
                <div class="response-description">
                  <span>{{ response.res.description }}</span>
                </div>
              </div>
              <div class="response-detail"></div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: "DetailDocContent",
  props: {
    content: {
      type: Object,
      default: () => ({})
    },
    endpoint: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    responses() {
      const newRes = [];
      const { responses } = this.content;

      for (let code in responses) {
        if (responses.hasOwnProperty(code)) {
          newRes.push({
            code,
            res: responses[code]
          });
        }
      }

      return newRes;
    }
  },
  filters: {
    toUpper(value) {
      return value ? value.toUpperCase() : "";
    }
  }
};
</script>

<style lang="less" scoped>
article {
  flex: 1;
  margin-left: 20px;
  padding-bottom: 20px;
  box-shadow: 3px 0 10px 0 rgba(200, 199, 232, 0.5);
  border-radius: 4px;
  background: #fff;
  overflow: hidden;

  .header {
    height: 80px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #87c5fe;

    span {
      color: #fff;
    }

    .endpoint {
      font-size: 18px;

      span:first-of-type {
        margin-right: 10px;
      }
    }

    .description {
      margin-top: 10px;
      font-size: 12px;
      color: #fff;
    }

    .price {
      font-size: 36px;
    }
  }

  .content {
    padding: 0 20px;

    .response {
      margin-top: 40px;

      h3 {
        margin-bottom: 30px;
        padding-left: 16px;
        font-size: 20px;
        font-weight: 500;
        color: #87c5fe;
        border-left: 4px solid #87c5fe;
        line-height: 1;
      }

      &-header {
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

      &-content {
      }

      &-item {
        margin-top: 16px;
      }

      &-res {
        display: flex;
        align-items: center;
      }

      &-code {
        flex: 1;
      }

      &-description {
        width: 650px;
        height: 40px;
        padding-left: 16px;
        display: flex;
        align-items: center;
        background: #42444e;
        border-radius: 2px;
        font-size: 12px;
        color: #ffffff;
      }
    }
  }
}
</style>
