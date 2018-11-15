// pages/scanResult/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    time:9
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      passworld:options.passworld
    })
    let time = 9;
    this.timer = setInterval(() => {
      this.setData({
        time:--time
      })
      //如果时间为0
      if(time <= 0){
        clearInterval(this.timer);
        //关闭当前页面，跳转到应用内的某个页面。
        wx.redirectTo({
          //给billing页面 发送获取到的车牌号  车牌号是由首页扫码获取的
          url: '../billing/index?number=' + options.number,
        });
      }
    },1000)
  }
})