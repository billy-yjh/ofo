// pages/wallet/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    ticket:0,
  },
  movetoCharge:function(){
    //关闭当前页面跳转另一个页面
    wx.redirectTo({
      url: '../charge/index',
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.getStorage({
      key: 'overage',
      success: (res)=>{
        this.setData({
          money:res.data
        })
      }
    });
  }
})