// pages/charge/index.js
Page({
  input:function(e){
    this.setData({
      money:e.detail.value
    })
  },
  charge:function(){
    //判断money是否合法
    if(this.data.money <= 0 || isNaN(this.data.money)){
      wx.showModal({
        title:'充值失败',
        content:'是不是我还要给你点钱'
      })
    }else{
      //获取一下里面有没有余额
      wx.getStorage({
        key: 'overage',
        success: (res)=>{
          wx.setStorage({
            key:'overage',
            data:parseInt(res.data) + parseInt(this.data.money)
          })
        },
        fail: ()=>{
          wx.setStorage({
            key: 'overage',
            data:this.data.money,
          });
        },
        complete: ()=>{}
      });
      
      //跳转
      wx.redirectTo({
        url: '../wallet/index',
      });
    }
  }
})