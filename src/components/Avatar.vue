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
    },
    borderColor: {
      type: String,
      default: "#7a83f8"
    }
  },
  computed: {
    avatar() {
      const avatars = new Avatars(SpriteCollection);

      return avatars.create(this.text.toLowerCase());
    },
    styleObj() {
      const { width, height, borderWidth, borderColor } = this;

      return {
        width: width + "px",
        height: height + "px",
        borderWidth: borderWidth + "px",
        borderColor
      };
    }
  }
};
</script>

<style lang="less" scoped>
.avatar {
  border-style: solid;
  // border-color: #7a83f8;
  box-shadow: 3px 0 10px 0 rgba(200, 199, 232, 0.5);
  border-radius: 100%;
  overflow: hidden;
}
</style>
