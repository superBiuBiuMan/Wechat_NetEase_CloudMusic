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
    durationMilliTime:0,//总播放毫秒数
    //测试
    startX:0,
    endX:0,
    //计算后的小圆点坐标
    circlePosition:0,
    //bar-control的宽度,用于后期滚动条滚动条位置的判断,获取的单位为px
    barControlWidth:0,
    isDrag:false,//是否处于拖拽小圆点的情况
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
    //获取查询对象,为了查询节点信息的对象
    this.queryObj = wx.createSelectorQuery().select(".bar-control").boundingClientRect((res)=>{
      //获bar-control的宽度,用于后期滚动条滚动条位置的判断
      this.setData({
        barControlWidth:res.width,
      })
    }).exec();
  },
  //触摸开始
  touchStart(event){
    // console.log("触摸开始",event);
    let {startX} = this.data;
    if(!startX){
      //只记录初始值,否者移动会出现问题
      startX = event.touches[0].clientX;
      this.setData({
        startX
      });
    }
    //设置小圆点为拖拽的情况
    this.setData({
      isDrag:true,
    })
  },
  //触摸移动
  touchMove(event){
    // console.log("触摸移动",event);
    //记录位置和小圆点可移动的范围宽度
    let {endX,barControlWidth,durationMilliTime} = this.data;
    endX = event.touches[0].clientX;
    //计算小圆球位置
    let circlePosition = endX - this.data.startX;
    //判断是否是合法的值 这里以px来计算
    if(circlePosition < 0){
      circlePosition = 0;
    }
    //判断是否是合法的值 类.bar-control 的宽度(px为单位)
    if(circlePosition > barControlWidth){
      circlePosition = barControlWidth;
    }
    //时间变化
    let nowPlayTime = (circlePosition / barControlWidth) * durationMilliTime;//计算后的毫秒数
    //格式化时间
    let currentTime = moment(nowPlayTime).format("mm:ss");
    this.setData({
      endX,
      circlePosition,
      currentTime,
      currentWidth:circlePosition,
    });
  },
  //触摸结束
  touchEnd(event){
    // console.log("触摸结束",event);
    let {circlePosition,barControlWidth,durationMilliTime} = this.data;
    //调整音乐位置
    let nowPlayTime = (circlePosition / barControlWidth) * durationMilliTime;//计算后的毫秒数
    this.musicManager.seek(nowPlayTime/1000);
    //取消小圆点拖拽行为
    this.setData({
      isDrag:false,
    })
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
      if(this.data.isDrag){
        //如果圆点处于拖拽,则不变更时间
        return;
      }
      //格式化播放时间
      let currentTime = moment(this.musicManager.currentTime * 1000 ).format("mm:ss");
      //计算进度线条的长度 ,取.process-control .bar-control的宽度
      //不同机型不是2倍的关系
      // let barControlWidthRpx = this.data.barControlWidth * 2;
      //检测 barControlWidthRpx 没有问题,
      let currentWidth = (this.musicManager.currentTime/this.musicManager.duration)*this.data.barControlWidth;
      //更新显示时间和宽度和小圆点位置
      this.setData({
        currentTime,
        currentWidth,
        circlePosition:currentWidth,
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
        startX:0,
        endX:0,
        //计算后的小圆点坐标
        circlePosition:0,
      })
    });
  },
  //发送请求获取指定id歌曲的详细信息并设置窗口标题
  async reqSongDetail(ids){
    let result = await request("/song/detail",{ids});
    let durationMilliTime = result.songs[0].dt;//返回歌曲播放时长,单位为毫秒数
    let durationTime = moment(durationMilliTime).format("mm:ss");//格式化时间
    this.setData({
      songInfo:result.songs[0],
      durationTime,
      durationMilliTime,
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