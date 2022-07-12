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
    //排行榜
    topList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.init();
  },
  //跳转到每日推荐
  toRecommendPage(){
    wx.navigateTo({
      url: '/pages/recommendSong/recommendSong',
    })
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
    //获取排行榜数据
    result = await request("/toplist");
    result = result.list.slice(0,5);//只取前五个
    //临时存放top排行榜
    let tempTopList = [];
    //获取基本的信息
    result.forEach(item=>{
      tempTopList.push({
        //榜单名称
        name:item.name,
        //榜单id
        id:item.id,
      });
    });
    result = tempTopList;
    //请求获取每一项目榜单的歌曲列表
    let index = 0;
    result.forEach(async (item)=>{
      let res = await request("/playlist/detail",{id:item.id});//请求获取对应榜单id的歌曲信息
      res = res.playlist.tracks.slice(0,3);//每次循环取对应榜单前三首歌曲信息
      //数据提取
      let tempSongList = [];
      res.forEach((songItem)=>{
          //每首歌曲提取的信息
          let dataInfo = {
            name:songItem.name,//歌名
            id:songItem.id,//歌名id
            cover:songItem.al.picUrl,//图片封面
            author:songItem.ar[0].name,//作者
            album:songItem.al.name,//专辑
          };
          tempSongList.push(dataInfo);
      });
      result[index++].list = tempSongList;
      this.setData({
        topList:result,
      });
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