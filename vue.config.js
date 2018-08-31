module.exports = {
  lintOnSave: true,
  devServer: {
    proxy: {
      "/api/": {
        target: "http://127.0.0.1:7001/",
        // target: "http://192.168.1.178:7001/",
        changeOrigin: true,
        pathRewrite: {
          "^/api/": "/api/v1/" // rewrite path
        }
      }
    }
  }
};
