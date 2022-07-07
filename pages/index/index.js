// pages/index/index.js
import request from "../../utils/request";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //轮播图页面数据
    banners: [],
    //推荐歌曲
    recommendList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.init();
  },

  // 初始化调用
  async init() {
    //获取首页轮播图数据
    let result = await request("/banner", {
      type: 1
    });
    this.setData({
      banners: result.banners || [],
    });
    //获取推荐数据
    result = await request("/personalized");
    this.setData({
      recommendList: result.result || [],
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})