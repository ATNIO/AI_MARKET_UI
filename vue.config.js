module.exports = {
  lintOnSave: true,
  devServer: {
    proxy: {
      "/api/": {
        // target: "http://119.3.62.127:4001/",
        target: "http://192.168.1.178:7001/",
        changeOrigin: true,
        pathRewrite: {
          "^/api/": "/api/v1/" // rewrite path
        }
      }
    }
  }
};
