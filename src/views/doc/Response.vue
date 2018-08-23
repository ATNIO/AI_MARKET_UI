<template>
  <section class="response">
    <h3>Response</h3>
    <div class="re-header">
      <p>Status Code</p>
      <p>Description</p>
    </div>
    <div class="response-content">
      <template v-for="response in responses">
        <div class="response-res" :key="response.code">
          <p class="response-code">{{ response.code }}</p>
          <div class="response-detail">
            <div class="response-description">
              <span>{{ response.res.description }}</span>
            </div>
            <Schema
              v-if="response.res.schema && response.res.schema.properties"
              :schema="response.res.schema"
              :isEditable="false"
              theme="dark"
            ></Schema>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>

<script>
import Schema from "./Schema";

export default {
  name: "Response",
  components: { Schema },
  props: {
    responses: {
      type: Array,
      default: () => []
    }
  }
};
</script>


<style lang="less" scoped>
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

  .response-content {
    margin-top: 16px;
  }

  &-res {
    display: flex;
    margin-bottom: 16px;
  }

  &-code {
    flex: 1;
  }

  &-description {
    width: 650px;
    height: 40px;
    padding-left: 16px;
    margin-bottom: 16px;
    display: flex;
    align-items: center;
    background: #42444e;
    border-radius: 4px;
    font-size: 14px;
    color: #ffffff;
  }
}
</style>
