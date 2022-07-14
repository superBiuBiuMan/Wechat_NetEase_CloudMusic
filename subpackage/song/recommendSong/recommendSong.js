// pages/recommendSong/recommendSong.js
import PubSub from "pubsub-js";
import request from "../../../utils/request";
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
    songIndex:"",//记录当前播放歌曲的索引
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //判断是否有cookie,没有就跳转到登录页面,否者这个页面视频数据获取不到!
    if(!wx.getStorageSync('cookie')){
      //没有cookie
      wx.showToast({
        title: '请登录后查看!',
        icon:"error",
      });
      setTimeout(() => {
          //关闭当前页面后跳转到登录界面
          wx.reLaunch({
            // url: '/pages/login/login',
            url: '/subpackage/other/login/login',
          });
      }, 1000);
      }
    let date = new Date();
    this.setData({
      day: date.getDate(),
      month: date.getMonth() + 1,
      recommendList:[],
    });
    //获取推荐列表
    this.reqRecommendList();
    //绑定订阅
    PubSub.subscribe("playNextOrPrev",this.playNextOrPrev)
  },
  //处理上一首,下一首播放的回调函数
  playNextOrPrev(msg,switchType){
    let {songIndex,recommendList} = this.data;
    switch(switchType){
      case 'prev':
          //上一首
          // if(songIndex==0){
          //   songIndex = recommendList.length;
          // }
          // songIndex--;
          //防数组越界
          (songIndex === 0 ) && (songIndex = recommendList.length);
          songIndex--;
          break;
      case 'next':
          //下一首
          songIndex++;
          songIndex = songIndex % recommendList.length;//防数组越界
          break;
    }
    //发布订阅 -- 传输歌曲id信息,告诉songDetail更新歌曲信息,
    PubSub.publish("updateSong",recommendList[songIndex].id);
    //更新索引
    this.setData({
      songIndex,
    });
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
    //更新歌曲索引
    this.setData({
      songIndex:event.currentTarget.dataset.index
    });
    //跳转到播放歌曲
    wx.navigateTo({
      // url: '/pages/songDetail/songDetail?id='+id,
      url: '/subpackage/song/songDetail/songDetail?id='+id,
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