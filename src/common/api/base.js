/**
 * 接口域名的管理
 */
const env = process.NODE_ENV;

export default (env === "development" ? "/api/" : "/");
