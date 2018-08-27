<template>
  <article>
    <!-- 我来组成头部 -->
    <div class="header" :class="isDeprecated ? 'gray' : 'normal'">
      <div class="left">
        <p class="endpoint">
          <span>{{ endpoint.method | toUpper }}</span>
          <span :class="{
            deprecated: isDeprecated
          }">{{ endpoint.uri }}</span>
          <Tag v-if="isDeprecated" color="red">Deprecated</Tag>
        </p>
        <p class="summary" v-if="content.summary">{{ content.summary }}</p>
      </div>
      <div class="price">
        <span>8 ATN</span>
      </div>
    </div>

    <div class="description" v-if="content.description">
      <span>{{ content.description }}</span>
    </div>

    <div class="content-body">

      <!-- 我来组成 parameters -->
      <Parameters :param="parameters" :isDeprecated="isDeprecated"></Parameters>

      <!-- 我来组成 response -->
      <Response :responses="responses"></Response>

      <!-- 我来组成 model -->
      <model-list :definitions="definitions"></model-list>

    </div>

  </article>
</template>

<script>
import Parameters from "./Parameters";
import Response from "./Response";
import ModelList from "./ModelList";

export default {
  name: "Content",
  components: { Parameters, Response, ModelList },
  props: {
    spec: {
      type: Object,
      default: () => ({})
    },
    endpoint: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    paths() {
      return this.spec.paths;
    },
    content() {
      if (!this.paths) return {};

      const { uri, method } = this.endpoint;

      return this.paths[uri][method];
    },
    isDeprecated() {
      return this.content.deprecated;
    },
    parameters() {
      return this.content.parameters || [];
    },
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
    },
    definitions() {
      return this.spec.definitions;
    }
  }
};
</script>


<style lang="less" scoped>
article {
  flex: 1;
  margin-left: 20px;
  box-shadow: 3px 0 10px 0 rgba(200, 199, 232, 0.5);
  border-radius: 4px;
  background: #fff;
  overflow: hidden;

  .gray {
    background: #6f6f6f;
  }

  .normal {
    background: #87c5fe;
  }

  .header {
    height: 80px;
    padding: 0 20px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      color: #fff;
    }

    .endpoint {
      font-size: 18px;

      span {
        margin-right: 10px;
      }

      .deprecated {
        text-decoration: line-through;
      }
    }

    .summary {
      margin-top: 10px;
      font-size: 12px;
      color: #fff;
    }

    .price {
      font-size: 36px;
    }
  }

  .description {
    margin: 0 20px;
  }

  .content-body {
    padding: 20px 20px 20px;
  }
}
</style>
