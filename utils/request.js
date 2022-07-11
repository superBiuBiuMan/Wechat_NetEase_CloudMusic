// 二次封装请求
import config from "./config";
/**
 * 
 * @param {Array} obj 要过滤的对象
 * @param {string} filterString 过滤的字符串
 * @returns 返回过滤后的数组
 */
function filterCookie(obj, filterString) {
  return obj.filter(item => {
    return item.indexOf(filterString) !== -1;
  });
}
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
      header: {
        cookie: wx.getStorageSync('cookie') ? filterCookie(wx.getStorageSync('cookie'), 'MUSIC_U').toString() : "",
      },
      success(res) {
        //如果是请求登录
        if (data.isLogin) {
          //存储cookie
          wx.setStorageSync('cookie', res.cookies);
        }
        resolve(res.data);
      },
      fail(reason) {
        //返回错误原因
        reject(reason);
      }
    });
  });
}