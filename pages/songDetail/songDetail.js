// pages/songDetail/songDetail.js
import PubSub from "pubsub-js";
import moment from "moment";
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
    currentTime:"00:00",//当前播放的时间
    durationTime:"00:00",//总播放时间
    currentWidth:0,//当前进度条的长度
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let id = options.id;//获取歌曲id信息
    //保存id信息
    this.setData({
      musicId:id,
    });
    //请求歌曲详细信息
    this.reqSongDetail(id);
    //创建音乐相关实例
    this.createMusicManager();
    //添加订阅,控制歌曲信息
    PubSub.subscribe("updateSong",this.updateSong);
  },
   //单击播放/暂停的回调
  handleMusicPlay(){
    //播放状态取反
    let isPlay = !this.data.isPlay;
    this.setData({
      isPlay,
    });
    let {musicId,songUrl} = this.data;
    this.musicControl(isPlay,musicId,songUrl);
  },
  // 控制音乐播放/暂停的功能函数
 async musicControl(isPlay,musicId,songUrl){
    if(isPlay){
      //只有当歌曲链接有值,并且实例上的musicId等于data当中的id的时候,才不会再起请求
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
  //处理recommendSong的发布的消息去更新当前播放信息,id为歌曲id
  updateSong(msg,id){
    // console.log("songDetail收到歌曲id",id);
    //停止歌曲
    this.musicManager.stop();
    //设置musicId和songUrl为空
    this.setData({
      musicId:id,
      songUrl:"",
    });
    //发送请求获取指定id歌曲的详细信息并设置窗口标题
    this.reqSongDetail(id);
    //播放当前音乐
    this.musicControl(true,id,"");
  },
  //处理播放上一首也下一首
  handleNextPrev(event){
    //获取操作的类型
    let type = event.currentTarget.id;
    //发布订阅,告诉订阅者要操作东西了
    PubSub.publish("playNextOrPrev",type);
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
    });
    /* 播放时候回调 */
    this.musicManager.onTimeUpdate(()=>{
      // console.log("当前音频播放位置",this.musicManager.currentTime);//返回秒
      // console.log("总时长",this.musicManager.duration);//返回秒
      //格式化播放时间
      let currentTime = moment(this.musicManager.currentTime * 1000 ).format("mm:ss");
      //计算进度线条的长度 ,取.process-control .bar-control的宽度
      let currentWidth = (this.musicManager.currentTime/this.musicManager.duration)*450;
      //更新显示时间
      this.setData({
        currentTime,
        currentWidth,
      })
    });
    /* 音乐自然播放结束的回调 */
    this.musicManager.onEnded(()=>{
      //自动下一首
      PubSub.publish("playNextOrPrev",'next');
      //初始化
      this.setData({
        currentTime:"00:00",//当前播放的时间
        durationTime:"00:00",//总播放时间
        currentWidth:0,//当前进度条的长度
      })
    });
  },
  //发送请求获取指定id歌曲的详细信息并设置窗口标题
  async reqSongDetail(ids){
    let result = await request("/song/detail",{ids});
    let durationTime = result.songs[0].dt;//返回歌曲播放时长,单位为毫秒数
    durationTime = moment(durationTime).format("mm:ss");//格式化时间
    this.setData({
      songInfo:result.songs[0],
      durationTime,
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