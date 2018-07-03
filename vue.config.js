module.exports = {
  devServer: {
    proxy: {
      "/list": {
        target: "https://easy-mock.com/",
        changeOrigin: true,
        pathRewrite: {
          "^/list": "/mock/5b3ada678b8c7d19dfae0e7c/dbot/list" // rewrite path
        }
      }
    }
  }
};
