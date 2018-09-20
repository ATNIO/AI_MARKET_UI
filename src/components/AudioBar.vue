<template>
  <div>
    <audio :src="audiofile" controls="controls" controlsList="nodownload"></audio>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  name: "AudioBar",
  props: ["audiofile"],
  methods: {
    srcfile() {
      return "http://hao.haolingsheng.com/ring/000/995/fdd1115ac2c3e1dc84ea878082741e1b.mp3";
    }
  }
};
</script>

<style>
</style>
