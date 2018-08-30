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
      <parameter-form :param="param"></parameter-form>
    </div>
    <div class="action-bar">
      <span>{{ price | priceFormat }} ATN</span>
      <Button type="primary" :disabled="isDeprecated">Sign Balance to Execute API</Button>
    </div>
  </section>
</template>

<script>
import ParameterField from "./ParameterField";
import ParameterForm from "./ParameterForm";

export default {
  name: "Parameters",
  components: { ParameterForm },
  data() {
    return {
      parameterModel: {}
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
    }
  },
  computed: {
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
  methods: {}
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
}
</style>
