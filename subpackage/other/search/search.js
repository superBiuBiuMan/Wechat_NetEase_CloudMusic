import request from '../../../utils/request'
let isSend = false; // 函数节流使用
Page({

  /**
   * 页面的初始数据
   */
  data: {
    placeholderContent: '', // placeholder的内容
    hotList: [], // 热搜榜数据
    searchContent: '', // 用户输入的表单项数据
    searchList: [], // 关键字模糊匹配的数据
    historyList: [], // 搜索历史记录
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取初始化数据
    this.getInitData();
    
    // 获取历史记录
    this.getSearchHistory();
  },
  //用户单击取消按钮
  cancelPage(){
    wx.reLaunch({
      url: '/pages/video/video',
    })
  },

  //用户单击热搜榜内容 通过事件委派的形式
  clickHotSearch(event){
    //获取热搜榜每一个容器对应的id
    let index = event.mark.index;
    //添加到搜索框
    this.setData({
      searchContent:this.data.hotList[index].searchWord
    });
    //进行搜索
    this.getSearchList();
  },

  //用户单击搜索记录 通过事件委派的形式
  handleSearchResult(event){
    //获取歌曲id
    let id = event.mark.id;
    //跳转到歌曲详细
    wx.navigateTo({
      // url: '/pages/songDetail/songDetail?id='+id,
      url: `/subpackage/song/songDetail/songDetail?id=${id}&search=1`,
    })
  },

  //用户单击历史搜索记录 通过事件委派的形式
  clickHistorySearch(event){
    //获取单击的搜索记录的索引
    let index = event.target.id;
    //id的值存在就进行处理,否者不进行处理
    if(index){
      //添加到搜索框
      this.setData({
        searchContent:this.data.historyList[index]
      });
      //进行搜索
      this.getSearchList();
    }
  },

  // 获取初始化的数据
  async getInitData(){
    //获取输入框的默认内容
    let placeholderData = await request('/search/default');
    //获取热搜榜
    let hotListData = await request('/search/hot/detail');
    this.setData({
      placeholderContent: placeholderData.data.showKeyword,
      hotList: hotListData.data
    })
  },
  
  // 获取本地历史记录的功能函数
  getSearchHistory(){
    let historyList = wx.getStorageSync('searchHistory');
    if(historyList){
      this.setData({
        historyList
      })
    }
  },
  
  // 表单项内容发生改变的回调
   handleInputChange(event){
    // console.log(event);
    // 更新searchContent的状态数据
    this.setData({
      searchContent: event.detail.value.trim()
    })
     if(isSend){
       return
     }
     isSend = true;
     this.getSearchList();
     // 函数节流
    setTimeout( () => {
      isSend = false;
    }, 300)
    
  },
  // 获取搜索数据的功能函数
  async getSearchList(){
    if(!this.data.searchContent){
      this.setData({
        searchList: []
      })
      return;
    }
    let {searchContent, historyList} = this.data;
    // 发请求获取关键字模糊匹配数据
    let searchListData = await request('/search', {keywords: searchContent, limit: 10});
    this.setData({
      searchList: searchListData.result.songs
    })
    
    // 将搜索的关键字添加到搜索历史记录中
    if(historyList.indexOf(searchContent) !== -1){
      historyList.splice(historyList.indexOf(searchContent), 1)
    }
    historyList.unshift(searchContent);
    this.setData({
      historyList
    })
    //存储搜索历史
    wx.setStorageSync('searchHistory', historyList)
  },
  // 清空搜索内容
  clearSearchContent(){
    this.setData({
      searchContent: '',
      searchList: []
    })
  },
  
  // 删除搜索历史记录
  deleteSearchHistory(){
    wx.showModal({
      content: '确认删除吗?',
      success: (res) => {
        if(res.confirm){
          // 清空data中historyList
          this.setData({
            historyList: []
          })
          // 移除本地的历史记录缓存
          wx.removeStorageSync('searchHistory');
        }
      }
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
