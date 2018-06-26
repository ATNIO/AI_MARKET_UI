module.exports = {
  devServer: {
    proxy: {
      "/list": {
        target: "https://dbotlist.atn.io/",
        changeOrigin: true,
        pathRewrite: {
          "^/list": "/" // rewrite path
        }
      }
    }
  }
};
