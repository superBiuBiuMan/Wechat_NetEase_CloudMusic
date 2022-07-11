import request from "../../utils/request";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //视频播放列表标签
    navList: [],
    //初始化显示的navtab项
    selectedId: "",
    //视频标签列表
    videoList: "",
    //当前播放的视频vid
    vid: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //获取视频标签列表
    this.reqNavList();
  },
  /**
   * 用户单击视频播放了
   */
  handlePlay(event) {
    console.log("被单击了");
    let vidNow = event.target.id; //获取当前单击的视频vid
    //1.如果现在单击的vid不等于上一个视频的vid,并且具有视频上下文,才进行暂停
    // vidNow !== this.vid && this.currentVideContext && this.currentVideContext.stop();
    //0.设置当前播放的id
    this.vid = vidNow; //复制id
    this.setData({
      vid:vidNow
    })
    // 1.创建上下文,并将video身上的vid作为唯一标识
    this.currentVideContext = wx.createVideoContext(vidNow);
    //自动播放
    this.currentVideContext.play();
  },
  /**
   * 用户单击nav上的tab标签了
   */
  changNavTab(event) {
    this.setData({
      selectedId: event.target.id,
      //清空数据
      videoList:[],
    });
    //显示加载
    wx.showLoading({
      title: '正在加载',
    });
    this.reqVideoList(this.data.selectedId);
  },
  /**
   * 请求获取视频标签nav列表
   */
  async reqNavList() {
    let result = await request('/video/group/list');
    //取前十四个
    result = result.data.slice(0, 14); //左闭右开的范围
    this.setData({
      navList: result,
      // 设置初始化显示的id
      selectedId: result[0].id,
    });
    //获取视频数据
    this.reqVideoList(this.data.selectedId);
  },
  /**
   * 请求获取对应视频标签下方的视频数据
   * 
   */
  async reqVideoList(id) {
    let result = await request("/video/group", {
      id,
    });

    //为结果添加id
    let reqList = []; //0.所有的请求
    let videoList = result.datas.map((item, index) => {
      // 1.为了后期统一获取数据并且是同步的
      reqList.push(this.reqVideoPlayUrl(item.data.vid));
      //手动添加唯一标识符
      item.id = index;
      return item;
    })
    //2.获取所有的video播放列表
    let videoListAll = await Promise.all(reqList);
    wx.hideLoading();//隐藏加载提示
    //3.添加到videoList数据当中
    videoList = videoList.map((item, index) => {
      item.data.urlInfo = videoListAll[index].urls[0];
      return item;
    })
    this.setData({
      videoList: videoList
    });
  },
  /**
   * 请求获取vid对应的视频播放地址
   */
  reqVideoPlayUrl(vid) {
    return request("/video/url", {
      id: vid
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