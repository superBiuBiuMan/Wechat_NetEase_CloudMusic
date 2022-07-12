// pages/recommendSong/recommendSong.js
import request from "../../utils/request";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 日
    day: "",
    // 月
    month: "",
    //推荐歌曲
    recommendList:[],
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let date = new Date();
    this.setData({
      day: date.getDate(),
      month: date.getMonth() + 1,
    });
    //获取推荐列表
    this.reqRecommendList();
  },
  //跳转到播放界面
  clickToPlay(event){
    //如果触发事件的对象为button,则不跳转
    if(event.target.dataset.type === 'button'){
      //说明用户单击的是分享按钮
      return;
    }
    //否者就获取绑定事件对象的id
    let id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/songDetail/songDetail?id='+id,
    });
  },
 //请求获取推荐歌曲
 async reqRecommendList(){
  let result = await request('/recommend/songs');
  if(result){
    this.setData({
      recommendList:result.data.dailySongs
    });
  }
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