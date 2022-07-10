import request from "../../utils/request";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //视频播放列表标签
    navList:[],
    //初始化显示的navtab项
    selectedId:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //获取视频标签列表
    this.reqNavList();
  },
  /**
   * 用户单击nav上的tab标签了
   */
  changNavTab(event){
    this.setData({
      selectedId:event.target.id
    })
  },
  /**
   * 请求获取视频标签列表
   */
  async reqNavList(){
      let result = await request('/video/group/list');
      //取前十四个
      result = result.data.slice(0,14);//左闭右开的范围
      this.setData({
        navList:result,
        // 设置初始化显示的id
        selectedId:result[0].id,
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