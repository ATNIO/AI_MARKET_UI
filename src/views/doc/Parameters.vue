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
      <template v-for="type in parametersType">
        <div class="wrapper" :key="type">
          <h4 class="title">{{ type | upperFirst }}</h4>
          <ul class="parameters-list">
            <li 
              class="parameters-item"
              v-for="parameter in parametersRender[type]"
              :key="parameter.name"
            >
              <div class="key">
                <p :class="{ required: parameter.required }">{{ parameter.name }}</p>
                <p>{{ parameter.type }}</p>
              </div>
              <div class="value">
                <p class="description">{{ parameter.description }}</p>

                <Schema
                  v-if="parameter.in === 'body'" 
                  :schema="parameter.schema"
                ></Schema>

                <parameter-field v-else :parameter="parameter"></parameter-field>

                <!-- <template v-if="parameter.type === 'array' && parameter.items.enum">
                  <Select v-model="param" style="width:100%">
                    <Option v-for="item in parameter.items.enum" :value="item" :key="item">{{ item }}</Option>
                  </Select>
                </template>
                <template v-if="parameter.type === 'string' || parameter.type === 'integer'">
                </template>
                <template v-if="parameter.type === 'file'">
                  <Upload
                    multiple
                    :before-upload="handleUpload"
                    action="//jsonplaceholder.typicode.com/posts/">
                    <Button icon="ios-cloud-upload-outline">Select the file to upload</Button>
                  </Upload>
                  <ul class="uploaded-list">
                    <li v-for="file in uploadList" :key="file.name">
                      <span>{{ file.name }}</span>
                      <Icon type="ios-close" size="24" @click.native="handleRemove(file)" />
                    </li>
                  </ul>
                </template> -->
              </div>
            </li>
          </ul>
        </div>
      </template>
    </div>
    <div class="action-bar">
      <span>8 ATN</span>
      <Button type="primary" :disabled="isDeprecated">Sign Balance to Execute API</Button>
    </div>
  </section>
</template>

<script>
import { upperFirst } from "lodash";
import FormSchema, { Components } from "@formschema/native";

import Schema from "./Schema";
import ParameterField from "./ParameterField";

export default {
  name: "Parameters",
  components: { Schema, ParameterField },
  data() {
    return {};
  },
  props: {
    param: {
      type: Array,
      default: () => []
    },
    isDeprecated: {
      type: Boolean,
      default: false
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
  methods: {},
  filters: {
    upperFirst(value) {
      return value ? upperFirst(value) : "";
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
}
</style>
