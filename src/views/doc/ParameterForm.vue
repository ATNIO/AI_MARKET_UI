<template>
  <Form refs="parameter-form" :model="paramModel" @submit.native.prevent>
    <template v-for="(parameters, key) in parametersRender">
      <div class="wrapper" :key="key">
        <h4 class="title">{{ key | upperFirst }}</h4>
        <ul class="parameters-list">
          <li 
            class="parameters-item"
            v-for="p in parameters"
            :key="p.name"
          >
            <div class="key">
              <p :class="{ required: p.required }">{{ p.name }}</p>
              <p>{{ p.type }}</p>
            </div>
            <div class="value">
              <p class="description">{{ p.description }}</p>

              <FormItem :prop="p.name">
                <!-- body -->
                <template v-if="p.in === 'body'">
                  <Schema
                    v-model="paramModel[p.name].value"
                    :schema="p.schema"
                  ></Schema>
                </template>

                <!-- select -->
                <template v-else-if="p.enum">
                  <Select 
                    v-model="paramModel[p.name].value" 
                    :multiple="p.collectionFormat === 'multi'" 
                    style="width:100%"
                  >
                    <Option v-for="item in p.enum" :value="item" :key="item">{{ item }}</Option>
                  </Select>
                </template>

                <!-- string -->
                <template v-else-if="p.type === 'string' || p.type === 'array'">
                  <Input 
                    :name="p.name"
                    v-model="paramModel[p.name].value"
                    :placeholder="p.description" 
                    style="width: 100%" 
                  />
                </template>

                <!-- todo: time -->
                <!-- todo: date -->

                <!-- integer -->
                <template v-else-if="p.type === 'integer'" >
                  <InputNumber 
                    v-model="paramModel[p.name].value"
                    :placeholder="p.description"
                    style="width: 100%" 
                  ></InputNumber>
                </template>

                <!-- file -->
                <template v-else-if="p.type === 'file'">
                  <vue-upload-component
                    v-model="paramModel[p.name].value"
                    class="upload"
                  >
                    <Icon type="ios-cloud-upload-outline"/>
                    <span class="upload-text">Select the file to upload</span>
                  </vue-upload-component>
                  <ul class="uploaded-list">
                    <li v-for="file in paramModel[p.name].value" :key="file.name">
                      <span>{{ file.name }}</span>
                      <Icon type="ios-close" size="24" @click.native="handleRemove(p.name, file)" />
                    </li>
                  </ul>
                </template>

              </FormItem>
            </div>
          </li>
        </ul>
      </div>
    </template>
  </Form>
</template>

<script>
import { upperFirst } from "lodash";
import Schema from "./Schema";
import VueUploadComponent from "vue-upload-component/src";

export default {
  name: "ParameterForm",
  components: { Schema, VueUploadComponent },
  data() {
    return {
      uploadList: [],
      paramModel: {}
    };
  },
  props: {
    param: {
      type: Array,
      default: () => []
    }
  },
  computed: {
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
        this.paramModel = val.reduce((pre, cur) => {
          const item = (pre[cur.name] = { type: cur.in });

          if (cur.enum) {
            pre[cur.name].value = cur.default || cur.enum[0];
          } else if (cur.type === "file") {
            pre[cur.name].value = [];
          } else {
            pre[cur.name].value = "";
          }

          return pre;
        }, {});
      }
    }
  },
  methods: {
    handleRemove(field, file) {
      const files = this.paramModel[field].value;

      this.paramModel[field].value.splice(files.indexOf(file), 1);
    },
    handleUpload(file) {
      this.uploadList.push(file);

      return false;
    }
  },
  filters: {
    upperFirst(value) {
      return value ? upperFirst(value) : "";
    }
  }
};
</script>

<style lang="less" scoped>
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

    .upload {
      margin-bottom: 0;
      font-weight: 400;
      text-align: center;
      vertical-align: middle;
      touch-action: manipulation;
      cursor: pointer;
      background-image: none;
      border: 1px solid transparent;
      white-space: nowrap;
      line-height: 1.5;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      padding: 5px 15px 6px;
      font-size: 12px;
      border-radius: 4px;
      transition: color 0.2s linear, background-color 0.2s linear,
        border 0.2s linear, box-shadow 0.2s linear;
      color: #515a6e;
      background-color: #fff;
      border-color: #dcdee2;

      &:hover {
        color: #57a3f3;
        background-color: #fff;
        border-color: #57a3f3;
      }

      .upload-text {
        margin-left: 8px;
      }
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
</style>
