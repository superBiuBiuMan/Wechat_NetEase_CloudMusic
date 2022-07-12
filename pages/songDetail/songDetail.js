// pages/songDetail/songDetail.js
import request from "../../utils/request";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 是否处于播放状态
    isPlay:false,
    musicId:"",//当前音乐的id
    songInfo:{},//当前歌曲的详细信息
    songUrl:"",//当前歌曲播放链接
  },
  //单击播放/暂停的回调
  async handleMusicPlay(){
    //播放状态取反
    let isPlay = !this.data.isPlay;
    this.setData({
      isPlay,
    });
    let {musicId,songUrl} = this.data;//获取音乐id
    if(isPlay){
      if(songUrl){
        //已经有音乐数据了,则播放
        this.musicManager.play();
        return;
      }
      //如果处于播放状态 并且没有播放链接的话则获取音乐链接并播放音乐
      let result = await request("/song/url",{id:musicId});
      //在data当中保存播放链接
      this.data.songUrl = result.data[0].url;
      //设置音频管理实例属性
      this.musicManager.src = result.data[0].url;//设置播放链接
      this.musicManager.title = this.data.songInfo.name;//设置歌曲标题

    }else{
      //停止播放
      this.musicManager.pause();
    }
  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let id = options.id;//获取歌曲id信息
    //保存id信息
    this.setData({
      musicId:id,
    })
    //请求歌曲详细信息
    this.reqSongDetail(id);
    //创建音乐相关实例
    this.createMusicManager();
  },
  //创建音乐相关实例和监听
  createMusicManager(){
    //创建音乐实例
    this.musicManager = wx.getBackgroundAudioManager();
    //开始监听播放暂停停止 - 一般适用微信提供的那个条条
    /* 监视播放回调 */
    this.musicManager.onPlay(()=>{
      this.setData({
        isPlay:true,
      });
    });
    /* 监视暂停回调 */
    this.musicManager.onPause(()=>{
      this.setData({
        isPlay:false,
      });
    });
    /* 监视停止回调 */
    this.musicManager.onStop(()=>{
      this.setData({
        isPlay:false,
      });
    })
  },
  //发送请求获取指定id歌曲的详细信息并设置窗口标题
  async reqSongDetail(ids){
    let result = await request("/song/detail",{ids});
    this.setData({
      songInfo:result.songs[0],
    });
    //设置窗口标题
    wx.setNavigationBarTitle({
      title: this.data.songInfo.name,
    })
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