module.exports = {
  devServer: {
    proxy: {
      "/api/": {
        target: "https://easy-mock.com/",
        changeOrigin: true,
        pathRewrite: {
          "^/api/": "/mock/5b3ada678b8c7d19dfae0e7c/aimarket/" // rewrite path
        }
      }
    }
  }
};
