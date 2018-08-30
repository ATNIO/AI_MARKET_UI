/**
 * 接口域名的管理
 */
const env = process.env.NODE_ENV;

export default (env === "development" ? "/api/" : "/api/v1/");
