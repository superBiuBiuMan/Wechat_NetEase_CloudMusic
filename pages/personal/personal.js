import request from "../../utils/request";
//开始时候手指头触摸的位置
var touchStartY = 0;
//移动的距离
var moveDistance = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //移动的样式变量名
    moveStyle: "translateY(0)",
    //移动过渡效果
    moveTranStyle: "",
    //用户信息
    userInfo: {},
    //用户最近播放列表
    userRecentPlay:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.setData({
        userInfo,
      });
      //获取用户最近播放 type : type=1 时只返回 weekData, type=0 时返回 allData
      this.getUserRecentPlay(userInfo.userId);
    }
  },
  //请求用户最近播放列表函数
  async getUserRecentPlay(uid) {
    let recentPlay = await request("/user/record", {
      uid,
      type: 0
    });
    //取数据前10个,并且加工处理id 
    recentPlay = recentPlay.allData.slice(0,10).map((item,index)=>{
      item.id = item.song.id;
      return item;
    });
    this.setData({
      userRecentPlay:recentPlay
    })
  },
  toLogin() {
    //如果用户信息存在,不让其跳转
    if (wx.getStorageSync('userInfo')) {
      return;
    }
    //跳转到登录界面
    wx.navigateTo({
      // url: '/pages/login/login',
      url: '/subpackage/other/login/login',
    })
  },
  /* 手指按下事件 */
  handleTouchStart(event) {
    //清空过渡效果
    this.setData({
      moveTranStyle: "",
    });
    // 手指头可以触摸多个
    touchStartY = event.touches[0].clientY; //距离视口顶部的距离
  },
  /* 手指移动事件 */
  handleTouchMove(event) {
    //计算移动距离 负数向上移动  正数向下移动
    moveDistance = event.touches[0].clientY - touchStartY;
    if (moveDistance <= 0) {
      return;
    }
    if (moveDistance >= 80) {
      moveDistance = 80;
    }
    //重新设置响应式数据
    this.setData({
      moveStyle: `translateY(${moveDistance}rpx)`,
    });
  },
  /* 手指松开事件 */
  handleTouchEnd() {
    // 动态更新coverTransform的状态值
    this.setData({
      moveStyle: `translateY(0rpx)`,
      moveTranStyle: 'transform .3s linear'
    })
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