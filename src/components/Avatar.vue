<template>
  <div class="avatar" :style="styleObj" v-html="avatar"></div>
</template>

<script>
import Avatars from "@dicebear/avatars";
import SpriteCollection from "@dicebear/avatars-identicon-sprites";

export default {
  name: "Avatar",
  props: {
    text: {
      type: String,
      default: "text"
    },
    width: {
      type: Number,
      default: 36
    },
    height: {
      type: Number,
      default: 36
    },
    borderWidth: {
      type: Number,
      default: 0
    }
  },
  computed: {
    avatar() {
      const avatars = new Avatars(SpriteCollection);

      return avatars.create(this.text);
    },
    styleObj() {
      const { width, height, borderWidth } = this;

      return {
        width: width + "px",
        height: height + "px",
        borderWidth: borderWidth + "px"
      };
    }
  }
};
</script>

<style lang="less" scoped>
.avatar {
  border-style: solid;
  border-color: #7a83f8;
  border-radius: 100%;
  overflow: hidden;
}
</style>
