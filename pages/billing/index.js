// pages/billing/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    number:12348,
    hours:0,
    minutes:0,
    seconds:0,
    actionText:"正在计费",
    clickBtn:false
  },

  /** 
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      number:options.number
    })
    let h = 0;
    let m = 0;
    let s = 0;
    this.timer = setInterval(() => {
      this.setData({
        seconds:s++
      })
      if(s == 60){
        s = 0;
        m++;
        setTimeout(() => {
          this.setData({
            minutes:m
          })
        },1000)
        if(m == 60){
          m = 0;
          h++;
          setTimeout(() => {
            this.setData({
              hours:h
            })
          },1000)
        }
      }
    },1000)
  },
  
  endride:function(){
    clearInterval(this.timer);
    this.timer = '';
    this.setData({
      actionText:'本次骑行时间',
      clickBtn:true
    })
  },
  movetoindex:function(){
    if(this.timer == ''){
      wx.redirectTo({
        url: '../index/index',
        success: (result)=>{
          
        },
        fail: ()=>{},
        complete: ()=>{}
      });
    }else{
      //保留当前页面，跳转到应用内的某个页面
      wx.navigateTo({
        url:'../index/index?timer='+this.timer,
      })
    }
  }
})