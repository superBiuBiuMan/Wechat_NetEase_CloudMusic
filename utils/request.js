// 二次封装请求
import config from "./config";
/**
 * params:
 *  url:请求地址
 *  method:请求方式(默认get)
 *  data:请求数据(默认 {} )
 */
export default (url, data = {}, method = "get") => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.host + url,
      method,
      data,
      success(res) {
        resolve(res.data);
      },
      fail(reason) {
        //返回错误原因
        reject(reason);
      }
    });
  });
}