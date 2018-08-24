<template>
  <div>
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
  </div>
</template>

<script>
export default {
  name: "ParameterFile",
  data() {
    return {
      uploadList: []
    };
  },
  props: {
    options: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    handleRemove(file) {
      this.uploadList.splice(this.uploadList.indexOf(file), 1);
    },
    handleUpload(file) {
      this.uploadList.push(file);

      return false;
    }
  }
};
</script>

<style lang="less" scoped>
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
</style>
