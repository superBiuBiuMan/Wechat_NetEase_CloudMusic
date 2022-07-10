import {
  hexMD5
} from "../../utils/md5"; //MD5对密码进行加密
import request from "../../utils/request";
// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //手机号
    phone: "",
    //密码
    password: "",
    //md5加密后密码 
    md5_password: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 处理用户输入账号信息
   */
  handleInput(event) {
    //更新数据
    this.setData({
      [event.currentTarget.id]: event.detail.value
    });
    this.data.md5_password = hexMD5(this.data.password);
  },
  /**
   * 用户登录
   */
  async userLogin() {
    //获取收集的数据
    let {
      phone,
      password
    } = this.data;
    //1.手机号为空 
    if (!phone) {
      wx.showToast({
        title: '手机号不能为空',
        icon: "error",
      });
      return;
    }
    //2.密码为空
    if (!password) {
      wx.showToast({
        title: '密码不能为空',
        icon: "error",
      });
      return;
    }
    //3.验证账号 密码 是否合法
    let phoneReg = /^(?:(?:\+|00)86)?1\d{10}$/;
    if (!phoneReg.test(phone)) {
      wx.showToast({
        title: '手机号不合法',
        icon: "error"
      });
      return;
    }
    //4.发送登录请求
    let result = await request("/login/cellphone", {
      phone,
      md5_password: this.data.md5_password
    });
    //5.比较返回登录状态,做出对应操作
    if (result.code === 200) {
      wx.showToast({
        title: '登录成功',
      });
      //7.存储用户个人信息
      wx.setStorageSync('userInfo', result.profile);
      //8.跳转到个人中心页面
      setTimeout(() => {
        wx.reLaunch({
          url: '/pages/personal/personal',
        });
      }, 1000);

    } else {
      //6.其他登录失败的,统统显示,注意要使用none,因为none可以有两行文本
      wx.showToast({
        title: result.message,
        icon: 'none'
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})